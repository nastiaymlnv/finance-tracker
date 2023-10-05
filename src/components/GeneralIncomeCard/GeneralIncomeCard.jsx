import React from "react";

import PropTypes from 'prop-types';
import { Typography } from "@mui/material";

import { filterIncomeByAccount } from "../../helpers/filterIncomeByAccount";

export const GeneralIncomeCard = ({ account, incomeByPeriodArr }) => {
    const filteredByAccountArr = filterIncomeByAccount(account, incomeByPeriodArr);

    const periodIncome = filteredByAccountArr
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
    incomeByPeriodArr: PropTypes.array
}