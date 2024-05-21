import "./index.scss";
import { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";
import IconTitle from "components/app/use/Title/IconTitle";

const Title = ({
  children,
  Icon,
  Tag,
  iconStyle = "",
  iconStyleWrapper = "",
  IconWidth = "auto",
  IconHeight = "auto",
  titleType = "",
  style,
}) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <Tag
      className={`title ${isDarkTheme ? "" : "title_light"} ${titleType}`}
      style={style}
    >
      <>
        {Icon && (
          <IconTitle
            Icon={Icon}
            iconStyle={iconStyle}
            iconStyleWrapper={iconStyleWrapper}
            IconWidth={IconWidth}
            IconHeight={IconHeight}
          />
        )}
        {children}
      </>
    </Tag>
  );
};

export default Title;
