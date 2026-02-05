import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Scene({ img, text }) {
  const el = useRef();

  useEffect(() => {
    const section = el.current;

    gsap.fromTo(
      section,
      { scale: 1, y: 0 },
      {
        scale: 1.08,
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section
      ref={el}
      className="scene"
      style={{ backgroundImage: `url(${img})` }}
    >
      {text && <div className="scene-text">{text}</div>}
    </section>
  );
}
