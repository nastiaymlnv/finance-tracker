import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import cn from "classnames";
import PropTypes from 'prop-types';
import {
    AppBar,
    Toolbar,
    Box,
    List,
    Card,
    ListItemText,
} from "@mui/material";

import { getOperations } from "../../ducks/operations";

import { AddBtn } from "../../components";

import { monthNames } from "./dateItemsNames";

import css from "./Home.module.css";

const Home = ({setShowBottomNav}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    setShowBottomNav(true)

    const [operationsList, setOperationsList] = useState([]);
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await fetch("http://localhost:3001/operations");
        if (response.ok) {
            const results = await response.json();
            const sortedEvents = results
                .slice()
                .sort(
                    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
                );
            setOperationsList(sortedEvents);
            dispatch(getOperations(sortedEvents));
        }
    };

    const handleItemClick = (transactionId) =>
        navigate(`/operation/${transactionId}`);

    return (
        <>
            <AppBar position="static">
                <Toolbar></Toolbar>
            </AppBar>
            <Box sx={{ height: "100vh" }} className={css["Home-content-container"]}>
                <List className={css["Operation-list"]}>
                    {operationsList.map((item) => {
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
                                            {" "}
                                            {item.category}{" "}
                                        </div>
                                        <div> {item.payment} </div>
                                        <div> {item.comment} </div>
                                    </ListItemText>
                                ) : (
                                    <ListItemText className={css["Operation-list__item-info"]}>
                                        <div className={css["Operation-list__item-title"]}>
                                            {" "}
                                            {item.type}{" "}
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
                                        {item.type !== "Income"
                                            ? `-${item.price} UAH`
                                            : `${item.price} UAH`}
                                    </div>
                                    <div className={css["Operation-list__item-date"]}>
                                        {day} {month} {year}
                                    </div>
                                </ListItemText>
                            </Card>
                        );
                    })}
                </List>
                <Link to={"/operation"}>
                    <Box sx={{ position: "fixed", bottom: "70px", right: "20px" }}>
                        <AddBtn />
                    </Box>
                </Link>
            </Box>
            {/* <Paper sx={{ position: "fixed", bottom: 0, width: '100vw' }} elevation={5}>
                <BottomNavigation
                    showLabels
                    value={selectedMenuItem}
                    onChange={(event, newValue) => {
                        setSelectedMenuItem(newValue);
                    }}
                >
                    <BottomNavigationAction label="Transactions" icon={<ReceiptIcon />} />
                    <BottomNavigationAction label="Accounts" icon={<GroupIcon />} />
                    <BottomNavigationAction label="Analytics" icon={<BarChartIcon />} />
                    <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
                </BottomNavigation>
            </Paper> */}
        </>
    );
};

Home.propTypes = {
    setShowBottomNav: PropTypes.func
}

export default Home;
