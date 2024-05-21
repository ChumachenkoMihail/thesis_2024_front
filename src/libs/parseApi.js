import { parseAndValidatePhoneNumber } from "libs/parceAndValidatePhoneNumber";
/* eslint-disable */

export const parseFullName = (fullName) => {
  // Regular expression to match Cyrillic names
  const regex = /([А-Яа-яЁё]+)(?:\s+([А-Яа-яЁё]+))?\s+([А-Яа-яЁё]+)/;

  // Use the exec method to extract matched groups
  const match = regex.exec(fullName);

  if (match) {
    return {
      firstname: match[2] || "",
      lastname: match[1] || "", // Use an empty string if the last name is not present
      patronymic: match[3] || "",
    };
  } else {
    // Return an error or handle the case where the input doesn't match the expected format
    return { error: "Invalid full name format" };
  }
};
export const removeEmptyKeys = (obj) => {
  if (Array.isArray(obj)) {
    const filteredArray = obj
      .filter((item) => {
        if (
          item &&
          typeof item === "object" &&
          Object.keys(item)?.length === 0
        ) {
          return false; // Exclude empty objects {}
        }
        return true;
      })
      .map((item) => removeEmptyKeys(item));

    return filteredArray?.length > 0 ? filteredArray : undefined;
  }

  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  const newObj = {};

  for (var key in obj) {
    const value = removeEmptyKeys(obj[key]);
    if (
      value !== null &&
      value !== undefined &&
      value !== "" &&
      value !== " "
    ) {
      newObj[key] = value;
    }
  }
  return Object.keys(newObj)?.length > 0 ? newObj : undefined;
};

export const removeEmptyValues = (obj) => {
  const res = { ...obj };
  for (var prop in res) {
    if (
      res[prop] === null ||
      res[prop] === undefined ||
      res[prop] === "" ||
      res[prop] === " "
    ) {
      delete res[prop];
    } else if (Array.isArray(obj[prop])) {
      removeEmptyValues(obj[prop]);
      // obj[prop] = obj[prop]?.filter((item) => item);
      res[prop] = res[prop]?.filter((item) => item !== "");
      res[prop] = res[prop]?.filter((item) => item !== " ");
      if (res[prop]?.length === 0) {
        delete res[prop];
      } else {
        res[prop] = res[prop].filter(Boolean);
      }
    } else if (typeof res[prop] === "object") {
      removeEmptyValues(res[prop]);
      if (Object.keys(res[prop])?.length === 0) {
        delete res[prop];
      }
    }
  }
  return res;
};

export const removeAllSpecialCharacters = (string) => {
  return string?.toString()?.replace(/[^\wа-яА-Я0-9]/gi, "") || "";
};

export const formatSirenaInsDateTime = (data, time) => {
  if (!data) {
    return null;
  }

  // Convert dep_date to the format '20/09/17'
  let dateStr = data.toString();
  let formattedDate =
    dateStr.substring(0, 2) +
    "/" +
    dateStr.substring(2, 4) +
    "/" +
    dateStr.substring(4, 6);

  if (!time) {
    return formattedDate;
  }

  // Format dep_time to '18:40'
  let formattedTime = time.substring(0, 2) + ":" + time.substring(2, 4);

  // Combine date and time
  let newValue = formattedDate + " " + formattedTime;
  return newValue;
};

export const normalizeSpaces = (str) => {
  return str?.replace(/\s+/g, " ")?.split("/")[0].trim() || "";
};
export const replaceWithNullIfOnlySpaces = (str) => {
  return /^\s*$/.test(str) ? null : str;
};

export const parseContacts = (array) => {
  // Matches email addresses
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  // Matches phone numbers
  const phonePattern =
    /^[\+\d\s\(\)-]+$|^[\+\d\s\(\)-]+[xX]?\d+$|^[\+\d\s\(\)-]+[xX]?\d+([#*]\d+)?$/;
  return array?.reduce(
    (acc, item) => {
      if (phonePattern.test(item)) {
        const phone = parseAndValidatePhoneNumber(item);
        acc.phones.push(phone?.E164Format);
      }
      if (emailPattern.test(item)) {
        acc.emails.push(item);
      }
      return acc;
    },
    { phones: [], emails: [] },
  );
};

export const getAllKeys = (obj) => {
  let keys = [];

  if (Array.isArray(obj)) {
    obj?.forEach((item) => {
      keys = keys.concat(getAllKeys(item));
    });
  } else if (typeof obj === "object" && obj !== null) {
    Object.keys(obj)?.forEach((key) => {
      keys.push(key);
      keys = keys.concat(getAllKeys(obj[key]));
    });
  }

  return keys;
};

export const removeNullFromString = (inputString) => {
  // Using a regular expression to globally replace 'null' with an empty string
  return inputString?.replace(/null/g, "");
};

/**
 * Parse val to integer
 * if NaN -> return ''
 *
 * @param val
 * @param emptyStr
 * @returns {string|number}
 */
export const toInt = (val, emptyStr = true) => {
  let res = +val;
  if (emptyStr) res = isNaN(res) ? "" : res;

  return res;
};
