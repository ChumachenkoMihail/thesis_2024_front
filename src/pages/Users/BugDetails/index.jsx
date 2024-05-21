import {useDispatch, useSelector} from "react-redux";
import Field from "components/app/input/Field";
import Button from "../../../components/app/use/Button";
import ReactSelect from "../../../components/app/input/Select";
import React, {useContext, useEffect} from "react";
import "./index.scss";

import {
    bugById,
    createBug,
    deleteAttachment, deleteComment,
    downloadAttachment,
    updateBug,
    usersInProject
} from "../../../store/thunks/searchThunks";
import {useParams} from "react-router-dom";
import {v4 as uuid} from "uuid";
import Title from "../../../components/app/use/Title";
import Wrapper from "../../../layouts/Wrapper";
import { Field as FormikField, Formik ,useFormik, FieldArray} from "formik";
import { ReactComponent as Trash } from "assets/images/trash.svg";
import { ReactComponent as Drop } from "assets/images/download.svg";
import {ThemeContext} from "../../../store/context/themeContextProvider";
import List from "../../../components/app/use/List";
import moment from "moment/moment";
import AddComment from "../../../components/AddComment";
import EmptyPage from "../../../components/app/base/EmptyPage";
import {createBugSchema} from "../../../libs/schemas";




const MyInput = ({ field, form, functionRemove, ...props }) => {
    return (
        <Field className="" {...field} {...form} {...props}>
            {functionRemove && (
                <Button
                    mode="transparent"
                    fill
                    Icon={Trash}
                    func={functionRemove}
                    style={{ padding: "0 0 0 32px" }}
                />
            )}
        </Field>
    );
};

