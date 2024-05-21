import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";
import { getHistoryRequests } from "./historyThunks";
import { toast } from "sonner";
import { modifyMergeData } from "../../libs/mergeUtils/modifyMergeData";
import { modifyDataForDetailsPage } from "../../libs/modifyDataForDetailsPage";
import { parseJson } from "../../libs/mergeUtils/parseJson";
import searchSlice, { searchActions } from "../searchSlice";
import moment from "moment";

function checkExist(obj) {
  // Check if any array property has length
  for (const key in obj) {
    if (Array.isArray(obj[key]) && obj[key]?.length > 0) {
      return true;
    }
  }
  // Check if medical.medical array has length
  return (
    Array.isArray(obj.medical?.medical) && obj?.medical?.medical?.length > 0
  );
}

export const searchAnkets = createAsyncThunk(
  "search/searchAnkets",
  async (searchValues, thunkAPI) => {
    const currentState = thunkAPI.getState();
    const searchFields = {
      searchFields: searchValues,
      limit: 100,
      page: 1,
    };
    try {
      const response = await axiosInstance.post(`/search`, searchFields);
      if (response.data) {
        toast.info("Поиск успешно запущен", {
          description: "результат появится в истории поиска",
        });
        await thunkAPI.dispatch(
          getHistoryRequests({
            limit: 10,
            page: currentState.history.historyPage,
          }),
        );
      }
      return response.data;
    } catch (err) {
      if (err.response.status === 402) {
        toast.error("Недостаточно кредитов для поиска", {
          description: "Обратитесь к администратору",
        });
      }
    }
  },
);
export const searchSirena = createAsyncThunk(
  "search/searchSirena",
  async (searchValues, thunkAPI) => {
    const searchFields = {
      searchFields: searchValues,
      limit: 100,
      page: 1,
    };
    try {
      const response = await axiosInstance.post(
        `/search/search-sirena`,
        searchFields,
      );
      response.data &&
        toast.info("Поиск успешно запущен", {
          description: "результат появится в истории поиска",
        });
      response.data &&
        thunkAPI.dispatch(getHistoryRequests({ limit: 10, page: 1 }));
      return response.data;
    } catch (err) {
      if (err.response?.status === 402) {
        toast.error("Недостаточно кредитов для поиска", {
          description: "Обратитесь к администратору",
        });
      }
      if (err.response?.status === 403) {
        toast.error("Недостаточно прав для поиска в базе Сирена", {
          description: "Обратитесь к администратору",
        });
      }
    }
  },
);

export const getAnketById = createAsyncThunk(
  "search/getAnketById",
  async ({ id, sourceID, sourceName }, thunkAPI) => {
    const currentState = thunkAPI.getState();
    try {
      const response = await axiosInstance.get(
        `search/detailedView/${id}?sourceId=${sourceID}`,
      );
      return await modifyDataForDetailsPage(
        response.data,
        currentState?.history?.selectedSourceNameId || sourceName,
        id,
        thunkAPI.dispatch,
      );
    } catch (err) {
      if (err.response.status === 402) {
        toast.error("Недостаточно кредитов для просмотра анкет", {
          description: "Обратитесь к администратору",
        });
        setTimeout(() => {
          window.location.replace("/search");
        }, 2500);
      }
    }
  },
);

export const getAllSearchFields = createAsyncThunk(
  "search/getAllSearchFields",
  async () => {
    const response = await axiosInstance.get(`search/search-fields`);
    return response?.data?.sources;
  },
);

export const getAllAvailableFields = createAsyncThunk(
  "search/getAllAvailableFields",
  async () => {
    const response = await axiosInstance.get(`search/available-fields`);
    return response?.data?.availableFields;
  },
);

export const me = createAsyncThunk(
    "auth/me",
    async () => {
      const response = await axiosInstance.get(`auth/me`);
      return response?.data;
    },
);

export const userNotifications = createAsyncThunk(
    "notifications/get-user-notifications",
    async () => {
      const response = await axiosInstance.get(`notifications/get-user-notifications`);
      return response?.data;
    },
);

export const setNotifAsRead = createAsyncThunk(
    "notifications/set-notification-read",
    async ( notificationId , thunkAPI) => {
        return await axiosInstance.post(`notifications/set-notification-read`, {notificationId: Number(notificationId)});
    },
);

