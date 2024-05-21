/**
 *
 * @param [] phones numbers
 * @returns unique array with phones code
 */

export const findUniquePhoneNumbers = (phoneNumbers) => {
  const uniquePhones = Object.entries(
    Object.fromEntries(
      phoneNumbers
        ?.filter((el) => el !== "null")
        ?.map((n) => {
          let replaceSpecificCode = n.replace("798", "98");
          const [_, code, phone] = replaceSpecificCode.match(/\+?(\d{2})(.+)/);
          return [phone, code];
        }),
    ),
  ).map(([phone, code]) => code + phone);
  return uniquePhones;
};
