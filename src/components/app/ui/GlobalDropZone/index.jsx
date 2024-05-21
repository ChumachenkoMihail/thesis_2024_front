import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import "./index.scss";
import Title from "../../use/Title";
import { useContext } from "react";
import { ThemeContext } from "../../../../store/context/themeContextProvider";
import { searchAnkets } from "../../../../store/thunks/searchThunks";
import { useDispatch } from "react-redux";
import { useSearchContext } from "../../../../store/context/globalSearchContext";
const GlobalDropZone = ({ children }) => {
  const { showSearchParams } = useSearchContext();

  const { isDarkTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop(item) {
        if (item) {
          const files = item.files[0];
          if (files) {
            const reader = new FileReader();
            reader.onloadend = () => {
              const imageWithoutPrefix = reader.result.substring(
                reader.result.indexOf(",") + 1,
              );
              dispatch(
                searchAnkets({
                  photo: imageWithoutPrefix,
                  matchingPercentage: {
                    from: 90,
                    to: 100,
                  },
                }),
              );
            };
            reader.readAsDataURL(files);
          }
        }
      },
      collect: (monitor) => {
        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        };
      },
    }),
    [],
  );
  return (
    <div
      className={`global_drop ${isDarkTheme ? "global_drop_dark" : ""}`}
      ref={drop}
    >
      {isOver && !showSearchParams && (
        <div className={`drop_content ${isOver ? "global_drop_fixed" : ""}`}>
          <div className="content_dashed">
            <Title titleType="title_secondary" Tag="h1">
              Drop image here
            </Title>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};
export default GlobalDropZone;
