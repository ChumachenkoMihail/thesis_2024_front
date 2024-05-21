export const getFieldName = (keys) => {
  return keys
    ?.map((key) => {
      if (key === "firstname") {
        return {
          fieldId: "firstname",
          name: "Имя",
        };
      }
      if (key === "alfa") {
        return {
          fieldId: "alfa",
          name: "Альфа-банк",
        };
      }
      if (key === "mtsBank") {
        return {
          fieldId: "mtsBank",
          name: "MTC-банк",
        };
      }
      if (key === "estates") {
        return {
          fieldId: "estates",
          name: "ЕГРОН (действия по недвижимости)",
        };
      }
      if (key === "accounts") {
        return {
          fieldId: "accounts",
          name: "Данные почта банк",
        };
      }
      if (key === "newAuto") {
        return {
          fieldId: "newAuto",
          name: "Авто база(new)",
        };
      }
      if (key === "lastname") {
        return {
          fieldId: "lastname",
          name: "Фамилия",
        };
      }
      if (key === "insurancePolicies") {
        return {
          fieldId: "insurancePolicies",
          name: "Данные по автобазе(new)",
        };
      }
      if (key === "accidents") {
        return {
          fieldId: "accidents",
          name: "Страховые случаи",
        };
      }
      if (key === "vin") {
        return {
          fieldId: "vin",
          name: "VIN код",
        };
      }
      if (key === "plateNumber") {
        return {
          fieldId: "plateNumber",
          name: "Номерной знак",
        };
      }
      if (key === "patronymic") {
        return {
          fieldId: "patronymic",
          name: "Отчество",
        };
      }
      if (key === "potentialNames") {
        return {
          fieldId: "potentialNames",
          name: "Имена из других баз (все)",
        };
      }
      if (key === "email") {
        return {
          fieldId: "email",
          name: "Email",
        };
      }
      if (key === "fsspList") {
        return {
          fieldId: "fsspList",
          name: "Приставы",
        };
      }
      if (key === "bindedPhotos") {
        return {
          fieldId: "bindedPhotos",
          name: "Связанные фото",
        };
      }
      if (key === "phone") {
        return {
          fieldId: "phone",
          name: "Номер телефона",
        };
      }
      if (key === "phone_home") {
        return {
          fieldId: "phone_home",
          name: "Домашний телефон",
        };
      }
      if (key === "work_phone") {
        return {
          fieldId: "work_phone",
          name: "Рабочий телефон",
        };
      }
      if (key === "gender") {
        return {
          fieldId: "gender",
          name: "Пол",
        };
      }
      if (key === "actualAddress") {
        return {
          fieldId: "actualAddress",
          name: "Адрес(Медицина)",
        };
      }
      if (key === "insuranceCompany") {
        return {
          fieldId: "insuranceCompany",
          name: "Страховая компания",
        };
      }
      if (key === "insuranceNumber") {
        return {
          fieldId: "insuranceNumber",
          name: "Номер страховки",
        };
      }

      if (key === "passportNumber") {
        return {
          fieldId: "passportNumber",
          name: "Номер паспорта",
        };
      }
      if (key === "passport_number") {
        return {
          fieldId: "passport_number",
          name: "Номер паспорта",
        };
      }
      if (key === "documents") {
        return {
          fieldId: "documents",
          name: "Документы",
        };
      }
      if (key === "passportIssuedBy") {
        return {
          fieldId: "passportIssuedBy",
          name: "Кем выдан паспорт",
        };
      }
      if (key === "nationality") {
        return {
          fieldId: "nationality",
          name: "Национальность",
        };
      }
      if (key === "addressInfo") {
        return {
          fieldId: "addressInfo",
          name: "Адрес",
        };
      }
      if (key === "addressRegistrationDate") {
        return {
          fieldId: "addressRegistrationDate",
          name: "Дата регистрации",
        };
      }
      if (key === "dob") {
        return {
          fieldId: "dob",
          name: "Дата рождения",
        };
      }
      if (key === "localPassport") {
        return {
          fieldId: "localPassport",
          name: "Паспорт РФ",
        };
      }
      if (key === "foreignPassport") {
        return {
          fieldId: "foreignPassport",
          name: "Загран. паспорт",
        };
      }
      if (key === "militaryInfo") {
        return {
          fieldId: "militaryInfo",
          name: "Воинская служба",
        };
      }
      if (key === "jobHistory") {
        return {
          fieldId: "jobHistory",
          name: "Информация о работе",
        };
      }
      if (key === "kids") {
        return {
          fieldId: "kids",
          name: "Дети",
        };
      }
      if (key === "tutuPassengers") {
        return {
          fieldId: "tutuPassengers",
          name: "Tutu пользователи",
        };
      }
      if (key === "tutuReserveUsers") {
        return {
          fieldId: "tutuReserveUsers",
          name: "Tutu пассажиры",
        };
      }
      if (key === "relationships") {
        return {
          fieldId: "relationships",
          name: "Родственники",
        };
      }
      if (key === "photos") {
        return {
          fieldId: "photos",
          name: "Фотографии",
        };
      }
      if (key === "snils") {
        return {
          fieldId: "snils",
          name: "№ Соц страхования",
        };
      }
      if (key === "inn") {
        return {
          fieldId: "inn",
          name: "ИНН",
        };
      }
      if (key === "departureRestrictions") {
        return {
          fieldId: "departureRestrictions",
          name: "Ограничение на выезд",
        };
      }
      if (key === "diplSecretAccess") {
        return {
          fieldId: "diplSecretAccess",
          name: "Доступ к дип. тайне",
        };
      }
      if (key === "diplTopSecretInfo") {
        return {
          fieldId: "diplTopSecretInfo",
          name: "Доступ к с.с информации",
        };
      }
      if (key === "diplTopSecretDescription") {
        return {
          fieldId: "diplTopSecretDescription",
          name: "Описание  к дип. тайне",
        };
      }
      if (key === "diplCountry") {
        return {
          fieldId: "diplCountry",
          name: "Страна дип. пребывания",
        };
      }
      if (key === "diplWorkPlace") {
        return {
          fieldId: "diplWorkPlace",
          name: "Дип. место работы",
        };
      }
      if (key === "localPassportArray") {
        return {
          fieldId: "localPassportArray",
          name: "Паспорт РФ",
        };
      }
      if (key === "addressRegistrationDateArray") {
        return {
          fieldId: "addressRegistrationDateArray",
          name: "Дата регистрации с других источников",
        };
      }
      if (key === "foreignPassportArray") {
        return {
          fieldId: "foreignPassportArray",
          name: "Загран паспорта",
        };
      }
      if (key === "jobArray") {
        return {
          fieldId: "jobArray",
          name: "Инфо о работе с других источников",
        };
      }
      if (key === "addressArray") {
        return {
          fieldId: "addressArray",
          name: "Адрес с других источников",
        };
      }
      if (key === "topSecretAccessInfo") {
        return {
          fieldId: "topSecretAccessInfo",
          name: "Доступ к гос.тайне",
        };
      }

      if (key === "secretAccess") {
        return {
          fieldId: "secretAccess",
          name: "Секретный доступ",
        };
      }
      if (key === "sourceId") {
        return null;
      }
      /// auto BD
      if (key === "passport") {
        return {
          fieldId: "passport",
          name: "Паспорт(авто база)",
        };
      }
      if (key === "name") {
        return {
          fieldId: "name",
          name: "Имя/Название",
        };
      }
      if (key === "beelinePhones") {
        return {
          fieldId: "beelinePhones",
          name: "Телефоны билайн",
        };
      }
      if (key === "cdekData") {
        return {
          fieldId: "cdekData",
          name: "Данные CDEK",
        };
      }
      if (key === "workPlace") {
        return {
          fieldId: "workPlace",
          name: "Место работы(авто база)",
        };
      }
      if (key === "passportAddress") {
        return {
          fieldId: "passportAddress",
          name: "Паспорт адрес(авто база)",
        };
      }
      if (key === "address") {
        return {
          fieldId: "address",
          name: "Адрес",
        };
      }
      if (key === "imsi") {
        return {
          fieldId: "imsi",
          name: "Идентификационный номер SIM-карты",
        };
      }
      if (key === "relatedPhones") {
        return {
          fieldId: "relatedPhones",
          name: "Похожие телефоны",
        };
      }
      if (key === "serialSim") {
        return {
          fieldId: "serialSim",
          name: "Серия SIM-карты",
        };
      }
      if (key === "getContactTags") {
        return {
          fieldId: "getContactTags",
          name: "GetContact Теги",
        };
      }
      if (key === "numBusterTags") {
        return {
          fieldId: "numBusterTags",
          name: "NumBuster Теги",
        };
      }
      if (key === "deliveryAvatar") {
        return {
          fieldId: "deliveryAvatar",
          name: "Изображения (доставка)",
        };
      }
      if (key === "facebookId") {
        return {
          fieldId: "facebookId",
          name: "Профиль Facebook",
        };
      }
      if (key === "vkId") {
        return {
          fieldId: "vkId",
          name: "Профиль Vkontakte",
        };
      }
      if (key === "fio") {
        return {
          fieldId: "fio",
          name: "ФИО",
        };
      }
      if (key === "ip") {
        return {
          fieldId: "ip",
          name: "IP aдрес",
        };
      }
      if (key === "mark") {
        return {
          fieldId: "mark",
          name: "Марка авто",
        };
      }
      if (key === "yearOfCreation") {
        return {
          fieldId: "yearOfCreation",
          name: "Год выпуска авто",
        };
      }
      if (key === "comment") {
        return {
          fieldId: "comment",
          name: "Комментарий",
        };
      }
      if (key === "engine") {
        return {
          fieldId: "engine",
          name: "Номер двигателя",
        };
      }
      if (key === "body") {
        return {
          fieldId: "body",
          name: "Номер кузова",
        };
      }
      if (key === "chassis") {
        return {
          fieldId: "chassis",
          name: "Номер шасси",
        };
      }
      if (key === "latitude") {
        return {
          fieldId: "latitude",
          name: "Широта",
        };
      }
      if (key === "longitude") {
        return {
          fieldId: "longitude",
          name: "Долгота",
        };
      }
      if (key === "linkedinLink") {
        return {
          fieldId: "linkedinLink",
          name: "Профиль linkedIn",
        };
      }
      if (key === "login") {
        return {
          fieldId: "login",
          name: "Логин",
        };
      }
      if (key === "password") {
        return {
          fieldId: "password",
          name: "Пароли",
        };
      }
      if (key === "sourceName") {
        return {
          fieldId: "sourceName",
          name: "Имя источника",
        };
      }
      if (key === "mailruProfile") {
        return {
          fieldId: "mailruProfile",
          name: "Профиль Mail.ru",
        };
      }
      if (key === "someDocument") {
        return {
          fieldId: "someDocument",
          name: "Доп. документ",
        };
      }
      if (key === "webLink") {
        return {
          fieldId: "webLink",
          name: "Веб ссылка",
        };
      }

      if (key === "autoArray") {
        return {
          fieldId: "autoArray",
          name: "Парковки",
        };
      }
      if (key === "sirenaPassenger") {
        return {
          fieldId: "sirenaPassenger",
          name: "Сирена Пасажиры",
        };
      }
      if (key === "sirenaTicketInfo") {
        return {
          fieldId: "sirenaTicketInfo",
          name: "Сирена Билеты",
        };
      }
      if (key === "sirenaTrainTicketInfo") {
        return {
          fieldId: "sirenaTrainTicketInfo",
          name: "Сирена Поезда",
        };
      }
      if (key === "sirenaInsuranceInfo") {
        return {
          fieldId: "sirenaInsuranceInfo",
          name: "Сирена страховки",
        };
      }
      if (key === "placeOfBirth") {
        return {
          fieldId: "placeOfBirth",
          name: "Место рождения",
        };
      }
      /// END auto BD
      else {
        return null;
      }
    })
    .filter(Boolean);
};
