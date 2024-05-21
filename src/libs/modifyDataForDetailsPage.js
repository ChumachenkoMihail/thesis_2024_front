import {
  formatSirenaInsDateTime,
  normalizeSpaces,
  parseContacts,
  parseFullName,
  removeAllSpecialCharacters,
  removeEmptyValues,
  removeNullFromString,
  replaceWithNullIfOnlySpaces,
} from "libs/parseApi";
import { normalizePhone } from "../store/thunks/outsideApiThunks";

export const normalizePhones = async (phonesArray, dispatch) => {
  const regex = /[a-zA-Z]/;
  // Filter the array to remove strings containing words
  const filteredStrings = phonesArray?.filter(
    (str) => !regex.test(str?.value || str),
  );
  return await Promise.all(
    filteredStrings?.map((i) =>
      dispatch(
        normalizePhone({
          phone: i?.value?.toString() || i?.toString(),
          source: i?.source || "",
        }),
      ),
    ),
  );
};

export const modifyDataForDetailsPage = async (
  payload,
  slug,
  userId,
  dispatch,
) => {
  let state = {};

  const anket = { ...payload?.anket };
  if (slug === "alfa") {
    const { contacts, fio, cards, ...rest } = anket;
    const parsePhones = [...new Set(parseContacts(contacts)?.phones)];
    const parseEmail = [...new Set(parseContacts(contacts)?.emails)];
    const { firstname, patronymic, lastname } = parseFullName(anket?.fio);
    rest.firstname = firstname;
    rest.patronymic = patronymic;
    rest.lastname = lastname;
    const updateAlfaData = {
      email: parseEmail || [],
      phone: parsePhones || [],
      cards: cards || [],
      firstname,
      lastname,
      patronymic,
    };
    const removeEmpty = removeEmptyValues(updateAlfaData);
    if (!anket?.cards.length && !parseEmail?.length && !parsePhones?.length) {
      const { ...all } = payload?.anket;
      all.firstname = firstname;
      all.patronymic = patronymic;
      all.lastname = lastname;
      state.anketData = { folders: payload.folders, anket: all };
    } else {
      rest.alfa = [removeEmpty];
      const toAlfaPayload = {
        anket: rest,
        folders: payload.folders,
      };
      state.anketData = toAlfaPayload;
    }
  } else if (slug === "pcht") {
    const {
      registryAddress,
      // phone,
      workAddress,
      address,
      dopAddress,
      // phone_home,
      birthPlace,
      ...rest
    } = anket;
    rest.address = [
      ...new Set([registryAddress, address, dopAddress, workAddress]),
    ];
    // rest.phone = [...new Set([phone])];
    rest.placeOfBirth = birthPlace;
    const toPochtaPayload = {
      anket: rest,
      folders: payload.folders,
    };
    state.anketData = toPochtaPayload;
  } else if (slug === "auto") {
    const { plateNumber, mark, ...rest } = anket;
    const updateAutoData = {
      phone: rest?.phone || "",
      mark: mark || "",
      plateNumber: plateNumber || "",
      id: rest?.id || "",
    };
    const removeEmpty = removeEmptyValues(updateAutoData);
    rest.autoArray = [removeEmpty];
    // delete anket?.plateNumber;
    const toPayload = {
      anket: rest,
      folders: payload.folders,
    };
    state.anketData = toPayload;
  } else if (slug === "dns_shop") {
    const { full_name, is_phone_actual, ...rest } = anket;
    rest.name = full_name;
    const toPayload = {
      anket: rest,
      folders: payload.folders,
    };
    state.anketData = toPayload;
  } else if (slug === "egron") {
    const {
      document_number,
      document_series,
      birth_place,
      document_issuer,
      citizenship,
      estates,
      banks,
      snils,
      ...rest
    } = anket;
    rest.snils = removeAllSpecialCharacters(snils);
    rest.documents =
      document_number || document_series
        ? [
            {
              dcmNumber: document_number,
              dcmSerialNo: document_series,
              dcmIssueWhere: document_issuer,
            },
          ]
        : null;
    rest.estates = estates?.map((item) => {
      return {
        ...item,
        history:
          item?.history.map((i) => {
            return {
              ...i,
              firstname: removeNullFromString(i?.firstname),
              lastname: removeNullFromString(i?.lastname),
              patronymic: removeNullFromString(i?.patronymic),
              banks: i?.banks?.join("|") || "",
            };
          }) || [],
      };
    });
    rest.placeOfBirth = birth_place || null;
    rest.nationality = citizenship || null;
    const toPayload = {
      anket: rest,
      folders: payload.folders,
    };
    state.anketData = toPayload;
  } else if (slug === "newAuto") {
    state.anketData = {
      anket: {
        newAuto: anket?.newAuto?.map(
          ({ userInfo, carDrivers, carOwners, autoInfo, drivers, owners }) => {
            const allVinsfromCarOwners = carOwners?.map(({ vin }) => vin) || [];
            const pattern = /[O0]/g;
            return {
              autoInfo: autoInfo || [],
              owners: owners || [],
              drivers: drivers || [],
              userInfo: userInfo || [],
              carOwners:
                carOwners?.filter(
                  (obj, index, self) =>
                    index ===
                    self?.findIndex(
                      (o) =>
                        o?.vin?.toUpperCase()?.replace(pattern, "O") ===
                        obj?.vin?.toUpperCase()?.replace(pattern, "O"),
                    ),
                ) || [],
              carDrivers: allVinsfromCarOwners?.filter(Boolean)?.length
                ? carDrivers
                    ?.filter(
                      (obj, index, self) =>
                        index ===
                        self?.findIndex(
                          (o) =>
                            o?.vin?.toUpperCase()?.replace(pattern, "O") ===
                            obj?.vin?.toUpperCase()?.replace(pattern, "O"),
                        ),
                    )
                    ?.filter((driver) => {
                      if (allVinsfromCarOwners?.includes(driver?.vin)) {
                        if (
                          driver?.carOwners?.length > 1 &&
                          driver?.carOwners?.some(
                            (owner) => owner?.id === Number(userId),
                          )
                        ) {
                          return true;
                        } else if (
                          driver?.carOwners?.length === 1 &&
                          driver?.carOwners[0]?.id === Number(userId)
                        ) {
                          return false;
                        } else if (
                          driver?.carOwners?.length === 1 &&
                          driver?.carOwners[0]?.id !== Number(userId)
                        ) {
                          return true;
                        }
                      } else {
                        return true;
                      }
                    })
                : carDrivers,
            };
          },
        ),
      },
      folders: payload?.folders,
    };
  } else if (slug === "fssp") {
    const { passport_number, debt_amount, osp, ...rest } = anket;
    rest.passportNumber = passport_number || null;
    rest.fsspList = [
      {
        debt_amount,
        osp,
      },
    ];
    // delete anket.passport_number;

    const fsspPayload = {
      folders: payload?.folders,
      anket: { ...rest },
    };

    state.anketData = fsspPayload;
  } else if (slug === "promed") {
    const { document_ser, document_num, ...rest } = anket;
    const documents = [
      {
        dcmSerialNo: document_ser,
        dcmNumber: document_num,
      },
    ];
    const promedPayload = {
      folders: payload?.folders,
      anket: { ...rest, documents },
    };

    state.anketData = promedPayload;
  } else if (slug === "mvd") {
    const { photos, birthPlace, series_code, doc_no, ...rest } = anket;
    rest.placeOfBirth = birthPlace || null;
    const documents = [
      {
        dcmSerialNo: series_code,
        dcmNumber: doc_no,
      },
    ];
    const mvdPayload = {
      folders: payload?.folders,
      anket: { ...rest, documents, photos: removeEmptyValues(photos) },
    };

    state.anketData = mvdPayload;
  } else if (slug === "tutu_passengers") {
    const { birth_place, document_type, document_number, user, ...rest } =
      anket;
    const documents = [
      {
        dcmType: document_type,
        dcmNumber: document_number,
      },
    ];
    rest.placeOfBirth = birth_place || null;
    if (user.firstname === rest.firstname && user.lastname === rest.lastname) {
      rest.email = user?.email || null;
      rest.phone = user?.phone || null;
      const tutuWithoutReservationPayload = {
        folders: payload?.folders,
        anket: { ...rest, documents },
      };
      state.anketData = tutuWithoutReservationPayload;
    } else {
      const reservedFor = [rest.lastname, rest.firstname, rest.patronymic].join(
        " ",
      );

      const tutuReserveUsers = [{ ...user, reservedFor }];
      const tutuWithReservationPayload = {
        folders: payload?.folders,
        anket: { ...rest, documents, tutuReserveUsers },
      };
      state.anketData = tutuWithReservationPayload;
    }
  } else if (slug === "tutu_users") {
    const { passengers, ...rest } = anket;

    const tutuPassengers = passengers?.map(
      ({ birth_place, document_number, document_type, ...params }) => {
        return {
          placeOfBirth: birth_place,
          dcmNumber: document_number,
          dcmType: document_type,
          ...params,
        };
      },
    );

    const tutuUsersPayload = {
      folders: payload?.folders,
      anket: { tutuPassengers, ...rest },
    };
    state.anketData = tutuUsersPayload;
  } else if (slug === "phones") {
    const { passport, ...rest } = anket;
    const trimmedString = passport.trim();
    rest.documents = [
      {
        dcmSerialNo: parseInt(trimmedString.substring(0, 4)),
        dcmNumber: parseInt(trimmedString.substring(4)),
      },
    ];
    const phonesPayload = {
      folders: payload?.folders,
      anket: { ...rest },
    };

    state.anketData = phonesPayload;
  } else if (slug === "beeline") {
    const { fio, addresses, phones, ...rest } = anket;
    rest.name = fio || null;
    rest.address = addresses;
    rest.beelinePhones = phones;

    const beelinePayload = {
      folders: payload?.folders,
      anket: { ...rest },
    };

    state.anketData = beelinePayload;
  } else if (slug === "rostelecom") {
    const { fio, ...rest } = anket;
    const { firstname, lastname, patronymic } = parseFullName(fio);

    rest.firstname = lastname;
    rest.patronymic = firstname;
    rest.lastname = patronymic;
    const rostelecomPayload = {
      folders: payload?.folders,
      anket: { ...rest },
    };

    state.anketData = rostelecomPayload;
  } else if (slug === "mts_bank") {
    const { contacts, cards, ...rest } = anket;
    const parseEmails = [...new Set(parseContacts(contacts)?.emails)];
    const parsePhones = [...new Set(parseContacts(contacts)?.phones)];
    rest.mtsBank = [
      {
        email: parseEmails?.length ? parseEmails : null,
        phone: [...new Set(parsePhones)],
        cards,
      },
    ];

    const mtsBankPayload = {
      folders: payload?.folders,
      anket: { ...rest },
    };

    state.anketData = mtsBankPayload;
  } else if (slug === "relativies") {
    const updateRelativiesData = {
      ...anket,
      relationships: anket.relationships.filter(
        (relative) =>
          relative.lastname !== anket.lastname ||
          relative.firstname !== anket.firstname ||
          relative.patronymic !== anket.patronymic,
      ),
    };
    const toRelativiesPayload = {
      anket: updateRelativiesData,
      folders: payload.folders,
    };
    state.anketData = toRelativiesPayload;
  } else if (slug === "avito") {
    const { emails, phones, ...rest } = anket;
    const parseAvitoEmails = [...new Set(parseContacts(emails)?.emails)];
    const parseAvitoPhones = [...new Set(parseContacts(phones)?.phones)];
    const updateAvitoData = {
      ...rest,
      email: parseAvitoEmails || [],
      phone: parseAvitoPhones || [],
    };
    const removeEmptyAvito = removeEmptyValues(updateAvitoData);
    const toAvitoPayload = {
      anket: removeEmptyAvito,
      folders: payload.folders,
    };
    state.anketData = toAvitoPayload;
  } else if (slug === "vk") {
    const { emails, phones, ...rest } = anket;
    const parseVkEmails = [...new Set(parseContacts(emails)?.emails)];
    const parseVkPhones = [...new Set(parseContacts(phones)?.phones)];
    const updateVkData = {
      ...rest,
      email: parseVkEmails || [],
      vkId: rest.id || [],
      phone: parseVkPhones || [],
    };
    const removeEmpty = removeEmptyValues(updateVkData);
    const toVkPayload = {
      anket: removeEmpty,
      folders: payload.folders,
    };
    state.anketData = toVkPayload;
  } else if (slug === "new_gos_users") {
    const { snils, ...rest } = anket;
    rest.snils = removeAllSpecialCharacters(snils);
    const toNewGosPayload = {
      anket: rest,
      folders: payload.folders,
    };
    state.anketData = toNewGosPayload;
  } else if (slug === "new_gos") {
    const { documents, snils_numbers, emails, phones, addresses, ...rest } =
      anket;
    rest.address = addresses?.length ? addresses : null;
    rest.email = emails?.length ? emails : null;
    rest.phone = phones?.length ? phones : null;
    rest.snils = snils_numbers;
    rest.documents = documents?.map(({ number, series }) => {
      return {
        dcmSerialNo: series,
        dcmNumber: number,
      };
    });
    const toGosPayload = {
      anket: rest,
      folders: payload.folders,
    };
    state.anketData = toGosPayload;
  } else if (slug === "sirena_ins") {
    const {
      firstname,
      lastname,
      patronymic,
      dep_date,
      dep_time,
      dob,
      ...rest
    } = anket;
    const sirenaInsPayload = {
      anket: {
        firstname,
        lastname,
        patronymic,
        dob,
        sirenaInsuranceInfo: [
          {
            ...rest,
            firstname,
            lastname,
            patronymic,
            dep_date: formatSirenaInsDateTime(dep_date, dep_time),
          },
        ],
      },
      folders: payload.folders,
    };
    state.anketData = sirenaInsPayload;
  } else if (slug === "sirena_train") {
    const { firstname, lastname, patronymic, dob, ...rest } = anket;
    delete rest.class;
    const sirenaTrainPayload = {
      anket: {
        firstname,
        lastname,
        patronymic,
        dob,
        sirenaTrainTicketInfo: [
          {
            ...rest,
            firstname,
            lastname,
            patronymic,
          },
        ],
      },
      folders: payload.folders,
    };
    state.anketData = sirenaTrainPayload;
  } else if (slug === "sirena_ticket_info") {
    const {
      passDoc,
      info,
      phones,
      city_from,
      city_to,
      farce_calt_vld_url,
      first_city,
      ...rest
    } = anket;
    const getContactSirena = parseContacts(phones)?.phones?.length
      ? parseContacts(phones)?.phones
      : null;
    const getEmails = parseContacts(phones)?.emails?.length
      ? parseContacts(phones)?.emails
      : null;

    const updateTickets = {
      ...rest,
      city_from: normalizeSpaces(city_from),
      info: replaceWithNullIfOnlySpaces(info),
      city_to: normalizeSpaces(city_to),
      passDoc: normalizeSpaces(passDoc),
      first_city: normalizeSpaces(first_city),
      farce_calt_vld_url: normalizeSpaces(farce_calt_vld_url),
      phonesArray: [...new Set(getContactSirena)],
      emailArray: getEmails?.length ? [...new Set(getEmails)] : null,
      dob: rest?.dob || null,
    };

    delete rest.airline_name;

    delete rest.ppr;
    delete rest.pul;
    delete rest.regnum;
    delete rest.tkt_date;
    const sirenaTicketInfo = [updateTickets];
    const ticketsIds = sirenaTicketInfo?.map(({ id }) => id.toString());
    const ticketsPayload = {
      anket: { ...rest, sirenaTicketInfo },
      folders: payload.folders,
      sirenaTicketsIds: ticketsIds,
    };
    state.anketData = ticketsPayload;
  } else if (slug === "sirena_passenger") {
    const { phone, email, birthdate, ...rest } = anket;
    // delete anket?.phone;
    // delete anket?.email;
    rest.dob = birthdate || null;
    const updatePassengers = {
      ...rest,
      destination: normalizeSpaces(
        rest?.destination?.replace(" International Airport", ""),
      ),
      categoryFly: rest?.class,
      pointOfDeparture: normalizeSpaces(
        rest?.pointOfDeparture?.replace(" International Airport", ""),
      ),
      dob: birthdate || null,
      passengerPhone: phone,
      passengerEmail: email,
    };
    delete rest?.birthdate;
    delete rest?.class;
    delete rest?.ticket;
    delete rest?.airline;
    delete rest?.bookingTime;
    delete rest?.class;
    delete rest?.departureTime;
    delete rest?.destination;
    delete rest?.docNum;
    delete rest?.docType;
    delete rest?.flight;
    delete rest?.pointOfDeparture;
    delete rest?.arrivalCountry;
    delete rest?.departureCountry;
    const sirenaPassenger = [updatePassengers];

    const toPayload = {
      anket: { ...rest, sirenaPassenger },
      folders: payload.folders,
    };
    state.anketData = toPayload;
  } else if (slug === "microcredit") {
    const {
      passport_issued_by,
      home_phone,
      actual_address,
      birthplace,
      passport_issued_date,
      passport_number,
      passport_series,
      registration_address,
      work_address,
      work_experience,
      work_position,
      ...rest
    } = anket;
    const hasPassport =
      passport_issued_date || passport_number || passport_series;
    const hasJob =
      (work_address && work_address !== "") ||
      (work_experience && work_experience !== "") ||
      (work_position && work_position !== "");
    rest.localPassport = hasPassport
      ? {
          localPassportSeries: passport_series,
          localPassportNumber: passport_number,
          issuedate: passport_issued_date,
          issuedBy: passport_issued_by,
        }
      : null;
    rest.placeOfBirth = birthplace;
    rest.address = [...new Set([actual_address, registration_address])];
    rest.jobHistory = hasJob
      ? [
          {
            organizationAddress: work_address,
            organizationName: work_experience,
            info: work_position,
          },
        ]
      : null;
    rest.phone_home = home_phone;
    const microCreditPayload = {
      folders: payload?.folders,
      anket: removeEmptyValues({ ...rest }),
    };

    state.anketData = microCreditPayload;
  } else if (slug === "cdek") {
    const {
      addressString,
      city,
      contactPerson,
      contragentName,
      sourceName,
      payerContactPerson,
      payerCity,
      payerAddress,
      payerContragentName,
      payerEmail,
      payerName,
      payerPhone,
      receiverAddress,
      receiverCity,
      receiverContragentName,
      receiverContactPerson,
      receiverEmail,
      receiverName,
      receiverPhone,
      senderAddress,
      senderCity,
      senderContactPerson,
      senderContragentName,
      senderEmail,
      senderName,
      senderPhone,
      ...rest
    } = anket;
    const updateCDEKData = {
      addressString: addressString,
      id: anket?.id,
      city: city,
      contactPerson: contactPerson,
      contragentName: contragentName,
      email: anket?.email,
      name: anket?.name,
      phone: anket?.phone,
      sourceName: sourceName,
      payerContactPerson: payerContactPerson,
      payerCity: payerCity,
      payerAddress: payerAddress,
      payerContragentName: payerContragentName,
      payerEmail: payerEmail,
      payerName: payerName,
      payerPhone: payerPhone,
      receiverAddress: receiverAddress,
      receiverCity: receiverCity,
      receiverContactPerson: receiverContactPerson,
      receiverContragentName: receiverContragentName,
      receiverEmail: receiverEmail,
      receiverName: receiverName,
      receiverPhone: receiverPhone,
      senderAddress: senderAddress,
      senderCity: senderCity,
      senderContactPerson: senderContactPerson,
      senderContragentName: senderContragentName,
      senderEmail: senderEmail,
      senderName: senderName,
      senderPhone: senderPhone,
    };
    const removeEmpty = removeEmptyValues(updateCDEKData);
    rest.cdekData = [removeEmpty];

    const toPayload = {
      anket: rest,
      folders: payload.folders,
    };
    state.anketData = toPayload;
  } else {
    state.anketData = payload;
  }
  if (state.anketData.anket.email) {
    if (Array.isArray(state.anketData.anket.email)) {
      state.anketData.anket.email = state.anketData.anket.email.map((item) => {
        return {
          value: item,
          source: "Искомая анкета",
        };
      });
    } else {
      const emailToArray = [
        {
          value: state.anketData.anket.email,
          source: "Искомая анкета",
        },
      ];
      state.anketData.anket.email = emailToArray;
    }
  }
  if (state.anketData.anket.phone) {
    if (Array.isArray(state.anketData.anket.phone)) {
      await normalizePhones(state.anketData.anket.phone, dispatch).then(
        (res) => {
          const flatPhones = res?.flatMap(({ payload }) => payload?.data);
          if (res?.[0]?.payload?.data?.message === "Internal server error") {
            state.anketData.anket.phone = state.anketData.anket.phone.map(
              (item) => {
                return {
                  value: item,
                  source: "Искомая анкета",
                };
              },
            );
          } else if (flatPhones?.length) {
            state.anketData.anket.phone = flatPhones.map(
              ({ provider, region, source, type }) => {
                return {
                  value: source,
                  source: "Искомая анкета",
                  provider,
                  region,
                  type,
                };
              },
            );
          } else {
            state.anketData.anket.phone = state.anketData.anket.phone;
          }
        },
      );
    } else {
      await normalizePhones([state.anketData.anket.phone], dispatch)
        .then((res) => {
          const flatPhones = res?.flatMap(({ payload }) => payload?.data);
          if (res[0]?.payload?.data?.message === "Internal server error") {
            state.anketData.anket.phone = [state.anketData.anket.phone].map(
              (item) => {
                return {
                  value: item,
                  source: "Искомая анкета",
                };
              },
            );
          } else if (flatPhones?.length) {
            state.anketData.anket.phone = flatPhones.map(
              ({ provider, region, source, type }) => {
                return {
                  value: source,
                  source: "Искомая анкета",
                  provider,
                  region,
                  type,
                };
              },
            );
          } else {
            state.anketData.anket.phone = state.anketData.anket.phone;
          }
        })
        .catch((er) => {
          console.log(er, "er");
        });
    }
  }
  if (state.anketData.anket.dob) {
    const dobsArray = [
      {
        value: state.anketData.anket.dob,
        source: "Искомая анкета",
      },
    ];
    state.anketData.anket.dob = dobsArray;
  }
  return state;
};
