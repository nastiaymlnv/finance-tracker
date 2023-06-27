import React from 'react';

// import IconButton from '@mui/material/IconButton';
// import AddIcon from '@mui/icons-material/Add';

import { AddBtnContainer, VerticalLine, HorizontalLine } from "./AddBtn.style";

const AddBtn = () => {
    return (
        // <IconButton color="primary" size="large" aria-label="add">
        //     <AddIcon />
        // </IconButton>
        <AddBtnContainer>
            <VerticalLine />
            <HorizontalLine />
        </AddBtnContainer>
    )
}

export default AddBtn;