export const acceptInvite = createAsyncThunk(
    "organizations/accept-invite",
    async ( orgId , thunkAPI) => {
        return await axiosInstance.post(`organizations/accept-invite`, {organizationId: Number(orgId)});
    },
);

export const declineInvite = createAsyncThunk(
    "organizations/decline-invite",
    async ( orgId , thunkAPI) => {
        return await axiosInstance.post(`organizations/decline-invite`, {organizationId: Number(orgId)});
    },
);



export const userOrgsWithProjects = createAsyncThunk(
    "organizations/get-org-with-projects",
    async () => {
      const response = await axiosInstance.get(`organizations/get-org-with-projects`);
        const userId = localStorage.getItem('userId');
        console.log('response?.data');
        console.log(response?.data);

        response?.data?.map(org => {
            if(org?.userId === Number(userId)){
                response.data[0].owner = true
            }
        })
        return response?.data;
    },
);

export const userOrgs = createAsyncThunk(
    "organizations/get-user-organizations",
    async () => {
        const response = await axiosInstance.get(`organizations/get-user-organizations`);
        return response?.data;
    },
);

export const projectBugs = createAsyncThunk(
    "projects/get-project-bugs",
    async ({ projectId }, thunkAPI) => {
      const response = await axiosInstance.get(`projects/get-project-bugs/${projectId}`);
      // console.log(response);

      return response?.data.map((item)=>{
        const { updatedAt, createdAt, assignee, ...rest } = item;
          if(!assignee?.firstName && !assignee?.lastName){
              return {
                  ...rest,
                  // assignee: `${assignee?.firstName} ${assignee?.lastName}`
                  assignee: `Немає виконавця`,
                  createdAt: moment.utc(createdAt).format("YYYY-MM-DD HH:mm"),
                  updatedAt: moment.utc(updatedAt).format("YYYY-MM-DD HH:mm"),
              }
          }
          return {
              ...rest,
              createdAt: moment.utc(createdAt).format("YYYY-MM-DD HH:mm"),
              updatedAt: moment.utc(updatedAt).format("YYYY-MM-DD HH:mm"),
              assignee: `${assignee?.firstName} ${assignee?.lastName}`
              // assignee: `${assigneeName} ${assigneeLastName}`
          }

      });
    },
);

export const deleteBug = createAsyncThunk(
    "bugs/delete-bug",
    async ({ bugId }, thunkAPI) => {
        const response = await axiosInstance.post(`bugs/delete-bug`, {bugId});
        // console.log(response);
        return response;
    },
);

export const deleteAttachment = createAsyncThunk(
    "bugs/delete-bug-attachment",
    async ( {bugId, attachmentId} , thunkAPI) => {
        const response = await axiosInstance.post(`bugs/delete-bug-attachment`, {bugId: Number(bugId), attachmentId: Number(attachmentId)});
        return response;
    },
);

export const deleteComment = createAsyncThunk(
    "comments/delete-comment",
    async ( deleteCommentData , thunkAPI) => {
        const response = await axiosInstance.post(`comments/delete-comment`, deleteCommentData);
        return response;
    },
);

export const downloadAttachment = createAsyncThunk(
    "bugs/download-attachment",
    async ( {bugId, attachmentId} , thunkAPI) => {
        const response = await axiosInstance.post(`bugs/download-attachment`, {bugId: Number(bugId), attachmentId: Number(attachmentId)});
        console.log(response);
        return response;
    },
);

export const updateBug = createAsyncThunk(
    "bugs/update-bug",
    async ( updateBugData , thunkAPI) => {
        const response = await axiosInstance.post(`bugs/update-bug`, updateBugData);
        return response?.data;
    },
);

export const bugById = createAsyncThunk(
    "bugs/get-bug",
    async ( bugId , thunkAPI) => {
        const response = await axiosInstance.get(`bugs/get-bug/${bugId}`);
        const { assignee, ...rest } = response?.data;
        if(assignee){
            return {
                ...rest,
                // assigneeId: assignee?.firstName + ' ' + assignee?.lastName
                assigneeId: response?.data.assigneeUserId
            }
        }
        return response?.data;
    },
);
export const getUsersInOrg = createAsyncThunk(
    "organizations/get-org-users",
    async ( organizationId , thunkAPI) => {
        const response = await axiosInstance.post(`organizations/get-org-users`, {id: Number(organizationId)});
        const userId = localStorage.getItem('userId');
        return response.data.filter(item => item.userId !== Number(userId));
    },
);

