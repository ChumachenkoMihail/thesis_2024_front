import { useContext, useId } from "react";
import "./index.scss";
import { ReactComponent as Up } from "assets/images/expand-up.svg";
import { ReactComponent as Down } from "assets/images/expand_down.svg";
import { ThemeContext } from "store/context/themeContextProvider";
import CheckBox from "components/app/input/CheckBox";
import { v4 as uuid } from "uuid";
import Title from "components/app/use/Title";

const AccessLevelsDrop = ({
  checkBoxError,
  nameBD,
  sourceFields,
  onChange,
  sourceID,
  checkedValues,
  checkAll,
  allSource,
  isCheckedAll,
  setIndexOpen,
  indexOpen,
  index,
}) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const fieldId = useId();
  const handleShowSub = (e) => {
    setIndexOpen(index);
  };
  const handleChangeCheckBox = (e) => {
    onChange(e, sourceID);
  };
  const sourceFieldsById = allSource.find((s) => s.id === sourceID)?.fields;
  return (
    <div
      className={`kermit_drop_down ${
        indexOpen?.includes(index) ? "drop_open" : ""
      } ${isDarkTheme ? "" : "drop_down_light"}`}
    >
      <div
        className={`drop_head ${indexOpen?.includes(index) ? "head_open" : ""}`}
      >
        <div className="head_content">
          <CheckBox
            checkedAll
            onChange={(e) => checkAll(e, sourceID, sourceFieldsById)}
            name={`all${sourceID}`}
            checked={isCheckedAll}
          />
          <div onClick={handleShowSub} className="head_action">
            <Title Tag="h4">{nameBD}</Title>
            {indexOpen?.includes(index) ? <Up /> : <Down />}
            {/*<Arrow />*/}
          </div>
        </div>
      </div>
      <div className="drop_body">
        {sourceFields.map(({ name, id }) => {
          return (
            <CheckBox
              key={uuid()}
              error={checkBoxError}
              onChange={handleChangeCheckBox}
              name={id}
              checked={checkedValues?.find((e) => e.fieldId === id)}
              title={name}
              id={`${fieldId}${id}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AccessLevelsDrop;
