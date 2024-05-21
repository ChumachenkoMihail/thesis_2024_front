import { useFormik } from "formik";
import { updateUserCreditsSchema } from "libs/schemas";
import { updateUserCredits } from "store/thunks/usersThunks";
import { useDispatch } from "react-redux";
import Button from "components/app/use/Button";
import Field from "components/app/input/Field";

const EditUserCredits = ({ cancel, selectedCredit, userId }) => {
  const dispatch = useDispatch();
  const { handleSubmit, values, handleChange, errors } = useFormik({
    initialValues: {
      [selectedCredit.creditName]: selectedCredit?.creditCount,
    },
    enableReinitialize: true,
    validationSchema: updateUserCreditsSchema(selectedCredit.creditName),
    onSubmit: (values) => {
      const val = {
        userId: Number(userId),
        credits: {
          [selectedCredit.creditName]: Number(
            values[selectedCredit.creditName],
          ),
        },
      };
      dispatch(updateUserCredits(val));
      cancel();
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <Field
        label="Количество добавляемых кредитов (“-1” для бесконечных кредитов)"
        placeholder="1000"
        name={selectedCredit?.creditName}
        value={values[selectedCredit?.creditName]}
        onChange={handleChange}
        error={errors[selectedCredit?.creditName]}
      />
      <div className="modal_action">
        <Button mode="secondary" text="Отмена" func={cancel} />

        <Button mode="primary" text="Сохранить" type="submit" />
      </div>
    </form>
  );
};

export default EditUserCredits;
