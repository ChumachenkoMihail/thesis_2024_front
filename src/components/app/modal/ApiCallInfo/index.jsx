import React from "react";
import ReactAudioPlayer from "react-audio-player";
import { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";

const ApiCallInfo = ({ data, downloadName }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <ReactAudioPlayer
        src={data}
        controls
        style={{ borderRadius: "6px" }}
        type="audio/mp3"
      />
      <a
        className={`kermit_btn ${isDarkTheme ? "" : "btn_light"} primary`}
        href={data}
        download={downloadName}
      >
        Скачать
      </a>
    </div>
  );
};

export default ApiCallInfo;
