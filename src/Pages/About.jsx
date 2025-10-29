import myPics from "../assets/images/portfolio-img.jpg";
import InfiniteScroll from "../components/Ui/InfinteScroll";

const About = () => {
  const items = [
    { content: <h3>HTML</h3> },
    { content: <h3>CSS3</h3> },
    { content: <h3>TAILWINDCSS</h3> },
    { content: <h3>JAVASCRIPT</h3> },
    { content: <h3>REACTJS</h3> },
    { content: <h3>GIT & GITHUB</h3> },
    { content: <h3>UI DESIGN</h3> },
    { content: <h3>NODE JS</h3> },
    { content: <h3>FIGMA</h3> },
    { content: <h3>WORDPRESS</h3> },
  ];

  return (
    <section className="px-1 py-5 pt-24 md:pt-32 lg:pt-32 overflow-x-hidden">
      {/* <!-- about top --> */}
      <div className="flex flex-col items-center lg:flex-row justify-center lg:justify-around">
        
        {/* <!-- Outer border and padding --> */}
        <div className="p-8 border border-secondary mx-auto w-[95%] md:w-[60%] lg:w-[50%] lg:border-none mt-4 rounded-full flex items-center justify-center">

          {/* <!-- my image--> */}
          <div className="relative">
            <img
              src={myPics}
              alt=""
              className="rounded-full bg-primary/40 border border-secondary lg:border-4 w-full object-cover h-[450px]"
            />

          </div>
        </div>

        {/* <!-- about me  --> */}
        <div className="m-3 font-roboto text-gray-300 text-lg lg:w-[50%]">
          <p className="my-2 lg:w-[80%]">
            Hello, I'm Ashonibare Ferdinard, a passionate Frontend and aspiring
            fullStack Developer with a knack for creating stunning and
            user-friendly web applications. I bring designs to life and ensure
            seamless user experiences. My journey in web development has been
            fueled by a love for problem-solving and a commitment to continuous
            learning. Let's collaborate to build something amazing together!
          </p>

          <p className="my-2 mb-6 lg:w-[80%]">
            I am adept at adapting to new web development frameworks and
            technologies, constantly seeking ways to enhance my knowledge and
            experience. I am dedicated to learning through workshops, online
            classes, and practical projects, with the goal of creating digital
            solutions that enhance user experiences and boost corporate success.
          </p>

          <a href="#" className="resume">
            View Resume
          </a>
        </div>
      </div>

      {/* <!-- about bottom/ technical skill --> */}
      <div className="p-2 flex flex-col items-center justify-center mt-6 mb-1 lg:flex-row lg:justify-between">
        {/* <!-- about technical skill --> */}
        <div className="self-stretch lg:w-1/2">
          <div>
            <h5 className="text-gray-400 font-medium text-center font-roboto">
              skils
            </h5>
            <h2 className="text-myWhite font-roboto text-center font-semibold tracking-wider leading-9 text-2xl">
              Technical <span className="text-secondary">Skills</span>.
            </h2>
          </div>

          <p className="font-roboto text-gray-300 text-lg lg:w-[70%] lg:mx-auto mt-4 mb-6">
            With expertise in HTML, CSS, JavaScript, React, and Tailwind CSS, I
            create visually appealing web applications. I work with modern
            frontend tools and stay updated with industry best practices,
            focusing on clean, maintainable code.
          </p>
        </div>

        {/* skills */}
        <div className="relative h-[300px] lg:w-1/2 lg:mt-0 mt-6">
          <InfiniteScroll
            items={items}
            isTilted={true}
            tiltDirection="left"
            autoplay={true}
            autoplaySpeed={1.1}
            autoplayDirection="down"
            pauseOnHover={true}
          />
        </div>
      </div>
    </section>
  );
};

export default About;
