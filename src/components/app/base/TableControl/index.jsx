import "./index.scss";
import CheckBox from "components/app/input/CheckBox";
import Button from "components/app/use/Button";
import { v4 as uuid } from "uuid";
import { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";

const TableControl = ({
  checkboxChange,
  columnVisibility,
  columns,
  cancel,
  setShowControl,
}) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div className={`table_control ${isDarkTheme ? "" : "light_control"}`}>
      <p>Выберите отображаемые колонки</p>
      <div className="control_column_actions">
        {columns.map((column) => {
          return (
            <CheckBox
              key={uuid()}
              title={column.Header}
              name={column.id}
              checked={!columnVisibility.includes(column.accessor)}
              onChange={(e) =>
                checkboxChange(column.accessor, e.target.checked)
              }
            />
          );
        })}
      </div>
      <div className="modal_action">
        <Button mode="secondary" text="Отмена" func={cancel} />

        <Button
          mode="primary"
          text="Сохранить"
          func={() => setShowControl(false)}
        />
      </div>
    </div>
  );
};

export default TableControl;
