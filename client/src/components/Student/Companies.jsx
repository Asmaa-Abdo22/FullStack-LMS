import { assets } from "../../assets/assets";

const Companies = () => {
  return (
    <>
      <div className="pt-5 relative z-1 ">
        <p className="text-gray-400">Trusted by learners from</p>
        <div className="flex gap-9 md:gap-12 pt-10  flex-wrap items-center flex-row justify-center  pb-3">
          <img
            src={assets.microsoft_logo}
            alt="microsoft"
            className="w-15 md:w-28"
          />
          <img
            src={assets.walmart_logo}
            alt="walmart_logo"
            className="w-15 md:w-28"
          />
          <img
            src={assets.accenture_logo}
            alt="accenture_logo"
            className="w-15 md:w-28"
          />
          <img
            src={assets.adobe_logo}
            alt="adobe_logo"
            className="w-15 md:w-28"
          />
          <img
            src={assets.paypal_logo}
            alt="paypal_logo"
            className="w-15 md:w-28"
          />
        </div>
      </div>
    </>
  );
};

export default Companies;
