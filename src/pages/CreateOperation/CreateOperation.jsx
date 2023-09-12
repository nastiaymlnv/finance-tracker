import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
    Box,
    AppBar,
    Toolbar,
    Button,
    TextField,
    InputLabel,
    InputAdornment,
    MenuItem,
    FormControl,
    Select,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { fetchPostOperation } from "../../ducks/operations";

import { operations } from "./operationTypes";
import { categories } from "./categories";

import styles from "./CreateOperation.module.css";

const operationData = {
    id: uuidv4(),
    type: "Expense",
    price: null,
    category: null,
    date: Date(),
    payment: null,
    fromAccount: null,
    toAccount: null,
    paymentPlace: null,
    comment: null,
};

const CreateOperation = () => {
    const dispatch = useDispatch();

    const [selectedOperation, setSelectedOperation] = useState("Expense");
    const [price, setPrice] = useState(null);
    const [validPrice, setValidPrice] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [defaultDate, setDefaultDate] = useState(Date());
    const [selectedAccount, setSelectedAccount] = useState("");
    const [selectedTransferFrom, setSelectedTransferFrom] = useState("");
    const [selectedTransferTo, setSelectedTransferTo] = useState("");
    const [paymentPlace, setPaymentPlace] = useState(null);
    const [commentValue, setCommentValue] = useState(null);

    const handleOperationType = (e) => {
        setSelectedOperation(e.target.value);
        operationData.type = e.target.value;
    };

    const checkPrice = (e) => {
        const price = e.target.value;
        setPrice(price);

        if (price.length === 0) {
            setValidPrice(false);
        } else setValidPrice(true);
        operationData.price = price;
    };

    const handleCategory = (e) => {
        setSelectedCategory(e.target.value);
        operationData.category = e.target.value;
    };

    const handleDate = (date) => {
        setDefaultDate(date);
        operationData.date = date;
    };

    const handlePayment = (e) => {
        setSelectedAccount(e.target.value);
        operationData.payment = e.target.value;
    };

    const handleTransferFrom = (e) => {
        setSelectedTransferFrom(e.target.value);
        operationData.fromAccount = e.target.value;
    };

    const handleTransferTo = (e) => {
        setSelectedTransferTo(e.target.value);
        operationData.toAccount = e.target.value;
    };

    const handlePaymentPlace = (e) => {
        const paymentPlace = e.target.value;
        setPaymentPlace(paymentPlace);
        operationData.paymentPlace = paymentPlace;
    };

    const checkComment = (e) => {
        const comment = e.target.value;
        setCommentValue(comment);
        operationData.comment = comment;
    };

    const confirmOperation = () => {
        if (operationData.type !== "Transfer") {
            if (validPrice && !!operationData.category && !!operationData.payment) {
                dispatch(fetchPostOperation(operationData));
            }
        } else {
            if (
                validPrice &&
                !!operationData.fromAccount &&
                !!operationData.toAccount &&
                JSON.stringify(operationData.fromAccount) !==
                JSON.stringify(operationData.toAccount)
            ) {
                dispatch(fetchPostOperation(operationData));
            }
        }
    };

    return (
        <>
            <Box sx={{ height: "60px" }}>
                <AppBar position="static">
                    <Toolbar sx={{ justifyContent: "space-between" }}>
                        <Button variant="text" color="inherit">
                            <Link to={"/finance-tracker"}>Cancel</Link>
                        </Button>
                        <Select
                            variant="standard"
                            className={styles["Create-operation-select"]}
                            value={selectedOperation}
                            onChange={handleOperationType}
                        >
                            {operations.map((type, index) => (
                                <MenuItem key={index} value={type}>
                                    {" "}
                                    {type}{" "}
                                </MenuItem>
                            ))}
                        </Select>
                        <Button variant="text" color="inherit" onClick={confirmOperation}>
                            <Link to={"/finance-tracker"}>Done</Link>
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box className={styles["Create-operation-inputs"]}>
                <TextField
                    type="number"
                    label="Price"
                    value={price}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"> UAH </InputAdornment>,
                    }}
                    onChange={checkPrice}
                    valid={validPrice}
                />
                <div hidden={selectedOperation === "Transfer" && true}>
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={selectedCategory}
                            onChange={handleCategory}
                            hidden={selectedOperation === "Transfer" && true}
                        >
                            {categories.map((category, index) => (
                                <MenuItem key={index} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker defaultValue={dayjs(Date())} onChange={handleDate} />
                </LocalizationProvider>
                {selectedOperation === "Transfer" ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "10px",
                        }}
                    >
                        <FormControl fullWidth>
                            <InputLabel>From the account</InputLabel>
                            <Select
                                value={selectedTransferFrom}
                                onChange={handleTransferFrom}
                            >
                                <MenuItem value="Card"> Card </MenuItem>
                                <MenuItem value="Cash"> Cash </MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>To the account</InputLabel>
                            <Select value={selectedTransferTo} onChange={handleTransferTo}>
                                <MenuItem value="Card"> Card </MenuItem>
                                <MenuItem value="Cash"> Cash </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                ) : (
                    <>
                        <FormControl fullWidth>
                            <InputLabel>Payment account</InputLabel>
                            <Select value={selectedAccount} onChange={handlePayment}>
                                <MenuItem value="Card"> Card </MenuItem>
                                <MenuItem value="Cash"> Cash </MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label={
                                selectedOperation === "Expense" ? "Place of payment" : "Payer"
                            }
                            value={paymentPlace}
                            onChange={handlePaymentPlace}
                        />
                    </>
                )}
                <TextField
                    label="Comment"
                    value={commentValue}
                    onChange={checkComment}
                />
            </Box>
        </>
    );
};

export default CreateOperation;
