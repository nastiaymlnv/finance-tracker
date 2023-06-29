import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { fetchPostOperation } from "../../ducks/operations";

import { operations } from "../../config/operationTypes";
import { categories } from "../../config/categories";

const operationData = {
    id: uuidv4(),
    type: 'Expense',
    price: null,
    category: null,
    date: Date(),
    payment: null,
    fromAccount: null,
    toAccount: null,
    comment: null
};

const CreateOperation = () => {
    const dispatch = useDispatch();

    const [selectedOperation, setSelectedOperation] = useState('Expense');
    const [price, setPrice] = useState(null);
    const [validPrice, setValidPrice] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedAccount, setSelectedAccount] = useState('');
    const [selectedTransferFrom, setSelectedTransferFrom] = useState('');
    const [selectedTransferTo, setSelectedTransferTo] = useState('');
    const [commentValue, setCommentValue] = useState(null);

    const handleOperationType = (e) => {
        setSelectedOperation(e.target.value);
        operationData.type = e.target.value;
    }

    const checkPrice = (e) => {
        const price = e.target.value;
        setPrice(price)

        if (price.length === 0) {
            setValidPrice(false);
        }
        else
            setValidPrice(true);
            operationData.price = price;
    }

    const handleCategory = (e) => {
        setSelectedCategory(e.target.value);
        operationData.category = e.target.value;
    }

    const handleDate = (date) => {
        operationData.date = date;
    }

    const handlePayment = (e) => {
        setSelectedAccount(e.target.value);
        operationData.payment = e.target.value;
    }

    const handleTransferFrom = (e) => {
        setSelectedTransferFrom(e.target.value);
        operationData.fromAccount = e.target.value;
    }

    const handleTransferTo = (e) => {
        setSelectedTransferTo(e.target.value);
        operationData.toAccount = e.target.value;
    }

    const checkComment = (e) => {
        const comment = e.target.value;
        setCommentValue(comment);
        operationData.comment = comment;
    }

    const confirmOperation = () => {
        if (operationData.type !== 'Transfer') {
            if (validPrice && !!operationData.category && !!operationData.payment) {
                dispatch(fetchPostOperation(operationData));
            }
        } else {
            if (validPrice && !!operationData.fromAccount && !!operationData.toAccount &&
                JSON.stringify(operationData.fromAccount) !== JSON.stringify(operationData.toAccount)) {
                dispatch(fetchPostOperation(operationData));
            }
        }
    }

    return (
        <>
            <Box sx={{height: '60px'}}>
                <AppBar position="static">
                    <Toolbar  sx={{justifyContent: 'space-between'}}>
                        <Button variant="text" color='inherit'>
                            <Link to={'/'}>
                                Cancel
                            </Link>
                        </Button>
                        <Select
                            variant='standard'
                            sx={{
                                color:'inherit',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'inherit'
                                },
                                '& .MuiSvgIcon-root': {
                                    color: 'white'
                                }
                            }}
                            labelId="select-operation-label"
                            id="select-operation"
                            value={selectedOperation}
                            label="Operation"
                            onChange={handleOperationType}
                        >
                            {
                            operations.map(type => {
                                return (
                                    <MenuItem value={type}> {type} </MenuItem>
                                )
                            })
                        }
                        </Select>
                        <Button variant="text" color='inherit' onClick={confirmOperation}>
                            <Link to={'/'}>
                                Done
                            </Link>
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '20px 10px',
                gap: '15px'
            }}>
                <TextField
                    type='number'
                    id='price'
                    label="Price"
                    value={price}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"> UAH </InputAdornment>
                    }}
                    onChange={checkPrice}
                    valid={validPrice}
                />
                <div hidden={selectedOperation === "Transfer" && true}>
                    <FormControl fullWidth>
                        <InputLabel id="select-category-label">
                            Category
                        </InputLabel>
                        <Select
                            labelId="select-category-label"
                            id="select-category"
                            value={selectedCategory}
                            label="Category"
                            onChange={handleCategory}
                            hidden={selectedOperation === "Transfer" && true}
                        >
                            {
                            categories.map(category => {
                                return (
                                    <MenuItem value={category}> {category} </MenuItem>
                                )
                            })
                        }
                        </Select>
                    </FormControl>
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        labelId="date"
                        onChange={handleDate}
                    />
                </LocalizationProvider>
                {
                    selectedOperation === "Transfer"
                    ?
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: '10px'
                    }}>
                        <FormControl fullWidth>
                            <InputLabel id="select-account-from-label">
                                From the account
                            </InputLabel>
                            <Select
                                labelId="select-account-from-label"
                                id="select-account-from"
                                value={selectedTransferFrom}
                                label="AccountFrom"
                                onChange={handleTransferFrom}
                            >
                                <MenuItem value='Card'> Card </MenuItem>
                                <MenuItem value='Cash'> Cash </MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="select-account-to-label">
                                To the account
                            </InputLabel>
                            <Select
                                labelId="select-account-to-label"
                                id="select-account-to"
                                value={selectedTransferTo}
                                label="AccountTo"
                                onChange={handleTransferTo}
                            >
                                <MenuItem value='Card'> Card </MenuItem>
                                <MenuItem value='Cash'> Cash </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    :
                    <FormControl fullWidth>
                        <InputLabel id="select-account-label">
                            {selectedOperation === "Expense" && "Payment method"}
                            {selectedOperation === "Income" && "Payer"}
                        </InputLabel>
                        <Select
                            labelId="select-account-label"
                            id="select-account"
                            value={selectedAccount}
                            label="Account"
                            onChange={handlePayment}
                        >
                            <MenuItem value='Card'> Card </MenuItem>
                            <MenuItem value='Cash'> Cash </MenuItem>
                        </Select>
                    </FormControl>
                }
                <TextField
                    id='comment'
                    label="Comment"
                    value={commentValue}
                    onChange={checkComment}
                />
            </Box>
        </>
    )
}

export default CreateOperation;