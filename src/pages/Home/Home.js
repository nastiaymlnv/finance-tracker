import React from "react";
import { Link } from "react-router-dom";

import AddBtn from "../../components/AddBtn/AddBtn";

const Home = () => {
    return (
        <div style={{height: '100vh'}}>
            <h1> Home page </h1>
            <Link to={'operation'}>
                <AddBtn />
            </Link>
        </div>
    )
}

export default Home;