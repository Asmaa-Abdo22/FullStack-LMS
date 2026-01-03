import { useEffect, useState } from "react";
import { dummyDashboardData } from "../../assets/assets";
import Loading from "../../components/Student/Loading";
import { User, FileSearch, CircleDollarSign } from "lucide-react";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (!dashboardData) return <Loading />;

  return (
    <div className="min-h-screen flex flex-col items-start gap-8 p-4">
      {/* insights */}
      <div className="flex items-start flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 w-full">
        <div className="one w-full md:w-fit flex items-start gap-3 border p-4 rounded-lg border-(--color-border) bg-(--color-bg-card)">
          <div className="icon text-(--color-primary)">
            <User />
          </div>
          <div className="textt">
            <p className="text-(--color-text-main) font-bold text-xl">
              {dashboardData.enrolledStudentsData.length}
            </p>
            <p className="text-(--color-text-secondary)">Total Enrollments</p>
          </div>
        </div>
        <div className="two w-full md:w-fit flex items-start gap-3 border p-4 rounded-lg border-(--color-border) bg-(--color-bg-card)">
          <div className="icon text-(--color-primary)">
            <FileSearch />
          </div>
          <div className="textt">
            <p className="text-(--color-text-main) font-bold text-xl">
              {dashboardData.totalCourses}
            </p>
            <p className="text-(--color-text-secondary)">Total Courses</p>
          </div>
        </div>
        <div className="three w-full md:w-fit flex items-start gap-3 border p-4 rounded-lg border-(--color-border) bg-(--color-bg-card)">
          <div className="icon text-(--color-primary)">
            <CircleDollarSign />
          </div>
          <div className="textt">
            <p className="text-(--color-text-main) font-bold text-xl">
              $ <span>{dashboardData.totalEarnings}</span>
            </p>
            <p className="text-(--color-text-secondary)">Total Earnings</p>
          </div>
        </div>
      </div>

      {/* heading */}
      <h2 className="text-(--color-text-main) text-xl font-semibold">
        Latest Enrollments
      </h2>

      {/* table */}
      <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-lg border border-(--color-border) bg-(--color-bg-card)">
        <table className="w-full table-fixed md:table-auto">
          <thead className="border-b border-(--color-border) text-sm bg-(--color-bg-secondary)">
            <tr>
              <td className="p-3 text-(--color-text-main) font-semibold">#</td>
              <td className="p-3 text-(--color-text-main) font-semibold">
                Student Name
              </td>
              <td className="p-3 text-(--color-text-main) font-semibold">
                Course Title
              </td>
            </tr>
          </thead>
          <tbody>
            {dashboardData.enrolledStudentsData.map((item, index) => (
              <tr
                key={index}
                className="border-t border-(--color-border) hover:bg-(--color-bg-section)/40 transition"
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
