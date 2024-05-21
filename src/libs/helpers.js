import {
  parseContacts,
  removeAllSpecialCharacters,
  removeEmptyValues,
} from "./parseApi";
import moment from "moment";
import { getUniqueDocuments } from "libs/getUniqueDocuments";
import { getUniqueBeelinePhones } from "libs/getUniqueBeelinePhones";
import { parseAndValidatePhoneNumber } from "./parceAndValidatePhoneNumber";
import { nameForFront } from "./Enums";
import { normalizePhones } from "./modifyDataForDetailsPage";
export const getFirstKeysFromObj = (objectsArray) => {
  const keysSet = new Set();

  for (let i = 0; i < objectsArray?.length; i++) {
    const keys = Object.keys(objectsArray[i]);
    keys?.forEach((key) => keysSet.add(key));
  }

  return Array.from(keysSet);
};

export const replaceById = (data, id, newData, objReplacement) => {
  // Find the index of the object with the given ID
  const index = data?.findIndex((obj) => obj.id || obj[objReplacement] === id);
  // If the object is not found, return the original array
  if (index === -1) {
    return data;
  }
  // Replace the object at the index with the new data
  const newDataWithId = { ...newData, id };
  const newDataArray = [
    ...data.slice(0, index),
    newDataWithId,
    ...data.slice(index + 1),
  ];
  // Return the modified array
  return newDataArray;
};

export const isIncludes = (array, key, reactComponent) => {
  const foundItem = array?.find((item) => item === key);
  if (foundItem && reactComponent) {
    return reactComponent;
  } else if (foundItem) {
    return true;
  }
  return null; // or any other default value if the key is not found
};

export const divideArray = (arr) => {
  /// divide arr
  const length = arr?.length;

  if (length === 1) {
    const part1 = arr;
    const part2 = [];

    return [part1, part2];
  }

  const secondPartLength = Math.ceil(length / 2);
  const part1 = arr?.slice(0, length - secondPartLength);
  const part2 = arr?.slice(length - secondPartLength);

  return [part1, part2];
};

export const splitDataToString = (
  originalObject,
  key,
  originalAnket,
  originalValue,
) => {
  let startArray = [];
  const isEmptyStringWithSpaces = (str) =>
    str?.toString()?.trim()?.length === 0;

  if (Array.isArray(originalObject[key]) && Array.isArray(originalValue)) {
    startArray.push(...originalObject[key]);
    originalValue.forEach((o) => {
      if (!isEmptyStringWithSpaces(o)) {
        startArray.push(o);
      }
    });
  } else {
    if (Array.isArray(originalObject[key])) {
      // If originalObject[key] is an array, push its values to startArray
      // and also push the originalValue if it's not an empty string with spaces
      startArray.push(...originalObject[key]);
      if (!isEmptyStringWithSpaces(originalValue)) {
        startArray.push(originalValue);
      }
    } else {
      // If originalObject[key] is not an array and originalValue is not an empty string with spaces,
      // push both originalObject[key] and originalValue to startArray
      if (!isEmptyStringWithSpaces(originalObject[key])) {
        startArray.push(originalObject[key]);
      }

      if (!isEmptyStringWithSpaces(originalValue)) {
        startArray.push(originalValue);
      }
    }
  }

  return [...new Set(startArray.filter(Boolean))];
};

