import { ReactComponent as Search } from "assets/images/search.svg";
import { ReactComponent as History } from "assets/images/history.svg";
import { ReactComponent as Folder } from "assets/images/folder.svg";
import { ReactComponent as AccessSearch } from "assets/images/access.svg";
import { ReactComponent as Custom } from "assets/images/custom-ankets-list.svg";
import { ReactComponent as GOS } from "assets/images/sources/gos.svg";
import { ReactComponent as AUTO } from "assets/images/sources/auto.svg";
import { ReactComponent as CDEK } from "assets/images/sources/cdek_database.svg";
import { ReactComponent as DELIVERY } from "assets/images/sources/delivery.svg";
import { ReactComponent as PHONES } from "assets/images/sources/phone_database.svg";
import { ReactComponent as SPEKTR } from "assets/images/sources/spektr_database.svg";
import { ReactComponent as Medic } from "assets/images/sources/Database_Medecine.svg";
import { ReactComponent as Avia } from "assets/images/sources/Database_Avia.svg";
import { ReactComponent as SirenaTrain } from "assets/images/sources/sirena_train.svg";
import { ReactComponent as Insurance } from "assets/images/sources/insurance.svg";
import { ReactComponent as Parking } from "assets/images/sources/Database_Parking.svg";
import { ReactComponent as Fssp } from "assets/images/sources/fssp.svg";
import { ReactComponent as Beeline } from "assets/images/sources/beeline.svg";
import { ReactComponent as Avito } from "assets/images/sources/avito.svg";
import { ReactComponent as MicroCredit } from "assets/images/sources/microcredit.svg";
import { ReactComponent as MVD } from "assets/images/sources/mvd.svg";
import { ReactComponent as Telegram } from "assets/images/telegram.svg";

import { ReactComponent as NewGos } from "assets/images/sources/newGos.svg";
import { ReactComponent as RosTelecom } from "assets/images/sources/rosTelecom.svg";
import { ReactComponent as PochtaBank } from "assets/images/sources/pochtaBank.svg";
import { ReactComponent as Family } from "assets/images/sources/family.svg";
import { ReactComponent as Mailru } from "assets/images/sources/mailru.svg";
import { ReactComponent as Vkontakte } from "assets/images/sources/vk.svg";
import { ReactComponent as Tutu } from "assets/images/sources/tutu.svg";
import { ReactComponent as Youla } from "assets/images/sources/youla.svg";
import { ReactComponent as AlfaBank } from "assets/images/sources/alfa.svg";
import { ReactComponent as EgronImage } from "assets/images/sources/egron.svg";
import { ReactComponent as DeliveryClub } from "assets/images/sources/delivery_club.svg";
import { ReactComponent as NEWGOS } from "assets/images/sources/new_gos.svg";
import { ReactComponent as NEWGOSUsers } from "assets/images/sources/new_gos_users.svg";
import { ReactComponent as MTS } from "assets/images/sources/mts.svg";
import { ReactComponent as ANKETS } from "assets/images/sources/ankets.svg";
import { ReactComponent as CSV } from "assets/images/csv_search.svg";
import { ReactComponent as SearchByOneUser } from "assets/images/search_database.svg";
import { ReactComponent as Phone } from "assets/images/phone.svg";

