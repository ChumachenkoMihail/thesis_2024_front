import "./index.scss";
import Title from "../../use/Title";
import Button from "../../use/Button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../../../store/context/themeContextProvider";

const ApplicationError = () => {
  const navigate = useNavigate();
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div className={`kermit_broken ${isDarkTheme ? "broken_dark" : ""}`}>
      <div className="broken_container">
        <Title Tag="h1">Ой-ой! Щось пішло не так 🙈.</Title>
        <Title Tag="h4">
          "Та не хвилюйтеся, ми не збираємося залишати це так. На жаль,
          вам доведеться звернутися до програмістів. <br /> А поки ми це
          виправляємо, можете заспокоїтися чашечкою кави або подивитися смішний
          кото-мем – це завжди допомагає! 🐱☕️"
        </Title>
        <Button func={() => navigate(-1)}>На страницу без ошибки</Button>
      </div>
    </div>
  );
};

export default ApplicationError;
