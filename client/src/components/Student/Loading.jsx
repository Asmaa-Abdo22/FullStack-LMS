import { Bars } from "react-loader-spinner";

const Loading = () => {
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
