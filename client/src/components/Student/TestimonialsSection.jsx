import { Quote, Star } from "lucide-react";
import { dummyTestimonial } from "../../assets/assets";

const TestimonialsSection = () => {
  return (
    <>
      <div className=" md:px-40 px-3 flex flex-col items-center ">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-br from-(--color-primary)/10 to-(--color-primary-light)/10 mb-6">
            <Quote className="text-(--color-primary)" size={24} />
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-(--color-text-main) mb-4">
            Student <span className="text-(--color-primary)">Testimonials</span>
          </h2>
          <p className="text-base md:text-lg text-(--color-text-secondary) max-w-3xl mx-auto leading-relaxed">
            Hear from our learners as they share their journeys of
            transformation, success, and how our platform has made a difference
            in their lives.
          </p>
        </div>

        {/* cards */}
        <div className="flex flex-wrap items-center justify-center gap-20 lg:gap-6 pb-14  pt-10">
          {dummyTestimonial.map((item, index) => (
            <div className="text-sm w-80 border border-(--color-border) pb-6 rounded-lg bg-(--color-bg-card) shadow-[0px_4px_15px_0px] shadow-black/5 ">
              <div className="flex flex-col items-center px-5 py-4 relative">
                <img
                  className="h-24 w-24 absolute -top-14 rounded-full"
                  src={item.image}
                  alt={item.name}
                />
                <div class="pt-8 text-center">
                  <h1 className="text-lg font-semibold text-(--color-text-main)">
                    {item.name}
                  </h1>
                  <p className="text-(--color-primary) font-medium mt-1">
                    {" "}
                    {item.role}
                  </p>
                </div>
              </div>
              <p className="text-(--color-text-secondary) px-6 text-center leading-relaxed mt-2">
                {item.feedback}
              </p>
              <div class="flex justify-center pt-4">
                <div class="flex gap-0.5">
                  {[...Array(5)].map((item, i) => (
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TestimonialsSection;
