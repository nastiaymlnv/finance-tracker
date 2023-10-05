import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PropTypes from 'prop-types';
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
    Select } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
    fetchPostNewTransaction,
    fetchUpdateTransaction } from "../../ducks/operations";
import { fetchUpdateBalance } from "../../ducks/balance";
import { fetchDeleteTransaction } from "../../ducks/operations/operationsAction";

import { paymentAccounts } from "../../enums/paymentAccounts";
import { operationTypes } from "./operationTypes";
import { incomeCategories, expenseCategories } from "./categories";

import styles from "./CreateOperation.module.css";

const CreateOperation = ({setShowBottomNav}) => {
    setShowBottomNav(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { transactionId } = useParams();
    const operationsList = useSelector((state) => state.operations);
    const balance = useSelector((state) => state.balance);

    const currOperation =
        transactionId && operationsList.find((item) => item.id === transactionId);
    const operationData = transactionId
        ? currOperation
        :
        {
            id: uuidv4(),
            account: null,
            fromAccount: null,
            toAccount: null,
            category: null,
            amount: null,
            type: "Expenses",
            note: null,
            date: Date(),
            payee: null
        };

    const [selectedOperation, setSelectedOperation] = useState(
        transactionId ? currOperation.type : "Expenses"
    );
    const [price, setPrice] = useState(transactionId ? currOperation.amount : "");
    const [selectedCategory, setSelectedCategory] = useState(
        transactionId ? currOperation.category : ""
    );
    const [defaultDate, setDefaultDate] = useState(
        transactionId ? currOperation.date : Date()
    );
    const [selectedAccount, setSelectedAccount] = useState(
        transactionId ? currOperation.account : ""
    );
    const [selectedTransferFrom, setSelectedTransferFrom] = useState(
        transactionId ? currOperation.fromAccount : ""
    );
    const [selectedTransferTo, setSelectedTransferTo] = useState(
        transactionId ? currOperation.toAccount : ""
    );
    const [paymentPlace, setPaymentPlace] = useState(
        transactionId ? currOperation.payee : ""
    );
    const [commentValue, setCommentValue] = useState(
        transactionId ? currOperation.note : ""
    );

    const handleOperationType = (e) => setSelectedOperation(e.target.value);

    const handlePrice = (e) => e.target.value > 0 && setPrice(+e.target.value);

    const handleCategory = (e) => setSelectedCategory(e.target.value);

    const handleDate = (date) => setDefaultDate(date);

    const handlePayment = (e) => setSelectedAccount(e.target.value);

    const handleTransferFrom = (e) => setSelectedTransferFrom(e.target.value);

    const handleTransferTo = (e) => setSelectedTransferTo(e.target.value);

    const handlePaymentPlace = (e) => setPaymentPlace(e.target.value);

    const handleComment = (e) => setCommentValue(e.target.value);

    const handleDeleteOperation = () => {
        const deletedTransaction = operationsList.find(item => item.id === transactionId)
        const newAccountBalance = balance[deletedTransaction.account] + +deletedTransaction.amount;
        dispatch(fetchDeleteTransaction(transactionId));
        dispatch(fetchUpdateBalance(selectedAccount, newAccountBalance))
        navigate("/home");
    }

    const confirmOperation = () => {
        const date = new Date(defaultDate);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        day = day < 10 && `0${day}`;
        month = month < 10 && `0${month}`;
        const newDate = `${year}-${month}-${day} ${defaultDate.slice(16, 24)}`;

        operationData.type = selectedOperation;
        operationData.amount = price;
        operationData.category = selectedCategory;
        operationData.date = newDate;
        operationData.payee = paymentPlace;
        operationData.note = commentValue;

        if (!transactionId) {
            let newAccountBalance = 0;
            let newAccountBalanceFrom = 0;
            let newAccountBalanceTo = 0;

            if (selectedOperation !== "Transfer") {
                operationData.account = selectedAccount;

                if (!!price && !!selectedCategory && !!selectedAccount) {
                    dispatch(fetchPostNewTransaction(operationData));
                    if (selectedOperation !== "Income") {
                        newAccountBalance = balance[[selectedAccount]] - price;
                    }
                    else {
                        newAccountBalance = balance[[selectedAccount]] + price;
                    }
                    dispatch(fetchUpdateBalance(selectedAccount, newAccountBalance));
                    navigate("/home");
                }
            } else {
                operationData.fromAccount = selectedTransferFrom;
                operationData.toAccount = selectedTransferTo;

                if (
                    !!price &&
                    !!selectedTransferFrom &&
                    !!selectedTransferTo &&
                    selectedTransferFrom !== selectedTransferTo
                ) {
                    newAccountBalanceFrom = balance[[selectedTransferFrom]] - price;
                    newAccountBalanceTo = balance[[selectedTransferTo]] + +price;

                    console.log(newAccountBalanceFrom, newAccountBalanceTo)

                    // check throwing network error
                    dispatch(fetchUpdateBalance(selectedTransferFrom, newAccountBalanceFrom));
                    dispatch(fetchUpdateBalance(selectedTransferTo, newAccountBalanceTo));
                    dispatch(fetchPostNewTransaction(operationData));
                    navigate("/home");
                }
            }
        } else {
            // todo: check if transaction data updated
            operationData.payment = selectedAccount;
            operationData.fromAccount = selectedTransferFrom;
            operationData.toAccount = selectedTransferTo;

            // add update balance on edit and update balance after delete transfer
            dispatch(fetchUpdateTransaction(operationData));
            // dispatch(fetchUpdateBalance(calculateBalance(operationData.type)))
            navigate("/home");
        }
    };

    return (
        <form>
            <Box sx={{ height: "60px" }}>
                <AppBar position="static">
                    <Toolbar sx={{ justifyContent: "space-between" }}>
                        <Button variant="text" color="inherit">
                            <Link to={"/home"}> Cancel </Link>
                        </Button>
                        <Select
                            className={styles["Select-list"]}
                            value={selectedOperation}
                            onChange={handleOperationType}
                            required
                        >
                            {operationTypes.map((type, index) => (
                                <MenuItem key={index} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </Select>
                        <Button
                            type="submit"
                            variant="text"
                            color="inherit"
                            onClick={confirmOperation}
                        >
                            Done
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            { transactionId &&
                <Box sx={{textAlign: "right"}}>
                    <Button onClick={handleDeleteOperation} sx={{mt: "15px", mr: "15px", py: 0}}>
                        Delete
                    </Button>
                </Box>
            }
            <Box className={styles["Input-container"]}>
                <TextField
                    type="number"
                    label="Price"
                    value={price < 0 ? -price: price}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"> UAH </InputAdornment>,
                    }}
                    onChange={handlePrice}
                    className={styles["Input-field"]}
                    required
                />
                <div hidden={selectedOperation === "Transfer" && true}>
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={selectedCategory}
                            onChange={handleCategory}
                            hidden={selectedOperation === "Transfer" && true}
                            className={styles["Input-field"]}
                            required
                        >
                            {(selectedOperation === "Expenses" ? expenseCategories : incomeCategories)
                                .map((category, index) => (
                                <MenuItem key={index} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        defaultValue={dayjs(defaultDate)}
                        onChange={handleDate}
                        className={styles["Input-field"]}
                    />
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
                                className={styles["Input-field"]}
                                required
                            >
                                {paymentAccounts.map((item, index) => (
                                    <MenuItem key={index} value={item}>
                                        {" "}
                                        {item}{" "}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>To the account</InputLabel>
                            <Select
                                value={selectedTransferTo}
                                onChange={handleTransferTo}
                                className={styles["Input-field"]}
                                required
                            >
                                {paymentAccounts.map((item, index) => (
                                    <MenuItem key={index} value={item}>
                                        {" "}
                                        {item}{" "}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                ) : (
                    <>
                        <FormControl fullWidth>
                            <InputLabel>Payment account</InputLabel>
                            <Select
                                value={selectedAccount}
                                onChange={handlePayment}
                                className={styles["Input-field"]}
                                required
                            >
                                {paymentAccounts.map((item, index) => (
                                    <MenuItem key={index} value={item}>
                                        {" "}
                                        {item}{" "}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label={
                                selectedOperation === "Expenses" ? "Place of payment" : "Payer"
                            }
                            value={paymentPlace}
                            onChange={handlePaymentPlace}
                            className={styles["Input-field"]}
                        />
                    </>
                )}
                <TextField
                    label="Comment"
                    value={commentValue}
                    onChange={handleComment}
                    className={styles["Input-field"]}
                />
            </Box>
        </form>
    );
};

CreateOperation.propTypes = {
    setShowBottomNav: PropTypes.func
}

export default CreateOperation;