export const navEnums = [
  {
    title: "Поиск по анкетам",
    Icon: Search,
    route: "/search",
    // subRoutes: [
    //   {
    //     title: "Поиск по анкетам",
    //     Icon: Search,
    //     route: "/search",
    //   },
    //   {
    //     title: "Поиск по доступу",
    //     Icon: AccessSearch,
    //     route: "/access-search",
    //     protect: "canSearchByAccess",
    //   },
    // ],
  },

  {
    title: "Поиск по доступу",
    Icon: AccessSearch,
    route: "/access-search",
    protect: "canSearchByAccess",
  },
  {
    title: "Истории поисков",
    Icon: History,
    route: "/history",
    subRoutes: [
      {
        title: "История поиска",
        Icon: SearchByOneUser,
        route: "/history",
      },
      {
        title: "История CSV",
        Icon: CSV,
        route: "/history-csv",
      },
      {
        title: "История звонков",
        Icon: Phone,
        route: "/history-call",
      },
      {
        title: "История Insight",
        Icon: Telegram,
        route: "/insight-history",
      },
    ],
  },
  {
    title: "Папки",
    Icon: Folder,
    route: "/marked-profiles",
  },
  {
    title: "Кастомные анкеты",
    Icon: Custom,
    route: "/custom-profiles",
  },
];

export const genderEnums = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];
export const similarGenderEnums = [
  { value: "Мужской", label: "МУЖСКОЙ" },
  { value: "Женский", label: "ЖЕНСКИЙ" },
];
export const roleEnums = [
  { value: "user", label: "User" },
  { value: "admin", label: "Admin" },
];

export const socialSearchEnums = [
  { value: "vkId", label: "VK" },
  { value: "tgId", label: "TG userID" },
  { value: "userName", label: "TG username" },
  { value: "userPhone", label: "TG phone" },
];

export const monthsEnums = [
  { label: "Январь", value: 1 },
  { label: "Февраль", value: 2 },
  { label: "Март", value: 3 },
  { label: "Апрель", value: 4 },
  { label: "Май", value: 5 },
  { label: "Июнь", value: 6 },
  { label: "Июль", value: 7 },
  { label: "Август", value: 8 },
  { label: "Сентябрь", value: 9 },
  { label: "Октябрь", value: 10 },
  { label: "Ноябрь", value: 11 },
  { label: "Декабрь", value: 12 },
];
export const daysEnums = Array.from({ length: 31 }, (_, index) => ({
  value: index + 1,
  label: index + 1,
}));
export const yearsEnums = Array.from({ length: 124 }, (_, index) => ({
  value: 1900 + index,
  label: 1900 + index,
})).reverse();
export const pageSizeEnums = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
];

export const historySortEnums = [
  { value: "DESC", label: "Сначала новые" },
  { value: "ASC", label: "Сначала старые" },
];

export const usersFilterEnum = [
  { value: false, label: "Дефолтное к-во кредитов" },
  { value: true, label: "С наименьшим к-вом кредитов" },
];

export const foldersSortEnums = [
  { value: "sortByDate=DESC", label: "Сначала новые" },
  { value: "sortByDate=ASC", label: "Сначала старые" },
  { value: "sortByName=ASC", label: "По имени A-z" },
  { value: "sortByName=DESC", label: "По имени Z-a" },
];
export const searchHelpsEnums = [
  { title: "Невозможно запустить поиск только с введенным полем *Возраст*" },
  { title: "Невозможно запустить поиск только с введенным полем *Пол*" },
  { title: " Введите минимум одно из доступных полей" },
  { title: "Страховой номер - 11 символов" },
  { title: "Загран паспорт - 9 символов" },
  { title: "Паспорт РФ - Серия 4 символа" },
  { title: "Паспорт РФ - Номер 6 символов" },
];
export const searchHelpsCsvEnums = [
  { title: "Порядок колонок в файле редактировать запрещено" },
  { title: "Поле % от и до всегда должен быть заполнен" },
  { title: "Нельзя запустить поиск с пустым файлом" },
];
export const searchSirenaHelpsEnums = [
  {
    title:
      "Невозможно запустить поиск только с введенным полем *Номер самолета*",
  },
  {
    title: "Невозможно запустить поиск только с введенным полем *Время вылета*",
  },
  {
    title: "*Номер документа* - можно вводить любое полное значение документа",
  },
];
export const sourceEnum = {
  gos: <GOS />,
  ankets: <ANKETS />,
  auto: <Parking />,
  cdek: <CDEK />,
  delivery: <DELIVERY />,
  delivery_club: <DeliveryClub />,
  phones: <PHONES />,
  spektr: <SPEKTR />,
  medical: <Medic />,
  promed: <Medic />,
  newAuto: <AUTO />,
  sirena_passenger: <Avia />,
  sirena_ticket_info: <Avia />,
  sirena_train: <SirenaTrain />,
  sirena_ins: <Insurance />,
  fssp: <Fssp />,
  mvd: <MVD />,
  new_gos: <NEWGOS />,
  new_gos_users: <NEWGOSUsers />,
  rostelecom: <RosTelecom />,
  pcht: <PochtaBank />,
  relativies: <Family />,
  mail_ru: <Mailru />,
  vk: <Vkontakte />,
  alfa: <AlfaBank />,
  youla: <Youla />,
  tutu_users: <Tutu />,
  tutu_passengers: <Tutu />,
  beeline: <Beeline />,
  microcredit: <MicroCredit />,
  avito: <Avito />,
  egron: <EgronImage />,
  mts: <MTS />,
  mts_bank: <MTS />,
};

