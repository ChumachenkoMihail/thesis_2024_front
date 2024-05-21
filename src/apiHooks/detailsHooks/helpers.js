import { htmlExportStyles } from "assets/styles/htmlStyles";
import { toast } from "sonner";
import {
  removeAllSpecialCharacters
} from "libs/parseApi";

export function createHtmlFile(htmlContent, title) {
  return `
          <!DOCTYPE html>
          <html>
          <head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reseter.css/1.0.8/reseter.css" integrity="sha512-Gn71vMYe2OC3pBT7P/lrwlkJDQuf/yfQpekC7JdeLsKeZ19clbtoCYa/6U2ySof4N/zEQ9QFEd3NhpvOh+v38w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@500;600;700&display=swap" rel="stylesheet">
            <style>
            details summary::-webkit-details-marker {
              display:none;
            }
            ${htmlExportStyles}
           
                .job-item-row:nth-child(even){
                    background: #F0F2F4;
                }
                p{
                    margin-bottom: 0;
                }
                .fs-18{
                    font-size: 18px;
                }
                .fs-16{
                    font-size: 16px;
                }
                .fs-20{
                    font-size: 20px;
                }
               
                @media only screen and (max-width: 1366px){
                       .html_container{
                        padding: 0 40px;
                       }
                }
                @media only screen and (max-width: 768px){
                       .html_container{
                        padding: 0 16px;
                       }
                       .accordion_body{
                        margin-top: 16px;
                         margin-bottom: 16px;
                       }
                       .job-item-row:nth-child(even){
                    background: transparent;
                }
                }
                
            </style>
             <title>${title}</title>
         
          </head>
          <body>
          ${htmlContent}
          <script>
            </script>
          </body>
          </html>
    `;
}

export function downloadHtmlFile(filename, content, title) {
  const fullContent = `
          <!DOCTYPE html>
          <html>
          <head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reseter.css/1.0.8/reseter.css" integrity="sha512-Gn71vMYe2OC3pBT7P/lrwlkJDQuf/yfQpekC7JdeLsKeZ19clbtoCYa/6U2ySof4N/zEQ9QFEd3NhpvOh+v38w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@500;600;700&display=swap" rel="stylesheet">
            <style>
            details summary::-webkit-details-marker {
              display:none;
            }
            ${htmlExportStyles}
           
                .job-item-row:nth-child(even){
                    background: #F0F2F4;
                }
                p{
                    margin-bottom: 0;
                }
                .fs-18{
                    font-size: 18px;
                }
                .fs-16{
                    font-size: 16px;
                }
                .fs-20{
                    font-size: 20px;
                }
               
                @media only screen and (max-width: 1366px){
                       .html_container{
                        padding: 0 40px;
                       }
                }
                @media only screen and (max-width: 768px){
                       .html_container{
                        padding: 0 16px;
                       }
                       .accordion_body{
                        margin-top: 16px;
                         margin-bottom: 16px;
                       }
                       .job-item-row:nth-child(even){
                    background: transparent;
                }
                }
                
            </style>
             <title>${title}</title>
         
          </head>
          <body>
          ${content}
          <script>
            </script>
          </body>
          </html>
    `;
  const element = document.createElement("a");
  const file = new Blob([fullContent], { type: "text/html" });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  toast.info("Загрузка началась, ожидайте файл");
}

