/**
 * filtered data
 * @param array
 * @returns unique array
 */

export const getUniqueDocuments = (array) => {
  const uniqueArray = array?.filter(
    (obj, index, self) =>
      index ===
      self.findIndex(
        (el) =>
          el?.dcmSerialNo?.toString() === obj?.dcmSerialNo?.toString() &&
          el?.dcmIssueWhere?.toString() === obj?.dcmIssueWhere?.toString() &&
          el?.dcmNumber?.toString() === obj?.dcmNumber?.toString(),
      ),
  );
  return uniqueArray;
};
