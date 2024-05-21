import { useFormik } from "formik";
import Button from "components/app/use/Button";
import { useDispatch } from "react-redux";
import { insightSearch } from "store/thunks/outsideApiThunks";
import { telegramSchema } from "libs/schemas";
import CheckBox from "components/app/input/CheckBox";
import { v4 as uuid } from "uuid";
import "./index.scss";
import Title from "components/app/use/Title";
import Error from "components/app/use/Error";
import { toast } from "sonner";
import { searchActions } from "store/searchSlice";
import { useUserCredits } from "apiHooks/useUserCredits";

const TelegramModal = ({ cancel, data }) => {
  const { userCredits } = useUserCredits();
  const dispatch = useDispatch();
  const { handleSubmit, values, setFieldValue, errors } = useFormik({
    initialValues: {
      selectedPhones: [],
    },
    validationSchema: telegramSchema,
    onSubmit: async (values) => {
      if (
        userCredits?.api !== -1 &&
        userCredits.api < values?.selectedPhones?.length
      ) {
        return toast.error(
          `Недостаточно кредитов для использование Telegram, необходимо больше ${values?.selectedPhones?.length}`,
          {
            description: "Обратитесь к администратору",
          },
        );
      }
      dispatch(searchActions.setLoading(true));

      const history = await Promise.allSettled(
        values.selectedPhones.map((phone) =>
          dispatch(
            insightSearch({
              insightInput: phone,
              inputType: "userPhone",
              requestType: "modal",
              createHistoryRecord: false,
            }),
          ),
        ),
      );
      const hasData = history
        .filter((item) => item?.value)
        ?.filter((item) => Array.isArray(item?.value?.payload));
      hasData?.length &&
        toast.info(`Найдено ${hasData?.length} записей в Telegram`, {
          description: "данные в анкете",
        });
      !hasData?.length && toast.info(`Записей в Telegram не найдено  `);
      dispatch(searchActions.setLoading(false));

      cancel();
    },
  });
  const handleCheckbox = (e) => {
    e.stopPropagation();
    const isChecked = e.target.checked;
    if (isChecked) {
      setFieldValue("selectedPhones", [
        ...values.selectedPhones,
        e.target.value,
      ]);
    } else {
      setFieldValue(
        "selectedPhones",
        values.selectedPhones.filter((value) => value !== e.target.value),
      );
    }
  };
  const handleCheckedAll = (e) => {
    e.stopPropagation();
    const isChecked = e.target.checked;
    if (isChecked) {
      setFieldValue("selectedPhones", data);
    } else {
      setFieldValue("selectedPhones", []);
    }
  };
  const checkedAll = [...values?.selectedPhones]?.length;
  return (
    <form onSubmit={handleSubmit}>
      <Title Tag="h4">Выберите один или несколько телефонов для поиска</Title>

      <div className="telegram_phones_list">
        {data?.length > 1 ? (
          <CheckBox
            checkedAll
            onChange={(e) => handleCheckedAll(e)}
            name={`all`}
            title="Выбрать  все"
            checked={checkedAll === data?.length}
          />
        ) : null}

        {data?.map((item) => {
          return (
            <CheckBox
              key={uuid()}
              onChange={handleCheckbox}
              id={item}
              name={item}
              checked={values.selectedPhones?.find((e) => e === item)}
              title={item}
            />
          );
        })}
      </div>
      <div className="column_grid">
        <div className="action_error" style={{ alignSelf: "flex-end" }}>
          {errors.selectedPhones && <Error message={errors.selectedPhones} />}
        </div>
        <div className="modal_action">
          <Button mode="secondary" text="Отмена" func={cancel} />
          <Button
            mode="primary"
            disabled={Object.keys(errors).length >= 1}
            text={`Запустить поиск`}
            type="submit"
          />
        </div>
      </div>
    </form>
  );
};

export default TelegramModal;
