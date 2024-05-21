import React, { useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import ReactDOMServer from "react-dom/server";
import moment from "moment/moment";
import store from "store";
import { toast } from "sonner";
import ExportHtml from "components/app/ui/ExportHtml";
import { downloadHtmlFile, createHtmlFile } from "./helpers";
import { getPassengers, mergeAnkets } from "store/thunks/searchThunks";
import { deleteBookmarkFolder } from "store/thunks/foldersThunks";
import {
  normalizeSpaces,
  parseContacts,
  removeAllSpecialCharacters,
  removeEmptyKeys,
  removeEmptyValues,
} from "libs/parseApi";
import { convertImageToBase64 } from "libs/convertImageToBase64";
import { searchActions } from "store/searchSlice";
import { getFieldName } from "libs/fieldNames";
import { useUserCredits } from "../useUserCredits";
import { subtractUserCredits } from "store/thunks/usersThunks";
import { js2xml } from "xml-js";

export const useDetailsFunctions = (id, source, slug) => {
  const dispatch = useDispatch();
  const { shouldCallFunctions } = useUserCredits();
  const [findCloneImages, setFindCloneImages] = useState(null);
  const [tineyeImages, setTineyeImages] = useState(null);
  const [leakCheckValues, setLeakCheckValues] = useState(null);
  const [fullAnketData, setFullAnketData] = useState(null);
  const [customModalData, setCustomModalData] = useState(null);
  const [checkSimilarityImages, setCheckSimilarityImages] = useState(null);
  const { anketIdsArray, mergedParams } = useSelector((state) => state.search);

  const getAllPhonesFromAnket = (data) => {
    return [
      ...new Set(
        parseContacts([
          ...(Array.isArray(data?.phone)
            ? data.phone.map((item) => item.value)
            : [data?.phone]),
          ...(Array.isArray(data?.beelinePhones)
            ? data.beelinePhones
            : [data?.beelinePhones]),
          ...(Array.isArray(data?.work_phone)
            ? data.work_phone
            : [data?.work_phone]),
          ...(Array.isArray(data?.phone_home)
            ? data.phone_home
            : [data?.phone_home]),
        ])
          ?.phones.flat()
          .filter(Boolean),
      ),
    ];
  };
  const generateFileNameFromAnketData = async (data, currentSource) => {
    const egronName = data.cadNumber ? `cad_number${data.cadNumber}` : null;
    const nameSirenaTrain = data?.sirenaTrainTicketInfo?.find(
      ({ regnum }) => regnum,
    )?.regnum;
    const nameFromTGInsigth = data?.telegramData?.[0]?.input || "";
    const nameFromAuto =
      data?.newAuto?.map(({ userInfo, autoInfo, owners }) => {
        if (owners && owners?.length) {
          return `${owners[0]?.lastname}-${owners[0]?.firstname}-${owners[0]?.patronymic}`;
        }
        if (userInfo && userInfo?.length) {
          return `${userInfo[0]?.lastname}-${userInfo[0]?.first_name}-${userInfo[0]?.patronymic}`;
        }
        if (autoInfo && autoInfo?.length) {
          return `${
            autoInfo[0]?.vin
              ? `vin-${autoInfo[0]?.vin}`
              : autoInfo[0]?.license_plate
              ? `номер-${autoInfo[0]?.license_plate}`
              : "exportHTML"
          }`;
        }
      }) || [];
    const nameFromOldAuto =
      data?.autoArray?.map(({ plateNumber, phone }) => {
        if (plateNumber) {
          return `номер-${plateNumber}`;
        }
        if (!plateNumber) {
          return `phone-${phone}`;
        }
      }) || [];
    const lastname = data?.lastname || null;
    const firstname = data?.firstname || null;
    const patronymic = data?.patronymic || null;
    const nameStr = `${lastname ?? ""}-${firstname ?? ""}-${patronymic ?? ""}`;
    const name =
      (nameStr !== "--" ? nameStr : null) ||
      data?.fio ||
      data?.name ||
      (data?.phone
        ? `phone-${
            Array.isArray(data?.phone)
              ? data?.phone[0].value || data?.phone[0]
              : data?.phone
          }`
        : null) ||
      (data?.email
        ? `email-${
            Array.isArray(data?.email)
              ? data?.email[0]?.value || data?.email[0]
              : data?.email
          }`
        : null);
    const newFileName =
      name ||
      nameFromTGInsigth ||
      nameFromAuto[0] ||
      nameFromOldAuto[0] ||
      egronName ||
      nameSirenaTrain;

    return `${currentSource}-${newFileName}`;
  };
  function handleExportXML(profile, sourceId) {
    if (!shouldCallFunctions?.export) {
      return toast.error("Недостаточно кредитов для експорта XML", {
        description: "Обратитесь к администратору",
      });
    }
    const clearedEmpty = removeEmptyValues(profile);
    const options = {
      compact: true,
      ignoreComment: true,
      spaces: 4,
    };
    const fileName = `export-xml-${moment
      .utc()
      .local()
      .format("YYYY-MM-DD HH:mm:ss")}.xml`;
    const xmlData = js2xml({ user: clearedEmpty }, options);

    // Create a download link
    const blob = new Blob([xmlData], { type: "text/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    dispatch(
      subtractUserCredits({
        creditsPayload: {
          data: [
            {
              type: "export",
              count: 1,
            },
          ],
        },
        logsPayload: {
          type: "export",
          name: "Експорт XML",
          data: [
            {
              anketId: Number(profile?.id),
              sourceId: Number(sourceId),
              sourceNameId: source,
            },
          ],
        },
      }),
    );
  }

  const handleExportHtml = async (data, title, isDownload = true, sourceId) => {
    if (!shouldCallFunctions?.export) {
      return toast.error("Недостаточно кредитов для експорта HTML", {
        description: "Обратитесь к администратору",
      });
    }
    const newFileName =
      (await generateFileNameFromAnketData(data, source)) || title;
    const fileName = `${newFileName}-${moment
      .utc()
      .local()
      .format("YYYY-MM-DD")}.html`;
    const htmlString = ReactDOMServer.renderToStaticMarkup(
      <Provider store={store}>
        <ExportHtml source={source} data={data} />
      </Provider>,
    );
    if (isDownload) {
      downloadHtmlFile(fileName, htmlString, newFileName || title);
      dispatch(
        subtractUserCredits({
          creditsPayload: {
            data: [
              {
                type: "export",
                count: 1,
              },
            ],
          },
          logsPayload: {
            type: "export",
            name: "Експорт Html",
            data: [
              {
                anketId: Number(data?.id),
                sourceId: Number(sourceId),
                sourceNameId: source,
              },
            ],
          },
        }),
      );
    } else {
      return htmlString;
    }
  };

  const handleMergeAnkets = () => {
    if (!shouldCallFunctions?.merge) {
      return toast.error("Недостаточно кредитов для Поиска в других базах ", {
        description: "Обратитесь к администратору",
      });
    }
    const mainObject = mergedParams
      ? mergedParams
      : {
          email: [],
          phone: [],
          inn: [],
          snils: [],
          fio: [],
          vin: [],
          plateNumbers: [],
          gemoOrderIds: [],
          documentNumbers: [],
          estateIds: [],
        };
    const data = {
      anketId: id.toString(),
      anketIds: anketIdsArray || [],
      sourceId: +slug,
      id: id.toString(),
      ...mainObject,
    };
    dispatch(searchActions.setLoading(true));
    dispatch(mergeAnkets({ data: data })).then((res) => {
      dispatch(searchActions.setLoading(false));
      res.payload &&
        dispatch(
          subtractUserCredits({
            creditsPayload: {
              data: [
                {
                  type: "merge",
                  count: 1,
                },
              ],
            },
            logsPayload: {
              type: "merge",
              name: "Поиск в других базах",
              data: [
                {
                  anketId: Number(id),
                  sourceId: Number(slug),
                  sourceNameId: source,
                },
              ],
            },
          }),
        );
    });
  };

  const handleGetAllPassengers = async (id, title) => {
    await dispatch(getPassengers(id?.toString())).then((res) => {
      if (res?.payload?.data?.length) {
        const updatePassengers = {
          passengers:
            res?.payload?.data.map((pass) => {
              const copy = { ...pass };
              delete copy.class;

              return {
                ...copy,
                arrival_point: normalizeSpaces(copy?.arrival_point),
                categoryFly: pass?.class,
                departure_point: normalizeSpaces(copy?.departure_point),
              };
            }) || [],
        };
        handleExportHtml(updatePassengers, title);
      } else {
        toast.info("Пасажиров не найдено");
      }
    });
  };

  const handleSplitImages = (anket, setImageFunction) => {
    const images = [];

    if (anket?.bindedPhotos) {
      images.push(...anket?.bindedPhotos);
    }

    if (anket.deliveryAvatar) {
      toast.info("Конвертируем все фото в нужный формат, ожидайте");
      if (Array.isArray(anket?.deliveryAvatar)) {
        dispatch(searchActions.setLoading(true));
        const conversionPromises = anket.deliveryAvatar.map((item) =>
          convertImageToBase64(item),
        );

        Promise.all(conversionPromises)
          .then((base64Images) => {
            images.push(...base64Images);
            setImageFunction(images);
          })
          .catch((error) => {
            toast.error("Что-то пошло не так, попробуйте снова", {
              description:
                "Возможно необходимо включить VPN для конвертации фото",
            });
          })
          .finally(() => {
            dispatch(searchActions.setLoading(false));
          });
      } else {
        dispatch(searchActions.setLoading(true));

        convertImageToBase64(anket?.deliveryAvatar)
          .then((base64) => {
            images.push(base64);
            setImageFunction(images);
          })
          .catch((error) => {
            toast.error("Что-то пошло не так, попробуйте снова", {
              description:
                "Возможно необходимо включить VPN для конвертации фото",
            });
          })
          .finally(() => {
            dispatch(searchActions.setLoading(false));
          });
      }
    }

    if (
      anket?.photos?.avatars?.length ||
      anket?.photos?.displayPhotos?.length
    ) {
      images.push(...anket?.photos?.avatars);
      images.push(...anket?.photos?.displayPhotos);
      setImageFunction(images);
    }
  };

  const handleFindClone = (anket) => {
    if (!shouldCallFunctions?.api) {
      return toast.error("Недостаточно кредитов для использования FindClone", {
        description: "Обратитесь к администратору",
      });
    }

    handleSplitImages(anket, setFindCloneImages);
  };

  const handleTineye = (anket) => {
    if (!shouldCallFunctions?.api) {
      return toast.error("Недостаточно кредитов для использования Tineye", {
        description: "Обратитесь к администратору",
      });
    }

    handleSplitImages(anket, setTineyeImages);
  };

  const handleCheckSimilarity = (anket) => {
    handleSplitImages(anket, setCheckSimilarityImages);
  };

  const handleLeakCheck = (anket) => {
    if (!shouldCallFunctions?.api) {
      return toast.error("Недостаточно кредитов для использования LeakCheck", {
        description: "Обратитесь к администратору",
      });
    }
    const results = [];
    const phones = new Set(
      parseContacts([
        ...(Array.isArray(anket?.phone)
          ? anket.phone.map((item) => item.value)
          : [anket?.phone]),
        ...(Array.isArray(anket?.beelinePhones)
          ? anket.beelinePhones
          : [anket?.beelinePhones]),
        ...(Array.isArray(anket?.work_phone)
          ? anket.work_phone
          : [anket?.work_phone]),
        ...(Array.isArray(anket?.phone_home)
          ? anket.phone_home
          : [anket?.phone_home]),
      ])
        ?.phones.flat()
        .filter(Boolean),
    );
    if (phones) {
      phones.forEach((ph) => {
        results.push({
          type: "PHONE",
          value: removeAllSpecialCharacters(ph),
        });
      });
      setLeakCheckValues(results);
    }
    if (anket?.email && anket.email !== "") {
      if (Array.isArray(anket?.email)) {
        anket?.email.forEach((em) => {
          results.push({
            type: "EMAIL",
            value: em.value,
          });
        });
      } else {
        results.push({
          type: "EMAIL",
          value: anket?.email,
        });
      }
      setLeakCheckValues(results);
    }
  };
  const handleDeleteAnketFromFolder = (value) => {
    const folderId = value;
    const bookmarkId = id;
    dispatch(deleteBookmarkFolder({ folderId, bookmarkId, sourceID: slug }));
  };
  const handleOpenCustomModal = (data) => {
    setFullAnketData(data);
    const removeEmptyValues = removeEmptyKeys(data);
    const keysArray = Object.keys(removeEmptyValues).filter(
      (key) => key !== "id",
    );
    const withNames = getFieldName(keysArray);
    setCustomModalData(withNames);
  };
  return {
    generateFileNameFromAnketData,
    createHtmlFile,
    handleOpenCustomModal,
    handleDeleteAnketFromFolder,
    handleExportXML,
    handleFindClone,
    handleTineye,
    handleCheckSimilarity,
    handleExportHtml,
    handleGetAllPassengers,
    handleMergeAnkets,
    handleLeakCheck,
    getAllPhonesFromAnket,
    findCloneImages,
    setFindCloneImages,
    tineyeImages,
    setTineyeImages,
    checkSimilarityImages,
    setCheckSimilarityImages,
    leakCheckValues,
    setLeakCheckValues,
    fullAnketData,
    setFullAnketData,
    customModalData,
    setCustomModalData,
    // Some data or functions
  };
};
