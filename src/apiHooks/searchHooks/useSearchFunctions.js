import JSZip from "jszip";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import moment from "moment/moment";
import { getAnketById, mergeAnkets } from "store/thunks/searchThunks";
import { searchActions } from "store/searchSlice";
import { processObject } from "libs/helpers";
import { useDispatch, useSelector } from "react-redux";
import { useDetailsFunctions } from "../detailsHooks/useDetailsFunctions";
import { getUniqueRelativies } from "libs/getUniqueRelativies";
import { generateCustomProfileFields } from "libs/generateCustomProfileFields";
import {
  addDataToAnket,
  createNewCustomAnket,
} from "store/thunks/customProfileThunks";
import { useUserCredits } from "../useUserCredits";
import { subtractUserCredits } from "store/thunks/usersThunks";
import useWatchedProfiles from "../useWatchedProfiles";
import { globalActions } from "../../store/globalSlice";

export const useSearchFunctions = (sourceID, location, sourceNameId) => {
  const { historyResults } = useSelector((state) => state.history);
  const dispatch = useDispatch();
  const { shouldCallFunctions, userCredits } = useUserCredits();
  const { addProfiles, checkProfiles } = useWatchedProfiles();

  const { handleExportHtml, createHtmlFile, generateFileNameFromAnketData } =
    useDetailsFunctions(1, sourceID, "test");

  const handleDownloadZip = async (htmlFiles, ankets) => {
    // Create a zip file containing multiple HTML files
    if (!htmlFiles.length) {
      return toast.error("Ошибка генерации zip", {
        description: "Файлы не были созданы, архив пуст",
      });
    }
    const zip = new JSZip();
    htmlFiles?.forEach(({ file, fileName }, index) => {
      zip.file(`${index}${fileName || "file"``}.html`, file);
    });

    // Generate the zip file content
    zip.generateAsync({ type: "blob" }).then((blob) => {
      // Trigger the download using file-saver
      saveAs(blob, `${moment.utc().local().format("YYYY-MM-DD HH:mm:ss")}.zip`);
    });

    toast.info("Генерация zip архива завершена", {
      description: "Проверьте загрузки",
    });
    dispatch(
      subtractUserCredits({
        creditsPayload: {
          data: [
            {
              type: "export",
              count: htmlFiles?.length,
            },
            {
              type: "merge",
              count: htmlFiles?.length * 2,
            },
          ],
        },
        logsPayload: {
          type: "export",
          name: "Експорт HTML(zip)",
          data: ankets?.map(({ id }) => ({
            anketId: Number(id),
            sourceId: Number(sourceID),
            sourceNameId: sourceNameId,
          })),
        },
      }),
    );
  };

  const handleBulkHtml = async (data, clearSelected) => {
    if (
      userCredits?.anketDetail !== -1 &&
      data?.length > userCredits?.anketDetail &&
      shouldCallFunctions.anketDetail
    ) {
      return toast.error(
        `Недостаточно кредитов просмотра анкет, необходимо больше ${data?.length}`,
        {
          description: "Обратитесь к администратору",
        },
      );
    }
    if (
      userCredits?.merge !== -1 &&
      data?.length > userCredits?.merge &&
      shouldCallFunctions.anketDetail
    ) {
      return toast.error(
        `Недостаточно кредитов, необходимо больше ${data?.length}`,
        {
          description: "Обратитесь к администратору",
        },
      );
    }
    if (!shouldCallFunctions.anketDetail || !shouldCallFunctions.merge) {
      return toast.error(`Недостаточно кредитов`, {
        description: "Обратитесь к администратору",
      });
    }
    if (userCredits?.merge !== -1 && userCredits?.merge < data?.length * 2) {
      /// because we have double mergeUtils in this functional
      return toast.error(
        `Недостаточно кредитов мерджа, необходимо х2 от к-ва отмеченных анкет`,
        {
          description: "Обратитесь к администратору",
        },
      );
    }
    toast.info("Генерация zip архива запущена", {
      description: "Ожидайте скаченный файл",
    });

    async function executeFunctions(array) {
      const readyHtmlToDownload = [];
      const doubleMergedAnkets = [];
      try {
        dispatch(globalActions.setLoading(true));
        for await (const item of array) {
          const getById = await dispatch(
            getAnketById({
              id: item.id,
              sourceID: sourceID,
              sourceName: historyResults.sourceNameId,
            }),
          );
          const firstMerge = await dispatch(
            mergeAnkets({
              data: {
                anketId: item.id.toString(),
                sourceId: +sourceID,
                email: [],
                phone: [],
                inn: [],
                snils: [],
                fio: [],
                vin: [],
                plateNumbers: [],
                gemoOrderIds: [],
                documentNumbers: [],
                id: item.id.toString(),
                anketIds: [],
                estateIds: [],
              },
              showNotification: false,
            }),
          );
          if (firstMerge.payload && typeof firstMerge.payload !== "string") {
            const secondMerge = await dispatch(
              mergeAnkets({
                data: {
                  anketId: item.id.toString(),
                  sourceId: +sourceID,
                  anketIds: firstMerge?.payload?.anketIds,
                  ...firstMerge?.payload?.params,
                  id: item.id.toString(),
                },
                showNotification: false,
              }),
            );
            if (
              secondMerge.payload &&
              typeof secondMerge.payload !== "string"
            ) {
              doubleMergedAnkets.push(secondMerge?.payload?.updatedAnketData);
              dispatch(searchActions.clearAnketData(null));
            } else {
              doubleMergedAnkets.push(firstMerge?.payload?.updatedAnketData);
            }
          } else {
            doubleMergedAnkets.push(getById?.payload?.anketData?.anket);
          }
          if (doubleMergedAnkets?.length === data?.length) {
            await Promise.all(
              doubleMergedAnkets?.map(async (mergedAnket) => {
                await handleExportHtml(mergedAnket, null, false).then(
                  async (htmlStr) => {
                    const fileName = await generateFileNameFromAnketData(
                      mergedAnket,
                      sourceNameId,
                    );
                    readyHtmlToDownload.push({
                      file: createHtmlFile(htmlStr),
                      fileName: fileName,
                    });
                  },
                );
              }),
            );
            await handleDownloadZip(readyHtmlToDownload, data);
            clearSelected(false);

            dispatch(searchActions.clearAnketData(null));
          }
        }
      } catch (err) {
        clearSelected(false);
        toast.warning("Ошибка генерации архива");
        console.log(err, "error bulk ZIP download");
      } finally {
        dispatch(searchActions.clearAnketData(null));
        dispatch(globalActions.setLoading(false));
      }
    }
    executeFunctions(data);
  };

  const handleBulkCustomCreate = async (data, clearSelected) => {
    if (
      userCredits?.anketDetail !== -1 &&
      data?.length > userCredits?.anketDetail &&
      shouldCallFunctions.anketDetail
    ) {
      return toast.error(
        `Недостаточно кредитов просмотра анкет, необходимо больше ${data?.length}`,
        {
          description: "Обратитесь к администратору",
        },
      );
    }
    if (!shouldCallFunctions.anketDetail) {
      return toast.error(
        `Недостаточно кредитов просмотра анкет необходимо больше ${data?.length}`,
        {
          description: "Обратитесь к администратору",
        },
      );
    }
    const allAnketIds = data.map(({ id }) => id);
    /// get all details of ankets
    const modifiedAnkets = [];
    await Promise.all(
      allAnketIds.map((id) =>
        dispatch(
          getAnketById({
            id,
            sourceID: sourceID,
            sourceName: historyResults.sourceNameId,
          }),
        ),
      ),
    ).then(async (data) => {
      data?.map((item) => {
        /// modify all ankets to view like for details page
        modifiedAnkets.push(item?.payload);
      });
    });

    const merge = modifiedAnkets?.map((item) => item?.anketData?.anket); /// get all ankets
    await processObject({}, merge, dispatch)?.then(async (splitedData) => {
      const update = { ...splitedData };
      merge.forEach((item) => {
        /// mergeUtils all arrays to one from ankets
        if (item?.alfa?.length) {
          update.alfa = [...(update?.alfa || []), ...(item?.alfa || [])];
        }
        if (item?.estates?.length) {
          update.estates = [...(update.estates || []), ...(item.estates || [])];
        }
        if (item?.mtsBank?.length) {
          update.mtsBank = [...(update.mtsBank || []), ...(item.mtsBank || [])];
        }
        if (item?.relationships?.length) {
          const uniqueRelationships = getUniqueRelativies([
            ...(update.relationships || []),
            ...(item?.relationships || []),
          ]);
          update.relationships = uniqueRelationships || [];
        }
        if (item?.sirenaPassenger?.length) {
          update.sirenaPassenger = [
            ...(update?.sirenaPassenger || []),
            ...(item?.sirenaPassenger || []),
          ];
        }
        if (item?.sirenaInsuranceInfo?.length) {
          update.sirenaInsuranceInfo = [
            ...(update.sirenaInsuranceInfo || []),
            ...(item?.sirenaInsuranceInfo || []),
          ];
        }
        if (item?.sirenaTrainTicketInfo?.length) {
          update.sirenaTrainTicketInfo = [
            ...(update?.sirenaTrainTicketInfo || []),
            ...(item?.sirenaTrainTicketInfo || []),
          ];
        }
        if (item?.sirenaTicketInfo?.length) {
          update.sirenaTicketInfo = [
            ...(update?.sirenaTicketInfo || []),
            ...(item?.sirenaTicketInfo || []),
          ];
        }
        if (item?.newAuto?.length) {
          update.newAuto = [...(update.newAuto || []), ...(item.newAuto || [])];
        }
        if (item?.auto?.length) {
          update.auto = [...(update.auto || []), ...(item.auto || [])];
        }
        if (item?.cdek?.length) {
          update.cdek = [...(update.cdek || []), ...(item.cdek || [])];
        }
        if (item?.foreignPassport?.length) {
          update.foreignPassport = [
            ...(update?.foreignPassport || []),
            ...(item.foreignPassport || []),
          ];
        }
      });
      const extractedValues = generateCustomProfileFields(
        Object.keys(update),
        update,
      );

      ///create new custom
      await dispatch(
        createNewCustomAnket({
          name: `${historyResults.sourceName}-${historyResults?.historyName}`,
        }),
      ).then(async (newCustomAnket) => {
        // update created custom with data

        dispatch(
          addDataToAnket({
            id: newCustomAnket?.payload?.id,
            data: extractedValues,
          }),
        );
        const filterByWatched = data?.filter((item) => {
          const exist = checkProfiles(sourceID, item.id);
          if (!exist) {
            return item;
          }
        }); ///set to substruct credits only not watched ankets
        if (newCustomAnket?.payload?.id) {
          dispatch(
            subtractUserCredits({
              creditsPayload: {
                data: [
                  {
                    type: "anketDetail",
                    count: filterByWatched?.length,
                  },
                ],
              },
              logsPayload: {
                type: "anketDetail",
                name: "Просмотр анкеты",
                data: data.map(({ id }) => {
                  return {
                    anketId: Number(id),
                    sourceId: Number(sourceID),
                    sourceNameId: sourceNameId,
                  };
                }),
              },
            }),
          );
          data.forEach((item) => {
            addProfiles(sourceID, item?.id);
          });
        }
        clearSelected(false); // clear selected columns
      });
    }); /// mergeUtils string to array from all ankets
  };
  return {
    handleBulkHtml,
    handleBulkCustomCreate,
  };
};
