import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import Field from "components/app/input/Field";
import Button from "../app/use/Button";
import ReactSelect from "../app/input/Select";
import {addComment, bugById, createBug, projectBugs} from "../../store/thunks/searchThunks";
import {addCommentSchema, createBugSchema} from "../../libs/schemas";
import {useParams} from "react-router-dom";
import CheckBox from "../app/input/CheckBox";
import {v4 as uuid} from "uuid";



const AddComment = ({cancel}) => {
    const dispatch = useDispatch();
    const { bugId } = useParams()

    const handleCheckbox = (e) => {
        setFieldValue("notifyAssignee",
            e.target.checked,
        );
    };


    const { handleSubmit, values, handleChange, errors, setFieldValue } = useFormik({
        initialValues:{},
        enableReinitialize: true,
        validationSchema: addCommentSchema,
        onSubmit: async (values) => {
            try {
                await dispatch(addComment({...values, bugId: Number(bugId)}))
                await dispatch(bugById(bugId))            
            } catch (error) {
                console.error('Error creating bug:', error);
            }
        },
    });

    return (
        <div>
            <form onSubmit={handleSubmit} enctype="multipart/form-data" style={{display: 'grid', gap: '10px'}}>
                <div className="label comment">Додати коментар</div>
                <CheckBox
                    // key={uuid()}
                    onChange={(e) => handleCheckbox(e)}
                    name='notifyAssignee'
                    checked={values.notifyAssignee}
                    title='Cповістити виконавця'
                />
                <Field
                    name="text"
                    placeholder="Коментар ..."
                    type='textArea'
                    value={values.text}
                    onChange={handleChange}
                    error={errors["text"]}
                />
                <Button
                    // disabled={errors}
                    mode="primary"
                    text="Додати"
                    type="submit"
                />
            </form>
        </div>
    )
}

export default AddComment;