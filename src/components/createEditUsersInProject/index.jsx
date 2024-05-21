import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import Button from "../app/use/Button";
import {inviteMemberToProject} from "../../libs/schemas";
import List from "../app/use/List";
import EmptyPage from "../app/base/EmptyPage";
import React, {useEffect} from "react";
import { ReactComponent as Trash } from "assets/images/trash.svg";

import {v4 as uuid} from "uuid";
import {addUserToProject, deleteUserFromProject} from "../../store/thunks/usersThunks";
import ReactSelect from "../app/input/Select";



const CreateEditUsersInProject = ({cancel, projectId}) => {
    const dispatch = useDispatch();

    const { getUsersInProjectData } = useSelector((state) => state.users);
    const { getUsersInOrgData } = useSelector((state) => state.search);


    const { handleSubmit, values, handleChange, errors , setFieldValue} = useFormik({
        initialValues: {},
        // validationSchema: inviteMemberToProject,
        onSubmit: async (values) => {
            try {
                await dispatch(addUserToProject({...values, projectId}))
                cancel();
            } catch (error) {
                console.error('Error creating bug:', error);
            }
        },
    });


    const handleDeleteUserFromOrg = async (userId) => {
        await dispatch(deleteUserFromProject({ userId, projectId: projectId }))
    };
    return (
        <div>
            <form onSubmit={handleSubmit}
                  style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px'}}
            >
                {getUsersInOrgData?.length > 0 ? (
                    <>
                    <div style={{width: '70%'}}>
                        <ReactSelect options={getUsersInOrgData?.map(item => {
                           return{
                                label: item.user?.firstName +' '+ item.user?.lastName,
                                value: item.user?.id
                            }
                        })} onChange={(opt)=>setFieldValue('userId', opt)} value={values.userId} menuPlacement='top' isClear label='Проект' error={errors["userId"]}/>
                     </div>
                    <div className="modal_action">
                        <Button
                            // disabled={errors}
                            mode="primary"
                            text="Додати"
                            type="submit"
                        />
                    </div>
                    </>
                ) : null}

            </form>

            {getUsersInProjectData?.length > 0 ?
                <List>
                    {getUsersInProjectData?.map((user)=> {
                        return (
                            // <div className="users_manage_row">
                                <li key={uuid()}>
                                    <div className="list_item_name">{user?.user?.firstName} {user?.user?.lastName} - {user?.user?.position}</div>
                                    <Button
                                        style={{
                                            padding: "10px",
                                        }}
                                        mode="tretiary"
                                        Icon={Trash}
                                        func={() => handleDeleteUserFromOrg(user?.user?.id)}
                                    />
                                </li>
                            // </div>

                        )
                    })}
                </List>
                :
                <EmptyPage title="В проекті немає користувачів">
                </EmptyPage>
            }



        </div>
    )
}

export default CreateEditUsersInProject;