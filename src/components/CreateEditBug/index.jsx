import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import Field from "components/app/input/Field";
import Button from "../app/use/Button";
import ReactSelect from "../app/input/Select";
import {createBug, projectBugs} from "../../store/thunks/searchThunks";
import {createBugSchema} from "../../libs/schemas";
import {useParams} from "react-router-dom";



const CreateEditBug = ({cancel, selectedBug}) => {
    const dispatch = useDispatch();
    const { projectId } = useParams()
    console.log('projectId');
    console.log(projectId);

    const { getProjectInOrgData, usersInProjectData } = useSelector((state) => state.search);

    const { handleSubmit, values, handleChange, errors, setFieldValue } = useFormik({
        initialValues: selectedBug? selectedBug : {},
        enableReinitialize: true,
        validationSchema: createBugSchema,
        onSubmit: async (values) => {
            try {
                const formData = new FormData();

                // Добавляем остальные поля в formData
                Object.keys(values).forEach(key => {
                    // Игнорируем поле code, так как файлы будут добавлены отдельно
                    if (key !== 'code') {
                        formData.append(key, values[key]);
                    }
                });

                // Добавляем файлы в formData
                if (values.code) {
                    values.code.forEach(file => {
                        formData.append('code', file);
                    });
                }

                if (values.test) {
                    values.test.forEach(file => {
                        formData.append('test', file);
                    });
                }

                if (values.other) {
                    values.other.forEach(file => {
                        formData.append('other', file);
                    });
                }

                // Отправляем formData на сервер
                await dispatch(createBug(formData));
                await dispatch(projectBugs({projectId}))

                cancel();
            } catch (error) {
                console.error('Error creating bug:', error);
            }
        },
    });

    const platformEnum = [
        {
            label: 'DESKTOP',
            value: 'DESKTOP'
        },
        {
            label: 'TABLET',
            value: 'TABLET'
        },
        {
            label: 'MOBILE',
            value: 'MOBILE'
        },
        {
            label: 'EMBEDDED',
            value: 'EMBEDDED'
        },
        {
            label: 'WEB',
            value: 'WEB'
        },
    ]

    const statusEnum = [
        {
            label: 'BACKLOG',
            value: 'BACKLOG'
        },
        {
            label: 'IN_PROGRESS',
            value: 'IN_PROGRESS'
        },
        {
            label: 'TODO',
            value: 'TODO'
        },
        {
            label: 'COMPLETED',
            value: 'COMPLETED'
        },
        {
            label: 'QA',
            value: 'QA'
        },
]

    const priorityEnum = [
        {
            label: 1,
            value: 1
        },
        {
            label: 2,
            value: 2
        },
        {
            label: 3,
            value: 3
        },
        {
            label: 4,
            value: 4
        },
        {
            label: 5,
            value: 5
        },
    ]
    console.log('usersInProjectData');
    console.log(usersInProjectData);
    return (
        <div>
            <form onSubmit={handleSubmit} enctype="multipart/form-data" style={{display: 'grid', gap: '10px'}}>
            <Field
                name="title"
                placeholder="Баг в адмінці"
                label="Назва"
                value={values.title}
                onChange={handleChange
                }
                error={errors["title"]}
            />
                {getProjectInOrgData?.length > 0 ? (
                    <ReactSelect options={getProjectInOrgData} onChange={(opt)=>setFieldValue('projectId', opt)} value={values.projectId} menuPlacement='top' isClear label='Проект' error={errors["projectId"]}/>
                ) : null}
                {usersInProjectData?.length > 0 ? (
                    <ReactSelect options={usersInProjectData} onChange={(opt)=>setFieldValue('assigneeId', opt)} value={values.assigneeId} menuPlacement='top' isClear label='Виконавець' error={errors["assigneeId"]}/>
                ) : null}
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Field
                        name="os"
                        placeholder="MacOS v14.02 Ventura"
                        label="Операційна система"
                        value={values.os}
                        onChange={handleChange}
                        style={{width: '60%'}}
                        // error={errors["ageTo"]}
                    />
                    <Field
                        name="realize"
                        placeholder="v.1.0.1"
                        label="Номер релізу"
                        value={values.realize}
                        onChange={handleChange
                        }
                        // error={errors["ageTo"]}
                    />
                </div>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <ReactSelect options={platformEnum} onChange={(opt)=>setFieldValue('platform', opt)} value={values.platform} menuPlacement='top' isClear label='Платформа' styleWrapper={{width: '30%'}}/>
                    <ReactSelect options={statusEnum} onChange={(opt)=>setFieldValue('status', opt)} value={values.status} menuPlacement='top' isClear label='Статус' styleWrapper={{width: '30%'}}/>
                    <ReactSelect options={priorityEnum} onChange={(opt)=>setFieldValue('priority', opt)} value={values.priority} menuPlacement='top' isClear label='Пріоритет'/>
                </div>
                <Field
                name="description"
                placeholder="..."
                label="Опис"
                type='textArea'
                value={values.description}
                onChange={handleChange}
                // error={errors["ageTo"]}
            />
                <Field
                    name="codeAsText"
                    placeholder="<div></div>"
                    label="Код"
                    type='textArea'
                    value={values.codeAsText}
                    onChange={handleChange}
                    // error={errors["ageTo"]}
                />

                <Field
                    name="testAsText"
                    placeholder="<div></div>"
                    label="Тест"
                    type='textArea'
                    value={values.testAsText}
                    onChange={handleChange
                    }
                    // error={errors["ageTo"]}
                />



                <Field
                    name="code"
                    placeholder="..."
                    label="Файли коду"
                    type='file'
                    // disabled={true}
                    value={values.code ? `Вибрано ${values.code?.length} файлів` : 'Виберіть файли'}
                    onChange={(e)=>{
                        setFieldValue('code' ,Array.from(e.target.files))
                    }
                }
                    multiple='multiple'
                    // error={errors["ageTo"]}
                ></Field>

                <Field
                    name="test"
                    placeholder="..."
                    label="Файли тестів"
                    type='file'
                    // disabled={true}
                    value={values.test ? `Вибрано ${values.test?.length} файлів` : 'Виберіть файли'}
                    onChange={(e)=>{
                        setFieldValue('test' ,Array.from(e.target.files))
                    }}
                    multiple='multiple'
                    // error={errors["ageTo"]}
                />

                <Field
                    name="other"
                    placeholder="..."
                    label="Інші файли"
                    type='file'
                    // disabled={true}
                    value={values.other ? `Вибрано ${values.other?.length} файлів` : 'Виберіть файли'}
                    onChange={(e)=>{
                        setFieldValue('other' ,Array.from(e.target.files))
                    }}
                    multiple='multiple'
                    // error={errors["ageTo"]}
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

export default CreateEditBug;