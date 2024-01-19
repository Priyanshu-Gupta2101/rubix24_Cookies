import React, { useEffect } from "react";
import "./movingtext.css";
const MovingText = () => {
  useEffect(() => {
    const dynamicText = document.querySelector("h3 span");
    const words = [
      "of Dreams",
      "of Experiences",
      "that Never Sleeps",
      "for Everyone <3",
    ];
    const colors = ["#198cc9", "#157acc", "#0d75b7", "#713bdc", "#ff0050"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {
      const currentWord = words[wordIndex];
      const currentColor = colors[wordIndex];
      const currentChar = currentWord.substring(0, charIndex);
      dynamicText.textContent = currentChar;
      dynamicText.style.color = currentColor;
      dynamicText.classList.add("stop-blinking");

      if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(typeEffect, 80);
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 80);
      } else {
        isDeleting = !isDeleting;
        dynamicText.classList.remove("stop-blinking");
        wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
        setTimeout(typeEffect, 500);
      }
    };
    typeEffect();
  }, []);

  return (
    <div className="max-width moving">
      <h3>
        The City <span></span>
      </h3>
    </div>
  );
};

export default MovingText;
