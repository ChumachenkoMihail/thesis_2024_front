import React, { useEffect, useState, useMemo, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "components/app/use/Button";
import Title from "components/app/use/Title";
import EmptyPage from "components/app/base/EmptyPage";

import Loader from "components/app/use/Loader";
import Wrapper from "layouts/Wrapper";

import { ReactComponent as Plus } from "assets/images/plus.svg";
import { ReactComponent as Trash } from "assets/images/trash.svg";
import { ReactComponent as UserPlus } from "assets/images/user_plus.svg";
import { ReactComponent as Pencil } from "assets/images/pencil_edit.svg";
import { ReactComponent as Profile } from "assets/images/profile.svg";
import { ReactComponent as Stat } from "assets/images/stat2.svg";




import "./index.scss";
import Modal from "../../../components/app/base/Modal";
import CreateEditOrganization from "../../../components/createEditOrganization";
import {
    deleteOrg,
    deleteProject, getProjectStats,
    getUsersInOrg,
    userOrgsWithProjects
} from "../../../store/thunks/searchThunks";
import Accordion from "../../../components/app/base/Accordion";
import List from "../../../components/app/use/List";
import {v4 as uuid} from "uuid";
import CreateEditProject from "../../../components/createEditProject";
import {useModal} from "../../../store/context/ModalContext";
import CreateEditUsersInOrg from "../../../components/createEditUsersInOrg";
import {getUsersInProject} from "../../../store/thunks/usersThunks";
import CreateEditUsersInProject from "../../../components/createEditUsersInProject";
import {Chart} from "react-google-charts";
import ProjectStats from "../../../components/ProjectStats";
import {useNavigate} from "react-router-dom";


const Organization = () => {
  const [openModalOrg, setOpenModalOrg] = useState({open: false, currentOrg: null})
  const [openModalProject, setOpenModalProject] = useState({open: false, orgId: null, projectId: null})
  const [openModalProjectUsers, setOpenModalProjectUsers] = useState({open: false, projectId: null})
  const [openModalOrgUsers, setOpenModalOrgUsers] = useState({open: false, orgId: null})
  const [openModalProjectStats, setOpenModalProjectStats] = useState({open: false, projectId: null, projectName: null})
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openModal } = useModal();

    const data = [
        ["Task", "Hours per Day"],
        ["Work", 11],
        ["Eat", 2],
        ["Commute", 2],
        ["Watch TV", 2],
        ["Sleep", 7], // CSS-style declaration
    ];

    const resultArray =  [
        ["Task", "Hours per Day"],
        [
            "In Progress",
            1
        ],
        [
            "Backlog",
            0
        ],
        [
            "Todo",
            0
        ],
        [
            "Completed",
            0
        ],
        [
            "QA",
            5
        ],
        [
            "No status",
            1
        ]
    ]

    const options = {
        title: "My Daily Activities",
        pieHole: 0.4,
        is3D: false,
        backgroundColor: 'none',
        sliceVisibilityThreshold:0,
        colors: ['#ffe148', '#797575', '#706bff', '#51fa02',
            '#15d5b2', '#ffffff'],
        legend: {
            textStyle: { color: '#ffffff', fontSize: 16 },
            itemVisibility: 'visible'
        },
        titleTextStyle: {
            color: '#ffffff',
            fontSize: 18,
        },
        pieSliceTextStyle: {
            color: 'black',
        }
    };


  const { userOrgsWithProjectsData } = useSelector((state) => state.search);
  const userId = localStorage.getItem("userId");


  useEffect( () => {
    dispatch(userOrgsWithProjects())
  }, []);

  const {
    loading,
  } = useSelector((state) => state.history);

const createNewOrganization = () => {
  setOpenModalOrg({open: true, currentOrg: null})
}
const createNewProject = (orgId) => {
  setOpenModalProject({open: true, orgId: orgId, projectId: null})
}
const editOrgName = (org) => {
  setOpenModalOrg({open: true, currentOrg: org})
}
const editProjectName = (projectId) => {
    setOpenModalProject({open: true, orgId: null, projectId})
}
const projectStats = async (projectId, projectName) => {
    navigate(`/statistic/${projectId}`)
    // await dispatch(getProjectStats(projectId))
    // setOpenModalProjectStats({open: true, projectId, projectName})
}
const editUsersInOrg = async (orgId) => {
  await dispatch(getUsersInOrg(orgId))
  setOpenModalOrgUsers({open: true, orgId: orgId})
}
const editUsersInProject = async (projectId, orgId) => {
    await dispatch(getUsersInProject(projectId))
    await dispatch(getUsersInOrg(orgId))
    setOpenModalProjectUsers({open: true, projectId: projectId})
}
const handleDeleteOrg = (id, orgName) => {
  openModal(
      deleteOrg,
      { id },
      {
        title: "Видалення організації",
        message: `Ви дійсно хочете видалити ораганізацію ${orgName}?`,
        type: "delete",
      },
  );
};

  const handleDeleteProject = (projectId, projectName) => {
    openModal(
        deleteProject,
        { id: projectId },
        {
          title: "Видалення організації",
          message: `Ви дійсно хочете видалити проект ${projectName}?`,
          type: "delete",
        },
    );
  };

  console.log('userOrgsWithProjectsData');
  console.log(userOrgsWithProjectsData);
  return (
    <>
        {openModalProjectStats.open &&
            <Modal closeModal={()=>setOpenModalProjectStats({open: false, projectId: null, projectName: null})}
                   title={'Статистика проекту ' + openModalProjectStats.projectName}
            >
                <ProjectStats projectId={openModalProjectStats.projectId} cancel={()=>setOpenModalProjectStats({open: false, projectId: null, projectName: null})}/>
            </Modal>
        }


        {openModalProjectUsers.open &&
            <Modal closeModal={()=>setOpenModalProjectUsers({open: false, projectId: null})}
                   title='Управління користувачами проекту'
            >
                <CreateEditUsersInProject projectId={openModalProjectUsers.projectId} cancel={()=>setOpenModalProjectUsers({open: false, projectId: null})}/>
            </Modal>
        }
      {openModalOrg.open &&
          <Modal closeModal={()=>setOpenModalOrg({open: false, currentOrg: null})}
                 title={openModalOrg?.currentOrg !== null ? 'Зміна назви організації' : 'Створення організації'}
          >
            <CreateEditOrganization selectedOrg={openModalOrg.currentOrg} cancel={()=>setOpenModalOrg({open: false, currentOrg: null})}/>
          </Modal>
      }
      {openModalOrgUsers.open &&
          <Modal closeModal={()=> setOpenModalOrgUsers( {open: false, currentOrg: null})} title='Управління користувачами організації'>
            <CreateEditUsersInOrg orgId={openModalOrgUsers.orgId}  cancel={()=>setOpenModalOrgUsers({open: false, currentOrg: null})}/>
          </Modal>
      }
      {openModalProject.open &&
          <Modal closeModal={()=>setOpenModalProject({open: false, orgId: null, projectId: null})}
                 title={openModalProject?.projectId !== null ? 'Зміна назви проекту' : 'Створення проекту'}
                 // title='Створення проекту'
          >

            <CreateEditProject orgId={openModalProject.orgId} selectedProject={openModalProject.projectId} cancel={()=>setOpenModalProject({})}/>
          </Modal>
      }
      {loading ? (
        <Loader />
      ) : (
        <Wrapper className="kermit_search kermit_box">
          <div className="wrapper_head">
            <div className="head_vis-l">
              <Title Tag="h2">Організації</Title>
            </div>
            <Button text='Створити організацію' mode="secondary"  Icon={Plus} func={createNewOrganization}/>

          </div>
            {(!userOrgsWithProjectsData || userOrgsWithProjectsData.length <= 0 || (userOrgsWithProjectsData[0]?.owner !== true)) ? (
          <div>
              <EmptyPage title="Ви не є власником оранізацій">
                <>
                  <Button
                    Icon={Plus}
                    mode="primary"
                    text="Створити організацію"

                    func={createNewOrganization}
                  />
                </>
              </EmptyPage>
          </div>
            ): <>
              {userOrgsWithProjectsData?.map((org) =>
                (
                    <>
                      {
                        Number(userId) === Number(org?.userId) ?
                        <Accordion title={org?.name}>
                          <div className="users_manage_row">
                            <div className="wrapper_head" style={{ marginBottom: "24px" }}>
                              <div className="head_vis-l">
                                {/*<Title Tag="h4">Уровни доступа</Title>*/}
                              </div>
                              <div className="head_vis-r">
                                <Button
                                    Icon={Plus}
                                    text="Створити проект"
                                    mode="tretiary"
                                    func={() => {
                                      createNewProject(org?.id)
                                    }}
                                />
                                <Button
                                    Icon={Pencil}
                                    // text="Змінити назву"
                                    mode="tretiary"
                                    func={() => {
                                      editOrgName(org)
                                    }}
                                />
                                <Button
                                    Icon={Profile}
                                    // text="Змінити назву"
                                    mode="tretiary"
                                    func={() => {
                                      editUsersInOrg(org?.id)
                                    }}
                                />
                                <Button
                                    Icon={Trash}
                                    mode="tretiary"
                                    func={() => handleDeleteOrg(org?.id, org?.name)}
                                />
                              </div>
                            </div>
                            {org?.Projects?.length > 0 ?
                            <List>
                              {org?.Projects?.map((project) => {
                                return (
                                    <li key={uuid()}>
                                      <div className="list_item_name">{project?.name}</div>
                                        <Button
                                            mode="tretiary"
                                            Icon={Stat}
                                            func={() => projectStats(project?.id, project?.name)}
                                        />
                                      <Button
                                          Icon={Pencil}
                                          // text="Змінити назву"
                                          mode="tretiary"
                                          func={() => {
                                            editProjectName(project)
                                          }}
                                      />
                                      <Button
                                          Icon={UserPlus}
                                          // text="Змінити назву"
                                          mode="tretiary"
                                          func={() => {
                                              editUsersInProject(project?.id, org?.id)
                                          }}
                                      />
                                      <Button
                                          style={{
                                            padding: "10px",
                                          }}
                                          mode="tretiary"
                                          Icon={Trash}
                                          func={() => handleDeleteProject(project?.id, project?.name)}
                                      />
                                    </li>
                                );
                              })}
                            </List>
                                :
                                <EmptyPage title="В організації немає проектів">
                                </EmptyPage>
                            }
                          </div>
                        </Accordion> : null
                      }
                    </>
                )
                )}
              </>
          }
        </Wrapper>
      )}
    </>
  );
};

export default Organization;
