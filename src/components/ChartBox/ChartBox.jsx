import React, { useState } from "react";

import PropTypes from 'prop-types';
import {
    Box,
    Paper,
    Typography,
    Select,
    MenuItem
} from "@mui/material";

const timePeriods = ["last week", "last month", "all time"];

export const ChartBox = ({ children, title }) => {
    const [timePeriod, setTimePeriod] = useState("last week");

    const handleSelect = (e) => {
        setTimePeriod(e.target.value);
    }

    return (
        <Paper sx={{ p: "15px", mb: "10px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "15px" }}>
                <Typography variant="h6">
                    {title}
                </Typography>
                <Select
                    variant="standard"
                    value={timePeriod}
                    onChange={handleSelect}
                >
                    {timePeriods.map((period, index) => (
                        <MenuItem key={index} value={period}>
                            {period}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
            {children}
        </Paper>
    );
};

ChartBox.propTypes = {
    children: PropTypes.element,
    title: PropTypes.string
}
