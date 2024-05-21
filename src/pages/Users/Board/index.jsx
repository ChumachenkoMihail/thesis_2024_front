import React, { useEffect, useState, useMemo, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "components/app/use/Loader";


import "./index.scss";
import {deleteBug, getProjectInOrg, projectBugs, usersInProject} from "../../../store/thunks/searchThunks";
import Table from "../../../components/app/base/Table";
import Wrapper from "../../../layouts/Wrapper";
import Title from "../../../components/app/use/Title";
import EmptyPage from "../../../components/app/base/EmptyPage";
import Button from "../../../components/app/use/Button";
import { ReactComponent as Plus } from "assets/images/plus.svg";
import DataTable from "../../../components/TestTable";
import {useParams} from "react-router-dom";
import ReactSelect from "../../../components/app/input/Select";
import Modal from "../../../components/app/base/Modal";
import CreateEditBug from "../../../components/CreateEditBug";
import { ReactComponent as Trash } from "assets/images/trash.svg";




const Board = () => {
  const dispatch = useDispatch();
  const { projectId, organizationId } = useParams()
  const [openModal, setOpenModal] = useState(false)

  const { projectBugsData, loadingOrg } = useSelector((state) => state.search);


  useEffect( () => {
    dispatch(projectBugs({projectId}))
  }, [projectId, organizationId]);


   function DropdownFilter({
     column: { filterValue, setFilter, preFilteredRows, id }
   }) {
     // .log(filterValue);
    const options = React.useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach((row) => {
        options.add(row.values[id]);
      });
      return [...options.values()].filter(Boolean);
    }, [id, preFilteredRows]);
    return (
<>
  <ReactSelect isSearch options={[{value: 'Всі', label: 'Всі'}, ...options.map(opt => {return {value: opt, label: opt}})]} value={filterValue} onChange={
    (e) => setFilter(e === 'Всі' ? undefined : e)
  }/>
</>

    );
  }

  async function deleteBugfoo(bugId){
    await dispatch(deleteBug({bugId}))
    dispatch(projectBugs({projectId}))
   }
  async function openBugCreationModal(){
     await dispatch(getProjectInOrg(organizationId))
     await dispatch(usersInProject(projectId))
    setOpenModal(true)
  }

  const  col = [
    {
      "Header": "ID",
      "accessor": "id",
      "disableSortBy": false,
      "className": "tableColumn",
      "width": 50
      ,
      Filter: DropdownFilter,

    },
    {
      "Header": "Пріорітет",
      "accessor": "priority",
      "id": "priority",
      // "width": 50,
      "className": "tableColumn",
      Filter: DropdownFilter,


    },
    {
      "Header": "Назва",
      "accessor": "title",
      "id": "sortByFIO",
      "className": "tableColumn",
      Filter: DropdownFilter,

    },

    {
      "Header": "Розробник",
      "accessor": "assignee",
      "id": "dev",
      "disableSortBy": false,
      Filter: DropdownFilter,


      Cell: ({ row: { original } }) => {
        return (
            <div className="user_column in_folder_user">
              <p>
                {original.assignee || "Немає виконавця"}
              </p>
            </div>
        );
      },
    },

    {
      "Header": "Платформа",
      "accessor": "platform",
      "id": "phone",
      "disableSortBy": false
      ,
      Filter: DropdownFilter,

    },
    {
      "Header": "ОС",
      "accessor": "os",
      "id": "os",
      "disableSortBy": false
      ,
      Filter: DropdownFilter,

    },
    // {
    //   "Header": "Середовище",
    //   "accessor": "environmentId",
    //   "id": "environmentId",
    //   "disableSortBy": false
    //   ,
    //   Filter: DropdownFilter,
    //
    // },
    {
      "Header": "Створено",
      "accessor": "createdAt",
      "id": "created",
      "disableSortBy": false
      ,

    },
    {
      "Header": "Змінено",
      "accessor": "updatedAt",
      "id": "updated",
      "disableSortBy": false
      ,
    },
    {
      "accessor": "action",
      "id": "action",
      "disableSortBy": true,
      Cell: ({ row: { original } }) => {
        // console.log(original);
        // console.log(original?.id);
        return (
            <Button
                mode="tretiary"
                // func={handleDeleteCheckedHistory}
                func={(e) => {deleteBugfoo(original.id)}}
                Icon={Trash}
                />
        );
      }
    }
  ]
  console.log('projectBugsData');
  console.log(projectBugsData);
  return (

    <>
      {openModal &&
      <Modal closeModal={()=>setOpenModal(false)} title='Створення багу'>

        <CreateEditBug cancel={()=>setOpenModal(false)}/>
      </Modal>
      }
      {loadingOrg ? (
        <Loader />
      ) : (
        <Wrapper className="kermit_search kermit_box">
          <div className="wrapper_head">
            <div className="head_vis-l" style={{display: "flex", alignItems: "center", justifyContent: 'space-between', width: '100%'}}>
              {
                projectBugsData?.length > 0 ?
                    <>
                    <Title Tag="h2">{'Організація ' +projectBugsData[0]?.project?.Organization?.name + ' / Проект ' +  projectBugsData[0]?.project?.name}</Title> </>: null
              }

              <Button text='Створити баг' mode="secondary"  Icon={Plus} func={openBugCreationModal}/>

            </div>
          </div>


          <div>
            {
              projectBugsData?.length > 0 ? (
                  <DataTable
                      data={projectBugsData}
                      withPagination={false}
                      isCheckedRow={true}
                      columns={col}
                      trFunction={(e) => console.log("e")}
                      // columnVisibility={[]}
                  />
              ): (
                  <div>
                    <EmptyPage title="В проекті немає багів">
                      <>
                        <Button
                            Icon={Plus}
                            mode="primary"
                            text="Створити баг"
                            func={openBugCreationModal}
                        />
                      </>
                    </EmptyPage>
                  </div>
              )}
          </div>
        </Wrapper>
      )}
    </>
  );
};

export default Board;
