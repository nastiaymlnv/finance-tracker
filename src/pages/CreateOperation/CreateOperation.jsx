import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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

import { fetchPostNewTransaction, fetchUpdateTransaction } from "../../ducks/operations";

import { operationTypes } from "./operationTypes";
import { categories } from "./categories";
import { paymentAccounts } from "./paymentAccounts";

import styles from "./CreateOperation.module.css";

const CreateOperation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { transactionId } = useParams();
    const operationsList = useSelector(state => state.operations);

    const currOperation = transactionId && operationsList.find((item) => item.id === transactionId);
    const operationData = transactionId ? currOperation : {
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

    const [selectedOperation, setSelectedOperation] = useState( transactionId ? currOperation.type : "Expense");
    const [price, setPrice] = useState(transactionId ? currOperation.price : "");
    const [selectedCategory, setSelectedCategory] = useState(transactionId ? currOperation.category : "");
    const [defaultDate, setDefaultDate] = useState(transactionId ? currOperation.date : Date());
    const [selectedAccount, setSelectedAccount] = useState(transactionId ? currOperation.payment : "");
    const [selectedTransferFrom, setSelectedTransferFrom] = useState(transactionId ? currOperation.fromAccount : "");
    const [selectedTransferTo, setSelectedTransferTo] = useState(transactionId ? currOperation.toAccount : "");
    const [paymentPlace, setPaymentPlace] = useState(transactionId ? currOperation.paymentPlace : "");
    const [commentValue, setCommentValue] = useState(transactionId ? currOperation.comment : "");

    const handleOperationType = (e) => setSelectedOperation(e.target.value);

    const handlePrice = (e) => e.target.value > 0 && setPrice(e.target.value);

    const handleCategory = (e) => setSelectedCategory(e.target.value);

    const handleDate = (date) => setDefaultDate(date);

    const handlePayment = (e) => setSelectedAccount(e.target.value);

    const handleTransferFrom = (e) => setSelectedTransferFrom(e.target.value);

    const handleTransferTo = (e) => setSelectedTransferTo(e.target.value);

    const handlePaymentPlace = (e) => setPaymentPlace(e.target.value);

    const handleComment = (e) => setCommentValue(e.target.value);

    const confirmOperation = () => {    
        operationData.type = selectedOperation;
        operationData.price = price;
        operationData.category = selectedCategory;
        operationData.date = defaultDate;
        operationData.paymentPlace = paymentPlace;
        operationData.comment = commentValue;    
        
        if (!transactionId) {
            if (selectedOperation !== "Transfer") {
                operationData.payment = selectedAccount;

                if (!!price && !!selectedCategory && !!selectedAccount) {
                    dispatch(fetchPostNewTransaction(operationData));
                    navigate('/home');
                }
            }
            else {
                operationData.fromAccount = selectedTransferFrom;
                operationData.toAccount = selectedTransferTo;

                if (!!price && !!selectedTransferFrom && !!selectedTransferTo && selectedTransferFrom !== selectedTransferTo) {
                    dispatch(fetchPostNewTransaction(operationData));
                    navigate('/home');
                }
            }
        }
        else {
            // todo: check if transaction data updated
            operationData.payment = selectedAccount;
            operationData.fromAccount = selectedTransferFrom;
            operationData.toAccount = selectedTransferTo; 
            
            dispatch(fetchUpdateTransaction(operationData));
            navigate('/home');
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
                            className={styles["Create-operation-select"]}
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
                        <Button type="submit" variant="text" color="inherit" onClick={confirmOperation}>
                            Done
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
                    onChange={handlePrice}
                    required
                />
                <div hidden={selectedOperation === "Transfer" && true}>
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={selectedCategory}
                            onChange={handleCategory}
                            hidden={selectedOperation === "Transfer" && true}
                            required
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
                                required
                            >
                                { paymentAccounts.map((item, index) => (
                                    <MenuItem key={index} value={item}> {item} </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>To the account</InputLabel>
                            <Select value={selectedTransferTo} onChange={handleTransferTo} required> 
                                { paymentAccounts.map((item, index) => (
                                    <MenuItem key={index} value={item}> {item} </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                ) : (
                    <>
                        <FormControl fullWidth>
                            <InputLabel>Payment account</InputLabel>
                            <Select value={selectedAccount} onChange={handlePayment} required>
                                { paymentAccounts.map((item, index) => (
                                    <MenuItem key={index} value={item}> {item} </MenuItem>
                                ))}
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
                    onChange={handleComment}
                />
            </Box>
        </form>
    );
};

export default CreateOperation;
