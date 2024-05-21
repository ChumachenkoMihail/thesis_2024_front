import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import moment from "moment";
import { ReactComponent as CheckButton } from "assets/images/check_button.svg";
import { ReactComponent as Empty } from "assets/images/empty_page.svg";
import { ReactComponent as Trash } from "assets/images/trash.svg";
import { ReactComponent as Folder } from "assets/images/add_folder.svg";
import { ReactComponent as Edit } from "assets/images/pencil_edit.svg";
import Loader from "components/app/use/Loader";
import Wrapper from "layouts/Wrapper";
import Modal from "components/app/base/Modal";
import Title from "components/app/use/Title";
import SearchTable from "components/app/base/SearchTable";
import Button from "components/app/use/Button";
import EditCreateFolder from "components/app/modal/EditCreateFolder";
import ReactSelect from "components/app/input/Select";
import { foldersSortEnums } from "libs/Enums";
import {
  deleteFolder,
  getAllFolders,
} from "store/thunks/foldersThunks";

import "./index.scss";
import EmptyPage from "components/app/base/EmptyPage";
import { useModal } from "store/context/ModalContext";
import CheckBox from "components/app/input/CheckBox";
import { foldersActions } from "store/foldersSlice";

const MarkedProfiles = () => {
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const { allFolders, loading, selectedCheckboxIds, foldersSort } = useSelector(
    (state) => state.folders,
  );
  const [toggleFolder, setToggleFolder] = useState(false);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [edit, setEdit] = useState(null);
  const foldersNames = allFolders?.map((i) => i.name) || [];

  useEffect(() => {
    dispatch(getAllFolders({ sortBy: foldersSort.value }));
  }, [foldersSort]);

  const handleToggleFolder = () => {
    setToggleFolder(!toggleFolder);
    setEdit(null);
  };
  const handleEditFolder = (e, folder) => {
    e.stopPropagation();
    e.preventDefault();
    setEdit(folder);
    setToggleFolder(!toggleFolder);
  };

  const handleDeleteFolder = (id) => {
    openModal(deleteFolder, id, {
      title: "Удаление папки",
      message: "Вы действительно хотите удалить папку?",
      type: "delete",
    });
  };
  const handleDeleteCheckedFolders = () => {
    if (selectedCheckboxIds?.length === 1) {
      handleDeleteFolder(selectedCheckboxIds[0]);
    } else {
      openModal(deleteFolder, selectedCheckboxIds, {
        title: "Удаление папок",
        message: `Вы действительно хотите удалить папки(${selectedCheckboxIds?.length})?`,
        type: "delete",
      });
    }
  };
  const handleCheckbox = (e, id) => {
    e?.stopPropagation();
    const isChecked = e.target.checked;
    if (isChecked) {
      dispatch(
        foldersActions.setCheckboxId([...selectedCheckboxIds, Number(id)]),
      );
    } else {
      dispatch(
        foldersActions.setCheckboxId(
          selectedCheckboxIds.filter((value) => Number(value) !== Number(id)),
        ),
      );
    }
  };

  const handleShowCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes);
    dispatch(foldersActions.setCheckboxId([]));
  };
  const handleChangeSortOption = (selectedOption) => {
    const selected = foldersSortEnums.find(
      (opt) => opt.value === selectedOption,
    );
    dispatch(foldersActions.setFoldersSort(selected));
  };
  return (
    <>
      {loading && <Loader />}
      {toggleFolder && (
        <Modal
          closeModal={handleToggleFolder}
          Icon={Folder}
          title={`${edit ? "Редактировать" : "Создать"} папку`}
        >
          <EditCreateFolder
            foldersNames={foldersNames}
            isEdit={edit}
            cancel={handleToggleFolder}
          />
        </Modal>
      )}

      <Wrapper className="marked_profiles_content">
        <>
          <div className="wrapper_head">
            <div className="head_vis-l">
              <Title Tag="h2">Папки</Title>
            </div>
            <div className="head_vis-r">
              <ReactSelect
                options={foldersSortEnums}
                name="sort_search"
                placeholder={foldersSort.label}
                value={foldersSort.value}
                onChange={handleChangeSortOption}
                label=""
                type="sort"
                styleWrapper={{
                  width: "200px",
                }}
              />
              {selectedCheckboxIds?.length ? (
                <Button
                  text="Удалить отмеченные"
                  mode="tretiary"
                  func={handleDeleteCheckedFolders}
                  Icon={Trash}
                  style={{
                    padding: "10px",
                  }}
                />
              ) : null}
              {allFolders?.length ? (
                <Button
                  func={handleShowCheckboxes}
                  text={
                    showCheckboxes && selectedCheckboxIds?.length
                      ? "Снять выделение"
                      : "Выделение"
                  }
                  mode="tretiary"
                  Icon={CheckButton}
                  className={
                    showCheckboxes && selectedCheckboxIds?.length
                      ? "btn_active"
                      : ""
                  }
                />
              ) : null}
              <Button
                Icon={Folder}
                text="Создать папку"
                func={handleToggleFolder}
              />
            </div>
          </div>
          {allFolders?.length ? (
            <SearchTable>
              {allFolders?.map(({ id, name, total, date }) => {
                return (
                  <tr key={uuid()}>
                    {showCheckboxes && (
                      <td className="table_cell_check">
                        <div className="table_col">
                          <div className="table_col_check">
                            <CheckBox
                              onChange={(e) => handleCheckbox(e, id)}
                              name={id}
                              checked={selectedCheckboxIds?.find(
                                (e) => e === id,
                              )}
                            />
                          </div>
                        </div>
                      </td>
                    )}
                    <td className="table_cell_hover">
                      <Link
                        to={`${
                          total > 0
                            ? `/marked-profiles/${id}`
                            : "/marked-profiles"
                        }`}
                      >
                        <div className="table_col">
                          <div className="table_col_flex table_col_name">
                            <span className="table_col_label">Имя папки</span>
                            <span className="table_col_value">{name}</span>
                          </div>

                          <div className="table_col_edit">
                            <div
                              className="table_col_icon"
                              onClick={(e) => handleEditFolder(e, { id, name })}
                            >
                              <Edit />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="table_cell_date" style={{ width: "300px" }}>
                      <Link
                        to={`${
                          total > 0
                            ? `/marked-profiles/${id}`
                            : "/marked-profiles"
                        }`}
                      >
                        <div className="table_col">
                          <div className="table_col_flex table_col_date">
                            <span className="table_col_label">
                              Дата обновления
                            </span>
                            <span className="table_col_value">
                              {moment(date).format("YYYY-MM-DD, HH:mm")}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="table_cell_count">
                      <Link
                        to={`${
                          total > 0
                            ? `/marked-profiles/${id}`
                            : "/marked-profiles"
                        }`}
                      >
                        <div className="table_col">
                          <div className="table_col_flex table_col_count">
                            <span className="table_col_label">
                              Количество анкет
                            </span>
                            <span className="table_col_value">
                              {total ? total : "0"} анкет
                            </span>
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="table_cell_delete">
                      <div className="table_col">
                        <div className="table_col_delete">
                          <Button
                            style={{
                              padding: "10px 8px",
                            }}
                            mode="tretiary"
                            Icon={Trash}
                            func={() => handleDeleteFolder(id)}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </SearchTable>
          ) : (
            <EmptyPage Icon={Empty} title="У вас нет созданных папок" />
          )}
        </>
      </Wrapper>
    </>
  );
};

export default MarkedProfiles;
