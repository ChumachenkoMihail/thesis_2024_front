/**
 * filtered data
 * @param array
 * @returns unique array
 */

export const getUniqueBeelinePhones = (array) => {
  const uniqueArray = array?.filter(
    (obj, index, self) =>
      index ===
      self.findIndex(
        (el) => el?.phone === obj?.phone && el?.finRole === obj?.finRole,
      ),
  );
  return uniqueArray;
};
