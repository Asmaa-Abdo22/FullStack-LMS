import Course from "../models/Course.js";
import { Purchase } from "../models/Purchase.js";
import User from "../models/User.js";
import Stripe from "stripe";

export const getUserData = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User Not Found",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
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