export const creditsNameEnum = {
  api: "Кредитов API",
  merge: "Кредитов мерджа",
  export: "Кредитов экспорта",
  anketDetail: "Кредитов просмотра профиля",
  search: "Кредитов поиска",
};
export const creditsEditEnum = {
  api: "Добавить кредиты API",
  merge: "Добавить кредиты мерджа",
  export: "Добавить кредиты экспорта",
  anketDetail: "Добавить кредиты просмотра профиля",
  search: "Добавить кредиты поиска",
};

export const userTabLogs = [
  {
    tabTitle: "Все действия",
    tabValue: "",
  },
  {
    tabTitle: "Поиски",
    tabValue: "search",
  },
  {
    tabTitle: "Поиск CSV",
    tabValue: "bulkSearch",
  },
  {
    tabTitle: "Просмотренные анкеты",
    tabValue: "anketDetail",
  },
  {
    tabTitle: "Експорты",
    tabValue: "export",
  },

  {
    tabTitle: "Поиск в других базах",
    tabValue: "merge",
  },
  {
    tabTitle: "API",
    tabValue: "api",
  },
  {
    tabTitle: "Admin действия",
    tabValue: "admin",
  },
];

export const callApiEnums = {
  attempts_exc: "Попытки закончились",
  compl_finished: "Закончен удачно",
  compl_nofinished: "Некорректный ответ",
  deleted: "Удалён из прозвона",
  duration_error: "Некорректная максимальная продолжительность звонка",
  expires: "Истекло время жизни звонка",
  novalid_button: "Невалидная кнопка",
  no_provider: "Нет подходящего провайдера",
  interrupted: "Прерван по настройкам",
  in_process: "В процессе",
  pincode_nook: "Пинкод неверный",
  pincode_ok: "Пинкод верный",
  synth_error: "Ошибка генерации ролика",
  user: "Пользовательский IVR",
};

