import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import cn from "classnames";
import PropTypes from 'prop-types';
import {
    AppBar,
    Toolbar,
    Box,
    List,
    Card,
    ListItemText,
    IconButton,
    Typography
} from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';


import { AddBtn } from "../../components";

import { monthNames } from "./dateItemsNames";
// move to enums
import { operationTypes } from "../CreateOperation/operationTypes";

import css from "./Home.module.css";

const Home = ({ setShowBottomNav }) => {
    const navigate = useNavigate();
    const transactions = useSelector(state => state.operations);
    const balance = useSelector(state => state.balance);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filteredTransactions, setFilteredTransactions] = useState(transactions);
    setShowBottomNav(true);
    const generalBalance = [...Object.values(balance)].reduce((accum, curr) => accum += curr, 0);

    useEffect(() => {
        setFilteredTransactions(transactions);
    }, [transactions]);

    const handleItemClick = (transactionId) =>
        navigate(`/operation/${transactionId}`);

    const handleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    }

    const handleFilterItem = (selectedType) => {
        setIsFilterOpen(false);
        if (selectedType !== "Clear") setFilteredTransactions(transactions.filter(item => item.type === selectedType));
        else setFilteredTransactions(transactions);
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box>
                        <Typography variant="body2">
                            Balance
                        </Typography>
                        <Typography sx={{ fontWeight: "bold" }}>
                            {generalBalance} UAH
                        </Typography>
                    </Box>
                    <IconButton color="inherit" onClick={handleFilter}>
                        <FilterListIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {isFilterOpen &&
                <List
                    sx={{ position: "absolute", zIndex: 1, right: 0, minWidth: 250, bgcolor: 'background.paper', boxShadow: 3, borderRadius: "5px" }}
                    component="nav"
                    subheader={
                        <ListSubheader component="div">
                            Sort by
                        </ListSubheader>
                    }
                >
                    {operationTypes.map((item, index) => {
                        return <ListItemButton key={index} onClick={() => handleFilterItem(item)} >
                            <Typography variant="body1">
                                {item}
                            </Typography>
                        </ListItemButton>
                    })}
                    <ListItemButton onClick={() => handleFilterItem('Clear')} >
                        <Typography variant="body1">
                            Clear all filters
                        </Typography>
                    </ListItemButton>
                </List>
            }
            <Box sx={{ height: "100vh" }} className={css["Home-content-container"]}>
                <List className={css["Operation-list"]}>
                    {filteredTransactions.map((item) => {
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
                                        {item.type === "Income" ? item.amount : -item.amount} UAH
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
