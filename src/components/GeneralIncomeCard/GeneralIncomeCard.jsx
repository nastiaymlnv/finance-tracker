import React, { useState } from "react";
import { useSelector } from "react-redux";

import PropTypes from 'prop-types';
import {
    Box,
    Paper,
    Typography,
    Select,
    MenuItem } from "@mui/material";

import { timePeriods } from "../../enums/timePeriods";
import { filterDatesByCurrentPeriod } from "../../helpers/filterData";

export const GeneralIncomeCard = ({ title, account }) => {
    const transactions = useSelector(state => state.operations);
    const [timePeriod, setTimePeriod] = useState("last week");
    const [timePeriodNum, setTimePeriodNum] = useState(7);
    const incomeByPeriod = filterDatesByCurrentPeriod(transactions, timePeriodNum);

    let filteredArr = [];
    if (account === "All") {
        filteredArr = incomeByPeriod.filter(item => item.type === "Income")
    }
    else {
        filteredArr = incomeByPeriod.filter(item => item.type === "Income" && item.account === account)
    }

    const periodIncome = filteredArr
        .map(elem => elem.amount)
        .reduce((accum, curr) => accum += curr, 0)

    const handleSelect = (e) => {
        const selectedValue = e.target.value;
        setTimePeriod(selectedValue);
        if (selectedValue === "last week") setTimePeriodNum(7);
        else if (selectedValue === "last month") setTimePeriodNum(30);
        else if (selectedValue === "last year") setTimePeriodNum(365);
    }

    return (
        <Paper sx={{ p: "15px", mb: "10px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "15px" }}>
                <Typography variant="h6">
                    {title} for the {timePeriod}
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
            <Typography variant="h6" sx={{color: "green"}}>
                {periodIncome} UAH
            </Typography>
        </Paper>
    );
}

GeneralIncomeCard.propTypes = {
    title: PropTypes.string,
    account: PropTypes.string
}