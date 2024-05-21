import * as yup from "yup";

const isValidEmail = "Введите валидный email";
const isRequired = "обов'язкове поле";
export const phoneRegEx =
  /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

export const loginSchema = yup.object({
  email: yup.string(`Введіть ім'я`).required(`Ім'я ${isRequired}`),
});

export const createBugSchema = yup.object().shape({
    projectId: yup
        .string(`Выберите параметр для поиска`)
        .required(`Параметр ${isRequired}`),

    title: yup
        .string(`Выберите параметр для поиска`)
        .required(`Параметр ${isRequired}`),
});

export const addCommentSchema = yup.object().shape({
    text: yup
        .string(`Выберите параметр для поиска`)
        .required(`Параметр ${isRequired}`),
});

export const createOrgSchema = yup.object().shape({
    name: yup
        .string(`Выберите параметр для поиска`)
        .required(`Параметр ${isRequired}`),
});
export const inviteMemberToOrg = yup.object().shape({
    login: yup
        .string(`Выберите параметр для поиска`)
        .required(`Параметр ${isRequired}`),
});
export const inviteMemberToProject = yup.object().shape({
    userId: yup
        .number(`Выберите параметр для поиска`)
        .required(`Параметр ${isRequired}`),
});
export const telegramSchema = yup.object({
  selectedPhones: yup.array().min(1, `Выберите хотя бы один телефон`),
});
export const apiCallSchema = yup.object().shape({
  selectedPhones: yup.array().min(1, `Выберите телефон`),
  campaignId: yup.number().required(`Выберите сценарий`),
});

export const egronSearchSchema = yup.object().shape({
  selectedValue: yup
    .string(`Выберите параметр для поиска`)
    .required(`Параметр ${isRequired}`),
});

export const alterEgoSchema = yup
  .object()
  .shape({
    ageDiffYearsFrom: yup.string().min(0, "Минимальное значение 0"),
    ageDiffYearsTo: yup
      .string()
      .min(0, "Минимальное значение 0")
      .when("ageDiffYearsFrom", (ageDiffYearsFrom, schema) => {
        return schema.test({
          test: (ageDiffYearsTo) =>
            !ageDiffYearsFrom ||
            !ageDiffYearsTo ||
            ageDiffYearsTo >= ageDiffYearsFrom,
          message: `Значение "от" не должно быть больше значения "до"`,
        });
      }),
    ageDiffDaysFrom: yup.string().min(0, "Минимальное значение 0"),
    ageDiffDaysTo: yup
      .string()
      .min(0, "Минимальное значение 0")
      .when("ageDiffDaysFrom", (ageDiffDaysFrom, schema) => {
        return schema.test({
          test: (ageDiffDaysTo) =>
            !ageDiffDaysFrom ||
            !ageDiffDaysTo ||
            ageDiffDaysTo >= ageDiffDaysFrom,
          message: `Значение "от" не должно быть больше значения "до"`,
        });
      }),
    ageFrom: yup.string().min(0, "Минимальное значение 0"),
    ageTo: yup
      .string()
      .min(0, "Минимальное значение 0")
      .when("ageFrom", (ageFrom, schema) => {
        return schema.test({
          test: (ageTo) => !ageFrom || !ageTo || ageTo >= ageFrom,
          message: `Значение "от" не должно быть больше значения "до"`,
        });
      }),
    selectedAgeDiff: yup
      .boolean()
      .nullable()
      .test({
        test: function (value) {
          const {
            ageDiffYearsFrom,
            ageDiffYearsTo,
            ageDiffDaysFrom,
            ageDiffDaysTo,
          } = this.parent;
          if (
            (ageDiffYearsFrom || ageDiffYearsTo) &&
            (ageDiffDaysFrom || ageDiffDaysTo)
          ) {
            return false;
          }
          return true;
        },
        message:
          "Выберите разницу в годах или днях. Оба фильтра нельзя выбрать одновременно.",
      }),
  })
  .test("maxLength", function (value) {
    const paths = ["ageDiffYearsFrom", "ageDiffYearsTo", "ageFrom", "ageTo"];
    const exceedingField = paths.find(
      (field) => parseInt(value[field], 10) > 100,
    );
    if (exceedingField) {
      return this.createError({
        path: exceedingField,
        message: "Максимальное значение 100",
      });
    }
    return true;
  })
  .test("maxLengthDays", function (value) {
    const paths = ["ageDiffDaysFrom", "ageDiffDaysTo"];
    const exceedingField = paths.find(
      (field) => parseInt(value[field], 10) > 1000,
    );
    if (exceedingField) {
      return this.createError({
        path: exceedingField,
        message: "Максимальное значение 1000",
      });
    }
    return true;
  });

