import { useFormik } from "formik";
import { v4 as uuid } from "uuid";
import Button from "components/app/use/Button";
import { useDispatch, useSelector } from "react-redux";
import { createApiCall } from "store/thunks/apiCallThunk";
import { apiCallSchema } from "libs/schemas";
import { parseAndValidatePhoneNumber } from "libs/parceAndValidatePhoneNumber";
import RadioButton from "components/app/input/RadioButton";
import "./index.scss";
import Title from "components/app/use/Title";
import Error from "components/app/use/Error";
import ReactSelect from "components/app/input/Select";

const ApiCallModal = ({ cancel, phones, userNames }) => {
  const dispatch = useDispatch();
  const { callCampaignsData } = useSelector((state) => state.apiCall);

  const { handleSubmit, values, setFieldValue, errors } = useFormik({
    initialValues: {
      selectedPhones: [],
      selectedUserNames: [],
    },
    validationSchema: apiCallSchema,
    onSubmit: async (values) => {
      let selectedFio = values.selectedUserNames.length
        ? values.selectedUserNames[0]?.split(" ")
        : "";
      if (values.selectedUserNames[0] === "Безликое обращение") {
        selectedFio = "";
      }
      const selectedData = {
        phoneNumber: parseAndValidatePhoneNumber(
          values.selectedPhones.join(" "),
        ).E164Format,
        campaignId: values.campaignId,
        lastName: selectedFio[0] ?? "",
        firstName: selectedFio[1] ?? "",
        patronymic: selectedFio[2] ?? "",
      };

      dispatch(createApiCall(selectedData));
      cancel();
    },
  });

  const handleRadio = (fieldName, e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setFieldValue(fieldName, [e.target.value]);
    } else {
      setFieldValue(fieldName, null);
    }
  };

  const handleChangeCampaign = (fieldName, value) => {
    setFieldValue(fieldName, value);
  };

  return (
    <form onSubmit={handleSubmit} className="call_form">
      <Title Tag="h4">
        Выберите номер телефона
        {userNames.length ? `, имя пользователя` : null} и сценарий
      </Title>

      <div className="column_grid" style={{ marginBottom: "16px" }}>
        <div className="call_list">
          {phones?.map((item) => {
            return (
              <RadioButton
                key={uuid()}
                onChange={(e) => handleRadio("selectedPhones", e)}
                name={item}
                checked={values.selectedPhones?.includes(item)}
                text={item}
                value={item}
              />
            );
          })}
        </div>
        <div className="call_list">
          {userNames.map((item) => {
            return (
              <RadioButton
                key={uuid()}
                onChange={(e) => handleRadio("selectedUserNames", e)}
                name={item}
                checked={values.selectedUserNames?.includes(item)}
                text={item}
                value={item}
              />
            );
          })}
        </div>
      </div>

      <ReactSelect
        options={callCampaignsData}
        placeholder="Выберите сценарий"
        name="call_campaigns"
        menuPlacement="top"
        value={values.campaignId}
        onChange={(e) => handleChangeCampaign("campaignId", e)}
        error={errors.campaignId}
        label=""
        styleWrapper={{
          width: "50%",
        }}
      />

      <div className="column_grid">
        <div className="action_error" style={{ alignSelf: "flex-end" }}>
          <div>
            {errors.selectedPhones && <Error message={errors.selectedPhones} />}
          </div>
        </div>
        <div className="modal_action">
          <Button mode="secondary" text="Отмена" func={cancel} />
          <Button
            mode="primary"
            disabled={Object.keys(errors).length >= 1}
            text={`Позвонить`}
            type="submit"
          />
        </div>
      </div>
    </form>
  );
};

export default ApiCallModal;
