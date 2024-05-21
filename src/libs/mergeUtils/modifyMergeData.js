import { getUniqueAuto } from "libs/removeEmptyAuto";
import { getUniqueCdek } from "libs/removeEmptyCdek";
import { removeEmptyValues } from "libs/parseApi";
import { processObject, splitArrays } from "libs/helpers";
import { getUniqueRelativies } from "libs/getUniqueRelativies";
import { parseJson } from "libs/mergeUtils/parseJson";

export const modifyMergeData = async (currentState, newState, dispatch) => {
  const state = {};
  if (newState.filteredData && newState?.params) {
    /// remove dublicates from  arrays
    const uniqAutoArray = getUniqueAuto(newState.filteredData?.auto);
    const uniqCdekArray = getUniqueCdek(newState.filteredData?.cdek);
    /// end remove dublicates from  arrays

    const {
      microcredit: updateMircoCredit,
      promed: updateProMed,
      new_gos: updateNewGos,
      new_gos_users: updateNewGosUsers,
      pcht: updatePochtaBank,
      sirena_ticket_info: updateSirenaTickets,
      tutu_users: updateTutuUsers,
      mvd: updateMvd,
      vk: updateVk,
      avito: updateAvito,
      alfa: updateAlfa,
      sirena_passenger: updateSirenaPass,
      sirena_ins: updateSirenaIns,
      sirena_train: updateSirenaTrain,
      fssp: updateFssp,
      rostelecom: updateRostelecom,
      beeline: updateBeeline,
      tutu_passengers: updateTutuPassengers,
      egron: updateEgron,
      mts_bank: updateMtsBank,
      dns_shop: updateDnsShop,
      phones: updatePhones,
    } = await parseJson(newState?.filteredData);

    const mergedMedicalOrders = []?.concat(
      ...Object.values(newState.filteredData?.medical?.gemotestOrders || {}),
    );
    const splitArr = [
      newState.filteredData?.ankets || [],
      newState.filteredData?.gos || [],
      updateVk || [],
      updateAvito || [],
      updateProMed || [],
      updateNewGos || [],
      updateMtsBank || [],
      updateNewGosUsers || [],
      updateAlfa || [],
      updateMircoCredit || [],
      newState.filteredData?.mail_ru || [],
      newState.filteredData?.delivery_club || [],
      updateRostelecom || [],
      updateMvd || [],
      updateBeeline || [],
      updateTutuUsers || [],
      updateTutuPassengers || [],
      updatePochtaBank || [],
      updateSirenaPass || [],
      updateSirenaTrain || [],
      updateSirenaTickets || [],
      updateEgron || [],
      updateSirenaIns || [],
      uniqAutoArray || [],
      newState.filteredData?.mts || [],
      newState.filteredData?.youla || [],
      newState.filteredData?.delivery || [],
      uniqCdekArray || [],
      newState.filteredData?.spektr || [],
      updatePhones || [],
      newState.filteredData?.newAuto || [],
      newState.filteredData?.medical?.medical || [],
      updateFssp || [],
      newState.filteredData?.relativies || [],
      newState.filteredData?.pcht_rf_clients || [],
      updateDnsShop || [],
      newState.filteredData?.pcht_rf_empl || [],
    ];
    const emptyRemove = removeEmptyValues(currentState.anketData?.anket) || {};
    const updateState = await processObject(
      emptyRemove,
      splitArr.flat(),
      dispatch,
    );

    if (Object.keys(newState.filteredData?.medical?.gemotestOrders || [])) {
      updateState.gemotestOrders = [
        ...(updateState.gemotestOrders || []),
        ...(mergedMedicalOrders || []),
      ];
    }
    if (newState.filteredData?.alfa?.length) {
      updateState.alfa = [
        ...(currentState.anketData?.anket?.alfa || []),
        ...(updateAlfa || []),
      ];
    }
    if (newState.filteredData?.mts_bank?.length) {
      updateState.mtsBank = [
        ...(currentState.anketData?.anket?.mtsBank || []),
        ...(updateMtsBank.flatMap((item) => item.mtsBank) || []),
      ];
    }
    if (newState.filteredData?.sirena_ins?.length) {
      updateState.sirenaInsuranceInfo = [
        ...(currentState.anketData?.anket?.sirenaInsuranceInfo || []),
        ...(updateSirenaIns || []),
      ];
    }
    if (newState.filteredData?.sirena_passenger?.length) {
      updateState.sirenaPassenger = [
        ...(currentState.anketData?.anket?.sirenaPassenger || []), /// old currentState from anket data
        ...(updateSirenaPass || []), /// new currentState from request
      ];
    }
    if (newState.filteredData?.relativies?.length) {
      const getAllRelationShips = newState.filteredData?.relativies?.flatMap(
        (el) => el.relationships,
      );
      const uniqueRelationships = getUniqueRelativies([
        ...(currentState.anketData?.anket?.relationships || []),
        ...(getAllRelationShips || []),
      ]);
      updateState.relationships = uniqueRelationships || [];
    }
    if (newState.filteredData?.egron?.length) {
      const getAllEstates = new Set(
        (updateEgron || []).flatMap((el) => el?.estates || []),
      );
      const uniqueEstates = [
        ...(currentState.anketData?.anket?.estates || []),
        ...(getAllEstates || []),
      ];
      updateState.estates = [
        ...new Map(uniqueEstates.map((obj) => [obj?.cadNumber, obj])).values(),
      ];
    }
    if (newState.filteredData?.sirena_train?.length) {
      let uniqueTickets = new Map();
      [
        ...(currentState.anketData?.anket?.sirenaTrainTicketInfo || []),
        ...(updateSirenaTrain.flatMap((item) => item.sirenaTrainTicketInfo) ||
          []),
      ].forEach((item) => {
        if (!uniqueTickets.has(item?.regnum)) {
          uniqueTickets.set(item?.regnum, item);
        }
      });
      updateState.sirenaTrainTicketInfo = Array.from(uniqueTickets.values());
    }
    if (newState.filteredData?.sirena_ticket_info?.length) {
      updateState.sirenaTicketInfo = [
        ...(currentState.anketData?.anket?.sirenaTicketInfo || []),
        ...(updateSirenaTickets || []),
      ];
    }
    if (newState.filteredData?.newAuto?.length) {
      updateState.newAuto = [
        ...(currentState.anketData?.anket?.newAuto || []),
        ...(newState.filteredData?.newAuto || []),
      ];
    }

    if (newState.filteredData?.auto?.length) {
      updateState.autoArray = [
        ...(currentState.anketData?.anket?.autoArray || []),
        ...(uniqAutoArray || []),
      ];
    }
    if (newState.filteredData?.cdek?.length) {
      updateState.cdekData = [
        ...(currentState.anketData?.anket?.cdekData || []),
        ...(uniqCdekArray || []),
      ];
    }
    if (
      currentState?.anketData?.anket?.foreignPassport &&
      updateState.foreignPassportArray
    ) {
      let copyState = currentState.anketData?.anket?.foreignPassport || [];
      const uniqueArray = [
        ...updateState.foreignPassportArray,
        copyState,
      ].filter(
        (obj, index, self) =>
          index ===
          self.findIndex(
            (el) =>
              el.foreignPassportNumber?.toLowerCase().replace(/\s/g, "") ===
              obj.foreignPassportNumber?.toLowerCase().replace(/\s/g, ""),
          ),
      );
      updateState.foreignPassportArray = uniqueArray;
    }
    const getTicketsIds = newState.filteredData?.sirena_ticket_info?.map(
      ({ id }) => id,
    );
    state.updatedData = updateState;
    state.sirenaTicketsIds = getTicketsIds;
    return {
      updatedData: state.updatedData,
      sirenaTicketsIds: getTicketsIds,
    };
  }
};