export const faceVerifySchema = yup.object().shape({
  firstPhoto: yup
    .string(`Фото 1 ${isRequired}`)
    .required(`Фото 1 ${isRequired}`),
  secondPhoto: yup
    .string(`Фото 1 ${isRequired}`)
    .required(`Фото 2 ${isRequired}`),
});

export const foldersSchema = yup.object({
  name: yup
    .string(`Введите название папки`)
    .max(15, "Максимальное к-во символов - 15")
    .required(`Название ${isRequired}`),
});

export const settingsApiSchema = yup.object({
  settings: yup.array().of(
    yup.object().shape({
      variables: yup.array().of(
        yup.object().shape({
          value: yup
            .string()
            .min(1, "Введите хотя бы один символ")
            .required(`${isRequired}`),
        }),
      ),
    }),
  ),
});

export const newAccessLevelSchema = yup
  .object({
    name: yup
      .string(``)
      .test(
        "is-not-empty",
        "Введите название уровня",
        (value) => value?.trim() !== "",
      )
      .required(`Название уровня доступа ${isRequired}`),
    availableFieldsWithSources: yup.array(),
    availableSources: yup.array(),
  })
  .test({
    name: "fieldsOrSourcesRequired",
    test: function (value) {
      const fieldsWithSources = value?.availableFieldsWithSources;
      const sources = value?.availableSources;
      if (!fieldsWithSources?.length && !sources?.length) {
        return this.createError({
          path: "availableFieldsWithSources",
          message: "Выберите поля или базы которые будут доступны пользователю",
        });
      }
      return true;
    },
  });

export const updateUserAccess = yup.object({
  accessLevels: yup.array().min(1, `Выберите уровень доступа`),
});
export const updateUserCreditsSchema = (name) => {
  const schema = yup.object({
    [name]: yup
      .number()
      .typeError("Должно быть числом")
      .integer("Должно быть целым числом")
      .min(-1, "Может быть -1, ноль или положительным числом"),
  });

  return schema;
};
export const addUserToFolder = yup.object({
  folderIds: yup.array().min(1, `Необходимо выбрать папку`),
});
export const csvConfirmationSchema = yup.object({
  name: yup
    .string("")
    .test(
      "is-not-empty",
      "Введите название поиска",
      (value) => value?.trim() !== "",
    )
    .required(`Название поиска  ${isRequired}`),
});

export const newUserSchema = yup.object({
  login: yup.string(`Введите имя пользователя`).required(`Имя ${isRequired}`),
  role: yup.string(`Выберите роль пользователя`).required(`Роль ${isRequired}`),
  accessLevels: yup.array().min(1, `Выберите уровень доступа`),
});

export const searchDepartureRestrictionTemplate = yup.object({
  departureRestrictionTemplate: yup
    .array()
    .min(1, "Выберите хотя бы один элемент")
    .nullable(),
});
export const searchSecretAccessTemplate = yup.object({
  secretAccessTemplate: yup
    .array()
    .min(1, "Выберите хотя бы один элемент")
    .nullable(),
});

export const saveSearch = yup.object({
  name: yup.string(`Введите название поиска`).required(`Имя ${isRequired}`),
});
export const createCustomProfileSchema = yup.object({
  fieldsIds: yup.array().min(1, `Выберите доступные поля`),
  anketId: yup
    .number()
    .typeError("Выберите анкету")
    .required(`Анкета ${isRequired}`),
});

