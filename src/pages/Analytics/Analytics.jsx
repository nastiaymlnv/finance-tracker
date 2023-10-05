import React, { useState } from "react";

import {
  AppBar,
  Toolbar,
  Box,
  Select,
  MenuItem,
  Typography } from "@mui/material";

import {
  ChartBox,
  CategoriesExpensesBarChart,
  CategoriesExpensesPieChart,
  GeneralIncomeCard,
  TrendChart,
  IncomeBreakdownChart } from "../../components";

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
        <IncomeBreakdownChart title="Income breakdown" account={account}/>
        <GeneralIncomeCard title="General income" account={account} />
        <ChartBox title="Revenue trend" account={account}>
          <TrendChart transactionType="Income"/>
        </ChartBox>
        <ChartBox title="Expenses trend" account={account}>
          <TrendChart transactionType="Expenses"/>
        </ChartBox>
        <ChartBox title="Expenses by categories" account={account}>
          <CategoriesExpensesBarChart />
        </ChartBox>
        <ChartBox title="Expenses structure" account={account}>
          <CategoriesExpensesPieChart />
        </ChartBox>
      </Box>
    </Box>
  );
};

export default Analytics;