export const getProjectStats = createAsyncThunk(
    "projects/get-project-stats",
    async ( projectId , thunkAPI) => {
        const response = await axiosInstance.post(`projects/get-project-stats`, {projectId: Number(projectId)});
        return response?.data
    },
);

export const getUsersInProjecttt = createAsyncThunk(
    "projects/get-project-users",
    async ( projectId , thunkAPI) => {
        const response = await axiosInstance.post(`projects/get-project-users`, {id: Number(projectId)});
        const userId = localStorage.getItem('userId');
        return response.data.filter(item => item.userId !== Number(userId));
    },
);

export const inviteUserToOrg = createAsyncThunk(
    "organizations/invite-member",
    async ( inviteData , thunkAPI) => {
        const response = await axiosInstance.post(`organizations/invite-member`, inviteData);
        toast.info('Користувачу відправлено запрошення до організації')
        return response?.data;
    },
);

export const deleteUserFromOrg = createAsyncThunk(
    "organizations/delete-user-from-org",
    async ( inviteData , thunkAPI) => {
        const response = await axiosInstance.post(`organizations/delete-user-from-org`, inviteData);
        toast.success('Користувача видалено з організації та її проектів')
        await thunkAPI.dispatch(getUsersInOrg(inviteData?.organizationId))
        return response?.data;
    },
);


export const getProjectInOrg = createAsyncThunk(
    "organizations/get-org-projects",
    async ( organizationId , thunkAPI) => {
      const response = await axiosInstance.post(`organizations/get-org-projects`, organizationId);
      // console.log(response);

      return response?.data.map((item)=>{
        return {
          label: item.name,
          value: item.id
        }
      });
    },
);

export const createBug = createAsyncThunk(
    "bugs/create-bug",
    async ( createBugData , thunkAPI) => {
      const response = await axiosInstance.post(`bugs/create-bug`, createBugData);
      console.log(response);

      return response?.data;
    },
);

export const addComment = createAsyncThunk(
    "comments/add-comment",
    async ( commentData , thunkAPI) => {
        const response = await axiosInstance.post(`comments/add-comment`, commentData);
        console.log(response);

        return response?.data;
    },
);

export const createOrganization = createAsyncThunk(
    "organizations/create-organization",
    async ( createOrgData , thunkAPI) => {
        const response = await axiosInstance.post(`organizations/create-organization`, createOrgData);
        console.log(response);

        return response?.data;
    },
);

export const editOrgName = createAsyncThunk(
    "organizations/rename-organization",
    async ( createOrgData , thunkAPI) => {
        const response = await axiosInstance.post(`organizations/rename-organization`, createOrgData);
        console.log(response);

        return response?.data;
    },
);

export const editProjectName = createAsyncThunk(
    "projects/rename-project",
    async ( renameProjectData , thunkAPI) => {
        const response = await axiosInstance.post(`projects/rename-project`, renameProjectData);
        console.log(response);

        return response?.data;
    },
);

export const createProject = createAsyncThunk(
    "projects/create-project",
    async ( createProjectData , thunkAPI) => {
        const response = await axiosInstance.post(`projects/create-project`, createProjectData);
        console.log(response);

        return response?.data;
    },
);

export const deleteOrg = createAsyncThunk(
    "organizations/delete-organization",
    async ( orgId , thunkAPI) => {
        console.log('orgId');
        console.log(orgId.id);
        const response = await axiosInstance.post(`organizations/delete-organization`, {id: Number(orgId.id)});
        console.log(response);
        thunkAPI.dispatch(userOrgsWithProjects())
        toast.success('Організацію успішно видалено')
        return response?.data;
    },
);

export const deleteProject = createAsyncThunk(
    "projects/delete-project",
    async ( deleteProjectData , thunkAPI) => {
        const response = await axiosInstance.post(`projects/delete-project`, deleteProjectData);
        thunkAPI.dispatch(userOrgsWithProjects())
        toast.success('Проект успішно видалено')


        return response?.data;
    },
);

export const usersInProject = createAsyncThunk(
    "projects/get-project-users",
    async ( projectId , thunkAPI) => {
        console.log(projectId);
        const response = await axiosInstance.post(`projects/get-project-users`, {projectId: Number(projectId)});
        console.log(response?.data);

        return response?.data.map((item)=>{
            return {
                label: item?.user?.firstName + ' ' + item?.user?.lastName,
                value: item?.user?.id
            }
        });
    },
);

