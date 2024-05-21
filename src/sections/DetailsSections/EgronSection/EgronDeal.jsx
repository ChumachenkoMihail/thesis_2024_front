import "./index.scss";
import moment from "moment";
import React, { useState } from "react";
import "./index.scss";
import ReactSelect from "../../../components/app/input/Select";
import { v4 as uuid } from "uuid";
import ExpandCards from "components/app/base/ExpandCards";
import ExpandCard from "components/app/base/ExpandCard";
import TableFront from "../../../components/app/base/Table/TableFront";
import { EgronColumns } from "../../../libs/generatedСolumns/egron";
import {
  removeAllSpecialCharacters,
  removeEmptyValues,
} from "../../../libs/parseApi";
import Modal from "../../../components/app/base/Modal";
import EgronSearch from "../../../components/app/modal/EgronSearch";
import Button from "../../../components/app/use/Button";
export const sortEnums = [
  { value: "default", label: "По умолчанию" },
  { value: "DESC", label: "Сначала новые" },
  { value: "ASC", label: "Сначала старые" },
];

const EgronDeal = ({ data }) => {
  const [sortedData, setSortedData] = useState(data);
  const [open, setOpen] = useState({});
  const [sort, setSort] = useState(sortEnums[0]);
  const sortData = (order) => {
    const selected = sortEnums.find((opt) => opt.value === order);
    setSort(selected);

    const sorted = [...data].sort((a, b) => {
      const dateA = new Date(a.dateFrom);
      const dateB = new Date(b.dateFrom);
      if (order === "ASC") {
        return dateA - dateB;
      } else if (order === "DESC") {
        return dateB - dateA;
      } else {
        return data;
      }
    });
    setSortedData(sorted);
  };

  const handleNewSearch = (row) => {
    const { original } = row;
    if (
      original.firstname ||
      original.lastname ||
      original.patronymic ||
      original.snils ||
      original.document_series ||
      original.document_number
    ) {
      setOpen({
        values: removeEmptyValues({
          fio: {
            firstName: original?.firstname,
            lastName: original?.lastname,
            parentName: original?.patronymic,
          },
          snils: {
            snils: removeAllSpecialCharacters(original?.snils),
          },
          passport: {
            localPassport: {
              number: removeAllSpecialCharacters(original?.document_number),
              series: removeAllSpecialCharacters(original?.document_series),
            },
          },
          dob: original.dob || "",
        }),
        show: true,
      });
    }
  };
  return (
    <>
      {open?.show && (
        <Modal title="Новый поиск" closeModal={() => setOpen({})}>
          <EgronSearch cancel={() => setOpen({})} fields={open.values} />
        </Modal>
      )}
      {sortedData && (
        <div className="egron_history_deal">
          <div className="deal_actions">
            <ReactSelect
              options={sortEnums}
              name="sort_search"
              placeholder={sort.label}
              value={sort.value}
              onChange={sortData}
              label=""
              type="sort"
              styleWrapper={{
                width: "225px",
              }}
            />
          </div>
          {sortedData.length > 10 ? (
            <>
              <TableFront
                rowFunction={handleNewSearch}
                data={sortedData}
                columns={EgronColumns}
              />
            </>
          ) : (
            <ExpandCards
              withActions
              headTitle="К-во действий по объекту:"
              titleCount={data?.length}
            >
              <div className="accordion_content expand_cards_row expand_cards_row-4">
                {sortedData.map(
                  ({
                    lastname,
                    firstname,
                    patronymic,
                    snils,
                    dealType,
                    dateFrom,
                    status,
                    id,
                    document_series,
                    document_number,
                    dob,
                    banks,
                    isActualOwner,
                  }) => {
                    const hasValueForSearch =
                      firstname ||
                      lastname ||
                      patronymic ||
                      snils ||
                      document_series ||
                      document_number;
                    return (
                      <ExpandCard
                        key={uuid()}
                        id={id}
                        title={isActualOwner ? "Является владельцем" : ""}
                      >
                        {/*first <></> = visible content*/}
                        <>
                          <div>
                            <div className="expand_content_title">ФИО</div>
                            <p>
                              {lastname || "-"} {firstname || "-"}{" "}
                              {patronymic || "-"}
                            </p>
                          </div>
                          {dob && (
                            <div>
                              <div className="expand_content_title">
                                Дата рождения
                              </div>
                              <p>
                                {dob
                                  ? moment(dob).format("YYYY-MM-DD")
                                  : "no date"}
                              </p>
                            </div>
                          )}
                          <div>
                            <div className="expand_content_title">
                              № Соц страхования
                            </div>
                            <p>{snils || "-"}</p>
                          </div>
                          <div>
                            <div className="expand_content_title">
                              Серия-номер Документа
                            </div>
                            <p>
                              {document_series || "no data"} -{" "}
                              {document_number || "no data"}{" "}
                            </p>
                          </div>
                          <div>
                            <div className="expand_content_title">
                              Дата сделки
                            </div>
                            <p>
                              {dateFrom
                                ? moment(dateFrom).format("YYYY-MM-DD")
                                : "-"}
                            </p>
                          </div>
                        </>
                        {/*second <></> = hide content*/}
                        <>
                          <div>
                            <div className="expand_content_title">
                              Тип сделки
                            </div>
                            <p>{dealType || "-"}</p>
                          </div>
                          <div>
                            <div className="expand_content_title">Статус</div>
                            <p>{status || "-"}</p>
                          </div>
                          {banks && (
                            <div>
                              <div className="expand_content_title">
                                Банк кредитор
                              </div>
                              <p>{banks || "-"}</p>
                            </div>
                          )}

                          {hasValueForSearch && (
                            <div>
                              <Button
                                style={{ width: "100%" }}
                                text="Запустить новый поиск"
                                func={() =>
                                  handleNewSearch({
                                    original: {
                                      lastname,
                                      firstname,
                                      patronymic,
                                      snils,
                                      document_series,
                                      document_number,
                                      dob,
                                    },
                                  })
                                }
                              />
                            </div>
                          )}
                        </>
                      </ExpandCard>
                    );
                  },
                )}
              </div>
            </ExpandCards>
          )}
        </div>
      )}
    </>
  );
};

export default EgronDeal;
