import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import PropTypes from 'prop-types';
import {
    AppBar,
    Toolbar,
    Box,
    List,
    IconButton,
    Typography
} from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';

import {
    AddBtn,
    CustomFilterList,
    TransactionCard
} from "../../components";

const Home = ({ setShowBottomNav }) => {
    const transactions = useSelector(state => state.operations);
    const balance = useSelector(state => state.balance);

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filteredTransactions, setFilteredTransactions] = useState(transactions);

    setShowBottomNav(true);
    const generalBalance = [...Object.values(balance)].reduce((accum, curr) => accum += curr, 0);

    useEffect(() => {
        setFilteredTransactions(transactions);
    }, [transactions]);

    const handleFilter = () => setIsFilterOpen(!isFilterOpen);

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
                    <IconButton color={isFilterOpen ? "disabled" : "inherit"} onClick={handleFilter}>
                        <FilterListIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {
                isFilterOpen && <CustomFilterList handleFilterItem={handleFilterItem} />
            }
            <Box sx={{ height: "100vh", m: "5px 10px" }} >
                <List>
                    {filteredTransactions.map((item) => {
                        return <TransactionCard key={item.id} transaction={item} />
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