export const mergeAnkets = createAsyncThunk(
  "search/mergeAnkets",
  async ({ data, showNotification = true }, thunkAPI) => {
    const currentState = thunkAPI.getState();
    try {
      const response = await axiosInstance.post(`search/detailed-search`, data);
      const findInPhtRfC = response?.data?.filteredData?.pcht_rf_clients || [];
      const findInPhtRfE = response?.data?.filteredData?.pcht_rf_empl || [];
      const findInDnsShop = response?.data?.filteredData?.dns_shop || [];
      const findInEgron = response?.data?.filteredData?.egron || [];
      const findInMts = response?.data?.filteredData?.mts || [];
      const findInMtsBank = response?.data?.filteredData?.mts_bank || [];
      const findInPromed = response?.data?.filteredData?.promed || [];
      const findInMicrocredit = response?.data?.filteredData?.microcredit || [];
      const findInSirenaTrain =
        response?.data?.filteredData?.sirena_train || [];
      const findInGos = response?.data?.filteredData?.gos || [];
      const findInAvito = response?.data?.filteredData?.avito || [];
      const findInAlfa = response?.data?.filteredData?.alfa || [];
      const findInMailRu = response?.data?.filteredData?.mail_ru || [];
      const findInRostelecom = response?.data?.filteredData?.rostelecom || [];
      const findInVk = response?.data?.filteredData?.vk || [];
      const findInAnkets = response?.data?.filteredData?.ankets || [];
      const findInSirenaPassenger =
        response?.data?.filteredData?.sirena_passenger || [];
      const findInSirenaTickets =
        response?.data?.filteredData?.sirena_ticket_info || [];
      const findInAuto = response?.data?.filteredData?.auto || [];
      const findInDelivery = response?.data?.filteredData?.delivery || [];
      const findInCdek = response?.data?.filteredData?.cdek || [];
      const findInPhones = response?.data?.filteredData?.phones || [];
      const findInPcht = response?.data?.filteredData?.pcht || [];
      const findInDeliveryClub =
        response?.data?.filteredData?.delivery_club || [];
      const findInSpektr = response?.data?.filteredData?.spektr || [];
      const findInNewAuto = response?.data?.filteredData?.newAuto || [];
      const findInMedical = response?.data?.filteredData?.medical || [];
      const findInMedicalOrders = findInMedical?.gemotestOrders
        ? Object.keys(findInMedical?.gemotestOrders || {})
        : [];

      const findInFssp = response?.data?.filteredData?.fssp || [];
      const findInRelativies = response?.data?.filteredData?.relativies || [];
      const findInMvd = response?.data?.filteredData?.mvd || [];
      const findInNewGos = response?.data?.filteredData?.new_gos || [];
      const findInNewGosUsers =
        response?.data?.filteredData?.new_gos_users || [];
      const findInYoula = response?.data?.filteredData?.youla || [];
      const findInBeeline = response?.data?.filteredData?.beeline || [];
      const findInTutuUsers = response?.data?.filteredData?.tutu_users || [];
      const findInTutuPassengers =
        response?.data?.filteredData?.tutu_passengers || [];
      const splitAllDataBases = [
        /// Todo: split to one array all database
        ...findInMts,
        ...findInMtsBank,
        ...findInMicrocredit,
        ...findInGos,
        ...findInAvito,
        ...findInAlfa,
        ...findInMailRu,
        ...findInRostelecom,
        ...findInPromed,
        ...findInVk,
        ...findInDnsShop,
        ...findInAnkets,
        ...findInSirenaPassenger,
        ...findInPhtRfE,
        ...findInPhtRfC,
        ...findInSirenaTickets,
        ...findInSirenaTrain,
        ...findInAuto,
        ...findInEgron,
        ...findInDelivery,
        ...findInCdek,
        ...findInPhones,
        ...findInPcht,
        ...findInDeliveryClub,
        ...findInSpektr,
        ...findInNewAuto,
        ...(findInMedical?.medical || []),
        ...findInMedicalOrders,
        ...findInFssp,
        ...findInRelativies,
        ...findInMvd,
        ...findInNewGos,
        ...findInNewGosUsers,
        ...findInYoula,
        ...findInBeeline,
        ...findInTutuUsers,
        ...findInTutuPassengers,
      ];
      if (!splitAllDataBases?.length) {
        showNotification && toast.info("Совпадений в других базах не найдено");
        if (!showNotification) {
          /// need for bulk zip mergeUtils
          return "nothing found";
        }
      } else {
        showNotification &&
          toast.info(`Есть совпадения(${splitAllDataBases?.length} анкет)`, {
            description: `Анкета автоматически дополнена найденными данными`,
          });
        findInMedicalOrders?.length &&
          setTimeout(() => {
            showNotification &&
              toast.info(
                `Дополнительно найдено ${findInMedicalOrders?.length} заказа на анализы в медицине`,
              );
          }, 2000);
        try {
          thunkAPI.dispatch(searchActions.setLoading(true));
          const modifiedMergeData = await modifyMergeData(
            currentState.search,
            response?.data,
            thunkAPI.dispatch,
          );
          const parsedAll = await parseJson(response?.data.allData); /// modify json all ankets from merge
          const parsedNotRelated = await parseJson(
            response?.data.nonRelatedData,
          ); /// modify json all ankets from merge

          const ifExistNotRelated = checkExist(parsedNotRelated);
          return {
            updatedAnketData: modifiedMergeData.updatedData, // main anket data
            allAnketsFromMerge: parsedAll,
            notRelatedAnketsFromMerge: ifExistNotRelated
              ? parsedNotRelated
              : null,
            sirenaTicketsIds: modifiedMergeData.sirenaTicketsIds,
            params: response?.data.params,
            anketIds: response?.data.anketIds,
          };
        } catch (err) {
          console.log(err);
        } finally {
          thunkAPI.dispatch(searchActions.setLoading(false));
        }
      }
    } catch (error) {
      if (error.response?.status === 402) {
        toast.error("Недостаточно кредитов для поиска в других базах", {
          description: "Обратитесь к администратору",
        });
      }
    }
  },
);

