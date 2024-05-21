import React, { useContext } from "react";
import { v4 as uuid } from "uuid";
import { ThemeContext } from "store/context/themeContextProvider";
import Button from "components/app/use/Button";
import "./index.scss";

const PhotoList = ({ photos, handleButtonClick, buttonText }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div
      className={`photos_container ${
        isDarkTheme ? "" : "photos_container_light"
      }`}
    >
      {photos.map((photo) => (
        <figure key={uuid()}>
          <img src={`data:image/png;base64,${photo}`} alt="" />
          <div className="photo_action">
            <Button func={() => handleButtonClick(photo)} text={buttonText} />
          </div>
        </figure>
      ))}
    </div>
  );
};

export default PhotoList;
