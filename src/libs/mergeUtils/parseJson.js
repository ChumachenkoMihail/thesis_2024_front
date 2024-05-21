import {
  formatSirenaInsDateTime,
  normalizeSpaces,
  parseContacts,
  parseFullName,
  removeAllSpecialCharacters,
  removeNullFromString,
  replaceWithNullIfOnlySpaces,
} from "libs/parseApi";
import moment from "moment";

export const parseJson = async (data) => {
  const {
    pcht,
    promed,
    sirena_ticket_info,
    sirena_passenger,
    sirena_ins,
    sirena_train,
    fssp,
    rostelecom,
    beeline,
    tutu_passengers,
    tutu_users,
    mvd,
    alfa,
    vk,
    avito,
    new_gos_users,
    new_gos,
    microcredit,
    egron,
    mts_bank,
    dns_shop,
    phones,
    ...allElse
  } = data;
  const updatePhones = phones?.map((item) => {
    const { passport, ...rest } = item;
    const trimmedString = passport.trim();
    rest.documents = [
      {
        dcmSerialNo: parseInt(trimmedString.substring(0, 4)),
        dcmNumber: parseInt(trimmedString.substring(4)),
      },
    ];
    return rest;
  });
  const updateDnsShop = dns_shop.map((item) => {
    const { full_name, is_phone_actual, ...rest } = item;
    rest.name = full_name;
    return rest;
  });
  const updateMtsBank = mts_bank.map((item) => {
    const { contacts, cards, ...rest } = item;
    const parseEmails = [...new Set(parseContacts(contacts)?.emails)];
    const parsePhones = [...new Set(parseContacts(contacts)?.phones)];
    rest.mtsBank = [
      {
        email: parseEmails?.length ? parseEmails : null,
        phone: [...new Set(parsePhones)],
        cards,
      },
    ];
    return {
      ...rest,
    };
  });

  const updateEgron = egron?.map(
    ({
      document_number,
      document_series,
      birth_place,
      document_issuer,
      citizenship,
      estates,
      snils,
      ...rest
    }) => {
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
      rest.snils = removeAllSpecialCharacters(snils);
      rest.placeOfBirth = birth_place || null;

      rest.nationality = citizenship || null;
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
                banks: i?.banks?.join("|"),
              };
            }) || [],
        };
      });
      return {
        ...rest,
      };
    },
  );
  const updateAlfa =
    alfa?.map(({ contacts, cards, fio, dob, sourceId, id, sourceNameId }) => {
      const { firstname, patronymic, lastname } = parseFullName(fio);
      const getPhones = [...new Set(parseContacts(contacts)?.phones)];
      const getEmails = [...new Set(parseContacts(contacts)?.emails)];
      return {
        sourceNameId,
        email: getEmails || [],
        phone: getPhones || [],
        cards: cards || [],
        dob: dob || "",
        sourceId: sourceId,
        id: id,
        firstname: firstname,
        patronymic: patronymic,
        lastname: lastname,
      };
    }) || [];
  const updateVk =
    vk?.map(({ emails, phones, id, sourceId, sourceNameId }) => {
      const getPhones = [...new Set(parseContacts(phones)?.phones)] || [];
      const getEmails = [...new Set(parseContacts(emails)?.emails)] || [];
      return {
        sourceNameId,
        phone: getPhones,
        email: getEmails,
        vkId: id,
        id: id,
        sourceId: sourceId,
      };
    }) || [];
  const updateAvito =
    avito?.map(({ emails, phones, id, sourceId, sourceNameId }) => {
      const getPhones = [...new Set(parseContacts(phones)?.phones)] || [];
      const getEmails = [...new Set(parseContacts(emails)?.emails)] || [];
      return {
        phone: getPhones,
        email: getEmails,
        id: id,
        sourceId,
        sourceNameId,
      };
    }) || [];
  const updateMvd =
    mvd?.map((obj) => {
      const { series_code, doc_no, birthPlace, ...rest } = obj;

      return {
        ...rest,
        placeOfBirth: birthPlace,
        documents: [
          {
            dcmSerialNo: series_code,
            dcmNumber: doc_no,
          },
        ],
      };
    }) || [];

  const updateTutuUsers =
    tutu_users?.map((obj) => {
      const { passengers, ...rest } = obj;

      return {
        ...rest,
        tutuPassengers: passengers?.map(
          ({ birth_place, document_number, document_type, ...params }) => {
            return {
              placeOfBirth: birth_place,
              dcmNumber: document_number,
              dcmType: document_type,
              ...params,
            };
          },
        ),
      };
    }) || [];
  const updateTutuPassengers =
    tutu_passengers?.map((obj) => {
      const { birth_place, document_type, document_number, user, ...rest } =
        obj;
      rest.placeOfBirth = birth_place || null;
      const reservedFor = [rest.lastname, rest.firstname, rest.patronymic].join(
        " ",
      );

      return {
        ...rest,

        documents: [
          {
            dcmType: document_type,
            dcmNumber: document_number,
          },
        ],
        tutuReserveUsers: [{ ...user, reservedFor }],
      };
    }) || [];
  const updateBeeline =
    beeline?.map((obj) => {
      const { fio, addresses, phones, ...rest } = obj;
      rest.name = fio || null;
      rest.address = addresses;
      rest.beelinePhones = phones;

      return {
        ...rest,
        name: fio,
        address: addresses,
        beelinePhones: phones,
      };
    }) || [];

  const updateRostelecom =
    rostelecom?.map((obj) => {
      const { fio, ...rest } = obj;
      const { firstname, lastname, patronymic } = parseFullName(fio);

      return {
        ...rest,
        firstname: lastname,
        patronymic: firstname,
        lastname: patronymic,
      };
    }) || [];
  const updateFssp =
    fssp?.map((obj) => {
      const { osp, debt_amount, ...rest } = obj;
      return {
        ...rest,
        fsspList: [
          {
            osp,
            debt_amount,
          },
        ],
      };
    }) || [];

  const updateSirenaTrain =
    sirena_train?.map((train) => {
      const {
        id,
        sourceId,
        firstname,
        lastname,
        patronymic,
        dob,
        sourceNameId,
        ...rest
      } = train;
      return {
        sourceNameId,
        firstname,
        lastname,
        patronymic,
        dob,
        id,
        sourceId,
        sirenaTrainTicketInfo: [
          {
            ...rest,
            firstname,
            lastname,
            patronymic,
          },
        ],
      };
    }) || [];
  const updateSirenaIns =
    sirena_ins?.map((ins) => {
      const { dep_date, dep_time, ...rest } = ins;
      return {
        ...rest,
        dep_date: formatSirenaInsDateTime(dep_date, dep_time),
      };
    }) || [];

  const updateSirenaPass =
    sirena_passenger?.map((pass) => {
      const { phone, email, ...rest } = pass;
      return {
        ...rest,
        destination: normalizeSpaces(
          pass?.destination.replace(" International Airport", ""),
        ),
        categoryFly: pass?.class,
        pointOfDeparture: normalizeSpaces(
          pass?.pointOfDeparture.replace(" International Airport", ""),
        ),
        dob: pass?.birthdate || null,
        passengerPhone: phone,
        passengerEmail: email,
      };
    }) || [];
  const updateSirenaTickets =
    sirena_ticket_info?.map((t) => {
      const { phones, ...rest } = t;
      const relatedPhones = parseContacts(phones)?.phones?.length
        ? parseContacts(phones)?.phones
        : null;
      const relatedEmails = parseContacts(phones)?.emails?.length
        ? parseContacts(phones)?.emails
        : null;
      return {
        ...rest,
        city_from: normalizeSpaces(t?.city_from),
        tkt_date: moment.utc(t.tkt_date).format("YYYY-MM-DD HH:mm:ss") || null,
        city_to: normalizeSpaces(t?.city_to),
        passDoc: replaceWithNullIfOnlySpaces(t?.passDoc),
        info: replaceWithNullIfOnlySpaces(t?.info),
        first_city: normalizeSpaces(t?.first_city),
        farce_calt_vld_url: normalizeSpaces(t?.farce_calt_vld_url),
        phonesArray: [...new Set(relatedPhones)],
        emailArray: relatedEmails?.length ? [...new Set(relatedEmails)] : null,
      };
    }) || [];

  const updatePochtaBank =
    pcht?.map((item) => {
      const {
        registryAddress,
        phone,
        workAddress,
        address,
        dopAddress,
        birthPlace,
        ...rest
      } = item;
      return {
        ...rest,
        placeOfBirth: birthPlace,
        address: [
          ...new Set([registryAddress, address, dopAddress, workAddress]),
        ],
      };
    }) || [];
  const updateNewGosUsers =
    new_gos_users?.map((newGos) => {
      const { snils, phone, ...restNewGos } = newGos;
      return {
        ...restNewGos,
        snils: removeAllSpecialCharacters(snils),
        phone: removeAllSpecialCharacters(phone),
      };
    }) || [];
  const updateNewGos =
    new_gos?.map((gos) => {
      const {
        documents,
        snils_numbers,
        phones,
        emails,
        addresses,
        ...restGos
      } = gos;
      return {
        ...restGos,
        address: addresses || null,
        email: emails || null,
        phone: phones || null,
        snils: snils_numbers || null,
        documents:
          documents?.map(({ number, series }) => {
            return {
              dcmSerialNo: series || null,
              dcmNumber: number || null,
            };
          }) || [],
      };
    }) || [];
  const updateProMed =
    promed?.map((proMed) => {
      const { document_ser, document_num, ...restMed } = proMed;
      return {
        ...restMed,
        documents: [
          {
            dcmSerialNo: document_ser || null,
            dcmNumber: document_ser || null,
          },
        ],
      };
    }) || [];
  const updateMircoCredit =
    microcredit?.map((credit) => {
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

        ...restCredit
      } = credit;
      const hasPassport =
        passport_issued_date || passport_number || passport_series;
      const hasJob =
        (work_address && work_address !== "") ||
        (work_experience && work_experience !== "") ||
        (work_position && work_position !== "");
      return {
        ...restCredit,
        localPassport: hasPassport
          ? {
              localPassportSeries: passport_series,
              localPassportNumber: passport_number,
              issuedate: passport_issued_date,
              issuedBy: passport_issued_by,
            }
          : null,
        placeOfBirth: birthplace,
        address: [...new Set([actual_address, registration_address])],
        jobHistory: hasJob
          ? [
              {
                organizationAddress: work_address,
                organizationName: work_experience,
                info: work_position,
              },
            ]
          : null,
        phone_home: home_phone,
      };
    }) || [];

  return {
    mts_bank: updateMtsBank,
    microcredit: updateMircoCredit,
    promed: updateProMed,
    new_gos: updateNewGos,
    new_gos_users: updateNewGosUsers,
    pcht: updatePochtaBank,
    sirena_ticket_info: updateSirenaTickets,
    tutu_users: updateTutuUsers,
    mvd: updateMvd,
    vk: updateVk,
    avito: updateAvito,
    alfa: updateAlfa,
    sirena_passenger: updateSirenaPass,
    sirena_ins: updateSirenaIns,
    sirena_train: updateSirenaTrain,
    fssp: updateFssp,
    rostelecom: updateRostelecom,
    beeline: updateBeeline,
    tutu_passengers: updateTutuPassengers,
    egron: updateEgron,
    dns_shop: updateDnsShop,
    phones: updatePhones,
    ...allElse,
  };
};
