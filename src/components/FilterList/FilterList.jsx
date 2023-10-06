import React from "react";

import PropTypes from 'prop-types';
import {
    List,
    Typography,
    Divider
} from "@mui/material";
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';

// move to enums
import { operationTypes } from "../../pages/CreateOperation/operationTypes";

export const CustomFilterList = ({ handleFilterItem }) => {
    return (
        <List
            sx={{ position: "absolute", zIndex: 1, right: 0, minWidth: 250, bgcolor: 'background.paper', boxShadow: 3, borderRadius: "5px" }}
            component="nav"
            subheader={
                <ListSubheader component="div">
                    Sort by
                </ListSubheader>
            }
        >
            <Divider />
            {operationTypes.map((item, index) => {
                return <ListItemButton key={index} onClick={() => handleFilterItem(item)} >
                    <Typography variant="body1">
                        {item}
                    </Typography>
                </ListItemButton>
            })}
            <Divider />
            <ListItemButton onClick={() => handleFilterItem('Clear')} >
                <Typography variant="body1">
                    Clear all filters
                </Typography>
            </ListItemButton>
        </List>
    )
}

CustomFilterList.propTypes = {
    handleFilterItem: PropTypes.func
}