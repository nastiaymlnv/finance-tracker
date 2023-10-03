import React, { useState } from "react";
import { useSelector } from "react-redux";

import PropTypes from "prop-types";
import { Box, Paper, Typography, Select, MenuItem } from "@mui/material";

import { timePeriods } from "../../enums/timePeriods";
import { labels } from "../../enums/labels";
import { filterDataToDisplay } from "../../helpers/filterData";

export const ChartBox = ({ children, title, account }) => {
    const transactions = useSelector((state) => state.operations);
    const [timePeriod, setTimePeriod] = useState("last week");
    const [timePeriodNum, setTimePeriodNum] = useState(7);
    const filteredDataArr = filterDataToDisplay(
        labels,
        transactions,
        account,
        timePeriodNum,
    );

    const handleSelect = (e) => {
        const selectedValue = e.target.value;
        setTimePeriod(selectedValue);
        if (selectedValue === "last week") setTimePeriodNum(7);
        else if (selectedValue === "last month") setTimePeriodNum(30);
        else if (selectedValue === "last year") setTimePeriodNum(365);
    };

    const newElement = React.cloneElement(children, {
        timePeriod: timePeriod,
        filteredDataArr: filteredDataArr,
        handleSelect: handleSelect,
    });

    return (
        <Paper sx={{ p: "15px", mb: "10px" }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: "15px",
                }}
            >
                <Typography variant="h6">
                    {title}
                </Typography>
                <Select variant="standard" value={timePeriod} onChange={handleSelect}>
                    {timePeriods.map((period, index) => (
                        <MenuItem key={index} value={period}>
                            {period}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
            {newElement}
        </Paper>
    );
};

ChartBox.propTypes = {
    children: PropTypes.element,
    title: PropTypes.string,
    account: PropTypes.string,
};
