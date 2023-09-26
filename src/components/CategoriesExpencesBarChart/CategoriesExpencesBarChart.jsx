import React, { useState } from "react";
import { useSelector } from "react-redux";

import PropTypes from 'prop-types';
import {
    Box,
    Paper,
    Typography,
    Select,
    MenuItem } from "@mui/material";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { timePeriods } from "../../enums/timePeriods";
import { labels } from "../../enums/labels";
import { filterDataToDisplay } from "../../helpers/filterData";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
    },
};

export const CategoriesExpencesBarChart = ({ title, account }) => {
    const transactions = useSelector(state => state.operations);
    const [timePeriod, setTimePeriod] = useState("last week");
    const [timePeriodNum, setTimePeriodNum] = useState(7);
    const expensesArr = filterDataToDisplay(labels, transactions, account, timePeriodNum);

    const handleSelect = (e) => {
        const selectedValue = e.target.value;
        setTimePeriod(selectedValue);
        if (selectedValue === "last week") setTimePeriodNum(7);
        else if (selectedValue === "last month") setTimePeriodNum(30);
        else if (selectedValue === "last year") setTimePeriodNum(365);
    }

    const data = {
        labels,
        datasets: [
            {
                data: expensesArr,
                backgroundColor: 'rgba(25, 118, 210, 0.7)',
            }
        ],
    };

    return (
        <Paper sx={{ p: "15px", mb: "10px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "15px" }}>
                <Typography variant="h6">
                    {title}
                </Typography>
                <Select
                    variant="standard"
                    value={timePeriod}
                    onChange={handleSelect}
                >
                    {timePeriods.map((period, index) => (
                        <MenuItem key={index} value={period}>
                            {period}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
            <Bar options={options} data={data} />
        </Paper>
    );
};

CategoriesExpencesBarChart.propTypes = {
    title: PropTypes.string,
    account: PropTypes.string,
}
