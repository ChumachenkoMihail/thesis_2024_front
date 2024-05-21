import React, { useState, useEffect } from "react";
import Button from "../../use/Button";
import { ReactComponent as UP } from "assets/images/angle_up.svg";
import "./index.scss";
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollThreshold = 200; // Adjust this value to determine when the button appears
      setIsVisible(scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="scroll_top_btn">
      <Button
        func={scrollToTop}
        Icon={UP}
        style={{
          display: isVisible ? "block" : "none",
          height: "fit-content",
          padding: "4px 8px",
        }}
      ></Button>
    </div>
  );
};

export default ScrollToTopButton;
