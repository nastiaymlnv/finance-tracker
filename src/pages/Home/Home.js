import React, {useState, useEffect} from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector, useStore } from 'react-redux';

import { fetchOperations } from "../../ducks/operations";

import AddBtn from "../../components/AddBtn/AddBtn";

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
                dispatch(fetchOperations(results));
            }
        }
        catch {
            alert('Failed to fetch');
        }
    }


    return (
        <div style={{height: '100vh'}}>
            <h1> Home page </h1>
            <ul>
                {
                operationsList.map(item => {
                    return (
                        <li key={item.id}> {item.type}, {item.category}, {item.price} </li>
                    )
                })
                }
            </ul>
            <Link to={'operation'}>
                <AddBtn />
            </Link>
        </div>
    )
}

export default Home;