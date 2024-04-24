import React, { useEffect, useState } from "react";
import "./home.css";

const TypewriterEffect = ({ text, animate, maxWidth }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    let intervalId;

    if (animate && text) {
      intervalId = setInterval(() => {
        if (index < text.length) {
          setDisplayText((prevText) => prevText + text.charAt(index));
          index++;
        } else {
          clearInterval(intervalId);
        }
      }, 50); // Adjust the speed here (in milliseconds)
    }

    return () => clearInterval(intervalId);
  }, [text, animate]);

  return <div className="typewriter" style={{ maxWidth: `${maxWidth}px` }}>{displayText}</div>;
};

export default TypewriterEffect;
