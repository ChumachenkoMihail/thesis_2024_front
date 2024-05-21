import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { v4 as uuid } from "uuid";
import Wrapper from "layouts/Wrapper";
import Button from "components/app/use/Button";
import List from "components/app/use/List";
import CheckBox from "components/app/input/CheckBox";
import RadioButton from "components/app/input/RadioButton";
import Field from "components/app/input/Field";
import Title from "components/app/use/Title";
import PaginationTable from "components/app/base/Table/PaginationTable";
import { ReactComponent as SearchLoop } from "assets/images/Select/search.svg";
import { ReactComponent as Search } from "assets/images/search_2.svg";
import { ReactComponent as Clear } from "assets/images/clear_input.svg";
import { ReactComponent as Empty } from "assets/images/empty_page.svg";
import { accessSearchActions } from "store/accessSearchSlice";
import { ThemeContext } from "store/context/themeContextProvider";
import { searchAccess } from "store/thunks/accessSearchThunks";
import EmptyPage from "components/app/base/EmptyPage";
import "./index.scss";
import {
  searchDepartureRestrictionTemplate,
  searchSecretAccessTemplate,
} from "libs/schemas";
import { historyActions } from "store/historySlice";
import ButtonLoader from "components/app/use/ButtonLoader";
import ResultCounter from "components/app/use/ResultCounter";
import Error from "components/app/use/Error";
import { useUserCredits } from "apiHooks/useUserCredits";
import { toast } from "sonner";

const SearchAccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkTheme } = useContext(ThemeContext);
  const { shouldCallFunctions, userCredits } = useUserCredits();

  const {
    searchResult,
    totalPages,
    totalFind,
    selectedSearchParam,
    loading,
    page,
    limit,
    searchQuery,
  } = useSelector((state) => state.access_search);
  const { handleSubmit, values, setFieldValue, errors } = useFormik({
    initialValues: {
      searchQuery: searchQuery || "",
      departureRestrictionTemplate: [],
      secretAccessTemplate: [],
    },
    enableReinitialize: true,
    validationSchema:
      selectedSearchParam === "secretAccessTemplate"
        ? searchSecretAccessTemplate
        : searchDepartureRestrictionTemplate,
    onSubmit: (values) => {
      if (userCredits.search !== -1 && !shouldCallFunctions.search) {
        return toast.error(`Недостаточно кредитов для поиска`, {
          description: "Обратитесь к администратору",
        });
      }

      clearState();
      dispatch(
        accessSearchActions.setDataToSearch({
          secretSearchParam: selectedSearchParam,
          searchArray: values[selectedSearchParam],
        }),
      );
      navigate(`/search`, {
        state: {
          secretSearchParam: selectedSearchParam,
          searchArray: values[selectedSearchParam],
          accessSourceNameId: "ankets",
        },
      });
    },
  });

  const clearState = () => {
    dispatch(accessSearchActions.clearAccessSearchState());
    navigate(location.pathname, {
      replace: true,
      search: "",
      state: undefined,
    });
  };
  const queryStr = values?.searchQuery?.trim();

  const handleFetchByName = () => {
    dispatch(
      searchAccess({
        limit: limit,
        page: page,
        queryName: selectedSearchParam,
        query: queryStr,
      }),
    );
  };

  useEffect(() => {
    let timerId;

    if (queryStr.length >= 3) {
      timerId = setTimeout(
        () => {
          handleFetchByName();
        },
        searchQuery.length > 3 ? 2000 : 1000,
      );
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [values?.searchQuery, selectedSearchParam]);

  useEffect(() => {
    const queryStr = values?.searchQuery?.trim();
    queryStr &&
      dispatch(
        searchAccess({
          limit: limit,
          page: page,
          queryName: selectedSearchParam,
          query: queryStr,
        }),
      );
  }, [page, limit]);

  const handleChangeSearchParam = (value) => {
    setFieldValue("searchQuery", "");
    setFieldValue("departureRestrictionTemplate", []);
    setFieldValue("secretAccessTemplate", []);
    dispatch(accessSearchActions.setSearchParam(value));
    dispatch(accessSearchActions.setSearchPage(1));
  };

  const handleChangePageLimit = (value) => {
    dispatch(accessSearchActions.setSearchPage(1));
    dispatch(accessSearchActions.setLimitPage(value));
  };

  const handleChangePage = (page) => {
    dispatch(accessSearchActions.setSearchPage(page));
  };

  function handlePrevPage() {
    dispatch(accessSearchActions.setSearchPage(page - 1));
  }

  function handleNextPage(page) {
    dispatch(accessSearchActions.setSearchPage(page));
  }

  const handleCheckbox = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setFieldValue(`${selectedSearchParam}`, [
        ...values?.[selectedSearchParam],
        e.target.value,
      ]);
    } else {
      setFieldValue(
        `${selectedSearchParam}`,
        values?.[selectedSearchParam].filter(
          (value) => value !== e.target.value,
        ),
      );
    }
  };
  const handleChangeSearchQuery = (e) => {
    const value = e.target.value;
    dispatch(accessSearchActions.setSearchQuery(value));
    setFieldValue("searchQuery", value);
    dispatch(accessSearchActions.setSearchPage(1));
  };
  const handleClearSearchQuery = () => {
    setFieldValue("searchQuery", "");
    setFieldValue("departureRestrictionTemplate", []);
    setFieldValue("secretAccessTemplate", []);
    dispatch(accessSearchActions.setSearchParam(selectedSearchParam));
    dispatch(accessSearchActions.setSearchPage(1));
  };
  return (
    <>
      <Wrapper
        className={`search_access ${isDarkTheme ? "" : "search_access_light"}`}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "16px",
          }}
        >
          <div
            className="wrapper_head"
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "32px",
            }}
          >
            <Title Tag="h2">Поиск по доступу</Title>
            <div className="head_tabs">
              <RadioButton
                name="access_information"
                id="access_information"
                value="Access_information"
                text="Доступ к информации"
                onChange={() => handleChangeSearchParam("secretAccessTemplate")}
                checked={selectedSearchParam === "secretAccessTemplate"}
              />
              <RadioButton
                name="exit_restriction"
                id="exit_restriction"
                value="Exit_restriction"
                text="Ограничение выезда"
                onChange={() =>
                  handleChangeSearchParam("departureRestrictionTemplate")
                }
                checked={selectedSearchParam === "departureRestrictionTemplate"}
              />
            </div>
          </div>
          <div className="search_actions">
            <Field
              name="searchQuery"
              placeholder="Введите данные для поиска"
              onChange={handleChangeSearchQuery}
              value={values?.searchQuery}
              error={errors.searchQuery}
              Icon={SearchLoop}
              label="Данные поиска"
            >
              {values?.searchQuery && (
                <Clear
                  className="clear_field"
                  onClick={handleClearSearchQuery}
                />
              )}
            </Field>
            {totalFind > 0 || values?.[selectedSearchParam]?.length ? (
              <div
                className="head_count_bordered"
                style={{ marginTop: "16px" }}
              >
                {totalFind > 0 ? (
                  <div>
                    <ResultCounter
                      text="Результатов поиска:"
                      count={`${totalFind || "0"} результата`}
                    />
                  </div>
                ) : null}
                {values?.[selectedSearchParam]?.length ? (
                  <div>
                    <ResultCounter
                      text="Отмеченных результатов:"
                      count={`${
                        values?.[selectedSearchParam]?.length || "0"
                      } результата`}
                    />
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        <form className="search_access_form" onSubmit={handleSubmit}>
          {loading && (
            <div className="search_loader">
              <ButtonLoader />
            </div>
          )}
          {searchResult?.length ? (
            <>
              <List>
                {searchResult.map((item) => {
                  return (
                    <li key={uuid()}>
                      <CheckBox
                        highlightText
                        highlightQuery={values?.searchQuery}
                        title={item}
                        name={item}
                        onChange={handleCheckbox}
                        checked={values?.[selectedSearchParam]?.includes(item)}
                        error={errors[selectedSearchParam]}
                      />
                    </li>
                  );
                })}
              </List>
              <div className="search_access_actions">
                <Button
                  Icon={Search}
                  type="submit"
                  text="Запустить поиск"
                  disabled={
                    errors.searchQuery || !values?.[selectedSearchParam]?.length
                  }
                />
                {errors.searchQuery ||
                  (!values?.[selectedSearchParam]?.length && (
                    <div className="action_error">
                      <Error
                        message={
                          errors.searchQuery
                            ? errors.searchQuery
                            : "Выберите хотя бы 1 результат из списка"
                        }
                      />
                    </div>
                  ))}
              </div>
            </>
          ) : null}
        </form>

        {Array.isArray(searchResult) && !searchResult?.length ? (
          <EmptyPage Icon={Empty} title="Анкет не найдено" />
        ) : null}
        {searchResult?.length ? (
          <div
            className={`pagination ${isDarkTheme ? "" : "pagination_light"}`}
          >
            <PaginationTable
              className="pagination-bar"
              currentPage={page}
              pageSize={limit}
              totalCount={searchResult?.length}
              gotoPage={handleChangePage}
              previousPage={handlePrevPage}
              nextPage={handleNextPage}
              totalPageCount={totalPages}
              changePageSize={handleChangePageLimit}
            />
          </div>
        ) : null}
      </Wrapper>
    </>
  );
};

export default SearchAccess;
