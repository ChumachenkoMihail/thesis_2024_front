import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { alterEgo } from "store/thunks/alterEgoThunk";
import { ThemeContext } from "store/context/themeContextProvider";
import { similarGenderEnums } from "libs/Enums";
import Wrapper from "layouts/Wrapper";
import Title from "components/app/use/Title";
import Button from "components/app/use/Button";
import Loader from "components/app/use/Loader";
import EmptyPage from "components/app/base/EmptyPage";
import Field from "components/app/input/Field";
import ReactSelect from "components/app/input/Select";
import Card from "components/app/base/Card";
import PaginationTable from "components/app/base/Table/PaginationTable";
import { ReactComponent as Empty } from "assets/images/empty_page.svg";
import HtmlExportTable from "components/app/base/Table/HtmlExportTable";
import { alterEgoColumns } from "libs/generatedСolumns/alterEgo/alterEgoColumns";
import { originAlterEgoColumns } from "libs/generatedСolumns/alterEgo/originAlterEgoColumns";
import { alterEgoSchema } from "libs/schemas";
import "./index.scss";
import { removeEmptyValues, toInt } from "libs/parseApi";
import Error from "components/app/use/Error";

const AlterEgo = () => {
  const dispatch = useDispatch();

  const { isDarkTheme } = useContext(ThemeContext);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { loading, alterEgoData } = useSelector((state) => state.alterEgo);
  const [filters, setFilters] = useState({});
  const [errors, setErrors] = useState({});
  const handleGenderChange = (selectedOption) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      gender: selectedOption,
    }));
  };

  const handleApplyFilter = (pageNumber) => {
    setPage(pageNumber)
    alterEgoSchema
      .validate(filters, { abortEarly: false })
      .then(() => {
        setErrors({});
        dispatch(
          alterEgo({
            data: {
              searchFields: removeEmptyValues({
                firstName: filters?.firstName?.trim(),
                lastName: filters?.lastName?.trim(),
                patronymic: filters?.patronymic?.trim(),
                gender: filters?.gender,
                ageDiffYearsFrom: toInt(filters?.ageDiffYearsFrom || NaN),
                ageDiffYearsTo: toInt(filters?.ageDiffYearsTo || NaN),
                ageDiffDaysFrom: toInt(filters?.ageDiffDaysFrom || NaN),
                ageDiffDaysTo: toInt(filters?.ageDiffDaysTo || NaN),
                ageFrom: toInt(filters?.ageFrom || NaN),
                ageTo: toInt(filters?.ageTo || NaN),
              }),
              page: pageNumber,
              limit: limit,
            },
          }),
        );
      })
      .catch((validationErrors) => {
        const errors = {};
        validationErrors.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setErrors(errors);
      });
  };

  useEffect(() => {
    handleApplyFilter(page)
  }, [page, limit]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (page < alterEgoData?.result?.totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      {loading && <Loader />}

      <Wrapper className="history_content kermit_box">
        <>
          <div className="wrapper_head">
            <div className="head_vis-l">
              <Title Tag="h2">Alter Ego</Title>
            </div>
          </div>
          <Card>
            <div className="wrapper_actions">
              <div className="filter_action">
                <Field
                  label="Фамилия"
                  name="lastName"
                  placeholder="Иванов"
                  value={filters.lastName}
                  onChange={(e) =>
                    setFilters({ ...filters, lastName: e.target.value })
                  }
                />
                <Field
                  label="Имя"
                  name="firstName"
                  placeholder="Иван"
                  value={filters.firstName}
                  onChange={(e) =>
                    setFilters({ ...filters, firstName: e.target.value })
                  }
                />
                <Field
                  label="Отчество"
                  name="patronymic"
                  placeholder="Иванович"
                  value={filters.patronymic}
                  onChange={(e) =>
                    setFilters({ ...filters, patronymic: e.target.value })
                  }
                />
              </div>
              <div
                className="filter_action"
              >
                <Field
                  label="Разница в годах (от 0 до 100)"
                  name="ageDiffYearsFrom"
                  placeholder="0"
                  value={filters.ageDiffYearsFrom}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      ageDiffYearsFrom: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  error={errors["ageDiffYearsFrom"]}
                />
                <Field
                  name="ageDiffYearsTo"
                  placeholder="100"
                  value={filters.ageDiffYearsTo}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      ageDiffYearsTo: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  error={errors["ageDiffYearsTo"]}
                />
                <ReactSelect
                  isClear
                  label="Пол"
                  value={filters.gender}
                  name="gender"
                  onChange={handleGenderChange}
                  options={similarGenderEnums}
                  placeholder="Выберите пол"
                  styleWrapper={{
                    width: "100%",
                  }}
                />
              </div>
              <div
                className="filter_action"
              >
                <Field
                  label="Разница в днях (от 0 до 1000)"
                  name="ageDiffDaysFrom"
                  placeholder="0"
                  value={filters.ageDiffDaysFrom}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      ageDiffDaysFrom: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  error={errors["ageDiffDaysFrom"]}
                />
                <Field
                  name="ageDiffDaysTo"
                  placeholder='1000'
                  value={filters.ageDiffDaysTo}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      ageDiffDaysTo: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  error={
                    errors["ageDiffDaysTo"]
                  }
                />
              </div>
              <div
                className="filter_action"
              >
                <Field
                  label="Диапазон возраста (от 0 до 100)"
                  name="ageFrom"
                  placeholder="0"
                  value={filters.ageFrom}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      ageFrom: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  error={errors["ageFrom"]}
                />
                <Field
                  name="ageTo"
                  placeholder="100"
                  value={filters.ageTo}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      ageTo: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  error={errors["ageTo"]}
                />
              </div>
              <div className="filter_action" style={{ alignSelf: 'flex-end' }}>
                <Button func={() => handleApplyFilter(1)}>Применить фильтр</Button>
              </div>
            </div>
            {errors.selectedAgeDiff && (
              <div style={{ marginTop: '16px' }}>
                <Error message={errors.selectedAgeDiff} />
              </div>
            )}
          </Card>

          {alterEgoData?.result?.mergerdResults?.length ? (
            <>
              {alterEgoData?.result?.mergerdResults?.map((item) => {
                return (
                  <div
                    key={uuid()}
                    style={{
                      padding: "20px",
                      display: "grid",
                      gap: "15px",
                      background: isDarkTheme ? "#3a424d" : "#e6f1ff",
                      borderRadius: "12px",
                      overflowY: "scroll",
                    }}
                  >
                    <Title Tag="h3">Анкета</Title>
                    <HtmlExportTable
                      isDarkTheme={isDarkTheme}
                      data={[item]}
                      columns={originAlterEgoColumns}
                      size="small"
                      onRowClick={(rowData) =>
                        window.open(
                          `/search/details/${rowData.origin_anket_id}/${alterEgoData?.sourceId}/${alterEgoData?.sourceNameId}`,
                          "_blank",
                        )
                      }
                    />
                    {item?.alteregos?.length ? (
                      <div
                        className={`table_sub ${
                          isDarkTheme ? "table_sub_dark" : ""
                        }`}
                      >
                        <Title Tag="h3">Alter ego анкеты</Title>
                        <HtmlExportTable
                          isDarkTheme={isDarkTheme}
                          data={item?.alteregos}
                          columns={alterEgoColumns.map((column) => ({
                            ...column,
                            originData: item,
                          }))}
                          onRowClick={(rowData) =>
                            window.open(
                              `/search/details/${rowData.found_anket_id}/${alterEgoData?.sourceId}/${alterEgoData?.sourceNameId}`,
                              "_blank",
                            )
                          }
                          size="small"
                        />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </>
          ) : (
            <EmptyPage Icon={Empty} title="Нет данных для отображения" />
          )}

          {alterEgoData?.result?.mergerdResults?.length ? (
            <div
              className={`pagination ${isDarkTheme ? "" : "pagination_light"}`}
            >
              <PaginationTable
                showLimit={false}
                className="pagination-bar"
                currentPage={page}
                pageSize={limit}
                totalCount={alterEgoData?.result?.mergerdResults?.length}
                gotoPage={handleChangePage}
                previousPage={handlePrevPage}
                nextPage={handleNextPage}
                totalPageCount={alterEgoData?.result?.totalPages}
              />
            </div>
          ) : null}
        </>
      </Wrapper>
    </>
  );
};

export default AlterEgo;
