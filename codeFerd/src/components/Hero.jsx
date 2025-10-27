import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero = () => {
  const mainRef = useRef(null);
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const socialsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { 
        ease: "power3.out",
        duration: 1
      }
    });


    gsap.set([headingRef.current, subHeadingRef.current, socialsRef.current], {
      opacity: 0,
      y: 20
    });

    // Animation sequence
    tl.to(headingRef.current, {
      opacity: 1,
      y: 0,
      delay: 0.5
    })
    .to(subHeadingRef.current, {
      opacity: 1,
      y: 0,
    }, "-=0.5") 
    .to(socialsRef.current, {
      opacity: 1,
      y: 0,
    }, "-=0.5");

    
    const socialIcons = socialsRef.current.querySelectorAll('.social-links');
    gsap.to(socialIcons, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      stagger: 0.1,
      ease: "back.out(1.7)",
      delay: 1.5
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <main ref={mainRef} className="p-8 pt-32 md:pt-40 lg:pt-48">
      <h1 
        ref={headingRef}
        className="text-myWhite font-bold text-3xl md:text-5xl tracking-wide leading-10 md:leading-16 my-4 md:my-6 text-center lg:text-6xl lg:leading-20"
      >
        Hi there, I am <span className="md:block">Ashonibare Ferdinard</span>
      </h1>

      <h4 
        ref={subHeadingRef}
        className="text-myWhite font-semibold text-lg leading-9 font-roboto md:text-xl md:leading-10 md:text-center md:mx-auto md:w-[70%] md:mb-6 lg:text-2xl lg:leading-12 lg:w-[75%] lg:mb-10"
      >
        A creative <span>Frontend</span> and aspiring backend developer transforming ideas into amazing digital experiences. Let's create something stunning!
      </h4>

      
      <div 
        ref={socialsRef}
        className="mt-6 text-white flex w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] justify-between mx-auto"
      >
        <a href="https://github.com/Iconvibes" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-github social-links opacity-0 scale-0"></i>
        </a>
        <a href="https://www.tiktok.com/@codeferd?_t=ZM-8wxQYhyDNE0&_r=1" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-tiktok social-links opacity-0 scale-0"></i>
        </a>
        <a href="https://www.facebook.com/share/16GHr15531/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-facebook social-links opacity-0 scale-0"></i>
        </a>
        <a href="https://www.linkedin.com/in/ferdinard-ashonibare-3a3203369" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-linkedin social-links opacity-0 scale-0"></i>
        </a>
      </div>
    </main>
  );
}

export default Hero;
