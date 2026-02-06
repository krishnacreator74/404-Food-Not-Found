import { useEffect, useState } from "react";

export default function Intro() {
  const [hide, setHide] = useState(false);
  const [text, setText] = useState("");
  const fullText = "Error 404: Food Not Found";

  useEffect(() => {
    const onScroll = () => setHide(true);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let i = 0;
    const typeWriter = () => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    typeWriter();
  }, []);

  return (
    <div className={`intro ${hide ? "hide" : ""}`}>
      <h1>
        {text}<span className="cursor">|</span>
      </h1>
    </div>
  );
}
