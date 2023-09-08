import React from "react";

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

const AddBtn = () => {
  return (
    <IconButton
      size="large"
      aria-label="add"
      sx={{ color: "white", backgroundColor: "#1976d2" }}
    >
      <AddIcon />
    </IconButton>
  );
};

export default AddBtn;