export const getBindedPhotos = createAsyncThunk(
  "search/getBindedPhotos",
  async ({ anketId, sourceId }, { dispatch }) => {
    try {
      const response = await axiosInstance.get(
        `binded-ankets/get-binded-photos/${anketId}`,
      );
      if (response?.data?.photos?.value?.length) {
        toast.info(
          `Найдено ${response?.data?.photos?.value?.length} связанных фото`,
        );
        return response?.data?.photos?.value;
      }
    } catch (e) {}
  },
);
export const getBindedAnkets = createAsyncThunk(
  "search/getBindedAnkets",
  async ({ anketId, sourceId }, { dispatch }) => {
    try {
      const response = await axiosInstance.get(
        `binded-ankets/${anketId}?sourceId=${sourceId}`,
      );
      if (response?.data?.message === "Binded ankets not found") {
        return;
      }
      if (response?.data?.code === 404) {
        toast.info(
          `${response?.data?.message}`, /// status 200 but code 404
        );
      }
      const withoutStartedAnket = response?.data?.sources?.map((item) => {
        return {
          ...item,
          ankets: item.ankets.filter((anket) => +anket.id !== +anketId),
        };
      });

      const flattenedArray = withoutStartedAnket?.flatMap((obj) => obj.ankets);

      if (flattenedArray.length > 0) {
        toast.info(`Найдено ${flattenedArray.length} связанных анкет `);
        return response?.data;
      } else {
        return null;
      }
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      if (err.response?.status === 500 || err.response?.status === 504) {
        toast.error(
          `Ошибка сервера при попытке получить доступ к  ${err?.request?.responseURL}`,
          {
            duration: 12000,
          },
        );
      }
      if (err?.response?.status === 400) {
        toast.info(`${err?.response?.data?.message}`);
      } else {
        toast.error(`${err?.response?.data?.message}`);
      }
    }
  },
);
export const deleteBindedAnket = createAsyncThunk(
  "search/deleteBindedAnket",
  async ({ data, init }, { dispatch }) => {
    const response = await axiosInstance.post(
      `binded-ankets/delete-binded-anket`,
      data,
    );
    if (response?.data?.message === "Binded anket deleted") {
      toast.info(`${response?.data?.message}`);
      dispatch(getBindedAnkets(init));
    }
  },
);

export const getTickets = createAsyncThunk(
  "search/getTickets",
  async (ticketId) => {
    const res = await axiosInstance.post(`search/co-booked-tickets`, ticketId);
    return res?.data;
  },
);
export const getPassengers = createAsyncThunk(
  /// получить пасажиров рейса
  "search/getPassengers",
  async (ticketId) => {
    return await axiosInstance.get(
      `search/passengers-by-ticket?ticketId=${ticketId}`,
    );
  },
);
