import React, { useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import cn from "classnames";
import PropTypes from 'prop-types';
import {
    AppBar,
    Toolbar,
    Box,
    List,
    Card,
    ListItemText,
    Typography
} from "@mui/material";

import { fetchSetBalance } from "../../ducks/balance";

import { AddBtn } from "../../components";

import { monthNames } from "./dateItemsNames";

import css from "./Home.module.css";

const Home = ({ setShowBottomNav }) => {
    const navigate = useNavigate();
    const transactions = useSelector(state => state.operations);
    const balance = useSelector(state => state.balance);
    setShowBottomNav(true);

    // return operationsList.filter(item => item.type === operationType)
    //             .reduce((accum, curr) => accum += +curr.price, 0);

    const handleItemClick = (transactionId) =>
        navigate(`/operation/${transactionId}`);

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography>
                        { balance.UAH }
                    </Typography>
                    {/* add filter */}
                </Toolbar>
            </AppBar>
            <Box sx={{ height: "100vh" }} className={css["Home-content-container"]}>
                <List className={css["Operation-list"]}>
                    {transactions.map((item) => {
                        const time = new Date(item.date);
                        const day = time.getDate();
                        const month = monthNames[time.getMonth()];
                        const year = time.getFullYear();

                        return (
                            <Card
                                key={item.id}
                                className={css["Operation-list__item"]}
                                onClick={() => handleItemClick(item.id)}
                            >
                                {item.type !== "Transfer" ? (
                                    <ListItemText className={css["Operation-list__item-info"]}>
                                        <div className={css["Operation-list__item-title"]}>
                                            {item.category}
                                        </div>
                                        <div> {item.account} </div>
                                        {/* <div> {item.note} </div> */}
                                    </ListItemText>
                                ) : (

                                    <ListItemText className={css["Operation-list__item-info"]}>
                                        <div className={css["Operation-list__item-title"]}>
                                            {item.type}
                                        </div>
                                        <div>
                                            {`${item.fromAccount} `}
                                            &#8594;
                                            {` ${item.toAccount}`}
                                        </div>
                                        <div> {item.comment} </div>
                                    </ListItemText>
                                )}
                                <ListItemText
                                    className={css["Operation-list__item-date-price"]}
                                >
                                    <div
                                        className={cn(
                                            css["Operation-list__item-price"],
                                            item.type !== "Income"
                                                ? css["Operation-list__item-price_red"]
                                                : css["Operation-list__item-price_green"]
                                        )}
                                    >
                                        {item.amount} UAH
                                    </div>
                                    <div className={css["Operation-list__item-date"]}>
                                        {day} {month} {year}
                                    </div>
                                </ListItemText>
                            </Card>
                        );
                    })}
                </List>
                <Box sx={{ position: "fixed", bottom: "70px", right: "20px" }}>
                    <Link to={"/operation"}>
                        <AddBtn />
                    </Link>
                </Box>
            </Box>
        </>
    );
};

Home.propTypes = {
    setShowBottomNav: PropTypes.func
}

export default Home;
