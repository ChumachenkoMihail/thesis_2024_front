import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import Field from "components/app/input/Field";
import Button from "../app/use/Button";
import {createOrganization, editOrgName, userOrgsWithProjects} from "../../store/thunks/searchThunks";
import { createOrgSchema} from "../../libs/schemas";



const CreateEditOrganization = ({cancel, selectedOrg}) => {
    const dispatch = useDispatch();

    const { handleSubmit, values, handleChange, errors } = useFormik({
        initialValues: selectedOrg? selectedOrg : {},
        enableReinitialize: true,
        validationSchema: createOrgSchema,
        onSubmit: async (values) => {
            try {
                if(selectedOrg !== null){
                    await dispatch(editOrgName({name: values?.name, id: selectedOrg.id}))
                    await dispatch(userOrgsWithProjects())
                }else{
                    await dispatch(createOrganization(values));
                    await dispatch(userOrgsWithProjects())
                }
                cancel();
            } catch (error) {
                console.error('Error creating bug:', error);
            }
        },
    });

    return (
        <div>
            <form onSubmit={handleSubmit} style={{display: 'grid', gap: '10px'}}>
                <Field
                    name="name"
                    placeholder="Назва"
                    label="Назва організацї"
                    value={values.name}
                    onChange={handleChange}
                    error={errors["title"]}
                />
                <div className="modal_action">
                    <Button
                        // disabled={errors}
                        mode="primary"
                        text="Зберегти"
                        type="submit"
                    />
                </div>
            </form>

        </div>
    )
}

export default CreateEditOrganization;