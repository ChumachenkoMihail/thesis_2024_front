import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";
import { toast } from "sonner";
import { getProfile } from "./usersThunks";
import { getHistoryRequests } from "./historyThunks";
import { convertNumber } from "../../libs/generatedСolumns/alterEgo/alterEgoColumns";

export const getContact = createAsyncThunk(
  "search/getContact",
  async (data, thunkAPI) => {
    const response = await axiosInstance.post(`getcontact`, data);
    if (response?.data === "Search started") {
      toast.info("Getcontact запущен, результат появится в истории поиска");
      return response?.data;
    }
    return response?.data;
  },
);

export const findClone = createAsyncThunk(
  "search/findClone",
  async (data, { dispatch }) => {
    try {
      toast.info(`Поиск запущен`);
      const response = await axiosInstance.post(`findclone`, data);
      dispatch(getProfile());
      if (response.data?.data.length) {
        toast.info(
          `Найдено ${response.data?.data.length} совпадений, результаты в искомой анкете`,
        );
      }
      return response?.data?.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      if (err.response.status === 406) {
        toast.info(`Совпадений не найдено`);
      }
      if (err.response.status === 400) {
        toast.warning(`Проверьте подключение FindClone аккаунтов`, {
          duration: 12000,
        });
      }
    }
  },
);

export const tineyeSearch = createAsyncThunk(
  "search/tineyeSearch",
  async (data, { dispatch }) => {
    try {
      const response = await axiosInstance.post(`tineye/search`, data);
      if (response?.data?.data?.results?.matches?.length) {
        dispatch(getProfile());
        toast.info(
          `Найдено ${response.data?.data?.results?.matches?.length} совпадений, результаты в искомой анкете`,
        );
        return [
          {
            thumbnail: data?.photo,
            details: response?.data?.data?.results?.matches,
          },
        ];
      } else {
        return toast.info(`Совпадений не найдено`);
      }
    } catch (err) {
      if (!err.response) {
        throw err;
      }
    }
  },
);

export const leakCheck = createAsyncThunk(
  "search/leakCheck",
  async (data, { dispatch }) => {
    try {
      const response = await axiosInstance.post(`leakcheck`, data);
      dispatch(getProfile());

      if (response?.data?.error) {
      } else if (
        response?.data?.found &&
        response?.data?.payload &&
        !response.data.payload_value
      ) {
        const result = [];
        result.push({
          result: response?.data?.result?.map((item) => {
            return {
              sources: [item?.source?.name],
              email_only: item?.email_only,
              login: item.email,
              password: item.password,
              phone: item.phone,
              last_breach: item?.source?.breach_date
                ? [item?.source?.breach_date]
                : null,
              ...item,
            };
          }),
          payload: response?.data?.payload,
        });
        return result;
      } else if (response?.data?.payload_value) {
        if (response.data?.found && response.data?.result?.length) {
          toast.info(
            `Есть совпадения, результат в списке Все данные искомого пароля`,
          );
          return response?.data;
        } else
          return toast.info(`Совпадений по паролю ${data.value}  не найдено `);
      }
    } catch (err) {
      if (err.response.status === 402) {
        toast.error("Недостаточно кредитов", {
          description: "Обратитесь к администратору",
        });
      }
    }
  },
);

export const getInsightResult = createAsyncThunk(
  "search/getInsightResult",
  async (id, thunkAPI) => {
    const res = await axiosInstance.get(`insight/history/${id}`);
    return res.data;
  },
);

export const insightSearch = createAsyncThunk(
  "search/insightSearch",
  async (data, { dispatch }) => {
    const { requestType, ...rest } = data;
    try {
      const response = await axiosInstance.post(`insight`, rest);
      dispatch(getProfile());
      if (response?.data && requestType === "global") {
        toast.info(`Поиск Telegram успешно запущен`, {
          description: "результат в истории telegram поиска",
        });

        await dispatch(getHistoryRequests({ limit: 10, page: 1 }));

        return response?.data?.message;
      } else if (response?.data?.data && requestType === "modal") {
        return [
          {
            inputType: rest.inputType,
            input: rest.insightInput,
            ...response?.data?.data?.result,
            id: response?.data?.data?.id,
            resultFromHistory: response?.data.resultFromHistory,
          },
        ];
      } else if (response?.data?.data && requestType === "update") {
        toast.info(`Данные успешно оновлены`);
        return [
          {
            inputType: rest.inputType,
            input: rest.insightInput,
            ...response?.data?.data?.result,
            id: response?.data?.data?.id,
            resultFromHistory: response?.data.resultFromHistory,
          },
        ];
      } else if (response?.data?.data && !requestType) {
        return [
          {
            inputType: rest.inputType,
            input: rest.insightInput,
            ...response?.data?.data?.result,
            id: response?.data?.data?.id,
            resultFromHistory: response?.data.resultFromHistory,
          },
        ];
      } else {
        return response.data.message;
      }
    } catch (err) {
      if (err.response.status === 402) {
        toast.error("Недостаточно кредитов", {
          description: "Обратитесь к администратору",
        });
        setTimeout(() => {
          window.location.replace("/history");
        }, 2500);
      }
    }
  },
);

export const normalizePhone = createAsyncThunk(
  "search/normalizePhone",
  async (data) => {
    try {
      return await axiosInstance.post(`dadata/phone`, data);
    } catch (e) {}
  },
);

export const faceVerify = createAsyncThunk(
  "faceVerify/faceVerify",
  async (data) => {
    try {
      const res = await axiosInstance.post(`face-verify`, data);
      if (res.data.message) {
        toast.error(res.data.message);
      }
      if (res.data.amazon_similarity && res.data.insightface_similarity) {
        toast.info("Сравнение завершено");
        return {
          amazon_similarity: convertNumber(res.data.amazon_similarity),
          insightface_similarity: convertNumber(
            res.data.insightface_similarity,
          ),
        };
      }
    } catch (e) {}
  },
);
