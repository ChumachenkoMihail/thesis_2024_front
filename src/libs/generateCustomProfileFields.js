import moment from "moment";
import { parseContacts } from "libs/parseApi";

function removeIds(obj) {
  if (Array.isArray(obj)) {
    // If it's an array, create a new array and iterate through its elements
    return obj.map((item) => removeIds(item));
  } else if (typeof obj === "object") {
    // If it's an object, create a new object and iterate through its properties
    const newObj = {};
    for (const key in obj) {
      if (key !== "id" && obj[key] !== null) {
        // Exclude the 'id' key and properties with null values
        newObj[key] = removeIds(obj[key]);
      }
    }
    return newObj;
  }
  return obj;
}

export const generateCustomProfileFields = (fieldsIds, anketData) => {
  const extractedValues = {};
  fieldsIds.forEach((key) => {
    extractedValues[key] = anketData[key];
  });

  if (extractedValues.hasOwnProperty("newAuto")) {
    const withoutIds = removeIds(extractedValues?.newAuto);
    extractedValues.newAuto = withoutIds || {};
  }

  if (
    extractedValues.hasOwnProperty("firstname") ||
    extractedValues.hasOwnProperty("lastname") ||
    extractedValues.hasOwnProperty("fio") ||
    extractedValues.hasOwnProperty("patronymic")
  ) {
    const nameParts = [];
    if (extractedValues.hasOwnProperty("fio")) {
      nameParts.push(extractedValues.fio);
      delete extractedValues.fio;
    }
    if (extractedValues.hasOwnProperty("lastname")) {
      nameParts.push(extractedValues.lastname);
      delete extractedValues.lastname;
    }
    if (extractedValues.hasOwnProperty("firstname")) {
      nameParts.push(extractedValues.firstname);
      delete extractedValues.firstname;
    }
    if (extractedValues.hasOwnProperty("patronymic")) {
      nameParts.push(extractedValues.patronymic);
      delete extractedValues.patronymic;
    }
    extractedValues.userName = [nameParts.join(" ")];
  }
  if (extractedValues.hasOwnProperty("militaryInfo")) {
    extractedValues.militaryInfo = [
      extractedValues?.militaryInfo?.militaryService,
    ];
  }
  if (extractedValues.hasOwnProperty("localPassport")) {
    extractedValues.localPassportArray = [extractedValues.localPassport];
    delete extractedValues.localPassport;
  }
  if (extractedValues.hasOwnProperty("foreignPassport")) {
    extractedValues.foreignPassportArray = [extractedValues.foreignPassport];
    delete extractedValues.foreignPassport;
  }
  if (extractedValues.hasOwnProperty("photos")) {
    if (extractedValues?.photos?.avatars) {
      extractedValues.avatar = extractedValues?.photos?.avatars[0];
    }
    const valuesArray = [];
    Object.values(extractedValues.photos).forEach((value) => {
      if (Array.isArray(value)) {
        valuesArray.push(...value);
      } else {
        valuesArray.push(value);
      }
      delete extractedValues.photos;
      extractedValues.photos = [...new Set(valuesArray)];
    });
  }
  if (extractedValues.hasOwnProperty("addressInfo")) {
    // address to one string
    const addressParts = [];
    addressParts.push(extractedValues.addressInfo?.country);
    addressParts.push(extractedValues.addressInfo?.region);
    addressParts.push(extractedValues.addressInfo?.province);
    addressParts.push(extractedValues.addressInfo?.locality);
    addressParts.push(extractedValues.addressInfo?.town);
    addressParts.push(extractedValues.addressInfo?.address);
    addressParts.push(extractedValues.addressInfo?.street);
    extractedValues.addressInfo?.house &&
      addressParts.push(`Дом ${extractedValues.addressInfo?.house},`);
    extractedValues.addressInfo?.housing &&
      addressParts.push(`Корпус ${extractedValues.addressInfo?.housing},`);
    extractedValues.addressInfo?.flat &&
      addressParts.push(`кв ${extractedValues.addressInfo?.flat},`);
    extractedValues.addressInfo?.postindex &&
      addressParts.push(`Индекс ${extractedValues.addressInfo?.postindex},`);
    addressParts.push(extractedValues.addressInfo?.building);
    delete extractedValues.addressInfo;
    extractedValues.userAddress = [addressParts.join(" ")];
  }
  if (extractedValues.hasOwnProperty("addressArray")) {
    // addressArray item to one string
    const addressPartsArray = [];
    extractedValues.addressArray.map((item) => {
      const addressStr = `${item?.country ? `${item?.country},` : ""}${
        item?.region ? `${item?.region},` : ""
      }${item?.province ? `${item?.province},` : ""}${
        item?.locality ? item?.locality : ""
      }${item?.town ? item?.town : ""}${item?.address ? item?.address : ""}${
        item?.street ? item?.street : ""
      }${item?.house ? `Дом ${item.house}` : ""}${
        item?.housing ? `Корпус ${item.housing}` : ""
      }${item?.flat ? `кв ${item.flat}` : ""}${
        item?.postindex ? `Индекс ${item.postindex}` : ""
      }${item?.building ? item.building : ""}`;
      addressPartsArray.push(addressStr);
    });
    delete extractedValues.addressArray;
    extractedValues.addressArray = addressPartsArray;
  }
  if (extractedValues.hasOwnProperty("potentialNames")) {
    extractedValues.potentialNames = extractedValues.potentialNames.map(
      (item) => item.value,
    );
  }
  if (extractedValues.hasOwnProperty("passport_number")) {
    extractedValues.passportNumber = extractedValues.passport_number;
  }
  if (extractedValues.hasOwnProperty("addressRegistrationDate")) {
    if (Array.isArray(extractedValues?.addressRegistrationDate)) {
      const formatedDates = extractedValues.addressRegistrationDate.map(
        (item) => moment(item).format("YYYY-MM-DD"),
      );
      extractedValues.addressRegistrationDate = formatedDates;
    } else {
      extractedValues.addressRegistrationDate = [
        moment(extractedValues.addressRegistrationDate).format("YYYY-MM-DD"),
      ];
    }
  }
  if (extractedValues.hasOwnProperty("addressRegistrationDateArray")) {
    if (Array.isArray(extractedValues?.addressRegistrationDateArray)) {
      const formatedDates = extractedValues.addressRegistrationDateArray.map(
        (item) => moment(item).format("YYYY-MM-DD"),
      );
      extractedValues.addressRegistrationDateArray = formatedDates;
    }
  }
  if (extractedValues.hasOwnProperty("dob")) {
    if (Array.isArray(extractedValues?.dob)) {
      const formattedDobs = extractedValues.dob.map((item) =>
        moment(item.value).format("YYYY-MM-DD"),
      );
      extractedValues.dob = formattedDobs;
    } else {
      extractedValues.dob = [moment(extractedValues.dob).format("YYYY-MM-DD")];
    }
  }
  if (extractedValues.hasOwnProperty("inn")) {
    if (Array.isArray(extractedValues?.inn)) {
      extractedValues.inn = extractedValues?.inn;
    } else {
      extractedValues.inn = [extractedValues?.inn];
    }
  }
  if (extractedValues.hasOwnProperty("name")) {
    if (Array.isArray(extractedValues?.name)) {
      extractedValues.name = extractedValues?.name;
    } else {
      extractedValues.name = [extractedValues?.name];
    }
  }
  if (extractedValues.hasOwnProperty("snils")) {
    if (Array.isArray(extractedValues?.snils)) {
      extractedValues.snils = extractedValues?.snils;
    } else {
      extractedValues.snils = [extractedValues?.snils];
    }
  }
  if (extractedValues.hasOwnProperty("passport")) {
    if (Array.isArray(extractedValues?.passport)) {
      extractedValues.passport = extractedValues?.passport;
    } else {
      extractedValues.passport = [extractedValues?.passport];
    }
  }
  if (extractedValues.hasOwnProperty("passportAddress")) {
    if (Array.isArray(extractedValues?.passportAddress)) {
      extractedValues.passportAddress = extractedValues?.passportAddress;
    } else {
      extractedValues.passportAddress = [extractedValues?.passportAddress];
    }
  }
  if (
    extractedValues.hasOwnProperty("work_phone") ||
    extractedValues.hasOwnProperty("phone") ||
    extractedValues.hasOwnProperty("phone_home") ||
    extractedValues.hasOwnProperty("beelinePhones")
  ) {
    const allParcedNumbers = parseContacts(
      [
        ...(Array.isArray(extractedValues?.phone)
          ? extractedValues?.phone.map((item) => item.value)
          : [extractedValues?.phone]),
        ...(Array.isArray(extractedValues?.work_phone)
          ? extractedValues?.work_phone
          : [extractedValues?.work_phone]),
        ...(Array.isArray(extractedValues?.phone_home)
          ? extractedValues?.phone_home
          : [extractedValues?.phone_home]),
        ...(Array.isArray(extractedValues?.beelinePhones)
          ? extractedValues?.beelinePhones
          : [extractedValues?.beelinePhones]),
      ].filter(Boolean),
    ).phones;
    extractedValues.phone = [...new Set(allParcedNumbers)];
  }

  if (extractedValues.hasOwnProperty("nationality")) {
    if (Array.isArray(extractedValues?.nationality)) {
      extractedValues.nationality = extractedValues?.nationality;
    } else {
      extractedValues.nationality = [extractedValues?.nationality];
    }
  }
  if (extractedValues.hasOwnProperty("imsi")) {
    if (Array.isArray(extractedValues?.imsi)) {
      extractedValues.imsi = extractedValues?.imsi;
    } else {
      extractedValues.imsi = [extractedValues?.imsi];
    }
  }
  if (extractedValues.hasOwnProperty("serialSim")) {
    if (Array.isArray(extractedValues?.serialSim)) {
      extractedValues.serialSim = extractedValues?.serialSim;
    } else {
      extractedValues.serialSim = [extractedValues?.serialSim];
    }
  }
  if (extractedValues.hasOwnProperty("gender")) {
    if (Array.isArray(extractedValues?.gender)) {
      extractedValues.gender = extractedValues?.gender;
    } else {
      extractedValues.gender = [extractedValues?.gender];
    }
  }
  if (extractedValues.hasOwnProperty("diplSecretAccess")) {
    if (Array.isArray(extractedValues?.diplSecretAccess)) {
      extractedValues.diplSecretAccess = extractedValues?.diplSecretAccess;
    } else {
      extractedValues.diplSecretAccess = [extractedValues?.diplSecretAccess];
    }
  }
  if (extractedValues.hasOwnProperty("placeOfBirth")) {
    if (Array.isArray(extractedValues?.placeOfBirth)) {
      extractedValues.placeOfBirth = extractedValues?.placeOfBirth;
    } else {
      extractedValues.placeOfBirth = [extractedValues?.placeOfBirth];
    }
  }
  if (extractedValues.hasOwnProperty("departureRestrictions")) {
    if (Array.isArray(extractedValues?.departureRestrictions)) {
      extractedValues.departureRestrictions =
        extractedValues?.departureRestrictions;
    } else {
      extractedValues.departureRestrictions = [
        extractedValues?.departureRestrictions,
      ];
    }
  }
  if (extractedValues.hasOwnProperty("diplCountry")) {
    if (Array.isArray(extractedValues?.diplCountry)) {
      extractedValues.diplCountry = extractedValues?.diplCountry;
    } else {
      extractedValues.diplCountry = [extractedValues?.diplCountry];
    }
  }
  if (extractedValues.hasOwnProperty("diplSecretAccess")) {
    if (Array.isArray(extractedValues?.diplSecretAccess)) {
      extractedValues.diplSecretAccess = extractedValues?.diplSecretAccess;
    } else {
      extractedValues.diplSecretAccess = [extractedValues?.diplSecretAccess];
    }
  }
  if (extractedValues.hasOwnProperty("diplTopSecretDescription")) {
    if (Array.isArray(extractedValues?.diplTopSecretDescription)) {
      extractedValues.diplTopSecretDescription =
        extractedValues?.diplTopSecretDescription;
    } else {
      extractedValues.diplTopSecretDescription = [
        extractedValues?.diplTopSecretDescription,
      ];
    }
  }
  if (extractedValues.hasOwnProperty("diplTopSecretInfo")) {
    if (Array.isArray(extractedValues?.diplTopSecretInfo)) {
      extractedValues.diplTopSecretInfo = extractedValues?.diplTopSecretInfo;
    } else {
      extractedValues.diplTopSecretInfo = [extractedValues?.diplTopSecretInfo];
    }
  }
  if (extractedValues.hasOwnProperty("diplWorkPlace")) {
    if (Array.isArray(extractedValues?.diplWorkPlace)) {
      extractedValues.diplWorkPlace = extractedValues?.diplWorkPlace;
    } else {
      extractedValues.diplWorkPlace = [extractedValues?.diplWorkPlace];
    }
  }
  if (extractedValues.hasOwnProperty("secretAccess")) {
    if (Array.isArray(extractedValues?.secretAccess)) {
      extractedValues.secretAccess = extractedValues?.secretAccess;
    } else {
      extractedValues.secretAccess = [extractedValues?.secretAccess];
    }
  }
  if (extractedValues.hasOwnProperty("topSecretAccessInfo")) {
    if (Array.isArray(extractedValues?.topSecretAccessInfo)) {
      extractedValues.topSecretAccessInfo =
        extractedValues?.topSecretAccessInfo;
    } else {
      extractedValues.topSecretAccessInfo = [
        extractedValues?.topSecretAccessInfo,
      ];
    }
  }
  if (extractedValues.hasOwnProperty("email")) {
    if (Array.isArray(extractedValues?.email)) {
      extractedValues.email = extractedValues?.email.map((item) => item.value);
    } else {
      extractedValues.email = [extractedValues?.email];
    }
  }
  if (extractedValues.hasOwnProperty("workPlace")) {
    if (Array.isArray(extractedValues?.workPlace)) {
      extractedValues.workPlace = extractedValues?.workPlace;
    } else {
      extractedValues.workPlace = [extractedValues?.workPlace];
    }
  }
  if (extractedValues.hasOwnProperty("address")) {
    if (Array.isArray(extractedValues?.address)) {
      extractedValues.address = extractedValues?.address;
    } else {
      extractedValues.address = [extractedValues?.address];
    }
  }
  if (extractedValues.hasOwnProperty("deliveryAvatar")) {
    if (Array.isArray(extractedValues?.deliveryAvatar)) {
      extractedValues.deliveryAvatar = extractedValues?.deliveryAvatar;
    } else {
      extractedValues.deliveryAvatar = [extractedValues?.deliveryAvatar];
    }
  }
  if (extractedValues.hasOwnProperty("facebookId")) {
    if (Array.isArray(extractedValues?.facebookId)) {
      extractedValues.facebookId = extractedValues?.facebookId;
    } else {
      extractedValues.facebookId = [extractedValues?.facebookId];
    }
  }
  if (extractedValues.hasOwnProperty("vkId")) {
    if (Array.isArray(extractedValues?.vkId)) {
      extractedValues.vkId = extractedValues?.vkId;
    } else {
      extractedValues.vkId = [extractedValues?.vkId];
    }
  }
  if (extractedValues.hasOwnProperty("ip")) {
    if (Array.isArray(extractedValues?.ip)) {
      extractedValues.ip = extractedValues?.ip;
    } else {
      extractedValues.ip = [extractedValues?.ip];
    }
  }
  if (extractedValues.hasOwnProperty("linkedinLink")) {
    if (Array.isArray(extractedValues?.linkedinLink)) {
      extractedValues.linkedinLink = extractedValues?.linkedinLink;
    } else {
      extractedValues.linkedinLink = [extractedValues?.linkedinLink];
    }
  }
  if (extractedValues.hasOwnProperty("login")) {
    if (Array.isArray(extractedValues?.login)) {
      extractedValues.login = extractedValues?.login;
    } else {
      extractedValues.login = [extractedValues?.login];
    }
  }
  if (extractedValues.hasOwnProperty("mailruProfile")) {
    if (Array.isArray(extractedValues?.mailruProfile)) {
      extractedValues.mailruProfile = extractedValues?.mailruProfile;
    } else {
      extractedValues.mailruProfile = [extractedValues?.mailruProfile];
    }
  }
  if (extractedValues.hasOwnProperty("password")) {
    if (Array.isArray(extractedValues?.password)) {
      extractedValues.password = extractedValues?.password;
    } else {
      extractedValues.password = [extractedValues?.password];
    }
  }
  if (extractedValues.hasOwnProperty("actualAddress")) {
    if (Array.isArray(extractedValues?.actualAddress)) {
      extractedValues.address = extractedValues?.actualAddress;
    } else {
      extractedValues.address = [extractedValues?.actualAddress];
    }
  }
  if (extractedValues.hasOwnProperty("insuranceCompany")) {
    if (Array.isArray(extractedValues?.insuranceCompany)) {
      extractedValues.insuranceCompany = extractedValues?.insuranceCompany;
    } else {
      extractedValues.insuranceCompany = [extractedValues?.insuranceCompany];
    }
  }
  if (extractedValues.hasOwnProperty("passportIssuedBy")) {
    if (Array.isArray(extractedValues?.passportIssuedBy)) {
      extractedValues.passportIssuedBy = extractedValues?.passportIssuedBy;
    } else {
      extractedValues.passportIssuedBy = [extractedValues?.passportIssuedBy];
    }
  }
  if (extractedValues.hasOwnProperty("passportNumber")) {
    if (Array.isArray(extractedValues?.passportNumber)) {
      extractedValues.passportNumber = extractedValues?.passportNumber;
    } else {
      extractedValues.passportNumber = [extractedValues?.passportNumber];
    }
  }
  if (extractedValues.hasOwnProperty("insuranceNumber")) {
    if (Array.isArray(extractedValues?.insuranceNumber)) {
      extractedValues.insuranceNumber = extractedValues?.insuranceNumber;
    } else {
      extractedValues.insuranceNumber = [extractedValues?.insuranceNumber];
    }
  }
  if (extractedValues.hasOwnProperty("someDocument")) {
    if (Array.isArray(extractedValues?.someDocument)) {
      extractedValues.someDocument = extractedValues?.someDocument;
    } else {
      extractedValues.someDocument = [extractedValues?.someDocument];
    }
  }
  if (extractedValues.hasOwnProperty("sourceName")) {
    if (Array.isArray(extractedValues?.sourceName)) {
      extractedValues.sourceName = extractedValues?.sourceName;
    } else {
      extractedValues.sourceName = [extractedValues?.sourceName];
    }
  }
  if (extractedValues.hasOwnProperty("webLink")) {
    if (Array.isArray(extractedValues?.webLink)) {
      extractedValues.webLink = extractedValues?.webLink;
    } else {
      extractedValues.webLink = [extractedValues?.webLink];
    }
  }
  return extractedValues;
};
