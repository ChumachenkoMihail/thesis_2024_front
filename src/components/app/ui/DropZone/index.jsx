import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import { useCallback, useRef, useState } from "react";
import Button from "components/app/use/Button";
import { ReactComponent as Drop } from "assets/images/download.svg";
import { ReactComponent as Success } from "assets/images/success_upload.svg";
import { ReactComponent as Trash } from "assets/images/trash.svg";
import { ReactComponent as NoImage } from "assets/images/drop_zone_user.svg";
import { ReactComponent as CanDrop } from "assets/images/can_drop.svg";
import Title from "components/app/use/Title";

/**
 * DropZone
 *
 * @param dropped (array useState > required)
 * @param setDropped (setArray useState > required)
 * @param title (default return "Upload" string)
 * @param bottomButton (if true show action button )
 * @param buttonLabel (text for button)
 * @param actionButton (action for button)
 * @param isMultiple (default false) multi on input upload
 */

const DropZone = ({
  dropped = [],
  setDropped,
  title = null,
  isMultiple = false,
  bottomButton,
  buttonLabel = "",
  actionButton,
  isDarkTheme,
}) => {
  const hiddenFileInput = useRef(null);
  const [mouseOver, setMouseOver] = useState(false);
  const [selected, setSelected] = useState([]);
  const handleFileDrop = useCallback(
    (item) => {
      if (item) {
        const files = item.files[0];
        setSelected(item.files);
        if (files) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const imageWithoutPrefix = reader.result.substring(
              reader.result.indexOf(",") + 1,
            );
            setDropped(imageWithoutPrefix);
          };
          reader.readAsDataURL(files);
        }
        setDropped(files);
      }
    },
    [setDropped],
  );

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop(item) {
        handleFileDrop(item);
      },
      collect: (monitor) => {
        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        };
      },
    }),
    [dropped],
  );
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const file = event.target.files[0];
    setSelected(event.target.files);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageWithoutPrefix = reader.result.substring(
          reader.result.indexOf(",") + 1,
        );
        setDropped(imageWithoutPrefix);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setDropped("");
    setSelected([]);
    hiddenFileInput.current.value = "";
  };
  const isCanDrop = isOver && canDrop;
  return (
    <div className={`drop_area ${isDarkTheme ? "" : "drop_area_light"}`}>
      <div
        className={`drop-file-container ${isCanDrop ? "can_drop-file" : ""} ${
          isDarkTheme ? "" : "drop_light"
        }`}
        ref={drop}
        onMouseOver={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
      >
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleChange}
          multiple={isMultiple}
          style={{
            display: "none",
          }}
        />
        <div className="dropped_view">
          {isCanDrop && (
            <div className="dropped_view can_drop_view">
              <CanDrop />
              <Title Tag="h4">Drag & drop</Title>
            </div>
          )}
          {dropped?.length ? (
            <img src={`data:image/png;base64, ${dropped}`} alt="" />
          ) : (
            <>
              <NoImage />
              <Title Tag="h4">Drag & drop</Title>
              <p>
                Перетяните фото в эту <br /> область для загрузки
              </p>
            </>
          )}
        </div>
      </div>
      <div className={`dropped_off ${dropped?.length ? "dropped_on" : ""}`}>
        {dropped?.length > 0 && <Success />}
        {dropped?.length ? "Фото загружено успешно" : "Загрузите фото человека"}
      </div>
      <div className="drop_actions">
        <Button text="Загрузить" Icon={Drop} func={handleClick} />
        {dropped?.length ? (
          <Button Icon={Trash} fill func={handleRemove} />
        ) : null}
      </div>
    </div>
  );
};

export default DropZone;
