import React, { useState } from "react";

import {
  AppBar,
  Toolbar,
  Box,
  Paper,
  Select,
  MenuItem,
  Typography } from "@mui/material";

import {
  ChartBox,
  CategoriesExpencesBarChart,
  CategoriesExpencesPieChart,
  GeneralIncomeCard } from "../../components";

import { paymentAccounts } from "../../enums/paymentAccounts";

const Analytics = () => {
  const [account, setAccount] = useState("All");

  const handleSelect = (e) => {
    setAccount(e.target.value);
  }

  return (
    <Box sx={{mb: "70px"}}>
      <AppBar position="static">
        <Toolbar>
        </Toolbar>
      </AppBar>
      <Box sx={{m: "20px 10px"}}>
        <Box sx={{display: "flex", alignItems: "center", mb: "15px", ml: "10px"}}>
          <Typography variant="h6"> Selected account: </Typography>
          <Select
            sx={{ml: "10px"}}
            variant="standard"
            value={account}
            onChange={handleSelect}
          >
            {paymentAccounts.map((account, index) => (
              <MenuItem key={index} value={account}>
                {account}
              </MenuItem>
            ))}
              <MenuItem key="all" value="All">
                All
              </MenuItem>
          </Select>
        </Box>
        <GeneralIncomeCard title="General income" account={account} />
        <CategoriesExpencesBarChart title="Expences by categories" account={account} />
        <CategoriesExpencesPieChart title="Expences structure" account={account} />
      </Box>
    </Box>
  );
};

export default Analytics;
