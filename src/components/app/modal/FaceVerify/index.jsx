import "./index.scss";
import { useContext, useEffect } from "react";
import { useFormik } from "formik";
import DropZone from "components/app/ui/DropZone";
import Field from "components/app/input/Field";
import Button from "components/app/use/Button";
import Modal from "../../base/Modal";
import { ReactComponent as SearchLoop } from "assets/images/Select/search.svg";
import { ReactComponent as Trash } from "assets/images/trash.svg";
import { ReactComponent as Percent } from "assets/images/percent.svg";
import { ReactComponent as UserPhoto } from "assets/images/user_photo.svg";
import { useSimilarityModal } from "store/context/FaceVerifyContext";
import { convertImageToBase64 } from "libs/convertImageToBase64";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { faceVerify } from "../../../../store/thunks/outsideApiThunks";
import { faceVerifySchema } from "libs/schemas";
import { ThemeContext } from "store/context/themeContextProvider";
import { useLocation } from "react-router-dom";
import Loader from "../../use/Loader";

const FaceVerify = ({ cancel }) => {
  const isDetailsPage = window.location?.pathname.includes("/search/details");
  const dispatch = useDispatch();
  const { isDarkTheme } = useContext(ThemeContext);
  const { checkSimilarityImages } = useSimilarityModal();
  const { verifyValues, loading } = useSelector((state) => state.faceVerify);
  const { values, setErrors, handleSubmit, errors, setFieldValue } = useFormik({
    initialValues: {
      firstPhoto: "",
      secondPhoto: "",
    },
    enableReinitialize: true,
    validationSchema: faceVerifySchema,
    onSubmit: async (values) => {
      if (values.firstPhoto.trim() === values.secondPhoto.trim()) {
        setErrors({ firstPhoto: "Фото не могут совпадать" });
        setErrors({ secondPhoto: "Фото не могут совпадать" });
        return;
      }
      dispatch(
        faceVerify({
          photo_source: values.firstPhoto,
          photo_target: values.secondPhoto,
        }),
      );
    },
  });
  const handleDropImage = (img, field) => {
    setFieldValue(field, img);
  };

  const handleSelectImage = (image) => {
    if (values.firstPhoto && values.secondPhoto) return;

    if (values.firstPhoto) setFieldValue("secondPhoto", image);
    if (values.secondPhoto) setFieldValue("firstPhoto", image);
    if (!values.secondPhoto && !values.firstPhoto)
      setFieldValue("firstPhoto", image);
  };

  const handleImageUrl = async (url, name) => {
    await convertImageToBase64(url).then((base) => {
      setFieldValue(name, base);
    });
  };

  return (
    <>
      {loading && <Loader />}
      <Modal
        width="900"
        title="Сравнение людей на фото"
        Icon={UserPhoto}
        closeModal={cancel}
      >
        <form
          className={`search_form ${isDarkTheme ? "" : "search_form_light"}`}
          onSubmit={handleSubmit}
        >
          <div
            className={`face-verify_wrapper ${
              isDarkTheme ? "" : "face-verify_wrapper_light"
            }`}
          >
            <div className="face-verify_row">
              <div className="face-verify_column">
                <div className="face-verify_title">Фото 1</div>
                <Field
                  label="Ссылка на изображение"
                  placeholder="Вставьте ссылку сюда"
                  value={values.firstPhoto}
                  onChange={(e) => handleImageUrl(e.target.value, "firstPhoto")}
                  error={errors.firstPhoto}
                  name="firstPhoto"
                >
                  {values.firstPhoto && (
                    <Trash
                      className="remove_svg"
                      onClick={() => setFieldValue("firstPhoto", "")}
                    />
                  )}
                </Field>
                <DropZone
                  isDarkTheme={isDarkTheme}
                  dropped={values?.firstPhoto}
                  setDropped={(img) => handleDropImage(img, "firstPhoto")}
                  title="Фото человека"
                />
              </div>
              <div className="hr" />
              <div className="face-verify_column">
                <div className="face-verify_title">Фото 2</div>
                <Field
                  label="Ссылка на изображение"
                  placeholder="Вставьте ссылку сюда"
                  value={values.secondPhoto}
                  onChange={(e) =>
                    handleImageUrl(e.target.value, "secondPhoto")
                  }
                  error={errors.secondPhoto}
                  name="secondPhoto"
                >
                  {values.secondPhoto && (
                    <Trash
                      className="remove_svg"
                      onClick={() => setFieldValue("secondPhoto", "")}
                    />
                  )}
                </Field>
                <DropZone
                  isDarkTheme={isDarkTheme}
                  dropped={values?.secondPhoto}
                  setDropped={(img) => handleDropImage(img, "secondPhoto")}
                  title="Фото человека"
                />
              </div>
            </div>
            <div className="face-verify_info">
              <div className="face-verify_info_title">
                <Percent />
                Процент схожести
              </div>
              <div className="face-verify_info_row">
                <div>
                  <div className="face-verify_info_label">
                    Amazon Rekognition
                  </div>
                  <div className="face-verify_info_value">
                    {verifyValues?.amazon_similarity || 0} %
                  </div>
                </div>
                <div>
                  <div className="face-verify_info_label">
                    InsightFace Rekognition
                  </div>
                  <div className="face-verify_info_value">
                    {verifyValues?.insightface_similarity || 0} %
                  </div>
                </div>
              </div>
            </div>
            {checkSimilarityImages?.length && isDetailsPage ? (
              <div className="face-verify_photo_wrapper">
                <div className="face-verify_text">
                  или выберите <span>2 фото</span> из анкеты
                </div>
                <div className="face-verify_photos">
                  {checkSimilarityImages?.map((image) => (
                    <div
                      key={uuid()}
                      className={`face-verify_image ${
                        values.secondPhoto === image ||
                        values.firstPhoto === image
                          ? "isSelected"
                          : ""
                      }`}
                      onClick={() => handleSelectImage(image)}
                    >
                      <img src={`data:image/png;base64, ${image}`} alt="" />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <div className="face-verify_button">
            <Button type="submit" Icon={SearchLoop} text="Сравнить" />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default FaceVerify;
