import { createSlice } from "@reduxjs/toolkit";
import {
  deleteBindedAnket,
  getAllAvailableFields,
  getAllSearchFields,
  getAnketById,
  getBindedAnkets,
  getBindedPhotos,
  mergeAnkets,
  searchAnkets,
  getTickets,
  getPassengers,
  searchSirena,
  me,
  userOrgsWithProjects,
  projectBugs,
  userNotifications,
  getProjectInOrg,
  bugById,
  usersInProject,
  userOrgs,
  getUsersInOrg, getUsersInProjecttt, getProjectStats,
} from "store/thunks/searchThunks";
import {
  findClone,
  tineyeSearch,
  getContact,
  leakCheck,
  insightSearch,
  normalizePhone,
  getInsightResult,
} from "store/thunks/outsideApiThunks";
import {
  normalizeSpaces,
  parseContacts,
  replaceWithNullIfOnlySpaces,
} from "libs/parseApi";
import moment from "moment/moment";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    loading: false,
    error: null,
    searchData: null,
    columnsData: null,
    userOrgsWithProjectsData: null,
    projectBugsData: null,
    userNotificationsData: null,
    getProjectStatsData: null,
    bugByIdData: null,
    getUsersInOrgData: null,
    userOrgsData: null,
    getProjectInOrgData: null,
    usersInProjectData: null,
    anketData: {
      anket: {},
      folders: [],
    },
    meData: null,
    telegramData: null,
    anketIdsArray: [],
    searchFields: null,
    availableFields: null,
    fullAvailableFields: null,
    mergedAnkets: {},
    notRelatedAnketsFromMerge: null,
    mergedParams: null,
    findCloneData: null,
    tineyeSearchData: [],
    bindedAnkets: null,
  },
  reducers: {
    clearAnketData(state, action) {
      state.anketData.anket = {};
      state.findCloneData = action.payload;
      state.tineyeSearchData = [];
      state.bindedAnkets = action.payload;
      state.mergedAnkets = {};
      state.notRelatedAnketsFromMerge = null;
    },
    setMerged(state, action) {
      state.mergedParams = action.payload;
      state.mergedAnkets = action.payload;
      state.anketIdsArray = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(getProjectInOrg.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getProjectInOrg.fulfilled, (state, action) => {
          state.loading = false;
          state.getProjectInOrgData = action?.payload;
        })
        .addCase(getProjectInOrg.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(getProjectStats.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getProjectStats.fulfilled, (state, action) => {
          state.loading = false;
          state.getProjectStatsData = action?.payload;
        })
        .addCase(getProjectStats.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(getUsersInOrg.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getUsersInOrg.fulfilled, (state, action) => {
          state.loading = false;
          state.getUsersInOrgData = action?.payload;
        })
        .addCase(getUsersInOrg.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(bugById.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(bugById.fulfilled, (state, action) => {
          state.loading = false;
          state.bugByIdData = action?.payload;
        })
        .addCase(bugById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(userOrgs.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(userOrgs.fulfilled, (state, action) => {
          state.loading = false;
          state.userOrgsData = action?.payload;
        })
        .addCase(userOrgs.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })

        .addCase(usersInProject.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(usersInProject.fulfilled, (state, action) => {
          state.loading = false;
          state.usersInProjectData = action?.payload;
        })
        .addCase(usersInProject.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })

        .addCase(me.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(me.fulfilled, (state, action) => {
          state.loading = false;
          state.meData = action?.payload;
        })
        .addCase(me.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })

        .addCase(userNotifications.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(userNotifications.fulfilled, (state, action) => {
          state.loading = false;
          state.userNotificationsData = action?.payload;
        })
        .addCase(userNotifications.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })

        .addCase(userOrgsWithProjects.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(userOrgsWithProjects.fulfilled, (state, action) => {
          state.loading = false;
          state.userOrgsWithProjectsData = action?.payload;
        })
        .addCase(userOrgsWithProjects.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })

        .addCase(projectBugs.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(projectBugs.fulfilled, (state, action) => {
          state.loading = false;
          state.projectBugsData = action?.payload;
        })
        .addCase(projectBugs.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })

      .addCase(searchAnkets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchAnkets.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(searchAnkets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchSirena.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchSirena.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(searchSirena.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      ////
      .addCase(getAnketById.pending, (state) => {
        state.error = null;
      })
      .addCase(getAnketById.fulfilled, (state, action) => {
        state.anketData = action?.payload?.anketData;
      })
      .addCase(getAnketById.rejected, (state, action) => {
        state.loading = false;
      })
      ////
      .addCase(getAllSearchFields.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSearchFields.fulfilled, (state, action) => {
        state.loading = false;
        state.searchFields = action.payload;
      })
      .addCase(getAllSearchFields.rejected, (state, action) => {
        state.loading = false;
      })
      ////
      .addCase(mergeAnkets.pending, (state) => {
        state.error = null;
      })
      .addCase(mergeAnkets.fulfilled, (state, action) => {
        state.loading = false;
        if (action?.payload) {
          state.anketData.anket = action.payload?.updatedAnketData;
          state.sirenaTicketsIds = action?.payload?.sirenaTicketsIds;
          state.mergedAnkets = action.payload?.allAnketsFromMerge;
          state.notRelatedAnketsFromMerge =
            action.payload?.notRelatedAnketsFromMerge;
          state.anketIdsArray = action.payload?.anketIds;
          state.mergedParams = action.payload?.params;
        }
      })
      .addCase(mergeAnkets.rejected, (state, action) => {
        state.loading = false;
      })
      ////
      .addCase(getAllAvailableFields.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAvailableFields.fulfilled, (state, action) => {
        state.loading = false;
        const uniqueArray = Array.from(
          new Set(action.payload?.map((item) => item.responseFieldName)),
        )
          .map((responseFieldName) =>
            action.payload?.find(
              (item) => item.responseFieldName === responseFieldName,
            ),
          )
          .map((f) => f.responseFieldName);
        state.availableFields = uniqueArray;
        state.fullAvailableFields = action.payload;
      })
      .addCase(getAllAvailableFields.rejected, (state, action) => {
        state.loading = false;
      })
      ////
      .addCase(getContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getContact.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getContact.rejected, (state, action) => {
        state.loading = false;
      })
      ////
      .addCase(findClone.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findClone.fulfilled, (state, action) => {
        state.loading = false;
        state.findCloneData = action.payload;
      })
      .addCase(findClone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ////
      .addCase(tineyeSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(tineyeSearch.fulfilled, (state, action) => {
        state.loading = false;

        const responseData = Array.isArray(action.payload)
          ? action.payload
          : [];
        state.tineyeSearchData = [
          ...state.tineyeSearchData,
          ...responseData?.filter((item) => {
            const existingIndex = state.tineyeSearchData.findIndex(
              (existingItem) => existingItem.thumbnail === item.thumbnail,
            );

            return existingIndex === -1;
          }),
        ];
      })
      .addCase(tineyeSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ////
      .addCase(getBindedAnkets.pending, (state) => {
        state.error = null;
      })
      .addCase(getBindedAnkets.fulfilled, (state, action) => {
        state.bindedAnkets = action.payload;
      })
      .addCase(getBindedAnkets.rejected, (state, action) => {
        state.error = action.payload;
      })
      ////
      .addCase(deleteBindedAnket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBindedAnket.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteBindedAnket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ////
      .addCase(getBindedPhotos.pending, (state) => {
        state.error = null;
      })
      .addCase(getBindedPhotos.fulfilled, (state, action) => {
        if (state.anketData && state.anketData.anket) {
          state.anketData.anket.bindedPhotos = action.payload;
        }
      })
      .addCase(getBindedPhotos.rejected, (state, action) => {
        state.error = action.payload;
      })
      ////
      .addCase(leakCheck.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(leakCheck.fulfilled, (state, action) => {
        state.loading = false;

        if (state.anketData && state.anketData.anket) {
          if (action?.payload?.payload_value) {
            state.anketData.anket.leakCheck.forEach((item) => {
              item?.result?.forEach((resultItem) => {
                if (resultItem.password === action?.payload?.payload_value) {
                  resultItem.userNames = action.payload?.result?.map((item) => {
                    const { source, ...rest } = item;
                    return {
                      sources: [source?.name],
                      last_breach: [source.breach_date],
                      ...rest,
                    };
                  });
                } else {
                  return resultItem;
                }
              });
            });
          } else {
            if (state.anketData?.anket?.leakCheck) {
              state.anketData.anket.leakCheck = [
                ...state.anketData?.anket?.leakCheck,
                ...(action.payload || []),
              ];
            } else {
              state.anketData.anket.leakCheck = action.payload;
            }
          }
        }
      })
      .addCase(leakCheck.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ////
      .addCase(insightSearch.pending, (state) => {
        state.error = null;
        // state.loading = true;
      })
      .addCase(insightSearch.fulfilled, (state, action) => {
        state.loading = false;
        const hasTgPhones = Array.isArray(action?.payload)
          ? action?.payload?.flatMap((item) => item.phones)?.filter(Boolean)
          : [];
        if (hasTgPhones?.length && state.anketData) {
          state.anketData.anket.telegramPhones = hasTgPhones;
        } else if (hasTgPhones?.length && !state.anketData) {
          const phonePayload = {
            anket: {
              telegramPhones: hasTgPhones,
            },
          };
          state.anketData = phonePayload;
        }
        if (
          state?.anketData?.anket?.telegramData &&
          typeof action.payload !== "string"
        ) {
          state.anketData.anket.telegramData =
            state.anketData.anket?.telegramData
              ?.map((item) => {
                const matchObject = action.payload?.find(
                  (i) => i?.input === item?.input,
                );

                if (matchObject) {
                  return matchObject;
                } else {
                  return item;
                }
              })
              .concat(
                action.payload?.filter(
                  (element) =>
                    !state.anketData.anket?.telegramData?.some(
                      (node) => node?.input === element?.input,
                    ),
                ),
              );
        } else if (typeof action.payload !== "string") {
          if (state.anketData) {
            state.anketData.anket.telegramData = action.payload;
          } else {
            const payload = {
              anket: {
                telegramData: action.payload,
              },
            };
            state.anketData = payload;
            state.telegramData = action.payload;
          }
        }
      })
      .addCase(insightSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getInsightResult.pending, (state) => {
        state.error = null;
        // state.loading = true;
      })
      .addCase(getInsightResult.fulfilled, (state, action) => {
        if (state.anketData) {
          state.anketData.anket.telegramData = [
            {
              id: action?.payload?.data?.id,
              ...action?.payload?.data?.result,
              input: action?.payload?.data?.input,
              inputType: action?.payload?.data?.name.split("|")[0],
              resultFromHistory: action?.payload?.resultFromHistory,
            },
          ];
        }
        state.loading = false;
        // const hasTgPhones = Array.isArray(action?.payload)
        //   ? action?.payload
        //       ?.flatMap(({ tgData }) => tgData?.data?.phones)
        //       ?.filter(Boolean)
        //   : [];
        // if (hasTgPhones?.length && state.anketData) {
        //   state.anketData.anket.telegramPhones = hasTgPhones;
        // } else if (hasTgPhones?.length && !state.anketData) {
        //   const phonePayload = {
        //     anket: {
        //       telegramPhones: hasTgPhones,
        //     },
        //   };
        //   state.anketData = phonePayload;
        // }
        // if (
        //   state?.anketData?.anket?.telegramData &&
        //   typeof action.payload !== "string"
        // ) {
        //   state.anketData.anket.telegramData =
        //     state.anketData.anket?.telegramData
        //       ?.map((item) => {
        //         const matchObject = action.payload?.find(
        //           (i) => i?.input === item?.input,
        //         );
        //
        //         if (matchObject) {
        //           return matchObject;
        //         } else {
        //           return item;
        //         }
        //       })
        //       .concat(
        //         action.payload?.filter(
        //           (element) =>
        //             !state.anketData.anket?.telegramData?.some(
        //               (node) => node?.input === element?.input,
        //             ),
        //         ),
        //       );
        // }
        // else if (typeof action.payload !== "string") {
        //   if (state.anketData) {
        //     state.anketData.anket.telegramData = [action.payload.data.result];
        //   } else {
        //     const payload = {
        //       anket: {
        //         telegramData: action.payload,
        //       },
        //     };
        //     state.anketData = payload;
        //     state.telegramData = action.payload;
        //   }
        // }
      })
      .addCase(getInsightResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ////
      .addCase(getTickets.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        if (Object.keys(action.payload).length >= 1) {
          if (state?.anketData?.anket?.sirenaTicketInfo) {
            for (const obj of state?.anketData?.anket?.sirenaTicketInfo) {
              // Check if the regnum in the current object is a key in the second object
              const regnumToCheck = obj.regnum;
              if (regnumToCheck in action.payload) {
                const updatePayload = action.payload[regnumToCheck]?.map(
                  (t) => {
                    const { phones, ...rest } = t;
                    const relatedPhones = parseContacts(phones)?.phones?.length
                      ? parseContacts(phones)?.phones
                      : null;
                    const relatedEmails = parseContacts(phones)?.emails?.length
                      ? parseContacts(phones)?.emails
                      : null;
                    return {
                      ...rest,
                      city_from: normalizeSpaces(t?.city_from),
                      tkt_date:
                        moment.utc(t.tkt_date).format("YYYY-MM-DD HH:mm:ss") ||
                        null,
                      city_to: normalizeSpaces(t?.city_to),
                      passDoc: replaceWithNullIfOnlySpaces(t?.passDoc),
                      info: replaceWithNullIfOnlySpaces(t?.info),
                      first_city: normalizeSpaces(t?.first_city),
                      farce_calt_vld_url: normalizeSpaces(
                        t?.farce_calt_vld_url,
                      ),
                      phone: [...new Set(relatedPhones)],
                      email: relatedEmails ? [...new Set(relatedEmails)] : null,
                    };
                  },
                );
                // If it exists, create the desired object and push it to the result array
                obj.relatedTickets = updatePayload;
              }
            }
          }
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      ////
      .addCase(getPassengers.pending, (state) => {
        state.loading = true;

        state.error = null;
      })
      .addCase(getPassengers.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getPassengers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ////
      .addCase(normalizePhone.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(normalizePhone.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(normalizePhone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    ////
  },
});

export const searchActions = searchSlice.actions;
export default searchSlice;
