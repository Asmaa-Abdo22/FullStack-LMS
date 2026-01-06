import { Star } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContextt } from "../../Context/AppContext";

const CourseCard = ({ course }) => {
  const { calculateRating } = useContext(AppContextt);
  return (
    <Link
      to={`/course/${course._id}`}
      onClick={() => {
        scrollTo({ behavior: "smooth", top: 0, left: 0 });
      }}
      className="group block border border-(--color-border) rounded-xl overflow-hidden bg-(--color-bg-card) hover:shadow-card hover:border-(--color-primary) transition-all duration-300 "
    >
      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden">
        <img
          src={course.courseThumbnail}
          alt={course.courseTitle}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Discount Badge */}
        {course.discount > 0 && (
          <div className="absolute top-3 right-3 bg-(--color-primary) text-(--color-text-white) px-2 py-1 rounded-md text-sm font-semibold">
            -{course.discount}%
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-col items-start space-y-3 p-4">
        {/* Title */}
        <h3 className="font-semibold text-(--color-primary-light)  line-clamp-2  ">
          {course.courseTitle}
        </h3>

        {/* Educator */}
        <p className="text-(--color-text-secondary) text-sm font-medium">
        {course.educator.name}
        </p>

        {/* Rating Section */}
        <div className="flex items-center gap-2 w-full">
          <div className="flex items-center gap-1">
            <span className="font-bold text-(--color-text-main)">{calculateRating(course)}</span>
            <div className="flex items-center ml-1">
              {[...Array(calculateRating(course))].map((_, i) => (
                <Star
                  key={i}
                  fill="orange"
                  color="orange"
                  size={16}
                  className="stroke-orange-400"
                />
              ))}
              <Star
                fill="#e5e7eb"
                color="#9ca3af"
                size={16}
                className="stroke-gray-300"
              />
            </div>
          </div>
          <span className="text-gray-500 text-sm">({course.courseRatings.length})</span>
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between w-full pt-2 border-t border-(--color-border-light)">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-(--color-text-main)">
              $
              {(
                course.coursePrice -
                (course.discount * course.coursePrice) / 100
              ).toFixed(2)}
            </span>
            {course.discount > 0 && (
              <span className="text-(--color-text-secondary) line-through text-sm">
                ${course.coursePrice.toFixed(2)}
              </span>
            )}
          </div>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-(--color-bg-secondary) text-(--color-text-secondary)">
            24h Left
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
