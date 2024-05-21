import "./index.scss";
import { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";

const MedTests = ({ test }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  return (
    <div className={`med_test-row ${isDarkTheme ? "" : "med_test-row-light"}`}>
      <div className="row_column">
        <h3 className="column_title">Данные о пациенте</h3>
        <div className="column_content">
          <div className="content_title">ФИО</div>
          <p className="content_desc">{test.fio}</p>
          <div className="content_title">Имя профайла</div>
          <p className="content_desc">{test.profilename}</p>
          <div className="content_title">Дата рождения</div>
          <p className="content_desc">{test.birthday || "-"}</p>
          <div className="content_title">Адрес</div>
          <p className="content_desc">{test.adres || "-"}</p>
          <div className="content_title">Адрес 2</div>
          <p className="content_desc">{test.address || "-"}</p>
          <div className="content_title">Идентификатор пациента</div>
          <p className="content_desc">{test.cachepatientid || "-"}</p>{" "}
          <div className="content_title">Дата проверки</div>
          <p className="content_desc">{test.dateins || "-"}</p>
          <div className="content_title">День цикла</div>
          <p className="content_desc">{test.dayofcycle || "-"}</p>
          <div className="content_title">Номер страхового полиса</div>
          <p className="content_desc">{test.numstrahpolisa || "-"}</p>
          <div className="content_title">Страховая компания</div>
          <p className="content_desc">{test.strahcompany || "-"}</p>
          <div className="content_title">День беременности</div>
          <p className="content_desc">{test.patientberemdays || "-"}</p>
          <div className="content_title">Номер истории болезни</div>
          <p className="content_desc">{test.numhistoryofbad || "-"}</p>
        </div>
      </div>
      <div className="row_column">
        <h3 className="column_title">Анализ</h3>
        <div className="column_content">
          <div className="content_title">Дата исследования</div>
          <p className="content_desc">{test.issldatereal || ""}</p>
          <div className="content_title">Врач</div>
          <p className="content_desc">{test.issldoctor || "-"}</p>
          <div className="content_title">Врач выдавший заключение</div>
          <p className="content_desc">{test.zakldoctor || "-"}</p>
          <div className="content_title">Контрагент исследования</div>
          <p className="content_desc">{test.isslkontrg || "-"}</p>
          <div className="content_title">Название исследования</div>
          <p className="content_desc">{test.isslname || "-"}</p>
          <div className="content_title">Название исследования(рус)</div>
          <p className="content_desc">{test.tetrusname || "-"}</p>
          <div className="content_title">Единица измерения</div>
          <p className="content_desc">{test.edizmerenia || "-"}</p>
          <div className="content_title">Результат исследования</div>
          <p className="content_desc">{test.isslresult || "-"}</p>
          <div className="content_title">Допуск</div>
          <p className="content_desc">{test.dopusk || "-"}</p>
          <div className="content_title">Допуск 2</div>
          <p className="content_desc">{test.dopuskrtf || "-"}</p>
          <div className="content_title">Дата результата</div>
          <p className="content_desc">{test.result_date || "-"}</p>
          <div className="content_title">Валидность результата</div>
          <p className="content_desc">{test.isslvailid || "-"}</p>
          <div className="content_title">Максимально дней</div>
          <p className="content_desc">{test.maxday || "-"}</p>
          <div className="content_title">Отдел проводящий анализ</div>
          <p className="content_desc">{test.orderotdelenie || "-"}</p>
        </div>
      </div>
    </div>
  );
};

export default MedTests;
