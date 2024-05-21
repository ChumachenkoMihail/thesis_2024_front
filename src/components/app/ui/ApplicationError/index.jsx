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
        <Title Tag="h1">Ой-ой! Что-то пошло не так 🙈.</Title>
        <Title Tag="h4">
          "Но не волнуйтесь, мы не собираемся оставлять это таким. К сожалению,
          вам придется обратиться к программистам. <br /> А пока мы это
          исправляем, можете успокоиться чашечкой кофе или посмотреть смешной
          кот-мем – это всегда помогает! 🐱☕️"
        </Title>
        <Button func={() => navigate(-1)}>На страницу без ошибки</Button>
      </div>
    </div>
  );
};

export default ApplicationError;
