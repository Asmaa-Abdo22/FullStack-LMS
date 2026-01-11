import Course from "../models/Course.js";
import { CourseProgress } from "../models/CourseProgress.js";
import { Purchase } from "../models/Purchase.js";
import User from "../models/User.js";
import Stripe from "stripe";
import { clerkClient } from "@clerk/express";

export const getUserData = async (req, res) => {
  try {
    const userId = req.auth.userId;
    
    if (!userId) {
      return res.json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Try to find user in MongoDB
    let user = await User.findById(userId);

    // If user doesn't exist, create them from Clerk data
    if (!user) {
      try {
        // Get user data from Clerk
        const clerkUser = await clerkClient.users.getUser(userId);
        
        // Create user in MongoDB
        const firstName = clerkUser.firstName || "";
        const lastName = clerkUser.lastName || "";
        const fullName = `${firstName} ${lastName}`.trim();
        const userName = fullName || clerkUser.username || "User";
        
        const userData = {
          _id: clerkUser.id,
          email: clerkUser.emailAddresses[0]?.emailAddress || "",
          name: userName,
          imageUrl: clerkUser.imageUrl || "",
          enrolledCourses: [],
        };
        
        user = await User.create(userData);
      } catch (clerkError) {
        console.error("Error creating user from Clerk:", clerkError);
        return res.json({
          success: false,
          message: "Failed to fetch user data from Clerk",
        });
      }
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("getUserData error:", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
// Users Enrolled Courses With Lecture Links
export const userEnrolledCourses = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const userData = await User.findById(userId).populate("enrolledCourses");

    if (!userData) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      enrolledCourses: userData.enrolledCourses || [],
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Purchase Course
export const purchaseCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const { origin } = req.headers;
    const userId = req.auth.userId;

    const userData = await User.findById(userId);
    const courseData = await Course.findById(courseId);

    if (!userData || !courseData) {
      return res.json({
        success: false,
        message: "Data Not Found",
      });
    }

    //Check if user already purchased this course
    const existingPurchase = await Purchase.findOne({
      userId,
      courseId,
      status: "completed",
    });

    if (existingPurchase) {
      return res.json({
        success: false,
        message: "You have already purchased this course",
      });
    }

    // Calculate discounted price
    const discountAmount = courseData.coursePrice * (courseData.discount / 100);
    const finalAmount = courseData.coursePrice - discountAmount;

    const purchaseData = {
      courseId: courseData._id,
      userId,
      amount: parseFloat(finalAmount.toFixed(2)),
      status: "pending",
    };

    const newPurchase = await Purchase.create(purchaseData);

    // Stripe Gateway Initialize
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Create Stripe checkout session
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: courseData.courseTitle,
              description: courseData.courseDescription,
            },
            unit_amount: Math.round(finalAmount * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/loading/my-enrollments`,
      cancel_url: `${origin}/`,
      metadata: {
        purchaseId: newPurchase._id.toString(),
        userId: userId,
        courseId: courseId,
      },
    });

    res.json({
      success: true,
      message: "Checkout session created",
      sessionId: session.id,
      sessionUrl: session.url,
    });
  } catch (error) {
    console.error("Purchase error:", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Update User Course Progress
export const updateUserCourseProgress = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { courseId, lectureId } = req.body;
    const progressData = await CourseProgress.findOne({ userId, courseId });

    if (progressData) {
      if (progressData.lectureCompleted.includes(lectureId)) {
        return res.json({
          success: true,
          message: "Lecture Already Completed",
        });
      }

      progressData.lectureCompleted.push(lectureId);
      await progressData.save();
    } else {
      await CourseProgress.create({
        userId,
        courseId,
        lectureCompleted: [lectureId],
      });
    }
    res.json({ success: true, message: "Progress Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const getUserCourseProgress = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { courseId } = req.body;
        const progressData = await CourseProgress.findOne({ userId, courseId });
        res.json({ success: true, progressData });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


// Add User Ratings to Course
export const addUserRating = async (req, res) => {
    const userId = req.auth.userId;
    const { courseId, rating } = req.body;

    if (!courseId || !userId || !rating || rating < 1 || rating > 5) {
        return res.json({ success: false, message: 'Invalid Details' });
    }

    try {
        const course = await Course.findById(courseId);

        if (!course) {
            return res.json({ success: false, message: 'Course not found.' });
        }

        const user = await User.findById(userId);

        if (!user || !user.enrolledCourses.includes(courseId)) {
            return res.json({ success: false, message: 'User has not purchased this course.' });
        }

        const existingRatingIndex = course.courseRatings.findIndex(r => r.userId === userId);

        if (existingRatingIndex > -1) {
            course.courseRatings[existingRatingIndex].rating = rating;
        } else {
            course.courseRatings.push({ userId, rating });
        }
        
        await course.save();
        return res.json({ success: true, message: 'Rating added' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};
