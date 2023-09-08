import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Typography, List, ListItemText } from "@mui/material";

import { getOperations } from "../../ducks/operations";

import AddBtn from "../../components/AddBtn/AddBtn";

import { dayNames, monthNames } from "./dateItemsNames";

const Home = () => {
    const dispatch = useDispatch();

    const [operationsList, setOperationsList] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3001/operations");
            if (response.ok) {
                const results = await response.json();
                const sortedEvents = results
                    .slice()
                    .sort(
                        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
                    );
                setOperationsList(sortedEvents);
                dispatch(getOperations(sortedEvents));
            }
        } catch {
            alert("Failed to fetch");
        }
    };

    return (
        <div style={{ height: "100vh" }}>
            <Typography variant="h1" sx={{ fontSize: "1.5rem" }}>
                Home page
            </Typography>
            <List>
                {operationsList.map((item) => {
                    const time = new Date(item.date);
                    const day = time.getDate();
                    const week = dayNames[time.getDay()];
                    const month = monthNames[time.getMonth()];
                    const year = time.getFullYear();

                    return item.type !== "Transfer" ? (
                        <ListItemText key={item.id}>
                            {day}, {week}, {month}, {year}, {item.type}, {item.category},{" "}
                            {item.price}
                        </ListItemText>
                    ) : (
                        <ListItemText key={item.id}>
                            {day}, {week}, {month}, {year}, {item.type}, {item.price},{" "}
                            {item.fromAccount}, {item.toAccount}
                        </ListItemText>
                    );
                })}
            </List>
            <Link to={"/operation"}>
                <AddBtn />
            </Link>
        </div>
    );
};

export default Home;