export const searchSchema = yup
  .object()
  .shape({
    firstName: yup.string().max(20, "Максимальное к-во символов - 20"),
    lastName: yup.string().max(20, "Максимальное к-во символов - 20"),
    parentName: yup.string().max(20, "Максимальное к-во символов - 20"),
    snils: yup
      .string()
      .max(11, "Максимальное к-во символов - 11")
      .min(11, "Введите 11 символов страховки"),
    phone: yup.string(),
    matchingPercentage: yup.object().shape({
      from: yup
        .number()
        .test("from-required", "Введите значение От", function (value) {
          return !this.parent.to || value > 0;
        }),
      to: yup
        .number()
        .test("to-required", "Введите значение До", function (value) {
          return !this.parent.from || value > 0;
        })
        .test(
          "to-greater-than-from",
          "Значение До должно быть больше чем От",
          function (value) {
            return !value || !this.parent.from || value >= this.parent.from;
          },
        ),
    }),
    cadNumber: yup
      .string()
      .matches(/^\d{2}:\d{2}:\d{6,10}:\d{1,4}$/, "Не валидный номер"),

    address: yup
      .object()
      .shape({
        region: yup.string(),
        city: yup.string(),
        street: yup.string(),
        house: yup.string(),
      })
      .test("required-fields", "Заполните все поля адреса", (values) => {
        const { region, city, street, house } = values;

        if (!region && !city && !street && !house) return true;
        if (Object.values(values).filter(Boolean).length < 4) {
          return false;
        }
        return true;
      }),
    flightNumber: yup.string(),
    departureTime: yup.object().shape({
      day: yup
        .number()
        .test("from-required", "Выберите день", function (value) {
          return !this.parent.month || value > 0;
        }),
      month: yup
        .number()
        .test("to-required", "Введите месяц", function (value) {
          return !this.parent.year || value > 0;
        }),
      year: yup.number().test("to-required", "Введите год", function (value) {
        return !this.parent.day || value > 0;
      }),
    }),
    age: yup.object().shape({
      from: yup
        .number()
        .test("from-required", "Введите значение От", function (value) {
          return !this.parent.to || value > 0;
        }),
      to: yup
        .number()
        .test("to-required", "Введите значение До", function (value) {
          return !this.parent.from || value > 0;
        })
        .test(
          "to-greater-than-from",
          "Значение До должно быть больше чем От",
          function (value) {
            return !value || !this.parent.from || value > this.parent.from;
          },
        ),
    }),
    gender: yup.string().oneOf(["male", "female"]),
    foreignPassport: yup
      .string()
      .min(9, "Введите 9 символов")
      .max(9, "Введите 9 символов"),
    localPassport: yup.object({
      number: yup
        .string()
        .length(6, "Введите 6 символов номера")
        .test("number-required", "Введите номер", function (value) {
          return !this.parent.series || (value && value.length === 6);
        }),
      series: yup
        .string()
        .length(4, "Введите 4 символа серии")
        .test("series-required", "Введите Серию", function (value) {
          return !this.parent.number || (value && value.length === 4);
        }),
    }),
    job: yup.object({
      workPlace: yup.string().max(60, "Максимальное к-во символов - 60"),
    }),
    militaryInformation: yup
      .string()
      .max(40, "Максимальное к-во символов - 40"),
    email: yup.string().email(`${isValidEmail}`),
  })

  .test(
    "additional-fields-required",
    "Additional fields are required",
    function (value) {
      const departDay = value?.departureTime?.day;
      const departMonth = value?.departureTime?.month;
      const departYear = value?.departureTime?.year;
      if (departDay || departMonth || departYear) {
        //check if has some value  except dateOfBirth
        const additionalFieldsSelected = value.flightNumber;

        if (!additionalFieldsSelected) {
          return this.createError({
            path: "additionalFieldsSelected",
            message: "Для поиска по дате вылета введите номер самолета",
          });
        }
      }

      return true;
    },
  )
  .test(
    "additional-fields-required",
    "Additional fields are required",
    function (value) {
      const departDay = value?.departureTime?.day;
      const departMonth = value?.departureTime?.month;
      const departYear = value?.departureTime?.year;
      if (value.flightNumber) {
        const additionalFieldsSelected = departDay || departYear || departMonth;
        if (!additionalFieldsSelected) {
          return this.createError({
            path: "additionalFieldsSelected",
            message: "Выберите дату вылета",
          });
        }
      }

      return true;
    },
  )
  .test(
    "additional-fields-required",
    "Additional fields are required",
    function (value) {
      const departDay = value?.departureTime?.day;
      const departMonth = value?.departureTime?.month;
      const departYear = value?.departureTime?.year;
      const ageFrom = value.age && value.age?.from;
      const ageTo = value.age && value.age?.to;
      const bdFromDay = value.dateOfBirth?.from?.day;
      const bdFromYear = value.dateOfBirth?.from?.year;
      const bdFromMonth = value.dateOfBirth?.from?.month;
      const bdToDay = value.dateOfBirth?.to?.day;
      const bdToYear = value.dateOfBirth?.to?.year;
      const bdToMonth = value.dateOfBirth?.to?.month;
      const gender = value.gender;
      if (
        bdFromDay ||
        bdFromYear ||
        bdFromMonth ||
        bdToDay ||
        bdToYear ||
        bdToMonth
      ) {
        //check if has some value  except dateOfBirth
        const additionalFieldsSelected =
          departDay ||
          departYear ||
          departMonth ||
          ageFrom ||
          ageTo ||
          gender ||
          value.vkId ||
          value.tgId ||
          value.userName ||
          value.userPhone ||
          value.firstName ||
          value.documentNumber ||
          value.parentName ||
          value.lastName ||
          value.inn ||
          value.snils ||
          value.email ||
          value.plateNumber ||
          value.vin ||
          value.phone ||
          value.photo ||
          value.foreignPassport ||
          (value.localPassport &&
            (value.localPassport.number || value.localPassport.series)) ||
          (value.job && value.job.workPlace) ||
          value.militaryInformation;
        if (!additionalFieldsSelected) {
          return this.createError({
            path: "additionalFieldsSelected",
            message: "Выберите  одно поле кроме даты рождения",
          });
        }
      }
      if (bdFromMonth > bdToMonth) {
        return this.createError({
          path: "additionalFieldsSelected",
          message: "Месяц рождения От не может быть больше чем До",
        });
      }
      if (bdFromDay > bdToDay) {
        return this.createError({
          path: "additionalFieldsSelected",
          message: "День рождения От не может быть больше чем До",
        });
      }
      if (bdFromYear > bdToYear) {
        return this.createError({
          path: "additionalFieldsSelected",
          message: "Год рождения От не может быть больше чем До",
        });
      }
      if (value.firstName) {
        const additionalFieldsSelected =
          ageFrom ||
          ageTo ||
          gender ||
          bdToDay ||
          bdToYear ||
          bdToMonth ||
          bdFromDay ||
          bdFromYear ||
          bdFromMonth ||
          value.lastName ||
          value.parentName ||
          value.cadNumber ||
          value.inn ||
          value.snils ||
          value.documentNumber ||
          value.email ||
          value.vkId ||
          value.tgId ||
          value.userName ||
          value.userPhone ||
          value.phone ||
          value.plateNumber ||
          value.vin ||
          value.photo ||
          value.foreignPassport ||
          (value.localPassport &&
            (value.localPassport.number || value.localPassport.series)) ||
          (value.job && value.job.workPlace) ||
          value.militaryInformation;
        if (!additionalFieldsSelected) {
          return this.createError({
            path: "additionalFieldsSelected",
            message: "Выберите  одно дополнительное поле",
          });
        }
      }
      if (value.lastName) {
        const additionalFieldsSelected =
          ageFrom ||
          ageTo ||
          gender ||
          bdToDay ||
          bdToYear ||
          bdToMonth ||
          bdFromDay ||
          bdFromYear ||
          bdFromMonth ||
          value.firstName ||
          value.inn ||
          value.cadNumber ||
          value.snils ||
          value.parentName ||
          value.flightNumber ||
          value.documentNumber ||
          value.email ||
          value.vkId ||
          value.tgId ||
          value.userName ||
          value.userPhone ||
          value.phone ||
          value.photo ||
          value.plateNumber ||
          value.vin ||
          value.foreignPassport ||
          (value.localPassport &&
            (value.localPassport.number || value.localPassport.series)) ||
          (value.job && value.job.workPlace) ||
          value.militaryInformation;
        if (!additionalFieldsSelected) {
          return this.createError({
            path: "additionalFieldsSelected",
            message: "Выберите  одно дополнительное поле",
          });
        }
      }
      if (value.parentName) {
        const additionalFieldsSelected =
          ageFrom ||
          ageTo ||
          gender ||
          bdToDay ||
          bdToYear ||
          bdToMonth ||
          bdFromDay ||
          bdFromYear ||
          bdFromMonth ||
          value.firstName ||
          value.vkId ||
          value.tgId ||
          value.userName ||
          value.cadNumber ||
          value.userPhone ||
          value.flightNumber ||
          value.inn ||
          value.snils ||
          value.lastName ||
          value.photo ||
          value.email ||
          value.plateNumber ||
          value.documentNumber ||
          value.vin ||
          value.phone ||
          value.foreignPassport ||
          (value.localPassport &&
            (value.localPassport.number || value.localPassport.series)) ||
          (value.job && value.job.workPlace) ||
          value.militaryInformation;
        if (!additionalFieldsSelected) {
          return this.createError({
            path: "additionalFieldsSelected",
            message: "Выберите  одно дополнительное поле",
          });
        }
      }
      if (ageFrom || ageTo || gender) {
        const additionalFieldsSelected =
          value.email ||
          bdToDay ||
          bdToYear ||
          bdToMonth ||
          bdFromDay ||
          bdFromYear ||
          bdFromMonth ||
          value.firstName ||
          value.flightNumber ||
          value.lastName ||
          value.cadNumber ||
          value.parentName ||
          value.vkId ||
          value.inn ||
          value.snils ||
          value.tgId ||
          value.userName ||
          value.userPhone ||
          value.documentNumber ||
          value.photo ||
          value.plateNumber ||
          value.vin ||
          value.phone ||
          value.foreignPassport ||
          (value.localPassport &&
            (value.localPassport.number || value.localPassport.series)) ||
          (value.job && value.job.workPlace) ||
          value.militaryInformation;
        if (!additionalFieldsSelected) {
          return this.createError({
            path: "additionalFieldsSelected",
            message: "Выберите  одно дополнительное поле",
          });
        }
      }
      return true;
    },
  )
  .test(
    "at-least-one-field",
    "At least one field is required",
    function (values) {
      const {
        email,
        firstName,
        lastName,
        age,
        gender,
        parentName,
        phone,
        foreignPassport,
        localPassport,
        job,
        dateOfBirth,
        militaryInformation,
        flightNumber,
        photo,
        plateNumber,
        vin,
        departureTime,
        vkId,
        tgId,
        userName,
        userPhone,
        documentNumber,
        inn,
        snils,
        cadNumber,
        address,
      } = values;
      const allFields =
        cadNumber ||
        userPhone ||
        userName ||
        tgId ||
        vkId ||
        vin ||
        plateNumber ||
        photo ||
        email ||
        militaryInformation ||
        localPassport?.series ||
        localPassport?.number ||
        job.workPlace ||
        phone ||
        inn ||
        snils ||
        parentName ||
        foreignPassport ||
        firstName ||
        documentNumber ||
        flightNumber ||
        lastName ||
        age?.from ||
        age?.to ||
        gender ||
        departureTime.day ||
        departureTime.month ||
        departureTime.year ||
        dateOfBirth?.from?.day ||
        dateOfBirth?.from?.year ||
        dateOfBirth?.from?.month ||
        dateOfBirth?.to?.day ||
        dateOfBirth?.to?.year ||
        dateOfBirth?.to?.month;

      if (address.house && address.city && address.street && address.region) {
        return true;
      }
      if (!allFields) {
        return this.createError({
          path: "additionalFieldsSelected",
          message: "Поля не могут быть пустыми",
        });
      }
    },
  );
