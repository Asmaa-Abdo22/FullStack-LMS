import { useEffect } from "react";
import { Bars } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";

const Loading = () => {
  const { path } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (path) {
      const timer = setTimeout(() => {
        navigate(`/${path}`);
      }, 5000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-(--color-bg-main) text-( --color-primary)">
      <Bars
        height="60"
        width="60"
        color="#4f46e5"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loading;
