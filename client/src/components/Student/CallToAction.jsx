import { ArrowRight, GraduationCap } from "lucide-react";

const CallToAction = () => {
  return (
    <>
      <div className=" md:px-40 px-3 flex flex-col items-center pb-15">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-br from-(--color-primary)/10 to-(--color-primary-light)/10 mb-6">
            <GraduationCap className="text-(--color-primary)" size={24} />
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-(--color-text-main) mb-4">
            Learn{" "}
            <span className="text-(--color-primary)">
              anything, anytime, anywhere
            </span>
          </h2>
          <p className="text-base md:text-lg text-(--color-text-secondary) max-w-3xl mx-auto leading-relaxed">
            Incididunt sint fugiat pariatur cupidatat consectetur sit cillum
            anim id veniam aliqua proident excepteur commodo do ea.
          </p>
        </div>
        {/* buttons */}
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 rounded-lg cursor-pointer text-(--color-primary-dark) bg-(--color-bg-secondary) hover:bg-(--color-bg-section) border border-(--color-border) hover:border-(--color-primary) transition-all duration-300">
            Get Started
          </button>
          <button className="px-4 py-2 rounded-lg  flex gap-1 items-center cursor-pointer border border-(--color-border)">
            Learn More <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </>
  );
};

export default CallToAction;
