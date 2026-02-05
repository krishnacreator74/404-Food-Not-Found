import { useEffect, useState } from "react";

export default function Intro() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const onScroll = () => setHide(true);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`intro ${hide ? "hide" : ""}`}>
      <h1>
        Error 404: Food Not Found<span className="cursor">|</span>
      </h1>
    </div>
  );
}
