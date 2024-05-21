import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { ReactComponent as Cancel } from "assets/images/cancel.svg";
import "./index.scss";
import Button from "components/app/use/Button";
import Wrapper from "layouts/Wrapper";
import { updateSettings } from "store/thunks/settingsApiThunks";
import { ThemeContext } from "store/context/themeContextProvider";
import { useModal } from "store/context/ModalContext";
import { Field as FormikField, Formik, FieldArray } from "formik";
import Accordion from "components/app/base/Accordion";
import Field from "components/app/input/Field";
import { ReactComponent as Save } from "assets/images/save_icon.svg";
import { ReactComponent as Info } from "assets/images/info.svg";
import { settingsApiSchema } from "libs/schemas";
import ExpandCards from "components/app/base/ExpandCards";
import Title from "components/app/use/Title";
import Card from "components/app/base/Card";
import { Tooltip as ReactTooltip } from "react-tooltip";
import ReactDOMServer from "react-dom/server";
import { v4 as uuid } from "uuid";

const MyInput = ({ field, form, ...props }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <Field className="" {...field} {...form} {...props}>
      <>
        <span
          className="info_tooltip_wrapper"
          data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
            <div>
              <span>{props.description}</span>
            </div>,
          )}
          data-tooltip-id="api_desc-tooltip"
        >
          <Info
            className={`info_field ${isDarkTheme ? "" : "info_field_light"}`}
          />
        </span>
      </>
    </Field>
  );
};

const SettingsApiList = ({ settingsApi }) => {
  const dispatch = useDispatch();
  const { isDarkTheme } = useContext(ThemeContext);
  const { openModal } = useModal();
  return (
    <>
      <Formik
        initialValues={{ settings: settingsApi }}
        validationSchema={settingsApiSchema}
        onSubmit={async (values, submitProps) => {
          const variables = values.settings.flatMap(({ variables }) => {
            return variables.map(({ key, value }) => {
              return {
                dotenvKey: key,
                dotenvValue: value,
              };
            });
          });
          await dispatch(
            updateSettings({
              variables: variables,
            }),
          );
        }}
        enableReinitialize={true}
      >
        {(props) => {
          const { values, handleSubmit, resetForm, dirty, errors } = props;
          const handleSaveSettings = () => {
            if (dirty) {
              openModal(
                handleSubmit,
                {},
                {
                  title: "Сохранение изменений",
                  message: "Вы действительно хотите coхранить изменения?",
                  type: "saveEdit",
                },
              );
            }
          };
          const handleCancelEdit = () => {
            if (dirty) {
              openModal(
                resetForm,
                {},
                {
                  title: "Отмена редактирования",
                  message:
                    "Вы действительно хотите отменить редактирование без сохранения изменений?",
                  type: "cancelEdit",
                },
              );
            }
          };

          return (
            <Accordion title="Hастройки API">
              <div className="accordion_content accordion_column">
                <Wrapper className="kermit_settins_api">
                  <form className="settings_form">
                    <div className="form_head">
                      {dirty && (
                        <Button
                          type="button"
                          text="Сохранить изменения"
                          mode="primary"
                          Icon={Save}
                          func={handleSaveSettings}
                          disabled={Object.keys(errors)?.length >= 1}
                        />
                      )}
                      <Button
                        type="button"
                        text="Отменить редактирование"
                        mode="secondary"
                        Icon={Cancel}
                        func={handleCancelEdit}
                      />
                    </div>
                    <ExpandCards>
                      <div className="expand_cards_row  expand_cards_colored_row">
                        <ReactTooltip
                          id="api_desc-tooltip"
                          className={`kermit_tooltip ${
                            isDarkTheme ? "" : "tooltip_light"
                          }`}
                          place="top"
                        />
                        {values?.settings?.map(
                          ({ title, variables }, settingIndex) => {
                            return (
                              <FieldArray name={`settings`} key={uuid()}>
                                <Card>
                                  <div
                                    style={{
                                      display: "grid",
                                      gap: "8px",
                                    }}
                                  >
                                    <Title
                                      Tag="h3"
                                      style={{
                                        justifyContent: "center",
                                        margin: "0 0 15px 0",
                                      }}
                                    >
                                      {title}
                                    </Title>
                                    {variables.map(
                                      ({ description, key, value }, index) => {
                                        return (
                                          <div
                                            className="details_div"
                                            key={uuid()}
                                          >
                                            <FormikField
                                              id={`variables-${key}`}
                                              name={`settings[${settingIndex}].variables[${index}].value`}
                                              component={MyInput}
                                              label={key}
                                              description={description}
                                              error={
                                                errors?.settings?.length &&
                                                errors?.settings?.[settingIndex]
                                                  ?.variables?.[index]?.value
                                              }
                                            />
                                          </div>
                                        );
                                      },
                                    )}
                                  </div>
                                </Card>
                              </FieldArray>
                            );
                          },
                        )}
                      </div>
                    </ExpandCards>
                  </form>
                </Wrapper>
              </div>
            </Accordion>
          );
        }}
      </Formik>
    </>
  );
};

export default SettingsApiList;
