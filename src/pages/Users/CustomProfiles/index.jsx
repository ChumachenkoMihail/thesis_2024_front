import { useDispatch, useSelector } from "react-redux";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "layouts/Wrapper";
import Table from "components/app/base/Table";
import Loader from "components/app/use/Loader";
import PaginationTable from "components/app/base/Table/PaginationTable";
import {
  getAllAnkets,
  removeCustomAnket,
} from "store/thunks/customProfileThunks";
import { ThemeContext } from "store/context/themeContextProvider";
import { createColumns } from "libs/generatedСolumns/generateColumnWithSort";
import "./index.scss";
import Title from "components/app/use/Title";
import { ReactComponent as Empty } from "assets/images/empty_page.svg";
import EmptyPage from "components/app/base/EmptyPage";
import { useModal } from "store/context/ModalContext";
import { customProfileActions } from "../../../store/customProfileSlice";

const CustomProfiles = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { isDarkTheme } = useContext(ThemeContext);
  const { allCustomProfiles, loading, page, limit } = useSelector(
    (state) => state.custom,
  );

  useEffect(() => {
    dispatch(getAllAnkets({ page: page, limit: limit }));
  }, [page, limit]);

  const handleDeleteCustomProfile = (e, value) => {
    e.stopPropagation();
    e.preventDefault();
    openModal(
      removeCustomAnket,
      { id: value },
      {
        title: "Удаление записи",
        message: "Вы действительно хотите удалить анкету?",
        type: "delete",
      },
    );
  };
  const handleEditCustomProfile = (e, value) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/custom-profile/${value}`);
  };

  const handleChangePage = (page) => {
    dispatch(customProfileActions.setPage(page));
  };

  function handlePrevPage() {
    dispatch(customProfileActions.setPage(page - 1));
  }
  function handleNextPage(page) {
    dispatch(customProfileActions.setPage(page));
  }

  const columns = allCustomProfiles?.data?.length
    ? createColumns(
        allCustomProfiles?.data,
        handleDeleteCustomProfile,
        handleEditCustomProfile,
      )
    : [];
  const updatedArray = columns
    ?.filter((item) => !item.className.includes("table_action"))
    .concat(columns.filter((item) => item.className.includes("table_action")));

  const emptyTr = allCustomProfiles?.data
    ? allCustomProfiles?.data
        ?.filter((item) => Object.keys(item?.data)?.length === 0)
        ?.map((item) => item?.id)
    : [];
  const handleChangeLimit = (value) => {
    dispatch(customProfileActions.setPage(1));
    dispatch(customProfileActions.setLimit(value));
  };
  return (
    <>
      {loading && <Loader />}
      <Wrapper className="custom_profiles_content">
        <div className="wrapper_head">
          <Title Tag="h2">Кастомные анкеты</Title>
        </div>
        {columns?.length && updatedArray?.length ? (
          <Table
            data={allCustomProfiles.data}
            withPagination={false}
            columns={updatedArray}
            trFunction={handleEditCustomProfile}
            columnVisibility={[]}
            emptyTrIds={emptyTr}
            className="custom_profiles_table"
            currentPage={allCustomProfiles?.page}
            totalPage={allCustomProfiles?.total}
            limit={limit}
          />
        ) : (
          <EmptyPage Icon={Empty} title="У вас нет созданных кастомных анкет" />
        )}

        {allCustomProfiles?.data?.length ? (
          <div
            className={`pagination ${isDarkTheme ? "" : "pagination_light"}`}
          >
            <PaginationTable
              showLimit
              className="pagination-bar"
              currentPage={allCustomProfiles?.page}
              pageSize={allCustomProfiles?.limit}
              totalCount={allCustomProfiles?.data?.length}
              gotoPage={handleChangePage}
              previousPage={handlePrevPage}
              nextPage={handleNextPage}
              totalPageCount={allCustomProfiles?.total}
              changePageSize={handleChangeLimit}
            />
          </div>
        ) : null}
      </Wrapper>
    </>
  );
};

export default CustomProfiles;
