

const Footer = () => {
  return (
    <>
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-(--color-text-secondary)          bg-(--color-bg-secondary)">
        <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-(--color-border) pb-6">
          <div className="md:max-w-96">
            <h2
              className="font-bold text-3xl cursor-pointer text-(--color-primary)"
              onClick={() => navigate("/")}
            >
              Edemy
            </h2>
            <p className="mt-6 text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>
          <div className="flex-1 flex items-start md:justify-end gap-20">
            <div>
              <h2 className="font-semibold mb-5 text-(--color-text-main)">
                Company
              </h2>
              <ul className="text-sm space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-(--color-primary) transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-(--color-primary) transition-colors"
                  >
                    About us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-(--color-primary) transition-colors"
                  >
                    Contact us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-(--color-primary) transition-colors"
                  >
                    Privacy policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-semibold text-(--color-text-main) mb-5">
                Subscribe to our newsletter
              </h2>
              <div className="text-sm space-y-2">
                <p>
                  The latest news, articles, and resources, sent to your inbox
                  weekly.
                </p>
                <div className="flex flex-col md:flex-row items-center gap-2 pt-4">
                  <input
                    className="border border-(--color-border) placeholder-(--color-text-secondary) focus:ring-2 ring-(--color-primary) outline-none w-full max-w-64 h-9 rounded px-2 bg-transparent"
                    type="email"
                    placeholder="Enter your email"
                  />
                  <button className="bg-(--color-primary) w-24 h-9 text-white rounded hover:bg-(--color-primary)/90 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="pt-4 text-center text-xs md:text-sm pb-5">
          Copyright 2024 ©{" "}
          <a
            href="https://github.com/Asmaa-Abdo22"
            className="text-(--color-primary) hover:underline"
          >
           Asmaa Abdo
          </a>
          . All Right Reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
