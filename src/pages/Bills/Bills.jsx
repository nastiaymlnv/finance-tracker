import React from "react";
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";

const Bills = () => {
  const { transactionId } = useParams();
  const operations = useSelector(state => state.operations);
  const currTransaction = operations.find((item) => item.id === transactionId); 
  console.log(currTransaction)

  return (
    <>
      <h1> Bills page </h1>
      <div> {transactionId} </div>
    </>
  );
};

export default Bills;