const allDataBases = [
  {
    source_id: "alfa",
    source: "Альфа-банк",
    isNeedFilter: false,
  },
  {
    source_id: "ankets",
    source: "Таблица Анкет",
    isNeedFilter: false,
  },
  {
    source_id: "auto",
    source: "Парковки",
    isNeedFilter: false,
  },
  {
    source_id: "avito",
    source: "Avito",
    isNeedFilter: false,
  },
  {
    source_id: "beeline",
    source: "Beeline",
    isNeedFilter: false,
  },
  {
    source_id: "cdek",
    source: "CDEK",
    isNeedFilter: false,
  },
  {
    source_id: "delivery",
    source: "Доставка",
    isNeedFilter: false,
  },
  {
    source_id: "delivery_club",
    source: "Delivery club",
    isNeedFilter: false,
  },
  {
    source_id: "egron",
    source: "ЕГРОН",
    isNeedFilter: false,
  },
  {
    source_id: "fssp",
    source: "Судебные приставы",
    isNeedFilter: false,
  },
  {
    source_id: "gos",
    source: "ЕСИА",
    isNeedFilter: false,
  },
  {
    source_id: "mail_ru",
    source: "Mail.ru",
    isNeedFilter: false,
  },
  {
    source_id: "medical",
    source: "Медицина",
    isNeedFilter: false,
  },
  {
    source_id: "microcredit",
    source: "Микрокредиты",
    isNeedFilter: false,
  },
  {
    source_id: "mts",
    source: "МТС",
    isNeedFilter: false,
  },
  {
    source_id: "mts_bank",
    source: "МТС-Банк",
    isNeedFilter: false,
  },
  {
    source_id: "mvd",
    source: "МВД",
    isNeedFilter: false,
  },
  {
    source_id: "newAuto",
    source: "Avtoins",
    isNeedFilter: false,
  },
  {
    source_id: "new_gos",
    source: "Новый гос",
    isNeedFilter: false,
  },
  {
    source_id: "new_gos_users",
    source: "Гос услуги users",
    isNeedFilter: false,
  },
  {
    source_id: "pcht",
    source: "ПочтаБанк",
    isNeedFilter: false,
  },
  {
    source_id: "pcht_rf_clients",
    source: "Почта России(клиенты)",
    isNeedFilter: false,
  },
  {
    source_id: "pcht_rf_empl",
    source: "Почта России(сотрудники)",
    isNeedFilter: false,
  },
  {
    source_id: "phones",
    source: "GetContact",
    isNeedFilter: false,
  },
  {
    source_id: "promed",
    source: "Промед",
    isNeedFilter: false,
  },
  {
    source_id: "relativies",
    source: "Родственники",
    isNeedFilter: false,
  },
  {
    source_id: "rostelecom",
    source: "РосТелеком",
    isNeedFilter: false,
  },
  {
    source_id: "sirena_ins",
    source: "Сирена страховки",
    isNeedFilter: false,
  },
  {
    source_id: "sirena_passenger",
    source: "Сирена-Пассажиры",
    isNeedFilter: false,
  },
  {
    source_id: "sirena_ticket_info",
    source: "Сирена-Билеты",
    isNeedFilter: false,
  },
  {
    source_id: "sirena_train",
    source: "Сирена поезда",
    isNeedFilter: false,
  },
  {
    source_id: "spektr",
    source: "Спектр",
    isNeedFilter: false,
  },
  {
    source_id: "tutu_passengers",
    source: "Tutu пассажиры",
    isNeedFilter: false,
  },
  {
    source_id: "tutu_users",
    source: "Tutu пользователи",
    isNeedFilter: false,
  },
  {
    source_id: "vk",
    source: "Вконтакте",
    isNeedFilter: false,
  },
  {
    source_id: "youla",
    source: "Youla",
    isNeedFilter: false,
  },
  {
    source_id: "dns_shop",
    source: "Dns Shop",
    isNeedFilter: false,
  },
];
function rewriteToObject(data) {
  const result = {};
  data.forEach((item) => {
    result[item?.source_id] = item?.source;
  });
  return result;
}
export const nameForFront = rewriteToObject(allDataBases);

