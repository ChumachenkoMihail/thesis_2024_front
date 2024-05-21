import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import React, {useContext, useEffect} from "react";
import {deleteUserFromProject} from "../../store/thunks/usersThunks";
import {ThemeContext} from "../../store/context/themeContextProvider";
import {Chart} from "react-google-charts";
import {getProjectStats, userOrgsWithProjects} from "../../store/thunks/searchThunks";
import {useParams} from "react-router-dom";
import Wrapper from "../../layouts/Wrapper";
import Title from "../app/use/Title";
import Button from "../app/use/Button";
import EmptyPage from "../app/base/EmptyPage";
import Accordion from "../app/base/Accordion";
import List from "../app/use/List";
import {v4 as uuid} from "uuid";



const ProjectStats = ({cancel}) => {
    const dispatch = useDispatch();
    const { isDarkTheme } = useContext(ThemeContext);
    const { projectId } = useParams()



    const { getProjectStatsData } = useSelector((state) => state.search);


    const { handleSubmit, values, handleChange, errors , setFieldValue} = useFormik({
        initialValues: {},
        onSubmit: async (values) => {
            try {
                cancel();
            } catch (error) {
                console.error('Error creating bug:', error);
            }
        },
    });
    useEffect( () => {
        dispatch(getProjectStats(projectId))
    }, []);


    const options = {
        // title: "My Daily Activities",
        pieHole: 0.4,
        is3D: false,
        backgroundColor: 'none',
        sliceVisibilityThreshold:0,
        colors: ['#ffe148', '#797575', '#706bff', '#51fa02',
            '#15d5b2', '#c5c1c1'],
        legend: {
            textStyle: { color: isDarkTheme? '#ffffff' : '#000000', fontSize: 16 },
            itemVisibility: 'visible'
        },
        titleTextStyle: {
            color: isDarkTheme? '#ffffff' : '#000000',
            fontSize: 18,
        },
        pieSliceTextStyle: {
            color: 'black',
        }
    };

    const options1 = {
        backgroundColor: 'none',
        titleTextStyle: {
            color: isDarkTheme? '#ffffff' : '#000000',
            fontSize: 18,
        },
        colors: ['#ffe148','#706bff','#15d5b2', '#797575',  '#51fa02',
             '#c5c1c1'],
        legend: {
            textStyle: { color: isDarkTheme? '#ffffff' : '#000000', fontSize: 16 },
            itemVisibility: 'visible'
        },
        hAxis: {
            textStyle: { color: isDarkTheme? '#ffffff' : '#000000' },
            title: "Кількість",
            titleTextStyle: {
                color: isDarkTheme ? '#ffffff' : '#000000',
                fontSize: 16,
                bold: true,
            },

        },
        vAxis: {
            title: "Виконавці",
            textStyle: { color: isDarkTheme? '#ffffff' : '#000000' },
            titleTextStyle: {
                color: isDarkTheme ? '#ffffff' : '#000000',
                fontSize: 16,
                bold: true,
            },
        },
        color: isDarkTheme? '#ffffff' : '#000000',
        title: "За виконавцями",
    };
    const chartEvents = [
        {
            eventName: 'ready',
            callback: ({ chartWrapper }) => {
                console.log('chartWrapper.getChart()');
                console.log(chartWrapper.getChart());
                chartWrapper.getChart().backgroundColor = options.backgroundColor;
            },
        },
    ];

    console.log('getProjectStatsData');
    console.log(getProjectStatsData);
    return (
        <Wrapper className="kermit_search kermit_box">
            <div className="wrapper_head">
                <div className="head_vis-l">
                    <Title Tag="h2">Статистика проекту {getProjectStatsData?.project?.name}</Title>
                </div>
            </div>
            {getProjectStatsData?.totalBugs ?
            <div>
                <div className={`${isDarkTheme ? "bebbra" : ""}`}>Всього багів: {getProjectStatsData?.totalBugs}</div>
                <div style={{display: "flex", justifyContent: 'space-between'}}>
                    <Chart
                        chartType="PieChart"
                        width="100%"
                        height="400px"
                        data={getProjectStatsData?.totalByStatus}
                        options={{...options, title: 'За статусами'}}
                        style={{display: "flex"}}
                        className={`${isDarkTheme ? "bebbra" : ""}`}
                    />
                    <Chart
                        chartType="PieChart"
                        width="100%"
                        height="400px"
                        data={getProjectStatsData?.resultArray}
                        options={{...options, title: 'За виконавцями'}}
                        style={{display: "flex"}}
                    />
                </div>

                <Chart
                    chartType="BarChart"
                    width="100%"
                    height="400px"
                    data={getProjectStatsData?.statusResultArray}
                    options={options1}
                    style={{backgroundColor: 'none'}}
                    chartEvents={chartEvents}
                />



            </div>
                :
                <EmptyPage title="В проекті немає багів">
                </EmptyPage>
            }

        </Wrapper>


    )
}

export default ProjectStats;