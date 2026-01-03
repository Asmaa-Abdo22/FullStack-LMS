import { useEffect, useState } from "react";
import { dummyStudentEnrolled } from "../../assets/assets";
import Loading from "../../components/Student/Loading";

const StudentsEnrolled = () => {
  const [studentEnrolled, setStudentEnrolled] = useState(null);
  const fetchstudentEnrolled = async () => {
    setStudentEnrolled(dummyStudentEnrolled);
  };

  useEffect(() => {
    fetchstudentEnrolled();
  }, []);

  if (!studentEnrolled) return <Loading />;
  return (
    <div className="min-h-screen flex flex-col items-start gap-8 p-4">
      {/* heading */}
      <h2 className="text-(--color-text-main) text-xl font-semibold">
        Students Enrolled
      </h2>
      {/* table */}
      <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-lg border border-(--color-border) bg-(--color-bg-card)">
        <table className="w-full table-fixed md:table-auto">
          <thead className="border-b border-(--color-border) text-sm bg-(--color-bg-secondary)">
            <tr className="text-left">
              <td className="p-3 text-(--color-text-main) font-semibold">#</td>
              <td className="p-3 text-(--color-text-main) font-semibold">
                Student Name
              </td>
              <td className="p-3 text-(--color-text-main) font-semibold">
                Course Title
              </td>
              <td className="p-3 text-(--color-text-main) font-semibold hidden sm:table-cell">
                Date
              </td>
            </tr>
          </thead>
          <tbody>
            {studentEnrolled.map((item, index) => (
              <tr
                key={index}
                className="border-t border-(--color-border) hover:bg-(--color-bg-section)/40 transition text-left"
              >
                <td className="py-3 px-4 text-(--color-text-secondary)">
                  {index + 1}
                </td>
                <td className="py-3 px-4 flex items-center gap-3">
                  <img
                    src={item.student.imageUrl}
                    alt={item.student.name}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="text-(--color-text-main)">
                    {item.student.name}
                  </span>
                </td>
                <td className="py-3 px-4 truncate text-(--color-text-secondary)">
                  {item.courseTitle}
                </td>
                <td className="py-3 px-4 truncate text-(--color-text-secondary)">
                  {new Date(item.purchaseDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsEnrolled;
