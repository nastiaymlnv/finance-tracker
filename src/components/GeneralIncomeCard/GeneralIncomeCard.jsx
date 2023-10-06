import React from "react";

import PropTypes from 'prop-types';
import { Typography } from "@mui/material";

import { filterIncomeByAccount } from "../../helpers/filterIncomeByAccount";

export const GeneralIncomeCard = ({ account, timePeriodTransactions }) => {
    const filteredByAccountArr = filterIncomeByAccount(account, timePeriodTransactions);

    const periodIncome = filteredByAccountArr
        .map(elem => elem.amount)
        .reduce((accum, curr) => accum += curr, 0)

    return (
        <Typography variant="h6" sx={{ color: "green" }}>
            {periodIncome} UAH
        </Typography>
    );
}

GeneralIncomeCard.propTypes = {
    account: PropTypes.string,
    timePeriodTransactions: PropTypes.array
}