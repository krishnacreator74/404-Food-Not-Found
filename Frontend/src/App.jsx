import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Intro from "./components/Intro";
import Scene from "./components/Scene";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const canvasRef = useRef();
  const scrollRef = useRef();

useEffect(() => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");

  // --- Full screen canvas size
  const CANVAS_WIDTH = window.innerWidth;
  const CANVAS_HEIGHT = window.innerHeight;

  canvas.width = CANVAS_WIDTH * window.devicePixelRatio;
  canvas.height = CANVAS_HEIGHT * window.devicePixelRatio;
  canvas.style.width = CANVAS_WIDTH + "px";
  canvas.style.height = CANVAS_HEIGHT + "px";
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

  const frameCount = 32;
  const images = [];
  const frame = { value: 0 };
  let lastFrame = -1;

  const getFrame = (i) =>
    `/frames/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;

  // --- preload correctly
  for (let i = -1; i < frameCount; i++) {
    const img = new Image();
    img.src = getFrame(i);
    images.push(img);
  }

  // --- cover draw (like CSS background-size: cover) with glitch effects
  function drawCover(img) {
    const cw = CANVAS_WIDTH;
    const ch = CANVAS_HEIGHT;
    const ir = img.width / img.height;
    const cr = cw / ch;

    let dw, dh, dx, dy;

    if (ir > cr) {
      dh = ch;
      dw = img.width * (ch / img.height);
      dx = (cw - dw) / 2;
      dy = 0;
    } else {
      dw = cw;
      dh = img.height * (cw / img.width);
      dx = 0;
      dy = (ch - dh) / 2;
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);

    // Add scanlines
    ctx.globalCompositeOperation = 'overlay';
    for (let y = 0; y < ch; y += 4) {
      ctx.fillStyle = `rgba(0, 255, 200, ${Math.random() * 0.1})`;
      ctx.fillRect(0, y, cw, 2);
    }
    ctx.globalCompositeOperation = 'source-over';

    // Add flicker effect
    if (Math.random() < 0.05) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(0, 0, cw, ch);
    }
  }

  images[0].onload = () => drawCover(images[0]);

  gsap.to(frame, {
    value: frameCount - 1,
    ease: "none",
    scrollTrigger: {
      trigger: scrollRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 5,
    },
    onUpdate: () => {
      const current = Math.floor(frame.value);
      if (current !== lastFrame) {
        lastFrame = current;
        drawCover(images[current]);
      }
    },
  });
}, []);

  return (
    <>
      <Intro />
      <canvas ref={canvasRef} className="canvas" />
      <div ref={scrollRef} className="scroll-area"></div>
      <section id="about" className="section">
        <h2>About 404 Food Not Found</h2>
        <p>Welcome to 404 Food Not Found, a cyberpunk-inspired dining experience where the future meets flavor. Our restaurant blends cutting-edge technology with innovative cuisine, creating an unforgettable atmosphere.</p>
      </section>
      <section id="menu" className="section">
        <h2>Menu</h2>
        <div className="menu-grid">
          <div className="menu-item">
            <h3>Neon Noodles</h3>
            <p>Glowing ramen with holographic toppings.</p>
          </div>
          <div className="menu-item">
            <h3>Cyber Steak</h3>
            <p>Premium cut with digital seasoning.</p>
          </div>
          <div className="menu-item">
            <h3>Glitch Salad</h3>
            <p>Fresh greens with a futuristic twist.</p>
          </div>
        </div>
      </section>
      <section id="contact" className="section">
        <h2>Contact Us</h2>
        <p>Ready to glitch into flavor? Reach out to us!</p>
        <p>Email: info@404foodnotfound.com</p>
        <p>Phone: (555) 404-0000</p>
        <p>Address: 404 Cyber Street, Neon City</p>
      </section>
    </>
  );
}
