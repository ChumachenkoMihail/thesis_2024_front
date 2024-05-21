import CheckBox from "components/app/input/CheckBox";
import { v4 as uuid } from "uuid";
import "./index.scss";
import { useState } from "react";
import Button from "components/app/use/Button";
import { useDispatch } from "react-redux";
import { leakCheck } from "store/thunks/outsideApiThunks";
import Title from "components/app/use/Title";
import { toast } from "sonner";
import { useUserCredits } from "apiHooks/useUserCredits";
const LeakCheckList = ({ data, cancel, loading }) => {
  const { userCredits } = useUserCredits();
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState([]);
  const handleChange = (e, type) => {
    const target = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedValue((prev) => [
        ...prev,
        {
          type: type,
          value: target,
        },
      ]);
    } else {
      setSelectedValue(
        selectedValue.filter(
          (item) => item.value.toString() !== target.toString(),
        ),
      );
    }
  };
  const handleSearchLeak = async () => {
    if (userCredits?.api !== -1 && userCredits.api < selectedValue.length) {
      return toast.error(
        `Недостаточно кредитов для использование LeakCheck, необходимо больше ${selectedValue?.length}`,
        {
          description: "Обратитесь к администратору",
        },
      );
    }
    await Promise.all(
      selectedValue.map((item) =>
        dispatch(leakCheck(item)).then((data) => {
          return data.payload;
        }),
      ),
    )
      .then((data) => {
        const hasData = data
          .flatMap((item) => {
            return item?.flatMap((i) => i?.result);
          })
          .filter(Boolean);
        hasData?.length &&
          toast.info(`Найдено ${hasData?.length} записей в Leak Check`);
        !hasData?.length && toast.info(`Записей в Leak Check не найдено  `);
      })
      .catch((err) => {
        console.log(err, "er");
      });
  };
  const handleCheckedAll = (e) => {
    e.stopPropagation();
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedValue(data);
    } else {
      setSelectedValue([]);
    }
  };
  return (
    <>
      <Title Tag="h4">Выберите данные для поиска</Title>
      <div className="leak_check_list">
        {data.length > 1 ? (
          <CheckBox
            checkedAll
            onChange={(e) => handleCheckedAll(e)}
            name={`all`}
            title="Выбрать  все"
            checked={selectedValue?.length === data?.length}
          />
        ) : null}
        {data.map(({ type, value }) => {
          return (
            <CheckBox
              key={uuid()}
              onChange={(e) => handleChange(e, type)}
              id={value}
              name={value}
              checked={selectedValue?.find(
                (e) => e.value.toString() === value.toString(),
              )}
              title={value}
            />
          );
        })}
      </div>
      <div className="modal_action">
        <Button mode="secondary" text="Отмена" func={cancel} />
        <Button
          mode="primary"
          disabled={!selectedValue || loading}
          text="Начать поиск"
          type="button"
          func={handleSearchLeak}
        />
      </div>
    </>
  );
};

export default LeakCheckList;
