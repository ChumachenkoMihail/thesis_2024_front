import "./index.scss";
import { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";
import Title from "components/app/use/Title";

const EmptyPage = ({ Icon, title, children }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div className="empty_page_container">
      <div className={`empty_page ${isDarkTheme ? "" : "empty_page_light"}`}>
        {Icon && <Icon className={"empty_page_ico"} />}
        {title && <Title Tag="h3">{title}</Title>}
        {children && <div className="empty_page-actions">{children}</div>}
      </div>
    </div>
  );
};

export default EmptyPage;