export const processObject = async (obj, ankets, dispatch) => {
  ///split all ankets, remove dublicate and split to one object
  const newObj = { ...obj };
  // arrays for data from merged anket
  const potentialNames = [];
  const dobs = [];
  let militaryInfoStr = [];
  let localPassportArray = [];
  let foreignPassportArray = [];
  let jobArray = [];
  let accountsArray = [];
  let addressArray = [];
  let vkArray = [];
  let addressDeliveryArray = [];
  let innArray = [];
  let snilsArray = [];
  let secretAccessArray = [];
  let topSecretAccessInfoArray = [];
  let diplWorkPlaceArray = [];
  let diplTopSecretInfoArray = [];
  let diplTopSecretDescriptionArray = [];
  let diplSecretAccessArray = [];
  let diplCountryArray = [];
  let departureRestrictionsArray = [];
  let addressRegistrationDateArray = [];
  let genderArray = [];
  let phoneArray = [];
  let homePhoneArray = [];
  let nationalityArray = [];
  let passportAutoArray = [];
  let passportAutoAddressArray = [];
  let placeOfBirthArray = [];
  let emailsArray = [];
  let workPlaceAutoArray = [];
  let webLinkArray = [];
  let passwordArray = [];
  let countryArray = [];
  let someDocumentArray = [];
  let sourceNameArray = [];
  let mailruProfileArray = [];
  let facebookIdArray = [];
  let loginArray = [];
  let ipArray = [];
  let linkedinLinkArray = [];
  let deliveryAvatarArray = [];
  let serialSimArray = [];
  let imsiArray = [];
  let numBusterTagsArray = [];
  let relatedPhonesArray = [];
  let getContactTagsArray = [];
  let accidentsArray = [];
  let passportNumberArray = [];
  let passportIssuedByArray = [];
  let insuranceNumberArray = [];
  let postArray = [];
  let insuranceCompanyArray = [];
  let insurancePoliciesArray = [];
  let ospArray = [];
  let debtArray = [];
  let documentsArray = [];
  let fsspListArray = [];
  let beelineArray = [];
  let kidsArray = [];
  let tutuPassengersArray = [];
  let tutuReserveUsersArray = [];
  let familyStatusArray = [];
  let workPhoneArray = [];
  let creditAmountArray = [];

  let existingObject = {
    photos: {
      avatars: [],
      displayPhotos: [],
      signatures: [],
    },
  };

  // end  arrays for data from merged anket
  ankets?.forEach((anket) => {
    const {
      passportNumber,
      passportIssuedBy,
      insuranceNumber,
      insuranceCompany,
      actualAddress,
      firstname,
      lastname,
      patronymic,
      dob,
      photos,
      addressInfo,
      family_status,
      passport,
      passportAddress,
      localPassport,
      foreignPassport,
      jobHistory,
      accounts,
      insurancePolicies,
      numBusterTags,
      relatedPhones,
      getContactTags,
      inn,
      snils,
      secretAccess,
      topSecretAccessInfo,
      diplWorkPlace,
      diplTopSecretInfo,
      diplTopSecretDescription,
      diplSecretAccess,
      diplCountry,
      departureRestrictions,
      addressRegistrationDate,
      gender,
      placeOfBirth,
      nationality,
      email,
      phone,
      phone_home,
      emails,
      phones,
      workPlace,
      address,
      webLink,
      sourceName,
      someDocument,
      password,
      mailruProfile,
      facebookId,
      login,
      linkedinLink,
      deliveryAvatar,
      ip,
      serialSim,
      imsi,
      name,
      accidents,
      vkId,
      osp,
      debt_amount,
      passport_number,
      documents,
      fsspList,
      beelinePhones,
      kids,
      tutuPassengers,
      tutuReserveUsers,
      credit_amount,
      work_phone,
      sourceNameId,
      country,
      post,
    } = anket;
    if (firstname || lastname || patronymic) {
      potentialNames.push({
        value: `${lastname ? lastname : ""} ${firstname ? firstname : ""} ${
          patronymic ? patronymic : ""
        }`,
        source: nameForFront[sourceNameId],
        dob: dob || null,
      });
    }
    if (name) {
      potentialNames.push({
        value: name,
        source: nameForFront[sourceNameId],
        dob: dob || null,
      });
    }
    if (localPassport) {
      localPassportArray.push(anket["localPassport"]);
    }

    if (foreignPassport) {
      foreignPassportArray.push(anket["foreignPassport"]);
    }
    if (addressInfo) {
      addressArray.push(anket["addressInfo"]);
    }
    if (inn && inn !== " ") {
      const strArray = splitDataToString(obj, "inn", anket, inn);
      strArray?.length && innArray.push(...strArray);
    }
    if (post && post !== " ") {
      const strArray = splitDataToString(obj, "post", anket, post);
      strArray?.length && postArray.push(...strArray);
    }
    if (serialSim && serialSim !== " ") {
      const strArray = splitDataToString(obj, "serialSim", anket, serialSim);
      strArray?.length && serialSimArray.push(...strArray);
    }
    if (passportNumber && passportNumber !== " ") {
      const strArray = splitDataToString(
        obj,
        "passportNumber",
        anket,
        passportNumber,
      );
      strArray?.length && passportNumberArray.push(...strArray);
    }
    if (passport_number && passport_number !== " ") {
      const strArray = splitDataToString(
        obj,
        "passport_number",
        anket,
        passport_number,
      );
      strArray?.length && passportNumberArray.push(...strArray);
    }
    if (passportIssuedBy && passportIssuedBy !== " ") {
      const strArray = splitDataToString(
        obj,
        "passportIssuedBy",
        anket,
        passportIssuedBy,
      );
      strArray?.length && passportIssuedByArray.push(...strArray);
    }
    if (insuranceNumber && insuranceNumber !== " ") {
      const strArray = splitDataToString(
        obj,
        "insuranceNumber",
        anket,
        insuranceNumber,
      );
      strArray?.length && insuranceNumberArray.push(...strArray);
    }
    if (insuranceCompany && insuranceCompany !== " ") {
      const strArray = splitDataToString(
        obj,
        "insuranceCompany",
        anket,
        insuranceCompany,
      );
      strArray?.length && insuranceCompanyArray.push(...strArray);
    }
    if (actualAddress && actualAddress !== " ") {
      const strArray = splitDataToString(
        obj,
        "actualAddress",
        anket,
        actualAddress,
      );
      strArray?.length && addressDeliveryArray.push(...strArray);
    }
    if (imsi && imsi !== " ") {
      const strArray = splitDataToString(obj, "imsi", anket, imsi);
      strArray?.length && imsiArray.push(...strArray);
    }

    if (ip && ip !== " ") {
      const strArray = splitDataToString(obj, "ip", anket, ip);
      strArray?.length && ipArray.push(...strArray);
    }
    if (login && login !== " ") {
      const strArray = splitDataToString(obj, "login", anket, login);
      strArray?.length && loginArray.push(...strArray);
    }
    if (family_status && family_status !== " ") {
      const strArray = splitDataToString(
        obj,
        "family_status",
        anket,
        family_status,
      );
      strArray?.length && familyStatusArray.push(...strArray);
    }
    if (work_phone && work_phone !== " ") {
      const strArray = splitDataToString(obj, "work_phone", anket, work_phone);
      strArray?.length && workPhoneArray.push(...strArray);
    }
    if (credit_amount && credit_amount !== " ") {
      const strArray = splitDataToString(
        obj,
        "credit_amount",
        anket,
        credit_amount,
      );
      strArray?.length && creditAmountArray.push(...strArray);
    }
    if (deliveryAvatar && deliveryAvatar !== " ") {
      const strArray = splitDataToString(
        obj,
        "deliveryAvatar",
        anket,
        deliveryAvatar,
      );
      strArray?.length && deliveryAvatarArray.push(...strArray);
    }
    if (linkedinLink && linkedinLink !== " ") {
      const strArray = splitDataToString(
        obj,
        "linkedinLink",
        anket,
        linkedinLink,
      );
      strArray?.length && linkedinLinkArray.push(...strArray);
    }
    if (facebookId && facebookId !== " ") {
      const strArray = splitDataToString(obj, "facebookId", anket, facebookId);
      strArray?.length && facebookIdArray.push(...strArray);
    }
    if (someDocument && someDocument !== " ") {
      const strArray = splitDataToString(
        obj,
        "someDocument",
        anket,
        someDocument,
      );
      strArray?.length && someDocumentArray.push(...strArray);
    }
    if (address && address !== " ") {
      if (Array.isArray(address)) {
        address.forEach((add) => {
          const strArray = splitDataToString(obj, "address", anket, add);
          strArray?.length && addressDeliveryArray.push(...strArray);
        });
      } else {
        const strArray = splitDataToString(obj, "address", anket, address);
        strArray?.length && addressDeliveryArray.push(...strArray);
      }
    }

    if (webLink && webLink !== " ") {
      const strArray = splitDataToString(obj, "webLink", anket, webLink);
      strArray?.length && webLinkArray.push(...strArray);
    }
    if (sourceName && sourceName !== " ") {
      const strArray = splitDataToString(obj, "sourceName", anket, sourceName);
      strArray?.length && sourceNameArray.push(...strArray);
    }
    if (vkId && vkId !== " ") {
      const strArray = splitDataToString(obj, "vkId", anket, vkId);
      strArray?.length && vkArray.push(...strArray);
    }
    if (emails) {
      if (Array.isArray(emails)) {
        emails.forEach((item) => {
          emailsArray.push({
            value: item,
            source: nameForFront[sourceNameId],
          });
        });
      } else {
        emailsArray.push({
          value: emails,
          source: nameForFront[sourceNameId],
        });
      }
    }
    if (email && email !== " ") {
      if (Array.isArray(email)) {
        email.forEach((item) => {
          emailsArray.push({
            value: item,
            source: nameForFront[sourceNameId],
          });
        });
      } else {
        emailsArray.push({
          value: email,
          source: nameForFront[sourceNameId],
        });
      }
    }
    if (password && password !== " ") {
      const strArray = splitDataToString(obj, "password", anket, password);
      strArray?.length && passwordArray.push(...strArray);
    }
    if (mailruProfile && mailruProfile !== " ") {
      const strArray = splitDataToString(
        obj,
        "mailruProfile",
        anket,
        mailruProfile,
      );
      strArray?.length && mailruProfileArray.push(...strArray);
    }
    if (workPlace && workPlace !== " ") {
      const strArray = splitDataToString(obj, "workPlace", anket, workPlace);
      strArray?.length && workPlaceAutoArray.push(...strArray);
    }
    if (placeOfBirth) {
      const strArray = splitDataToString(
        obj,
        "placeOfBirth",
        anket,
        placeOfBirth,
      );
      strArray?.length && placeOfBirthArray.push(...strArray);
    }
    if (passport) {
      const strArray = splitDataToString(obj, "passport", anket, passport);
      strArray?.length && passportAutoArray.push(...strArray);
    }
    if (passportAddress) {
      const strArray = splitDataToString(
        obj,
        "passportAddress",
        anket,
        passportAddress,
      );
      strArray?.length && passportAutoAddressArray.push(...strArray);
    }
    if (nationality) {
      const strArray = splitDataToString(
        obj,
        "nationality",
        anket,
        nationality,
      );
      strArray?.length && nationalityArray.push(...strArray);
    }
    if (phone) {
      if (Array.isArray(phone)) {
        phone?.forEach((item) => {
          phoneArray.push({
            value: item.value || item,
            source: item.source || nameForFront[sourceNameId],
          });
        });
      } else {
        phoneArray.push({
          value: phone,
          source: nameForFront[sourceNameId],
        });
      }
    }
    if (phones) {
      if (Array.isArray(phones)) {
        phones?.forEach((item) => {
          phoneArray.push({
            value: item,
            source: nameForFront[sourceNameId],
          });
        });
      } else {
        phoneArray.push({
          value: phones,
          source: nameForFront[sourceNameId],
        });
      }
    }
    if (phone_home) {
      if (Array.isArray(phone_home)) {
        phone_home?.forEach((item) => {
          const strArray = splitDataToString(obj, "phone_home", anket, item);
          strArray?.length && homePhoneArray.push(...strArray);
        });
      } else {
        const strArray = splitDataToString(
          obj,
          "phone_home",
          anket,
          phone_home,
        );
        strArray?.length && homePhoneArray.push(...strArray);
      }
    }
    if (snils && snils !== " ") {
      if (Array.isArray(snils)) {
        snils?.forEach((item) => {
          const strArray = splitDataToString(obj, "snils", anket, item);
          strArray?.length && snilsArray.push(...strArray);
        });
      } else {
        const strArray = splitDataToString(obj, "snils", anket, snils);
        strArray?.length && snilsArray.push(...strArray);
      }
    }
    if (country && country !== " ") {
      if (Array.isArray(country)) {
        country?.forEach((item) => {
          const strArray = splitDataToString(obj, "country", anket, item);
          strArray?.length && countryArray.push(...strArray);
        });
      } else {
        const strArray = splitDataToString(obj, "country", anket, country);
        strArray?.length && countryArray.push(...strArray);
      }
    }
    if (osp && osp !== " ") {
      const strArray = splitDataToString(obj, "osp", anket, osp);
      strArray?.length && ospArray.push(...strArray);
    }
    if (debt_amount && debt_amount !== " ") {
      const strArray = splitDataToString(
        obj,
        "debt_amount",
        anket,
        debt_amount,
      );
      strArray?.length && debtArray.push(...strArray);
    }
    if (gender) {
      const strArray = splitDataToString(obj, "gender", anket, gender);
      strArray?.length && genderArray.push(...strArray);
    }
    if (secretAccess) {
      const strArray = splitDataToString(
        obj,
        "secretAccess",
        anket,
        secretAccess,
      );
      strArray?.length && secretAccessArray.push(...strArray);
    }
    if (topSecretAccessInfo) {
      const strArray = splitDataToString(
        obj,
        "topSecretAccessInfo",
        anket,
        topSecretAccessInfo,
      );
      strArray?.length && topSecretAccessInfoArray.push(...strArray);
    }
    if (diplWorkPlace) {
      const strArray = splitDataToString(
        obj,
        "diplWorkPlace",
        anket,
        diplWorkPlace,
      );
      strArray?.length && diplWorkPlaceArray.push(...strArray);
    }
    if (diplTopSecretInfo) {
      const strArray = splitDataToString(
        obj,
        "diplTopSecretInfo",
        anket,
        diplTopSecretInfo,
      );
      strArray?.length && diplTopSecretInfoArray.push(...strArray);
    }
    if (diplTopSecretDescription) {
      const strArray = splitDataToString(
        obj,
        "diplTopSecretDescription",
        anket,
        diplTopSecretDescription,
      );
      strArray?.length && diplTopSecretDescriptionArray.push(...strArray);
    }
    if (diplSecretAccess) {
      const strArray = splitDataToString(
        obj,
        "diplSecretAccess",
        anket,
        diplSecretAccess,
      );
      strArray?.length && diplSecretAccessArray.push(...strArray);
    }
    if (diplCountry) {
      const strArray = splitDataToString(
        obj,
        "diplCountry",
        anket,
        diplCountry,
      );
      strArray?.length && diplCountryArray.push(...strArray);
    }
    if (addressRegistrationDate) {
      const strArray = splitDataToString(
        obj,
        "addressRegistrationDate",
        anket,
        addressRegistrationDate,
      );
      strArray?.length && addressRegistrationDateArray.push(...strArray);
    }
    if (departureRestrictions) {
      const strArray = splitDataToString(
        obj,
        "departureRestrictions",
        anket,
        departureRestrictions,
      );
      strArray?.length && departureRestrictionsArray.push(...strArray);
    }
    if (dob) {
      if (Array.isArray(dob)) {
        dob.forEach((item) => {
          dobs.push({
            value: item.value || item,
            source: item.source || nameForFront[sourceNameId],
          });
        });
      } else {
        dobs.push({
          value: dob,
          source: nameForFront[sourceNameId],
        });
      }
    }
    const clearedAnket = removeEmptyValues(anket);
    Object.keys(clearedAnket)?.forEach((key) => {
      if (!newObj[key]) {
        delete newObj[key]; // remove all null from anket
      }
      if (newObj.hasOwnProperty(key)) {
        if (key === "photos") {
          photos?.avatars?.forEach((item) => {
            if (newObj?.photos?.avatars?.length) {
              existingObject?.photos?.displayPhotos.push(item);
            } else {
              existingObject?.photos?.avatars.push(item);
            }
          });
          photos?.displayPhotos?.forEach((item) => {
            newObj?.photos?.displayPhotos &&
              existingObject?.photos?.displayPhotos.push(item);
          });
          photos?.signatures?.forEach((item) => {
            if (newObj?.photos?.signatures?.length) {
              existingObject?.photos?.displayPhotos.push(item);
            } else {
              existingObject?.photos?.signatures.push(item);
            }
          });
        }
        // if (key === "phones") {
        //   phones.map((item) =>
        //     phoneArray.push({
        //       value: item,
        //       source: nameForFront[sourceNameId],
        //     }),
        //   );
        // }
        // if (key === "phones" && newObj["phone"]) {
        // phones.map((item) =>
        //   phoneArray.push({
        //     value: item,
        //     source: nameForFront[sourceNameId],
        //   }),
        // );
        // if (Array.isArray(newObj["phone"])) {
        //   phones.map((item) =>
        //     phoneArray.push({
        //       value: item,
        //       source: nameForFront[sourceNameId],
        //     }),
        //   );
        //   newObj["phone"].map((item) => phoneArray.push(...item));
        // }
        // else {
        //   phoneArray.push({
        //     value: newObj["phone"],
        //     source: nameForFront[sourceNameId],
        //   });
        //   phones.map((item) =>
        //     phoneArray.push({
        //       value: item,
        //       source: nameForFront[sourceNameId],
        //     }),
        //   );
        // }
        // }
        if (key === "phone_home" && newObj["phone_home"]) {
          if (
            Array.isArray(newObj["phone_home"]) &&
            Array.isArray(phone_home)
          ) {
            phone_home.map((item) => homePhoneArray.push(item));
            newObj["phone_home"]?.map((item) => homePhoneArray.push(item));
          } else {
            homePhoneArray.push(newObj["phone_home"]);
            homePhoneArray.push(phone_home);
          }
        }

        if (key === "jobHistory" && newObj["jobHistory"]) {
          jobHistory.map((item) => jobArray.push(item));
        }
        if (key === "documents" && newObj["documents"]) {
          documents?.map((item) => documentsArray.push(item));
        }
        if (key === "fsspList" && newObj["fsspList"]) {
          fsspList.map((item) => fsspListArray.push(item));
        }
        if (key === "beelinePhones" && newObj["beelinePhones"]) {
          beelinePhones.map((item) => beelineArray.push(item));
        }
        if (key === "kids" && newObj["kids"]) {
          kids?.map((item) => kidsArray.push(item));
        }
        if (key === "tutuPassengers" && newObj["tutuPassengers"]) {
          tutuPassengers?.map((item) => tutuPassengersArray.push(item));
        }
        if (key === "tutuReserveUsers" && newObj["tutuReserveUsers"]) {
          tutuReserveUsers?.map((item) => tutuReserveUsersArray.push(item));
        }
        if (key === "accounts" && newObj["accounts"]) {
          accounts.map((item) => accountsArray.push(item));
        }
        if (key === "insurancePolicies" && newObj["insurancePolicies"]) {
          insurancePolicies.map((item) => insurancePoliciesArray.push(item));
        }
        if (key === "accidents" && newObj["accidents"]) {
          accidents.map((item) => accidentsArray.push(item));
        }
        if (key === "numBusterTags" && newObj["numBusterTags"]) {
          numBusterTags.map((item) => numBusterTagsArray.push(item));
        }
        if (key === "relatedPhones" && newObj["relatedPhones"]) {
          relatedPhones.map((item) => relatedPhonesArray.push(item));
        }
        if (key === "getContactTags" && newObj["getContactTags"]) {
          getContactTags.map((item) => getContactTagsArray.push(item));
        }
        if (key === "militaryInfo" && !newObj["militaryInfo"]) {
          const str = anket[key].militaryService;
          militaryInfoStr.push(str);
          const removeDublicate = [...new Set(militaryInfoStr)];
          const militaryString = {
            militaryService: removeDublicate.join(",  "),
          };
          newObj.militaryInfo = militaryString;
        } else if (key === "militaryInfo" && newObj["militaryInfo"]) {
          const str = anket["militaryInfo"]?.militaryService;
          militaryInfoStr.push(newObj["militaryInfo"]?.militaryService);
          militaryInfoStr.push(str);
          const removeDublicate = [...new Set(militaryInfoStr)];
          const militaryString = {
            militaryService: removeDublicate.join(",  "),
          };
          newObj.militaryInfo = militaryString;
        }
        if (
          // added names from start anket
          key === "firstname" ||
          key === "lastname" ||
          key === "patronymic"
        ) {
          newObj[key] = obj[key];
        }
      } else if (key === "photos" && !newObj[key]) {
        photos?.avatars?.forEach((item) => {
          existingObject?.photos?.avatars.push(item);
          existingObject?.photos?.displayPhotos.push(item);
        });
        photos?.displayPhotos?.forEach((item) => {
          existingObject?.photos?.displayPhotos.push(item);
        });
        photos?.signatures?.forEach((item) => {
          existingObject?.photos?.signatures.push(item);
          existingObject?.photos?.displayPhotos.push(item);
        });
      } else if (key === "accidents" && !newObj["accidents"]) {
        accidents.map((item) => accidentsArray.push(item));
      } else if (key === "jobHistory" && !newObj["jobHistory"]) {
        jobHistory.map((item) => jobArray.push(item));
      } else if (key === "documents" && !newObj["documents"]) {
        documents?.map((item) => documentsArray.push(item));
      } else if (key === "fsspList" && !newObj["fsspList"]) {
        fsspList.map((item) => fsspListArray.push(item));
      } else if (key === "beelinePhones" && !newObj["beelinePhones"]) {
        beelinePhones.map((item) => beelineArray.push(item));
      } else if (key === "kids" && !newObj["kids"]) {
        kids?.map((item) => kidsArray.push(item));
      } else if (key === "tutuPassengers" && !newObj["tutuPassengers"]) {
        tutuPassengers?.map((item) => tutuPassengersArray.push(item));
      } else if (key === "tutuReserveUsers" && !newObj["tutuReserveUsers"]) {
        tutuReserveUsers?.map((item) => tutuReserveUsersArray.push(item));
      } else if (key === "accounts" && !newObj["accounts"]) {
        accounts.map((item) => accountsArray.push(item));
      } else if (key === "insurancePolicies" && !newObj["insurancePolicies"]) {
        insurancePolicies?.map((item) => insurancePoliciesArray.push(item));
      } else if (key === "numBusterTags" && !newObj["numBusterTags"]) {
        numBusterTags.map((item) => numBusterTagsArray.push(item));
      } else if (key === "getContactTags" && !newObj["getContactTags"]) {
        getContactTags.map((item) => getContactTagsArray.push(item));
      } else if (key === "relatedPhones" && !newObj["relatedPhones"]) {
        relatedPhones.map((item) => relatedPhonesArray.push(item));
      }
      // else if (key === "phones" && !newObj["phone"]) {
      //   phones.map((item) =>
      //     phoneArray.push({
      //       value: item,
      //       source: nameForFront[sourceNameId],
      //     }),
      //   );
      // }
      // else if (key === "phones" && newObj["phone"]) {
      //   if (Array.isArray(newObj["phone"])) {
      //     phones.map((item) =>
      //       phoneArray.push({
      //         value: item,
      //         source: nameForFront[sourceNameId],
      //       }),
      //     );
      //     newObj["phone"].map((item) =>
      //       phoneArray.push({
      //         value: item,
      //         source: nameForFront[sourceNameId],
      //       }),
      //     );
      //   } else {
      //     phoneArray.push({
      //       value: newObj["phone"],
      //       source: nameForFront[sourceNameId],
      //     });
      //     phones.map((item) =>
      //       phoneArray.push({
      //         value: item.toString(),
      //         source: nameForFront[sourceNameId],
      //       }),
      //     );
      //   }
      // }
      else {
        // newObj[key] = anket[key];
      }
    });
  });

  if (potentialNames?.length) {
    const lowercaseStrings = [
      ...(newObj["potentialNames"] || []),
      ...potentialNames,
    ]?.map((str) => ({
      value: normalizeName(str.value.toLowerCase()),
      source: str.source,
      dob: str.dob,
    }));
    const upperCaseStrings = lowercaseStrings?.map((str) => {
      const arr = str?.value?.split(/\s+/);
      const capitalizedArr = arr?.map(
        (word) => word?.charAt(0).toUpperCase() + word?.slice(1),
      );
      const str2 = capitalizedArr.join(" ");
      return { value: str2, source: str.source, dob: str.dob };
    });

    // Function to normalize names by replacing "ё" with "е"
    function normalizeName(name) {
      return name?.replace(/ё/g, "е");
    }
    function extractUniqueValues(data) {
      const uniqueValuesMap = new Map();
      data.forEach((item) => {
        const trimmedValue = item.value.trim();
        if (!uniqueValuesMap.has(trimmedValue)) {
          uniqueValuesMap.set(trimmedValue, {
            source: item.source,
            dob: item.dob,
          });
        }
      });
      const uniqueValuesWithSourceAndDOB = [];
      uniqueValuesMap.forEach((data, value) => {
        uniqueValuesWithSourceAndDOB.push({ value, ...data });
      });
      return uniqueValuesWithSourceAndDOB;
    }

    const uniquePotentialNames = extractUniqueValues(upperCaseStrings);
    newObj["potentialNames"] = uniquePotentialNames;
  }
  if (dobs?.length) {
    const formattedDobs = [...(newObj["dob"] || []), ...dobs]?.map((item) => {
      return { ...item, value: moment(item.value).format("YYYY-MM-DD") };
    });
    const uniqueDob = formattedDobs?.reduce((acc, curr) => {
      const found = acc.some(
        (item) => item.value.toString() === curr.value.toString(),
      );
      if (!found) {
        acc.push(curr);
      }
      return acc;
    }, []);
    newObj["dob"] = uniqueDob;
  }
  if (localPassportArray?.length && newObj["localPassport"]) {
    const uniqueArray = [...localPassportArray, newObj["localPassport"]].filter(
      (obj, index, self) =>
        index ===
        self.findIndex(
          (el) =>
            el.localPassportNumber?.toLowerCase().replace(/\s/g, "") ===
              obj.localPassportNumber?.toLowerCase().replace(/\s/g, "") &&
            el.localPassportSeries?.toLowerCase().replace(/\s/g, "") ===
              obj.localPassportSeries?.toLowerCase().replace(/\s/g, ""),
        ),
    );
    newObj["localPassportArray"] = uniqueArray;
    delete newObj["localPassport"];
  } else if (localPassportArray?.length && !newObj["localPassport"]) {
    const uniqueArray = localPassportArray.filter(
      (obj, index, self) =>
        index ===
        self.findIndex(
          (el) =>
            el.localPassportNumber?.toLowerCase().replace(/\s/g, "") ===
              obj.localPassportNumber?.toLowerCase().replace(/\s/g, "") &&
            el.localPassportSeries?.toLowerCase().replace(/\s/g, "") ===
              obj.localPassportSeries?.toLowerCase().replace(/\s/g, ""),
        ),
    );
    newObj["localPassportArray"] = uniqueArray;
    delete newObj["localPassport"];
  }
  if (foreignPassportArray?.length && newObj["foreignPassport"]) {
    const uniqueArray = [
      ...foreignPassportArray,
      newObj["foreignPassport"],
    ].filter(
      (obj, index, self) =>
        index ===
        self.findIndex(
          (el) =>
            el.foreignPassportNumber?.toLowerCase().replace(/\s/g, "") ===
            obj.foreignPassportNumber?.toLowerCase().replace(/\s/g, ""),
        ),
    );
    newObj["foreignPassportArray"] = uniqueArray;
    delete newObj["foreignPassport"];
  } else if (foreignPassportArray?.length && !newObj["foreignPassport"]) {
    const uniqueArray = foreignPassportArray.filter(
      (obj, index, self) =>
        index ===
        self.findIndex(
          (el) =>
            el.foreignPassportNumber?.toLowerCase().replace(/\s/g, "") ===
            obj.foreignPassportNumber?.toLowerCase().replace(/\s/g, ""),
        ),
    );
    newObj["foreignPassportArray"] = uniqueArray;
    delete newObj["foreignPassport"];
  }
  if (addressArray?.length) {
    newObj["addressArray"] = addressArray;
  }
  if (workPlaceAutoArray?.length) {
    newObj["workPlace"] = [...new Set(workPlaceAutoArray)];
  }
  if (diplCountryArray?.length) {
    newObj["diplCountry"] = [...new Set(diplCountryArray)];
  }
  if (passportAutoAddressArray?.length) {
    newObj["passportAddress"] = [...new Set(passportAutoAddressArray)];
  }
  if (passportAutoArray?.length) {
    newObj["passport"] = [...new Set(passportAutoArray)];
  }
  if (nationalityArray?.length) {
    newObj["nationality"] = [...new Set(nationalityArray)];
  }
  if (phoneArray?.length) {
    const validatePhones = phoneArray.map((item) => {
      return {
        ...item,
        value: parseAndValidatePhoneNumber(item.value).E164Format, ///validation number
      };
    });
    ///унікальність валідних номерів
    const uniqPhones = validatePhones?.reduce((acc, curr) => {
      const found = acc.some((item) => item.value === curr.value);
      if (!found) {
        acc.push(curr);
      }
      return acc;
    }, []);
    ///normalization via dadata
    await normalizePhones(uniqPhones, dispatch).then((res) => {
      const flatPhones = res
        ?.map(({ payload, meta }) => {
          return { ...payload, ...meta };
        })
        ?.flatMap(({ data, arg }) => {
          return {
            ...data?.[0],
            ...arg,
          };
        })
        ?.map((obj) => {
          return {
            value: obj.phone,
            source: obj.source,
            region: obj.region,
            provider: obj.provider,
            type: obj.type,
          };
        });
      const splitAllPhones = [
        ...(newObj["phone"] || []),
        ...(flatPhones?.length ? flatPhones : uniqPhones || []),
      ];

      ///uniqueness after dadata with previous phones
      const uniq = splitAllPhones?.reduce((acc, curr) => {
        const found = acc.some(
          (item) =>
            removeAllSpecialCharacters(item?.value) ===
            removeAllSpecialCharacters(curr?.value),
        );
        if (!found) {
          acc.push(curr);
        }
        return acc;
      }, []);
      newObj["phone"] = uniq;
    });
  }
  if (homePhoneArray?.length) {
    const ph = parseContacts(homePhoneArray).phones;
    newObj["phone_home"] = [...new Set(ph)];
  }
  if (passwordArray?.length) {
    newObj["password"] = [...new Set(passwordArray)];
  }
  if (mailruProfileArray?.length) {
    newObj["mailruProfile"] = [...new Set(mailruProfileArray)];
  }
  if (numBusterTagsArray.length && newObj["numBusterTags"]) {
    const uniqueArray = [...numBusterTagsArray, ...newObj["numBusterTags"]];
    newObj["numBusterTags"] = [...new Set(uniqueArray)];
  } else if (numBusterTagsArray.length && !newObj["numBusterTags"]) {
    const uniqueArray = [...new Set(numBusterTagsArray)];
    newObj["numBusterTags"] = uniqueArray;
  }
  if (insurancePoliciesArray?.length && newObj["insurancePolicies"]) {
    newObj["insurancePolicies"] = [
      ...insurancePoliciesArray,
      ...newObj["insurancePolicies"],
    ];
  } else if (insurancePoliciesArray?.length && !newObj["insurancePolicies"]) {
    newObj["insurancePolicies"] = insurancePoliciesArray;
  }
  if (getContactTagsArray.length && newObj["getContactTags"]) {
    const uniqueArray = [...getContactTagsArray, ...newObj["getContactTags"]];
    newObj["getContactTags"] = [...new Set(uniqueArray)];
  } else if (getContactTagsArray.length && !newObj["getContactTags"]) {
    const uniqueArray = [...new Set(getContactTagsArray)];
    newObj["getContactTags"] = uniqueArray;
  }
  if (relatedPhonesArray.length && newObj["relatedPhones"]) {
    const uniqueArray = [...relatedPhonesArray, ...newObj["relatedPhones"]];
    newObj["relatedPhones"] = [...new Set(uniqueArray)];
  }
  if (accidentsArray.length && newObj["accidents"]) {
    const uniqueArray = [...newObj["accidents"], ...accidentsArray];
    newObj["accidents"] = [...new Set(uniqueArray)];
  } else if (accidentsArray.length && !newObj["accidents"]) {
    const uniqueArray = [...new Set(accidentsArray)];
    newObj["accidents"] = uniqueArray;
  }
  if (fsspListArray.length) {
    const splitArrays = [...(newObj["fsspList"] || []), ...fsspListArray];
    const getMaxDebt = splitArrays.reduce((maxDebt, currentObject) => {
      const currentDebt = parseInt(currentObject.debt_amount);
      const maxDebtAmount = parseInt(maxDebt.debt_amount) || 0;
      return currentDebt > maxDebtAmount ? currentObject : maxDebt;
    }, {});
    newObj["fsspList"] = [getMaxDebt];
  }
  if (beelineArray.length) {
    const uniqueArray = getUniqueBeelinePhones([
      ...(newObj["beelinePhones"] || []),
      ...(beelineArray || []),
    ]);
    newObj["beelinePhones"] = [...uniqueArray];
  }

  if (kidsArray?.length && newObj["kids"]) {
    newObj["kids"] = [...(kidsArray || []), ...(newObj["kids"] || [])].filter(
      (obj, index, self) =>
        index ===
        self.findIndex(
          (el) =>
            el.dob === obj.dob &&
            el.firstname === obj.firstname &&
            el.inn === obj.inn &&
            el.snils === obj.snils &&
            el.patronymic === obj.patronymic &&
            el.lastname === obj.lastname,
        ),
    );
  } else {
    newObj["kids"] = kidsArray;
  }
  if (tutuPassengersArray.length && newObj["tutuPassengers"]) {
    newObj["tutuPassengers"] = [
      ...(tutuPassengersArray || []),
      ...(newObj["tutuPassengers"] || []),
    ];
  } else {
    newObj["tutuPassengers"] = [...tutuPassengersArray];
  }
  if (tutuReserveUsersArray.length && newObj["tutuReserveUsers"]) {
    newObj["tutuReserveUsers"] = [
      ...(tutuReserveUsersArray || []),
      ...(newObj["tutuReserveUsers"] || []),
    ];
  } else {
    newObj["tutuReserveUsers"] = [...tutuReserveUsersArray];
  }

  if (documentsArray.length) {
    const findAllWithIssue = [
      ...(newObj["documents"] || []),
      ...(documentsArray || []),
    ]?.filter(({ dcmIssueWhere }) => dcmIssueWhere);

    if (!findAllWithIssue?.length) {
      newObj["documents"] = getUniqueDocuments([
        ...(newObj["documents"] || []),
        ...(documentsArray || []),
      ]);
    } else {
      newObj["documents"] = getUniqueDocuments(findAllWithIssue);
    }
  }
  if (accountsArray?.length && newObj["accounts"]) {
    newObj["accounts"] = [...accountsArray, ...newObj["accounts"]];
  } else if (accountsArray.length && !newObj["accounts"]) {
    newObj["accounts"] = accountsArray;
  }
  if (jobArray?.length && newObj["jobHistory"]) {
    const uniqueArray = [...jobArray, ...newObj["jobHistory"]].filter(
      (obj, index, self) =>
        index ===
        self.findIndex(
          (el) =>
            el.organizationAddress === obj.organizationAddress &&
            el.info === obj.info &&
            el.hireDate === obj.hireDate &&
            el.fireDate === obj.fireDate,
        ),
    );
    newObj["jobHistory"] = uniqueArray;
    delete newObj["jobArray"];
  } else if (jobArray.length && !newObj["jobHistory"]) {
    const uniqueArray = jobArray.filter(
      (obj, index, self) =>
        index ===
        self.findIndex(
          (el) =>
            el.organizationAddress === obj.organizationAddress &&
            el.info === obj.info &&
            el.hireDate === obj.hireDate &&
            el.fireDate === obj.fireDate,
        ),
    );
    newObj["jobHistory"] = uniqueArray;
    delete newObj["jobArray"];
  }
  if (innArray?.length) {
    newObj["inn"] = [...new Set(innArray)];
  }
  if (postArray?.length) {
    newObj["post"] = [...new Set(postArray)];
  }
  if (serialSimArray?.length) {
    newObj["serialSim"] = [...new Set(serialSimArray)];
  }
  if (passportNumberArray?.length) {
    newObj["passportNumber"] = [...new Set(passportNumberArray)];
  }
  if (passportIssuedByArray?.length) {
    newObj["passportIssuedBy"] = [...new Set(passportIssuedByArray)];
  }
  if (insuranceNumberArray?.length) {
    newObj["insuranceNumber"] = [...new Set(insuranceNumberArray)];
  }
  if (insuranceCompanyArray?.length) {
    newObj["insuranceCompany"] = [...new Set(insuranceCompanyArray)];
  }
  if (imsiArray?.length) {
    newObj["imsi"] = [...new Set(imsiArray)];
  }
  if (ipArray?.length) {
    newObj["ip"] = [...new Set(ipArray)];
  }
  if (loginArray?.length) {
    newObj["login"] = [...new Set(loginArray)];
  }
  if (familyStatusArray?.length) {
    newObj["family_status"] = [...new Set(familyStatusArray)];
  }
  if (workPhoneArray?.length) {
    newObj["work_phone"] = [...new Set(workPhoneArray)];
  }
  if (creditAmountArray?.length) {
    newObj["credit_amount"] = [...new Set(creditAmountArray)];
  }
  if (linkedinLinkArray?.length) {
    newObj["linkedinLink"] = [...new Set(linkedinLinkArray)];
  }
  if (deliveryAvatarArray?.length) {
    newObj["deliveryAvatar"] = [...new Set(deliveryAvatarArray)];
  }
  if (diplSecretAccessArray?.length) {
    newObj["diplSecretAccess"] = [...new Set(diplSecretAccessArray)];
  }
  if (placeOfBirthArray.length) {
    newObj["placeOfBirth"] = [...new Set(placeOfBirthArray)];
  }
  if (diplTopSecretDescriptionArray?.length) {
    newObj["diplTopSecretDescription"] = [
      ...new Set(diplTopSecretDescriptionArray),
    ];
  }
  if (departureRestrictionsArray?.length) {
    newObj["departureRestrictions"] = [...new Set(departureRestrictionsArray)];
  }
  if (addressRegistrationDateArray?.length) {
    newObj["addressRegistrationDateArray"] = addressRegistrationDateArray;
  }
  if (snilsArray?.length) {
    newObj["snils"] = [...new Set(snilsArray)];
  }
  if (countryArray?.length) {
    newObj["country"] = [...new Set(countryArray)];
  }
  if (ospArray?.length) {
    newObj["osp"] = [...new Set(ospArray)];
  }
  if (debtArray?.length) {
    newObj["debt_amount"] = [...new Set(debtArray)];
  }

  if (emailsArray?.length) {
    const lowercaseStrings = [...(newObj["email"] || []), ...emailsArray]?.map(
      (str) => ({
        value: str.value?.replace(/\s/g, "")?.toLowerCase(),
        source: str.source,
      }),
    );
    const uniqueEmails = lowercaseStrings?.reduce((acc, curr) => {
      const found = acc.some((item) => item.value === curr.value);
      if (!found) {
        acc.push(curr);
      }
      return acc;
    }, []);
    newObj["email"] = uniqueEmails;
  }
  if (secretAccessArray?.length) {
    newObj["secretAccess"] = [...new Set(secretAccessArray)];
  }
  if (topSecretAccessInfoArray?.length) {
    newObj["topSecretAccessInfo"] = [...new Set(topSecretAccessInfoArray)];
  }
  if (diplWorkPlaceArray?.length) {
    newObj["diplWorkPlace"] = [...new Set(diplWorkPlaceArray)];
  }
  if (diplTopSecretInfoArray?.length) {
    newObj["diplTopSecretInfo"] = [...new Set(diplTopSecretInfoArray)];
  }
  if (genderArray?.length) {
    newObj["gender"] = [...new Set(genderArray)];
  }
  if (addressDeliveryArray?.length) {
    newObj["address"] = [...new Set(addressDeliveryArray)];
  }
  if (vkArray?.length) {
    newObj["vkId"] = [...new Set(vkArray)];
  }
  if (webLinkArray?.length) {
    newObj["webLink"] = [...new Set(webLinkArray)];
  }
  if (someDocumentArray?.length) {
    newObj["someDocument"] = [...new Set(someDocumentArray)];
  }
  if (facebookIdArray?.length) {
    newObj["facebookId"] = [...new Set(facebookIdArray)];
  }
  if (sourceNameArray?.length) {
    newObj["sourceName"] = [...new Set(sourceNameArray)];
  }
  try {
    if (
      existingObject?.photos?.avatars?.length ||
      existingObject?.photos?.signatures?.length ||
      existingObject?.photos?.displayPhotos?.length
    ) {
      let removeDublicate = {
        avatars: [
          ...new Set([
            ...(existingObject?.photos?.avatars?.filter(Boolean) || []),
            ...(newObj?.photos?.avatars?.filter(Boolean) || []),
          ]),
        ],
        displayPhotos: [
          ...new Set([
            ...(existingObject?.photos?.displayPhotos?.filter(Boolean) || []),
            ...(newObj?.photos?.displayPhotos?.filter(Boolean) || []),
          ]),
        ],
        signatures: [
          ...new Set([
            ...(existingObject?.photos?.signatures?.filter(Boolean) || []),
            ...(newObj?.photos?.signatures?.filter(Boolean) || []),
          ]),
        ],
      };
      newObj.photos = removeDublicate;
    }
  } catch (err) {
    console.log(err, "err");
  }
  return newObj;
};

