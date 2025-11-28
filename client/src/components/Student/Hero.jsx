import { assets } from "../../assets/assets";


const Hero = () => {
  return (
    <>
      <div
        className="hero relative  flex flex-col space-y-9 items-center justify-center text-center  "
        
      >
        
        <h1 className="relative font-bold max-w-3xl mx-auto text-2xl capitalize leading-9 md:leading-15 md:text-5xl text-white">
          Empower your future with the courses designed to{" "}
          <span className="text-(--color-primary)">fit your choice.</span>
          <img
            src={assets.sketch}
            alt="sketch"
            className="hidden md:block absolute -bottom-3 right-20"
          />
        </h1>
        <p className="hidden md:block text-gray-300/80 max-w-2xl mx-auto relative z-10">
          We bring together world-class instructors, interactive content, and a
          supportive community to help you achieve your personal and
          professional goals.
        </p>
        <p className="md:hidden block  text-gray-300/80 max-w-sm mx-auto relative z-10">
          We bring together world-class instructors, interactive content, and a
          supportive community to help you achieve your goals.
        </p>
      </div>
    </>
  );
};

export default Hero;
