import React, {useState, useEffect} from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector, useStore } from 'react-redux';

import { getOperations } from "../../ducks/operations";

import AddBtn from "../../components/AddBtn/AddBtn";

import { dayNames, monthNames } from "../../config/dateItemsNames";

import Typography from "@mui/material/Typography";
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';

const Home = () => {
    const store = useStore();
    const dispatch = useDispatch();
    const operations = useSelector(state => state.operations);

    const [operationsList, setOperationsList] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3001/operations');
            if (response.ok) {
                const results = await response.json();
                const sortedEvents = results.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setOperationsList(sortedEvents);
                dispatch(getOperations(sortedEvents));
            }
        }
        catch {
            alert('Failed to fetch');
        }
    }


    return (
        <div style={{height: '100vh'}}>
            <Typography variant="h1" sx={{ fontSize: '1.5rem' }}> Home page </Typography>
            <List>
                {
                operationsList.map(item => {
                    let time = new Date(item.date);
                    let day = time.getDate();
                    let week = dayNames[time.getDay()];
                    let month = monthNames[time.getMonth()];
                    let year = time.getFullYear();
                    return (
                        item.type !== 'Transfer' ?
                            <ListItemText key={item.id}> {day}, {week}, {month}, {year}, {item.type}, {item.category}, {item.price} </ListItemText>
                        :
                            <ListItemText key={item.id}> {day}, {week}, {month}, {year}, {item.price}, {item.fromAccount}, {item.toAccount} </ListItemText>
                    )
                })
                }
            </List>
            <Link to={'operation'}>
                <AddBtn />
            </Link>
        </div>
    )
}

export default Home;