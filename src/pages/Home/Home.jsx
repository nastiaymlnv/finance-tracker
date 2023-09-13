import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import cn from "classnames";
import { Typography, List, ListItem, ListItemText } from "@mui/material";

import { getOperations } from "../../ducks/operations";

import AddBtn from "../../components/AddBtn/AddBtn";

import { monthNames } from "./dateItemsNames";

import css from "./Home.module.css";
const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const handleItemClick = (transactionId) => {
        navigate(`/operation/${transactionId}`);
    }

    return (
        <div style={{ height: "100vh" }} className={css["Home-container"]}>
            <Typography variant="h1" sx={{ fontSize: "1.5rem" }}>
                Home page
            </Typography>
            <List className={css["Operation-list"]}>
                {operationsList.map((item) => {
                    const time = new Date(item.date);
                    const day = time.getDate();
                    const month = monthNames[time.getMonth()];
                    const year = time.getFullYear();

                    return <ListItem key={item.id} className={css["Operation-list__item"]} onClick={() => handleItemClick(item.id)}>
                        {item.type !== "Transfer" ?
                            <ListItemText className={css["Operation-list__item-info"]}>
                                <div className={css["Operation-list__item-title"]}> {item.category} </div>
                                <div> {item.payment} </div>
                                <div> {item.comment} </div>
                            </ListItemText>
                            :
                            <ListItemText className={css["Operation-list__item-info"]}>
                                <div className={css["Operation-list__item-title"]}> {item.type} </div>
                                <div>
                                    {`${item.fromAccount} `}
                                    &#8594;
                                    {` ${item.toAccount}`}
                                </div>
                                <div> {item.comment} </div>
                            </ListItemText>
                        }
                        <ListItemText className={css["Operation-list__item-date-price"]}>
                            <div className={cn(css["Operation-list__item-price"], item.type !== "Income" ? css["Operation-list__item-price_red"] : css["Operation-list__item-price_green"])}>
                                {item.type !== "Income" ? `-${item.price} UAH` : `${item.price} UAH`}
                            </div>
                            <div className={css["Operation-list__item-date"]}>
                                {day} {month} {year}
                            </div>
                        </ListItemText>
                    </ListItem>
                })}
            </List>
            <Link to={"/operation"}>
                <div style={{ "position": "fixed", "bottom": "20px", "right": "20px" }}>
                    <AddBtn />
                </div>
            </Link>
        </div>
    );
};

export default Home;
