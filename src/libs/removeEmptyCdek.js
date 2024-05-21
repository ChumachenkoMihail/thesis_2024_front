/**
 * filtered data
 * @param array
 * @returns unique array
 */

export const getUniqueCdek = (array) => {
  const uniqueArray = array?.filter(
    (obj, index, self) =>
      index ===
      self.findIndex(
        (el) =>
          el?.addressString === obj?.addressString &&
          el?.city === obj?.city &&
          el?.contactPerson === obj?.contactPerson &&
          el?.contragentName === obj?.contragentName &&
          el?.email === obj?.email &&
          el?.name === obj?.name &&
          el?.phone === obj?.phone &&
          el?.payerContactPerson === obj?.payerContactPerson &&
          el?.payerCity === obj?.payerCity &&
          el?.payerAddress === obj?.payerAddress &&
          el?.payerContragentName === obj?.payerContragentName &&
          el?.payerEmail === obj?.payerEmail &&
          el?.payerName === obj?.payerName &&
          el?.payerPhone === obj?.payerPhone &&
          el?.receiverAddress === obj?.receiverAddress &&
          el?.receiverCity === obj?.receiverCity &&
          el?.receiverContactPerson === obj?.receiverContactPerson &&
          el?.receiverContragentName === obj?.receiverContragentName &&
          el?.receiverEmail === obj?.receiverEmail &&
          el?.receiverName === obj?.receiverName &&
          el?.receiverPhone === obj?.receiverPhone &&
          el?.senderAddress === obj?.senderAddress &&
          el?.senderCity === obj?.senderCity &&
          el?.senderContactPerson === obj?.senderContactPerson &&
          el?.senderContragentName === obj?.senderContragentName &&
          el?.senderEmail === obj?.senderEmail &&
          el?.senderName === obj?.senderName &&
          el?.senderPhone === obj?.senderPhone,
      ),
  );
  return uniqueArray;
};
