import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "components/app/use/Button";
import Table from "components/app/base/Table";
import Loader from "components/app/use/Loader";
import Wrapper from "layouts/Wrapper";
import Title from "components/app/use/Title";
import { ReactComponent as ArrowCurved } from "assets/images/arrow_back_curved.svg";
import {
  deleteBookmarkFolder,
  getFolderBookmarks,
} from "store/thunks/foldersThunks";
import { ThemeContext } from "store/context/themeContextProvider";
import { createColumns } from "libs/generatedСolumns/generateColumnWithSort";
import "./index.scss";
import { searchActions } from "store/searchSlice";
import { useModal } from "store/context/ModalContext";

const MarkedProfileView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDarkTheme } = useContext(ThemeContext);
  const { openModal } = useModal();

  const { folderBookmarks, loading, folderName } = useSelector(
    (state) => state.folders,
  );
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [limit]);

  useEffect(() => {
    dispatch(getFolderBookmarks({ id, limit, page }));
  }, [page, limit]);

  const handleChangePageLimit = (value) => {
    setPage(1);
    setLimit(value);
  };

  const handleChangePage = (page) => {
    setPage(page);
  };

  const handleDeleteAnketFromFolder = (e, value) => {
    e.stopPropagation();
    e.preventDefault();
    const folderId = id;
    const bookmarkId = value;
    openModal(
      deleteBookmarkFolder,
      { folderId, bookmarkId, limit, page },
      {
        title: "Удаление записи",
        message: "Вы действительно хотите удалить анкету с папки?",
        type: "delete",
      },
    );
    // dispatch(deleteBookmarkFolder({ folderId, bookmarkId, limit, page }));
  };

  const handleDetailsUser = (e, id, sourceID, sourceName) => {
    dispatch(searchActions.clearAnketData(null));
    navigate(`/marked-profiles/details/${id}/${sourceID}/${sourceName}`);
  };
  function updateArray(array) {
    const actionRemoveObj = array.find(
      (obj) => obj.className === "table_action action_remove",
    );
    const tableImageObj = array.find((obj) => obj.className === "table_image");

    if (actionRemoveObj) {
      array.splice(array.indexOf(actionRemoveObj), 1);
      array.unshift(actionRemoveObj);
    }

    if (tableImageObj) {
      array.splice(array.indexOf(tableImageObj), 1);
      array.splice(1, 0, tableImageObj);
    }

    return array;
  }

  const columns =
    folderBookmarks?.bookmarks &&
    createColumns(folderBookmarks?.bookmarks, handleDeleteAnketFromFolder);
  const revertColumns = columns && updateArray(columns);
  return (
    <>
      {loading && <Loader />}
      <Wrapper
        className={`marked_profile_details ${
          isDarkTheme ? "" : "marked_profile_light"
        }`}
      >
        <div className="wrapper_head">
          <div className="head_vis-l">
            <Button
              text=" "
              Icon={ArrowCurved}
              func={() => navigate("/marked-profiles")}
            />
            <div className="head_title">
              <Title Tag="h2">{folderName || ""}</Title>
            </div>
          </div>
        </div>
        {folderBookmarks && columns && revertColumns ? (
          <Table
            changeLimit={handleChangePageLimit}
            changePage={handleChangePage}
            data={folderBookmarks?.bookmarks}
            limit={folderBookmarks?.limit}
            totalPage={folderBookmarks?.totalPages}
            columns={revertColumns}
            currentPage={folderBookmarks?.currentPage}
            trFunction={handleDetailsUser}
            columnVisibility={[]}
            emptyTrIds={[]}
          />
        ) : (
          <h1>Папка пуста</h1>
        )}
      </Wrapper>
    </>
  );
};

export default MarkedProfileView;
