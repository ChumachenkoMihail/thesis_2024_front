import PhoneNumber from "awesome-phonenumber";

function cleanPhoneNumber(number) {
  // Удаление всех символов, кроме цифр
  return number?.toString()?.replace(/\D/g, "") || "";
}
function formatPhoneNumberResponse(phoneNumber) {
  return {
    valid: true,
    internationalFormat: cleanPhoneNumber(
      phoneNumber.getNumber("international"),
    ),
    nationalFormat: cleanPhoneNumber(phoneNumber.getNumber("national")),
    E164Format: phoneNumber.getNumber("e164"),
    countryCode: phoneNumber.getRegionCode(),
    nationalNumber: phoneNumber.getNumber("national"),
    significant: phoneNumber.getNumber("significant"),
  };
}

// возможные варианты стран, RU должна быть всегда на первом месте!!!!,
const countryCodes = [
  "RU",
  "UA",
  "BY",
  "CZ",
  "EE",
  "PL",
  "DE",
  "FI",
  "LT",
  "LV",
  "KZ",
  "LA",
  "CN",
  "AZ",
  "TR",
];
export function parseAndValidatePhoneNumber(rawNumber) {
  let number = cleanPhoneNumber(rawNumber);
  if (number?.length < 9) {
    return { valid: false, message: "Номер телефона невалиден" };
  }
  if (number.startsWith("7") && number.length > 11) {
    return {
      valid: true,
      internationalFormat: number,
      nationalFormat: cleanPhoneNumber(number),
      E164Format: number,
      countryCode: number,
      nationalNumber: number,
      significant: number,
    };
  }

  let pn = new PhoneNumber(number);

  // Сначала пытаемся валидировать без указания страны
  if (pn?.isValid()) {
    return formatPhoneNumberResponse(pn);
  }

  // Попытка валидации с разными кодами стран
  for (const countryCode of countryCodes) {
    pn = new PhoneNumber(number, { regionCode: countryCode });
    if (pn?.isValid()) {
      return formatPhoneNumberResponse(pn);
    } else {
      return {
        valid: false,
        internationalFormat: rawNumber,
        nationalFormat: rawNumber,
        E164Format: rawNumber,
        countryCode: rawNumber,
        nationalNumber: rawNumber,
        significant: rawNumber,
      };
    }
  }

  // Если номер невалиден для всех стран
  return { valid: false, message: "Номер телефона невалиден" };
}