export const splitObjects = (obj1, obj2) => {
  if (Object.keys(obj1)?.length === 0) {
    return obj2;
  } else if (Object.keys(obj2)?.length === 0) {
    return obj1;
  } else {
    return { ...obj1, ...obj2 };
  }
};
export const splitArrays = (...arrays) => {
  const nonEmptyArrays = arrays.filter((arr) => arr?.length > 0);
  return nonEmptyArrays.flat();
};

export const removeDuplicatesFromArray = (originArray) => {
  let tempArray = originArray;
  let uniqueObjects = [];
  let uniquePropertiesMap = new Map();
  Array.from(new Set(originArray?.flatMap((e) => Object.keys(e))))?.forEach(
    (k) => {
      const tmp = [];

      tempArray = tempArray.map(({ ...obj }) => {
        if (typeof obj[k] === "object" && obj[k] !== null) {
          const uniqueProperties = {};
          const mergedObject = {};

          for (const [key, value] of Object.entries(obj[k])) {
            const propertyKey = JSON.stringify(value);
            if (uniquePropertiesMap.has(propertyKey)) delete obj[k][key];
            if (!uniquePropertiesMap.has(propertyKey)) {
              uniquePropertiesMap.set(propertyKey, true);
              uniqueProperties[key] = value;
            }
          }

          Object.assign(mergedObject, uniqueProperties);
          uniqueObjects.push(mergedObject);

          if (!Object.keys(obj[k])?.length) {
            delete obj[k];
          }
        }
        if (Array.isArray(obj[k])) {
          removeDuplicatesFromArray(obj[k]);
        }
        if (obj[k] === "" || obj[k] === " " || !obj[k]) {
          delete obj[k];
        }

        if (tmp.includes(obj[k])) delete obj[k];
        else tmp.push(obj[k]);
        return obj;
      });
    },
  );
  return tempArray?.filter((e) => Object.keys(e)?.length);
};