const BugDetails = ({cancel}) => {
    const dispatch = useDispatch();
    const { bugId } = useParams()
    const { isDarkTheme } = useContext(ThemeContext);
    const userId = localStorage.getItem("userId");


    const { bugByIdData, usersInProjectData } = useSelector((state) => state.search);

    async function foo(){
        await dispatch(bugById(bugId))
            .then(async (data) => {
                await dispatch(usersInProject(data?.payload?.projectId))
            })
    }
    useEffect( () => {
        foo()
    }, [bugId]);

    async function deleteBugAttachment(attachmentId){
        await dispatch(deleteAttachment({bugId, attachmentId}))
        await dispatch(bugById(bugId))
    }

    async function deleteCommentFoo(commentId){
        await dispatch(deleteComment({bugId: Number(bugId), commentId: Number(commentId)}))
        await dispatch(bugById(bugId))
    }
    async function downloadAttachmentFoo(attachmentId, attachmentName){
        const  res = await dispatch(downloadAttachment({bugId, attachmentId}))
        const link = document.createElement("a");
        link.href = res?.payload?.data?.url;
        link.download = attachmentName;
        link.click();
    }
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


    console.log('bugByIdData');
    console.log(bugByIdData);
    console.log('usersInProjectData');
    console.log(usersInProjectData);

    return (
        <>
            <Formik
                initialValues={bugByIdData}
                onSubmit={async (values) => {

                    const formData = new FormData();
                    console.log('values');
                    console.log(values);
                    formData.append('bugId', bugId);

                    // Добавляем остальные поля в formData
                    Object.keys(values).forEach(key => {
                        // Игнорируем поле code, так как файлы будут добавлены отдельно
                        if (key !== 'code' && key !== 'test' && key !== 'other') {
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

                    // delete values.project
                    await dispatch(updateBug(formData))
                    await dispatch(bugById(bugId))
                }}
                validationSchema={createBugSchema}
                enableReinitialize={true}
                validateOnBlur={false}
                validateOnChange={false}
            >
                {(props) => {
                    const {
                        values,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                        errors,
                        dirty, //check if do some change in inputs
                    } = props;
                    return(
                        <Wrapper className="kermit_search kermit_box">
                            <form onSubmit={handleSubmit} encType="multipart/form-data"
                                  style={{display: 'grid', gap: '10px'}}>
                        <div className="wrapper_head">
                            <div className="head_vis-l" style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: 'space-between',
                                width: '100%'
                            }}>
                                <Title Tag="h2">{'Баг #' + values?.id + ' | ' + values?.title}</Title>

                                <div className="modal_action">
                                    <Button
                                        // disabled={errors}
                                        mode="primary"
                                        text="Зберегти"
                                        type="submit"
                                    />
                                </div>
                            </div>
                        </div>


                        <div>

                                <Field
                                    name="title"
                                    placeholder="Баг в адмінці"
                                    label="Назва"
                                    value={values?.title}
                                    onChange={handleChange
                                    }
                                    error={errors["title"]}
                                />
                                <div>
                                    <Field
                                        placeholder="Ім'я проекту"
                                        label="Проект"
                                        disabled={true}
                                        value={values?.project?.name}
                                        onChange={handleChange
                                        }
                                        // error={errors["ageTo"]}
                                    />
                                    <Field
                                        placeholder="Автор"
                                        label="Автор"
                                        disabled={true}
                                        value={values?.creator?.firstName + ' ' + values?.creator?.lastName}
                                        // error={errors["ageTo"]}
                                    />
                                    {usersInProjectData?.length > 0 ? (
                                        <ReactSelect options={usersInProjectData} onChange={(opt)=>setFieldValue('assigneeId', opt)} value={values?.assigneeId} menuPlacement='top' isClear label='Виконавець' error={errors["assigneeId"]}/>
                                    ) : null}
                                </div>
                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                    <Field
                                        name="os"
                                        placeholder="MacOS v14.02 Ventura"
                                        label="Операційна система"
                                        value={values?.os}
                                        onChange={handleChange
                                        }
                                        style={{width: '60%'}}
                                        // error={errors["ageTo"]}
                                    />
                                    <Field
                                        name="realize"
                                        placeholder="v.1.0.1"
                                        label="Номер релізу"
                                        value={values?.realize}
                                        onChange={handleChange
                                        }
                                        // error={errors["ageTo"]}
                                    />
                                </div>
                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                    <ReactSelect options={platformEnum} onChange={(opt) => setFieldValue('platform', opt)}
                                                 value={values?.platform} menuPlacement='top' isClear label='Платформа' styleWrapper={{width: '30%'}}/>
                                    <ReactSelect options={statusEnum} onChange={(opt) => setFieldValue('status', opt)}
                                                 value={values?.status} menuPlacement='top' isClear label='Статус' styleWrapper={{width: '30%'}}/>
                                    <ReactSelect options={priorityEnum} onChange={(opt) => setFieldValue('priority', opt)}
                                                 value={values?.priority} menuPlacement='top' isClear label='Пріоритет'/>
                                </div>

                                <Field
                                    name="description"
                                    placeholder="..."
                                    label="Опис"
                                    type='textArea'
                                    value={values?.description}
                                    onChange={handleChange
                                    }
                                    // error={errors["ageTo"]}
                                />
                                <Field
                                    name="codeAsText"
                                    placeholder="<div></div>"
                                    label="Код"
                                    type='textArea'
                                    value={values?.codeAsText}
                                    onChange={handleChange
                                    }
                                    // error={errors["ageTo"]}
                                />

                                <Field
                                    name="testAsText"
                                    placeholder="<div></div>"
                                    label="Тест"
                                    type='textArea'
                                    value={values?.testAsText}
                                    onChange={handleChange
                                    }
                                    // error={errors["ageTo"]}
                                />


                                <Field
                                    name="code"
                                    placeholder="..."
                                    label="Додати файли"
                                    type='file'
                                    value={values?.code ? `Вибрано ${values?.code?.length} файлів` : 'Виберіть файли'}
                                    onChange={(e) => {
                                        setFieldValue('code', Array.from(e.target.files))
                                    }
                                    }
                                    multiple='multiple'
                                    style={{padding: '8px'}}

                                    // error={errors["ageTo"]}
                                />
                                <div className="accordion_inner">
                                    <div className="accordion_content accordion_column">
                                        <div className="details_table">
                                            <div className={`${isDarkTheme ? "bebbra" : ""}`} style={{fontSize: '12px'}}>
                                                Додані файли
                                            </div>
                                            {values?.BugsAttachments?.map((file, attachIndex) => {
                                                return (
                                                    <>
                                                        {file?.attachmentType === 'CODE' ?
                                                        <div className="details_table_row">
                                                            <FieldArray name="BugsAttachments">
                                                                {({push, remove}) => (
                                                                    <>
                                                                        <div className="details_table_cell" style={{padding: '8px'}}>

                                                                            <div className="edit_area">
                                                                                <List>
                                                                                <li key={uuid()}>
                                                                                    <div className={`${isDarkTheme ? "bebbra" : ""}`} style={{width: '80%'}}>
                                                                                        {file.attachmentName}
                                                                                    </div>
                                                                                    <Button
                                                                                        style={{padding: "10px"}}
                                                                                        mode="tretiary"
                                                                                        fill
                                                                                        Icon={Drop}
                                                                                        func={() =>
                                                                                            downloadAttachmentFoo(file.id, file.attachmentName)
                                                                                        }
                                                                                    />
                                                                                    <Button
                                                                                        style={{padding: "10px"}}
                                                                                        mode="tretiary"
                                                                                        fill
                                                                                        Icon={Trash}
                                                                                        func={() =>
                                                                                            deleteBugAttachment(file.id)
                                                                                        }
                                                                                    />
                                                                                </li>
                                                                                </List>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </FieldArray>
                                                        </div>
                                                            : null }
                                                    </>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <Field
                                    name="test"
                                    placeholder="..."
                                    label="Файли тестів"
                                    type='file'
                                    // disabled={true}
                                    value={values?.test ? `Вибрано ${values?.test?.length} файлів` : 'Виберіть файли'}
                                    onChange={(e) => {
                                        setFieldValue('test', Array.from(e.target.files))
                                    }}
                                    multiple='multiple'
                                    style={{padding: '8px'}}

                                    // error={errors["ageTo"]}
                                />

                            <div className="accordion_inner">
                                <div className="accordion_content accordion_column">
                                    <div className="details_table">
                                        <div className={`${isDarkTheme ? "bebbra" : ""}`} style={{fontSize: '12px'}}>
                                            Додані файли
                                        </div>
                                        {values?.BugsAttachments?.map((file, attachIndex) => {
                                            return (
                                                <>
                                                    {file?.attachmentType === 'TEST' ?
                                                        <div className="details_table_row" >
                                                            <FieldArray name="BugsAttachments">
                                                                {({push, remove}) => (
                                                                    <>
                                                                        <div className="details_table_cell" style={{padding: '8px'}}>

                                                                            <div className="edit_area" >
                                                                                <List>

                                                                                    <li key={uuid()} style={{width: '100%'}}>
                                                                                        <div className={`${isDarkTheme ? "bebbra" : ""}`} style={{width: '80%'}}>
                                                                                            {file.attachmentName}
                                                                                        </div>
                                                                                        <Button
                                                                                            style={{padding: "10px"}}
                                                                                            mode="tretiary"
                                                                                            fill
                                                                                            Icon={Drop}
                                                                                            func={() =>
                                                                                                downloadAttachmentFoo(file.id, file.attachmentName)
                                                                                            }
                                                                                        />
                                                                                        <Button
                                                                                            style={{padding: "10px"}}
                                                                                            mode="tretiary"
                                                                                            fill
                                                                                            Icon={Trash}
                                                                                            func={() =>
                                                                                                deleteBugAttachment(file.id)
                                                                                            }
                                                                                        />
                                                                                    </li>
                                                                                </List>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </FieldArray>
                                                        </div>
                                                        : null }
                                                </>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>


                            <Field
                                    name="other"
                                    placeholder="..."
                                    label="Інші файли"
                                    type='file'
                                    // disabled={true}
                                    value={values?.other ? `Вибрано ${values?.other?.length} файлів` : 'Виберіть файли'}
                                    onChange={(e) => {
                                        setFieldValue('other', Array.from(e.target.files))
                                    }}
                                    multiple='multiple'
                                    style={{padding: '8px'}}
                                    // error={errors["ageTo"]}
                                />

                            <div className="accordion_inner">
                                <div className="accordion_content accordion_column">
                                    <div className="details_table">
                                        <div className={`${isDarkTheme ? "bebbra" : ""}`} style={{fontSize: '12px'}}>
                                            Додані файли
                                        </div>
                                        {values?.BugsAttachments?.map((file, attachIndex) => {
                                            return (
                                                <>
                                                    {file?.attachmentType === 'OTHER' ?
                                                        <div className="details_table_row">
                                                            <FieldArray name="BugsAttachments">
                                                                {({push, remove}) => (
                                                                    <>
                                                                        <div className="details_table_cell" style={{padding: '8px'}}>

                                                                            <div className="edit_area">
                                                                                <List>
                                                                                    <li key={uuid()} >
                                                                                        <div className={`${isDarkTheme ? "bebbra" : ""}`} style={{width: '80%'}}>
                                                                                            {file.attachmentName}
                                                                                        </div>
                                                                                        <Button
                                                                                            style={{padding: "10px"}}
                                                                                            mode="tretiary"
                                                                                            fill
                                                                                            Icon={Drop}
                                                                                            func={() =>
                                                                                                downloadAttachmentFoo(file.id, file.attachmentName)
                                                                                            }
                                                                                        />
                                                                                        <Button
                                                                                            style={{padding: "10px"}}
                                                                                            mode="tretiary"
                                                                                            fill
                                                                                            Icon={Trash}
                                                                                            func={() =>
                                                                                                deleteBugAttachment(file.id)
                                                                                            }
                                                                                        />
                                                                                    </li>
                                                                                </List>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </FieldArray>
                                                        </div>
                                                        : null }
                                                </>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div className={`${isDarkTheme ? "bebbra" : ""}`} style={{padding: '8x', display: "grid", gap: '15px', paddingTop: '30px'}}>
                                COMMENTS
                                {values?.Comments?.length > 0 ?
                                <List>
                                    {values?.Comments?.map((comment)=> {
                                        return (
                                            <li key={uuid()} style={{width: '100%', padding: '10px'}}>
                                                <div>
                                                    <div className={`comment ${isDarkTheme ? "bebbra" : ""}`}>
                                                        {comment?.createdBy?.firstName} {comment?.createdBy?.lastName} - {moment.utc(comment?.createdAt).format("YYYY-MM-DD HH:mm")}
                                                    </div>
                                                    <div className={` ${isDarkTheme ? "bebbra" : ""}`} style={{width: '80%', paddingLeft: '20px', paddingTop: '8px'}}>
                                                        {comment?.text}
                                                    </div>
                                                </div>
                                                {comment?.createdBy?.id === Number(userId) &&
                                                    <Button
                                                        style={{padding: "10px"}}
                                                        mode="tretiary"
                                                        fill
                                                        Icon={Trash}
                                                        func={() =>
                                                            deleteCommentFoo(comment?.id)
                                                        }
                                                    />
                                                }

                                            </li>
                                        )
                                        })
                                    }
                                </List> :
                                    <EmptyPage title="Немає коментарів">
                                    </EmptyPage>
                                }
                            </div>


                        </div>
                            </form>
                            <AddComment/>

                        </Wrapper>
                    )
                }}
            </Formik>
        </>
    )
}

export default BugDetails;