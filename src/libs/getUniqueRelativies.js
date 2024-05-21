/**
 * filtered data
 * @param array
 * @returns unique array
 */

export const getUniqueRelativies = (array) => {
  const uniqueArray = array?.filter(
    (obj, index, self) =>
      index ===
      self.findIndex(
        (el) =>
          el?.firstname === obj?.firstname &&
          el?.lastname === obj?.lastname &&
          el?.patronymic === obj?.patronymic &&
          el?.dob === obj?.dob,
      ),
  );
  return uniqueArray;
};
