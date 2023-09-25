import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
    Paper,
    BottomNavigation,
    BottomNavigationAction
} from "@mui/material";

import ReceiptIcon from '@mui/icons-material/Receipt';
import GroupIcon from '@mui/icons-material/Group';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import { useLocation } from "react-router-dom/dist";

export const BottomNavBar = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const [selectedMenuItem, setSelectedMenuItem] = useState(pathname);

    return (
        <Paper sx={{ position: "fixed", bottom: 0, width: "100vw" }} elevation={5}>
            <BottomNavigation
                showLabels
                value={selectedMenuItem}
                onChange={(event, newValue) => {
                    setSelectedMenuItem(newValue);
                }}
            >
                <BottomNavigationAction component={Link} to="/home" label="Transactions" value={"/home" && "/finance-tracker"} icon={<ReceiptIcon />} />
                <BottomNavigationAction component={Link} to="/accounts" label="Accounts" value="/accounts" icon={<GroupIcon />} />
                <BottomNavigationAction component={Link} to="/analytics" label="Analytics" value="/analytics" icon={<BarChartIcon />} />
                <BottomNavigationAction component={Link} to="/home" label="Settings" value="/settings" icon={<SettingsIcon />} />
            </BottomNavigation>
        </Paper>
    );
};
