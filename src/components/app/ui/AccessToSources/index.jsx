import CheckBox from "components/app/input/CheckBox";
import { v4 as uuid } from "uuid";
import { useId } from "react";

const AccessToSources = ({ allDataBasesList, setFieldValue, values }) => {
  const checkboxId = useId();
  const handleCheckbox = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const isChecked = e.target.checked;
    if (isChecked) {
      setFieldValue("availableSources", [
        ...values.availableSources,
        Number(e.target.value),
      ]);
    } else {
      setFieldValue(
        "availableSources",
        values.availableSources.filter(
          (value) => Number(value) !== Number(e.target.value),
        ),
      );
    }
  };

  const handleCheckedAll = (e, fields) => {
    e.stopPropagation();
    const isChecked = e.target.checked;
    if (isChecked) {
      const updateFields = fields?.map((i) => i.id);
      const combinedArray = Array.from(
        new Set([...values.availableSources, ...updateFields]),
      ).map((fieldId) => {
        return [...values.availableSources, ...updateFields].find(
          (obj) => obj === fieldId,
        );
      });

      setFieldValue("availableSources", combinedArray.filter(Boolean));
    } else {
      const filteredIds = values.availableSources.filter(
        (id) => !fields.some((item) => item.id === id),
      );
      setFieldValue("availableSources", filteredIds);
      // setFieldValue("availableSources", values.availableSources.filter((item) => ));
    }
  };

  return (
    <>
      <CheckBox
        checkedAll
        onChange={(e) => handleCheckedAll(e, allDataBasesList)}
        name={`all${allDataBasesList?.length}`}
        checked={allDataBasesList.every((item) =>
          values?.availableSources.includes(item.id),
        )}
        title={"Отметить все"}
      />
      <div className="sources_list">
        {allDataBasesList.map(({ id, name }) => {
          return (
            <CheckBox
              key={uuid()}
              onChange={handleCheckbox}
              name={id}
              id={`${checkboxId}${id}`}
              checked={values.availableSources?.find((e) => e === id)}
              title={name}
            />
          );
        })}
      </div>
    </>
  );
};

export default AccessToSources;
