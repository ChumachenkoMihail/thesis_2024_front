import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { ReactComponent as Gear } from "assets/images/gear.svg";
import { ReactComponent as Trash } from "assets/images/trash.svg";
import { ReactComponent as Plus } from "assets/images/plus.svg";
import { ReactComponent as AccessCircle } from "assets/images/access_circle.svg";
import "./index.scss";
import { deleteLevel, getAllLevelsWithFields } from "store/thunks/levelsThunks";
import { getAllSearchFields } from "store/thunks/searchThunks";
import AccessLevelEditCreate from "components/admin/AccessLevelEditCreate";
import Loader from "components/app/use/Loader";
import Modal from "components/app/base/Modal";
import Button from "components/app/use/Button";
import List from "components/app/use/List";
import Wrapper from "layouts/Wrapper";
import { useModal } from "store/context/ModalContext";
import Title from "components/app/use/Title";

const AccessLevels = () => {
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const { levels, loading } = useSelector((state) => state.levels);
  const { searchFields } = useSelector((state) => state.search);

  const [editAccess, setEditAccess] = useState(false);
  const [editLevelData, setEditLevelData] = useState(null);

  const handleEditAccessModal = (values) => {
    setEditLevelData(values);
    setEditAccess(!editAccess);
  };

  const handleDeleteLevel = (id, levelName) => {
    openModal(deleteLevel, id, {
      title: "Удаление уровня доступа",
      message: `Вы действительно хотите удалить уровень доступа ${levelName}?`,
      type: "delete",
    });
  };

  return (
    <>
      {loading && <Loader />}

      {editAccess && (
        <Modal
          Icon={editLevelData ? Gear : AccessCircle}
          title={
            editLevelData
              ? `Управление уровнем доступа `
              : "Новый уровень доступа"
          }
          closeModal={handleEditAccessModal}
          width="1200"
          subTitle={editLevelData ? `${editLevelData?.name}` : null}
        >
          <AccessLevelEditCreate
            searchFields={searchFields}
            initialState={editLevelData}
            cancel={handleEditAccessModal}
          />
        </Modal>
      )}
      <Wrapper className="kermit_access_level">
        <div className="accordion_content accordion_column">
          <div className="wrapper_head" style={{ marginBottom: "24px" }}>
            <div className="head_vis-l">
              <Title Tag="h4">Уровни доступа</Title>
            </div>
            <div className="head_vis-r">
              <Button
                Icon={Plus}
                text="Создать уровень"
                func={() => handleEditAccessModal(null)}
              />
            </div>
          </div>
          <List>
            {levels?.map(
              ({
                levelName,
                levelId,
                sources,
                dataSourcesApi,
                dataSourcesDb,
              }) => {
                return (
                  <li key={uuid()}>
                    <div className="list_item_name">{levelName}</div>
                    <Button
                      Icon={Gear}
                      text="Управление"
                      mode="tretiary"
                      func={() =>
                        handleEditAccessModal({
                          name: levelName,
                          sources,
                          levelId,
                          dataSourcesApi,
                          dataSourcesDb,
                        })
                      }
                    />
                    <Button
                      style={{
                        padding: "10px",
                      }}
                      mode="tretiary"
                      Icon={Trash}
                      func={() => handleDeleteLevel(levelId, levelName)}
                    />
                  </li>
                );
              },
            )}
          </List>
        </div>
      </Wrapper>
    </>
  );
};

export default AccessLevels;
