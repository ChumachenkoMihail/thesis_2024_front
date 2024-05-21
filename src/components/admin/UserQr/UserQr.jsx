import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { QRCode } from "react-qrcode-logo";
import "./index.scss";
import Button from "components/app/use/Button";
import { ReactComponent as Download } from "assets/images/download.svg";
import { ReactComponent as Refresh } from "assets/images/plus.svg";
import { ReactComponent as Copy } from "assets/images/copy.svg";

import { updateTOTP } from "store/thunks/usersThunks";
import { ThemeContext } from "store/context/themeContextProvider";
import Title from "components/app/use/Title";
import { copyToTextClipboard } from "libs/clipboardCopy";

const UserQr = ({ values, cancel }) => {
  const dispatch = useDispatch();
  const { isDarkTheme } = useContext(ThemeContext);

  const downloadCode = () => {
    const canvas = document.getElementById("QR");
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${values.name}_QR.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };
  const handleNewQr = (val) => {
    const id = {
      userId: val,
    };
    dispatch(updateTOTP(id));
    cancel();
  };

  return (
    <div className={`user_qr ${isDarkTheme ? "" : "user_qr_light"}`}>
      <p>Пользователь:</p>
      <Title Tag="h3">{values.name}</Title>
      <div className="qr_item">
        <QRCode
          value={values.qr}
          bgColor={"#FFFFFF"}
          fgColor="#0F061D"
          size={"320"}
          // eyeRadius={10}
          id={"QR"}
          enableCORS={true}
        />
      </div>
      <div className="modal_action">
        <Button
          text="Скопировать"
          mode="tretiary"
          Icon={Copy}
          func={() => copyToTextClipboard(values.qr, "TOTP")}
        />

        <Button
          text="Скачать"
          func={() => downloadCode()}
          Icon={Download}
          mode="tretiary"
        />
        <Button
          mode="primary"
          text="Cоздать новый"
          Icon={Refresh}
          func={() => handleNewQr(values?.id)}
        />
      </div>
    </div>
  );
};

export default UserQr;
