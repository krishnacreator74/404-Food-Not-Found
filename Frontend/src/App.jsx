import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const canvasRef = useRef();
  const scrollRef = useRef();
  const heroRef = useRef();

 useEffect(() => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");

  const resize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = w * window.devicePixelRatio;
    canvas.height = h * window.devicePixelRatio;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  };

  resize();
  window.addEventListener("resize", resize);

  const frameCount = 32;
  const images = [];
  const frame = { value: 0 };
  let lastFrame = -1;

  const getFrame = (i) =>
    `/frames/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;

  for (let i = -1; i < frameCount; i++) {
    const img = new Image();
    img.src = getFrame(i);
    images.push(img);
  }

  function drawCover(img) {
    const cw = window.innerWidth;
    const ch = window.innerHeight;

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
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, dx, dy, dw, dh);

    ctx.globalCompositeOperation = "overlay";
    for (let y = 0; y < ch; y += 4) {
      ctx.fillStyle = `rgba(0, 234, 255, 0.05)`;
      ctx.fillRect(0, y, cw, 2);
    }
    ctx.globalCompositeOperation = "source-over";
  }

  images[0].onload = () => drawCover(images[0]);

let heroVisible = false;

// set initial state
gsap.set(heroRef.current, {
  opacity: 0,
  y: 40,
});

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
    const current = Math.floor(frame.value);

    if (current !== lastFrame && images[current]) {
      lastFrame = current;
      drawCover(images[current]);
    }

    // SHOW hero
// SHOW hero between frame 19–28
    if (current >= 19 && current <= 28 && !heroVisible) {
      heroVisible = true;

      // flicker
      gsap.fromTo(
        canvas,
        { opacity: 1 },
        {
          opacity: 0.2,
          duration: 0.08,
          yoyo: true,
          repeat: 5,
          onComplete: () => gsap.set(canvas, { opacity: 1 }),
        }
      );

      heroRef.current.classList.add("glitch-in");

      gsap.to(heroRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });

      // remove glitch class after animation
      setTimeout(() => {
        heroRef.current.classList.remove("glitch-in");
      }, 600);
    }

    // HIDE hero outside that range
    if ((current < 19 || current > 28) && heroVisible) {
      heroVisible = false;

      gsap.to(heroRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.4,
        ease: "power2.in",
        overwrite: "auto",
      });
    }


    // HIDE hero
    if (current < 19 && heroVisible) {
      heroVisible = false;

      heroRef.current.classList.remove("glitch-in");

      gsap.to(heroRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.4,
        ease: "power2.in",
        overwrite: "auto",
      });
    }
    // hide canvas near end of video
    if (current >= 30) {
    gsap.to(canvas, {
      opacity: 0,
      duration: 0.5,
      overwrite: "auto",
    });
    } else {
    gsap.to(canvas, {
      opacity: 1,
      duration: 0.5,
      overwrite: "auto",
    });
  }

  },
});







  return () => {
    window.removeEventListener("resize", resize);
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}, []);


  return (
      <>
        <canvas ref={canvasRef} className="canvas" />
        <div ref={scrollRef} className="scroll-area"></div>

        {/* Hero overlay */}
        <section className="hero" ref={heroRef}>
          <div className="hero-content">
            <h1>404 FOOD NOT FOUND</h1>
            <p className="hero-sub">
              system.online() → serving synthetic flavors
            </p>

            <div className="hero-lines">
              <span>boot_sequence: complete</span>
              <span>flavor_protocol: loaded</span>
              <span>neon_core: stable</span>
              <span>scroll_to_enter()</span>
            </div>
          </div>
        </section>

        <section className="section about">
        <h2>About 404 Food Not Found</h2>
        <p>
          Hidden in the neon back-alleys of the digital district, 404 Food Not Found
          is not just a restaurant — it’s a system anomaly. What started as a
          corrupted food delivery AI evolved into a full-scale cyberpunk dining
          experience.
        </p>
        <p>
          Our chefs don’t cook — they compile. Every dish is engineered through
          flavor algorithms, synthetic spices, and experimental textures pulled from
          across the neon grid.
        </p>
        <div className="about-stats">
          <div>
            <h3>2.3M+</h3>
            <span>Meals Compiled</span>
          </div>
          <div>
            <h3>98%</h3>
            <span>System Stability</span>
          </div>
          <div>
            <h3>404</h3>
            <span>Secret Recipes</span>
          </div>
        </div>
      </section>

      <section className="section menu">
        <h2>Menu Protocol</h2>
        <p className="menu-intro">
          Select your meal. System will handle the rest.
        </p>

        <div className="menu-grid">
          <div className="menu-item">
            <h3>Neon Noodles</h3>
            <p>
              Bioluminescent ramen infused with electric broth and holographic
              toppings.
            </p>
            <span className="price">₿12</span>
          </div>

          <div className="menu-item">
            <h3>Cyber Steak</h3>
            <p>
              Lab-grown premium cut, seared with plasma heat and finished with
              quantum salt.
            </p>
            <span className="price">₿28</span>
          </div>

          <div className="menu-item">
            <h3>Glitch Salad</h3>
            <p>
              Fresh greens that randomly change flavor profiles every bite.
            </p>
            <span className="price">₿9</span>
          </div>

          <div className="menu-item">
            <h3>Pixel Dumplings</h3>
            <p>
              Bite-sized data packets filled with spicy neural paste.
            </p>
            <span className="price">₿11</span>
          </div>

          <div className="menu-item">
            <h3>404 Dessert</h3>
            <p>
              Unknown sweet anomaly. Flavor cannot be predicted.
            </p>
            <span className="price">₿15</span>
          </div>

          <div className="menu-item">
            <h3>Neon Soda</h3>
            <p>
              Carbonated energy drink with reactive color-changing bubbles.
            </p>
            <span className="price">₿6</span>
          </div>
        </div>
      </section>

    </>
  );
}
