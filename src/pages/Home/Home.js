import React, {useState, useEffect} from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector, useStore } from 'react-redux';

import { getOperations } from "../../ducks/operations";

import AddBtn from "../../components/AddBtn/AddBtn";

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
                setOperationsList(results);
                dispatch(getOperations(results));
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
                    return (
                        <ListItemText key={item.id}> {item.type}, {item.category}, {item.price} </ListItemText>
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