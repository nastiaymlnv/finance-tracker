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
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { timePeriods } from "../../enums/timePeriods";
import { filterDatesByCurrentPeriod } from "../../helpers/filterData";

ChartJS.register(ArcElement, Tooltip, Legend);

export const IncomeBreakdownChart = ({title, account}) => {
    const transactions = useSelector(state => state.operations);
    const [timePeriod, setTimePeriod] = useState("last week");
    const [timePeriodNum, setTimePeriodNum] = useState(7);
    const incomeByPeriod = filterDatesByCurrentPeriod(transactions, timePeriodNum);
    const labels = new Set();
    const sumByCategory = [];

    let filteredByAccountArr = [];
    if (account === "All") {
        filteredByAccountArr = incomeByPeriod.filter(item => item.type === "Income")
    }
    else {
        filteredByAccountArr = incomeByPeriod.filter(item => item.type === "Income" && item.account === account)
    }
    
    filteredByAccountArr.map(item => labels.add(item.category));

    const generalSum = filteredByAccountArr
        .map(elem => elem.amount)
        .reduce((accum, curr) => accum += curr, 0);
    
    for (let category of labels) {
        sumByCategory.push(filteredByAccountArr.filter(item => item.category === category)
            .map(elem => elem.amount)
            .reduce((accum, curr) => accum += curr, 0));
    }

    const percentsArr = sumByCategory.map(item => ((item / generalSum) * 100).toFixed(1));

    const handleSelect = (e) => {
        const selectedValue = e.target.value;
        setTimePeriod(selectedValue);
        if (selectedValue === "last week") setTimePeriodNum(7);
        else if (selectedValue === "last month") setTimePeriodNum(30);
        else if (selectedValue === "last year") setTimePeriodNum(365);
    }

    const data = {
        labels: Array.from(labels),
        datasets: [
            {
                label: '%',
                data: percentsArr,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(76, 175, 80, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(76, 175, 80, 1)',
                ],
                borderWidth: 1,
            },
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
            <Pie data={data} />
        </Paper>
    )
}

IncomeBreakdownChart.propTypes = {
    title: PropTypes.string,
    account: PropTypes.string
}