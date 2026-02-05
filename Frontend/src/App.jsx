import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Intro from "./components/Intro";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const canvasRef = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const frameCount = 32;
    const images = [];
    const frame = { value: 0 };

    const getFrame = (i) =>
      `/frames/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;

    for (let i = -1; i < frameCount; i++) {
      const img = new Image();
      img.src = getFrame(i);
      images.push(img);
    }

    images[0].onload = () => {
      context.drawImage(images[0], 0, 0, canvas.width, canvas.height);
    };

    gsap.to(frame, {
      value: frameCount - 1,
      ease: "none",
      scrollTrigger: {
        trigger: scrollRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
      onUpdate: () => {
        const img = images[Math.floor(frame.value)];
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      },
    });
  }, []);

  return (
    <>
      <Intro />
      <canvas ref={canvasRef} className="canvas" />
      <div ref={scrollRef} className="scroll-area"></div>
    </>
  );
}
