import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    Paper,
    BottomNavigation,
    BottomNavigationAction
} from "@mui/material";

import ReceiptIcon from '@mui/icons-material/Receipt';
import GroupIcon from '@mui/icons-material/Group';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';

export const BottomNavBar = () => {
    const [selectedMenuItem, setSelectedMenuItem] = useState(0);

    return (
        <Paper sx={{ position: "fixed", bottom: 0, width: "100vw" }} elevation={5}>
            <BottomNavigation
                showLabels
                value={selectedMenuItem}
                onChange={(event, newValue) => {
                    setSelectedMenuItem(newValue);
                }}
            >
                <BottomNavigationAction component={Link} to="/home" label="Transactions" icon={<ReceiptIcon />} />
                <BottomNavigationAction component={Link} to="/accounts" label="Accounts" icon={<GroupIcon />} />
                <BottomNavigationAction component={Link} to="/analytics" label="Analytics" icon={<BarChartIcon />} />
                <BottomNavigationAction component={Link} to="/home" label="Settings" icon={<SettingsIcon />} />
            </BottomNavigation>
        </Paper>
    );
};
