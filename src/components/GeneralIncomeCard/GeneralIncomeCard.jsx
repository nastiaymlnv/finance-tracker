import React from "react";
import { useSelector } from "react-redux";

import PropTypes from 'prop-types';
import { Typography } from "@mui/material";

import { filterDatesByCurrentPeriod } from "../../helpers/filterData";

export const GeneralIncomeCard = ({ account, timePeriodNum }) => {
    const transactions = useSelector(state => state.operations);
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

    return (
        <Typography variant="h6" sx={{color: "green"}}>
            {periodIncome} UAH
        </Typography>
    );
}

GeneralIncomeCard.propTypes = {
    account: PropTypes.string,
    timePeriodNum: PropTypes.number
}