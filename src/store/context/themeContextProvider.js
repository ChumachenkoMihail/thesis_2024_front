import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(
    localStorage.getItem("isDarkTheme") === "true" || false,
  );

  useEffect(() => {
    localStorage.setItem("isDarkTheme", isDarkTheme);
    document.body.classList.toggle("dark-theme", isDarkTheme);
    const elements = document.querySelectorAll(".custom_scroll");
    elements.forEach((element) => {
      if (isDarkTheme) {
        element.classList.add("custom_scroll_dark");
        element.classList.remove("custom_scroll_light");
      } else {
        element.classList.remove("custom_scroll_dark");
        element.classList.add("custom_scroll_light");
      }
    });
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme((prevState) => !prevState);
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
