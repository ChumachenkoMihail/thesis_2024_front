/**
 * filtered data
 * @param array
 * @returns unique array
 */

export const getUniqueAuto = (array) => {
  const uniqueArray = array?.filter(
    (obj, index, self) =>
      index ===
      self.findIndex(
        (el) =>
          el?.plateNumber === obj?.plateNumber && el?.phone === obj?.phone,
      ),
  );
  return uniqueArray;
};
