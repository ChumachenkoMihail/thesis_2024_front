import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import Field from "components/app/input/Field";
import Button from "../app/use/Button";
import {
    createOrganization, deleteOrg,
    deleteUserFromOrg,
    editOrgName,
    inviteUserToOrg,
    userOrgsWithProjects
} from "../../store/thunks/searchThunks";
import {createOrgSchema, inviteMemberToOrg} from "../../libs/schemas";
import List from "../app/use/List";
import EmptyPage from "../app/base/EmptyPage";
import React from "react";
import { ReactComponent as Trash } from "assets/images/trash.svg";

import {v4 as uuid} from "uuid";
import {useModal} from "../../store/context/ModalContext";



const CreateEditUsersInOrg = ({cancel, orgId}) => {
    const dispatch = useDispatch();
    const { openModal } = useModal();
    const { getUsersInOrgData } = useSelector((state) => state.search);


    const { handleSubmit, values, handleChange, errors } = useFormik({
        initialValues: {},
        validationSchema: inviteMemberToOrg,
        onSubmit: async (values) => {
            try {
                await dispatch(inviteUserToOrg({organizationId: orgId, ...values}))

                cancel();
            } catch (error) {
                console.error('Error creating bug:', error);
            }
        },
    });

    console.log(getUsersInOrgData);



    const handleDeleteUserFromOrg = async (userId) => {
        await dispatch(deleteUserFromOrg({ userId, organizationId: orgId }))
    };
    return (
        <div>
            <form onSubmit={handleSubmit}
                  style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px'}}
            >
                <Field
                    name="login"
                    placeholder="Логін"
                    label="Логін користувача"
                    value={values.login}
                    onChange={handleChange}
                    // error={errors["title"]}
                    style={{width: '70%'}}
                />
                <div className="modal_action">
                    <Button
                        // disabled={errors}
                        mode="primary"
                        text="Додати"
                        type="submit"
                    />
                </div>
            </form>

            {getUsersInOrgData?.length > 0 ?
                <List>
                    {getUsersInOrgData?.map((user)=> {
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
                <EmptyPage title="В організації немає користувачів">
                </EmptyPage>
            }



        </div>
    )
}

export default CreateEditUsersInOrg;