export const regions = [
  { code: "01", name: "Республика Адыгея" },
  { code: "02", name: "Республика Башкортостан" },
  { code: "03", name: "Республика Бурятия" },
  { code: "04", name: "Республика Алтай" },
  { code: "05", name: "Республика Дагестан" },
  { code: "06", name: "Республика Ингушетия" },
  { code: "07", name: "Кабардино-Балкарская республика" },
  { code: "08", name: "Республика Калмыкия" },
  { code: "09", name: "Карачаево-Черкесская республика" },
  { code: "10", name: "Республика Карелия" },
  { code: "11", name: "Республика Коми" },
  { code: "12", name: "Республика Марий Эл" },
  { code: "13", name: "Республика Мордовия" },
  { code: "14", name: "Республика Саха (Якутия)" },
  { code: "15", name: "Республика Северная Осетия — Алания" },
  { code: "16", name: "Республика Татарстан" },
  { code: "17", name: "Республика Тыва" },
  { code: "18", name: "Удмуртская республика" },
  { code: "19", name: "Республика Хакасия" },
  { code: "20", name: "Чеченская республика" },
  { code: "21", name: "Чувашская республика" },
  { code: "22", name: "Алтайский край" },
  { code: "23", name: "Краснодарский край" },
  { code: "24", name: "Красноярский край" },
  { code: "25", name: "Приморский край" },
  { code: "26", name: "Архангельская область" },
  { code: "27", name: "Хабаровский край" },
  { code: "28", name: "Амурская область" },
  { code: "29", name: "Архангельская область" },
  { code: "30", name: "Астраханская область" },
  { code: "31", name: "Белгородская область" },
  { code: "32", name: "Брянская область" },
  { code: "33", name: "Владимирская область" },
  { code: "34", name: "Волгоградская область" },
  { code: "35", name: "Вологодская область" },
  { code: "36", name: "Воронежская область" },
  { code: "37", name: "Ивановская область" },
  { code: "38", name: "Иркутская область" },
  { code: "39", name: "Калининградская область" },
  { code: "40", name: "Калужская область" },
  { code: "41", name: "Камчатский край" },
  { code: "42", name: "Кемеровская область" },
  { code: "43", name: "Кировская область" },
  { code: "44", name: "Костромская область" },
  { code: "45", name: "Курганская область" },
  { code: "46", name: "Курская область" },
  { code: "47", name: "Ленинградская область" },
  { code: "48", name: "Липецкая область" },
  { code: "49", name: "Магаданская область" },
  { code: "50", name: "Московская область" },
  { code: "51", name: "Мурманская область" },
  { code: "52", name: "Нижегородская область" },
  { code: "53", name: "Новгородская область" },
  { code: "54", name: "Новосибирская область" },
  { code: "55", name: "Омская область" },
  { code: "56", name: "Оренбургская область" },
  { code: "57", name: "Орловская область" },
  { code: "58", name: "Пензенская область" },
  { code: "59", name: "Пермский край" },
  { code: "60", name: "Псковская область" },
  { code: "61", name: "Ростовская область" },
  { code: "62", name: "Рязанская область" },
  { code: "63", name: "Самарская область" },
  { code: "64", name: "Саратовская область" },
  { code: "65", name: "Сахалинская область" },
  { code: "66", name: "Свердловская область" },
  { code: "67", name: "Смоленская область" },
  { code: "70", name: "Томская область" },
  { code: "75", name: "Забайкальский край" },
  { code: "76", name: "Ярославская область" },
  { code: "77", name: "Москва" },
  { code: "78", name: "Санкт-Петербург" },
  { code: "79", name: "Еврейская автономная область" },
  { code: "80", name: "Забайкальский край" },
  { code: "81", name: "Пермский край" },
  { code: "82", name: "Камчатский край" },
  { code: "83", name: "Ненецкий автономный округ" },
  { code: "84", name: "Красноярский край" },
  { code: "85", name: "Иркутская область" },
  { code: "86", name: "Ханты-Мансийский автономный округ - Югра" },
  { code: "87", name: "Чукотский автономный округ" },
  { code: "88", name: "Красноярский край" },
  { code: "89", name: "Ямало-Ненецкий автономный округ" },
  { code: "90", name: "Республика Крым" },
  { code: "91", name: "Севастополь" },
]
  .map(({ name, code }) => {
    return { value: code, label: name };
  })
  .sort(function (a, b) {
    if (a.label < b.label) {
      return -1;
    }
    if (a.label > b.label) {
      return 1;
    }
    return 0;
  });
