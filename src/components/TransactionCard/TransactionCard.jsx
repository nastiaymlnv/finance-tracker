import React from "react";
import { useNavigate } from "react-router-dom";

import PropTypes from 'prop-types';
import {
    Card,
    ListItemText,
    Typography
} from "@mui/material";

import { monthNames } from "../../pages/Home/dateItemsNames";

import css from "./TransactionCard.module.css";

export const TransactionCard = ({ transaction }) => {
    const navigate = useNavigate();
    const time = new Date(transaction.date);
    const day = time.getDate();
    const month = monthNames[time.getMonth()];
    const year = time.getFullYear();

    const handleItemClick = (transactionId) => navigate(`/operation/${transactionId}`);

    return (
        <Card
            className={css["Card-list__item"]}
            onClick={() => handleItemClick(transaction.id)}
        >
            {
                transaction.type !== "Transfer"
                    ? (
                        <ListItemText sx={{ width: "fit-content" }}>
                            <Typography sx={{ fontWeight: 500 }}>
                                {transaction.category}
                            </Typography>
                            <Typography> {transaction.account} </Typography>
                            {/* <div> {item.note} </div> */}
                        </ListItemText>
                    )
                    : (
                        <ListItemText sx={{ width: "fit-content" }}>
                            <Typography sx={{ fontWeight: 500 }}>
                                {transaction.type}
                            </Typography>
                            <Typography>
                                {`${transaction.fromAccount} `}
                                &#8594;
                                {` ${transaction.toAccount}`}
                            </Typography>
                            <Typography> {transaction.note} </Typography>
                        </ListItemText>
                    )}
            <ListItemText className={css["Card-list__item-container"]}>
                <Typography sx={{ fontWeight: 500, color: transaction.type !== "Income" ? "red" : "green" }}>
                    {transaction.type === "Income" ? transaction.amount : -transaction.amount} UAH
                </Typography>
                <Typography sx={{ fontSize: "0.9em" }}>
                    {day} {month} {year}
                </Typography>
            </ListItemText>
        </Card>
    )
}

TransactionCard.propTypes = {
    transaction: PropTypes.object,
    transactionId: PropTypes.string
};