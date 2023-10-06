import React from "react";

import PropTypes from 'prop-types';
import { Typography } from "@mui/material";

import { filterIncomeByAccount } from "../../helpers/filterIncomeByAccount";

export const ProfitabilityCard = ({ account, timePeriodTransactions }) => {
    const incomeByAccount = filterIncomeByAccount(account, timePeriodTransactions)
        .map(item => item.amount)
        .reduce((accum, curr) => accum += curr, 0);

    const filteredExpensesByAccount = account === "All"
        ? timePeriodTransactions.filter(item => item.type === "Expenses")
        : timePeriodTransactions.filter(item => item.type === "Expenses" && item.account === account);

    const generalExpensesByAccount = filteredExpensesByAccount
        .map(item => item.amount)
        .reduce((accum, curr) => accum += curr, 0);

    const netProfit = incomeByAccount - generalExpensesByAccount;
    const profitability = ((netProfit / incomeByAccount) * 100).toFixed(2);

    return (
        <Typography variant="h6">
            {profitability > 0 ? profitability : 0} UAH
        </Typography>
    )
}

ProfitabilityCard.propTypes = {
    account: PropTypes.string,
    timePeriodTransactions: PropTypes.array
}