import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import Field from "components/app/input/Field";
import Button from "../app/use/Button";
import {
    createOrganization,
    createProject,
    editProjectName,
    userOrgsWithProjects
} from "../../store/thunks/searchThunks";
import { createOrgSchema} from "../../libs/schemas";



const CreateEditProject = ({cancel, selectedProject, orgId}) => {
    const dispatch = useDispatch();
    const { handleSubmit, values, handleChange, errors } = useFormik({
        initialValues: selectedProject? selectedProject : {},
        enableReinitialize: true,
        validationSchema: createOrgSchema,
        onSubmit: async (values) => {
            try {
                console.log('values');
                console.log(values);
                if(orgId !== null){
                    const createProjectData = {
                        organizationId: Number(orgId),
                        name: values.name
                    }
                    await dispatch(createProject(createProjectData));
                    await dispatch(userOrgsWithProjects())
                }else{
                    const renameProjectData = {
                        id: Number(selectedProject.id),
                        ...values
                    }
                    await dispatch(editProjectName(renameProjectData));
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
                    label="Назва проекту"
                    value={values.name}
                    onChange={handleChange}
                    error={errors["title"]}
                />
                <div className="modal_action">
                    <Button
                        // disabled={errors}
                        mode="primary"
                        text="Створити"
                        type="submit"
                    />
                </div>
            </form>
        </div>
    )
}

export default CreateEditProject;