//  function generates  values for the mergeUtils ankets, based on the start anket
export function generateValuesToMerge(anket, source) {
  const object = { ...anket };
  const newObj = {
    email: [],
    phone: [],
    inn: [],
    snils: [],
    fio: [],
    vin: [],
    plateNumbers: [],
    gemoOrderIds: [],
    documentNumbers: [],
    id: object.id,
  };
  if (object.sirenaInsuranceInfo) {
    object.sirenaInsuranceInfo.forEach(({ docNumber }) =>
      newObj.documentNumbers.push({
        number: docNumber,
        series: null,
      }),
    );
  }
  if (object.sirenaTrainTicketInfo) {
    object.sirenaTrainTicketInfo.forEach(({ pass_doc }) =>
      newObj.documentNumbers.push({
        number: pass_doc,
        series: null,
      }),
    );
  }
  if (object.passportNumber) {
    newObj.documentNumbers.push({
      number: object.passportNumber.replace(/\s/g, ""),
      series: null,
    });
  }
  if (object?.series_code || object?.doc_no) {
    newObj.documentNumbers.push({
      number: object?.doc_no,
      series: object?.series_code,
    });
  }
  if (object?.localPassport) {
    newObj.documentNumbers.push({
      number: object?.localPassport?.localPassportNumber,
      series: object?.localPassport?.localPassportSeries,
    });
  }
  if (object?.foreignPassport) {
    newObj.documentNumbers.push({
      number: object?.foreignPassport?.foreignPassportNumber,
      series: null,
    });
  }
  if (object?.sirenaTicketInfo) {
    object.sirenaTicketInfo.forEach((el) => {
      const doc = el?.passDoc?.replace("ПС", "") || null;
      if (doc?.length === 10) {
        let firstFourNumbers = doc.substring(0, 4);
        let remainingNumbers = doc.substring(4);
        newObj.documentNumbers.push({
          number: remainingNumbers,
          series: firstFourNumbers,
        });
      } else {
        el?.passDoc &&
          newObj.documentNumbers.push({
            number: el?.passDoc,
            series: null,
          });
      }
    });
  }
  if (object?.documents) {
    object.documents.forEach((el) => {
      const clearedNumber = removeAllSpecialCharacters(el?.dcmNumber);
      const clearedSerial = removeAllSpecialCharacters(el?.dcmSerialNo);
      if (clearedNumber?.length === 11) {
        newObj?.snils?.push(clearedNumber); // check length snils
      }
      if (clearedNumber || clearedSerial) {
        newObj?.documentNumbers.push({
          number: clearedNumber?.length === 11 ? null : clearedNumber,
          series: clearedSerial || null,
        });
      }
    });
  }
  if (object?.sirenaPassenger) {
    object.sirenaPassenger.forEach((el) => {
      const doc = el?.docNum?.replace("ПС", "") || null;
      if (doc?.length === 10) {
        let firstFourNumbers = doc.substring(0, 4);
        let remainingNumbers = doc.substring(4);
        newObj.documentNumbers.push({
          number: remainingNumbers,
          series: firstFourNumbers,
        });
      } else {
        el?.docNum &&
          newObj.documentNumbers.push({
            number: el?.docNum,
            series: null,
          });
      }
    });
  }
  if (object?.alfa?.length) {
    object?.alfa?.forEach(({ emails, phones }) => {
      if (emails && emails?.length) {
        emails.forEach((em) => newObj?.email.push(em));
      }
      if (phones && phones?.length) {
        phones.forEach((ph) =>
          newObj?.phone.push(removeAllSpecialCharacters(ph)),
        );
      }
    });
  }
  if (object?.newAuto) {
    object?.newAuto?.forEach((item) => {
      if (item.owners?.length) {
        item.owners.forEach(({ dob, firstname, lastname, patronymic }) => {
          newObj.fio.push({
            firstname: firstname || "",
            lastname: lastname || "",
            patronymic: patronymic || "",
            dateOfBirth: dob || "",
          });
        });
      }
      if (item.userInfo?.length) {
        item.userInfo.forEach(({ dob, first_name, lastname, patronymic }) => {
          newObj.fio.push({
            firstname: first_name || "",
            lastname: lastname || "",
            patronymic: patronymic || "",
            dateOfBirth: dob || "",
          });
        });
      }
      if (item?.autoInfo?.length) {
        item.autoInfo.forEach(({ vin, license_plate }) => {
          vin && newObj.plateNumbers.push(license_plate);
          license_plate && newObj.vin.push(vin);
        });
      }
    });
  }
  if (object?.email && object?.email !== " ") {
    let blackList = ["ivr48@bk.ru", "AVIA-KASSA@EGO.TRAVEL"];

    if (Array.isArray(object?.email)) {
      object?.email.forEach((ph) => {
        if (!blackList.includes(ph.toLowerCase())) {
          newObj.email.push(ph);
        }
      });
    } else {
      object?.email !== " " &&
        !blackList.includes(object?.email?.toLowerCase()) &&
        newObj.email.push(object.email);
    }
  }
  if (object?.plateNumber && object?.plateNumber !== " ")
    newObj.plateNumbers.push(object.plateNumber);
  if (object?.vin && object?.vin !== " ") newObj.vin.push(object.vin);
  if (object?.phone) {
    if (Array.isArray(object?.phone)) {
      object?.phone.forEach((ph) =>
        newObj?.phone.push(removeAllSpecialCharacters(ph?.toString())),
      );
    } else {
      object?.phone !== " " &&
        newObj.phone.push(
          removeAllSpecialCharacters(object?.phone?.toString()),
        );
    }
  }
  if (object?.beelinePhones) {
    object?.beelinePhones.forEach((ph) =>
      newObj?.phone.push(ph?.phone?.toString()),
    );
  }
  if (object?.inn && object?.inn !== " ") newObj.inn.push(object.inn);
  if (object?.snils && object?.snils !== " ") {
    if (Array.isArray(object.snils)) {
      object.snils.forEach((sn) =>
        newObj.snils.push(removeAllSpecialCharacters(sn)),
      );
    } else {
      newObj.snils.push(removeAllSpecialCharacters(object.snils));
    }
  }

  if (object.name && object?.dob) {
    const nameParts = object?.name?.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts?.slice(2).join(" ");
    const patronymic = nameParts[1];
    newObj.fio.push({
      firstname: firstName,
      lastname: lastName,
      patronymic: patronymic,
      dateOfBirth: object.dob,
    });
  }
  if (object?.fio && object?.dob) {
    const nameParts = object?.fio?.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts[1];
    const patronymic = nameParts?.slice(2).join(" ");
    newObj.fio.push({
      firstname: firstName,
      lastname: lastName,
      patronymic: patronymic,
      dateOfBirth: object.dob,
    });
  }
  if (
    (object?.firstname ||
      object?.lastname ||
      object?.patronymic ||
      object?.dob) &&
    !object?.fio
  ) {
    newObj.fio.push({
      firstname: object.firstname,
      lastname: object.lastname,
      patronymic: object.patronymic,
      dateOfBirth: object.dob,
    });
  }
  return newObj;
}
