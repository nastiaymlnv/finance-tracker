import React, {useState, useRef} from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import { fetchPostOperation } from "../../ducks/operations";

import { operations } from "../../config/operationTypes";
import { categories } from "../../config/categories";

import { OperationContainer,
    OperationHeader,
    OperationBodyContainer,
    CancelBtn,
    OperationTypeList,
    ConfirmBtn,
    OperationLabel,
    OperationPrice,
    OperationCategory,
    OperationDate,
    TransferContainer,
    TransferAccountContainer,
    TransferLabel,
    TransferPaymentMethod,
    OperationPaymentMethod,
    OperationComment
} from "./CreateOperation.style";

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

    const priceRef = useRef();
    const commentRef = useRef();

    const [selectedOperation, setSelectedOperation] = useState('Expense');
    const [validPrice, setValidPrice] = useState(true);

    const handleOperationType = (e) => {
        const type = e.target.value;
        setSelectedOperation(type);
        operationData.type = type;
    }

    const checkPrice = () => {
        const price = priceRef.current.value;

        if (price.length === 0) {
            setValidPrice(false);
        }
        else
            setValidPrice(true);
            operationData.price = price;
    }

    const handleCategory = (e) => operationData.category = e.target.value;

    const handleDate = (e) => operationData.date = e.target.value;

    const handlePayment = (e) => operationData.payment = e.target.value;

    const handleTransferFrom = (e) => operationData.fromAccount = e.target.value;

    const handleTransferTo= (e) => operationData.toAccount = e.target.value;

    const checkComment = () => {
        const comment = commentRef.current.value;
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
        <OperationContainer>
            <OperationHeader>
                <CancelBtn>
                    <Link to={'/'}>
                        Cancel
                    </Link>
                </CancelBtn>
                <OperationTypeList value={selectedOperation} onChange={handleOperationType}>
                    {
                    operations.map(type => {
                        return (
                        <option value={type}>
                            {type}
                        </option>
                        )
                    })
                    }
                </OperationTypeList>
                <ConfirmBtn onClick={confirmOperation}>
                    <Link to={'/'}>
                        Done
                    </Link>
                </ConfirmBtn>
            </OperationHeader>
            <OperationBodyContainer>
                <OperationLabel htmlFor="price">
                    Price
                </OperationLabel>
                <OperationPrice
                    type="number"
                    id="price"
                    ref={priceRef}
                    onChange={checkPrice}
                    valid={validPrice}
                />
                <OperationCategory id="category" onChange={handleCategory} hidden={selectedOperation === "Transfer" && true}>
                    <option selected disabled hidden> Category </option>
                    {
                        categories.map(category => {
                            return (
                                <option value={category}> {category} </option>
                            )
                        })
                    }
                </OperationCategory>
                <OperationLabel htmlFor="date">
                    Date
                </OperationLabel>
                <OperationDate
                    type="date"
                    id="date"
                    onChange={handleDate}
                />
                {
                    selectedOperation === "Transfer"
                    ?
                    <TransferContainer>
                        <TransferAccountContainer>
                            <TransferLabel htmlFor="date">
                                From the account
                            </TransferLabel>
                            <TransferPaymentMethod onChange={handleTransferFrom}>
                                <option selected disabled hidden>
                                    From
                                </option>
                                <option> Card </option>
                                <option> Cash </option>
                            </TransferPaymentMethod>
                        </TransferAccountContainer>
                        <TransferAccountContainer>
                            <TransferLabel htmlFor="date">
                                To the account
                            </TransferLabel>
                            <TransferPaymentMethod onChange={handleTransferTo}>
                                <option selected disabled hidden>
                                    To
                                </option>
                                <option> Card </option>
                                <option> Cash </option>
                            </TransferPaymentMethod>
                        </TransferAccountContainer>
                    </TransferContainer>
                    :
                    <OperationPaymentMethod onChange={handlePayment}>
                        <option selected disabled hidden>
                            {selectedOperation === "Expense" && "Payment method"}
                            {selectedOperation === "Income" && "Payer"}
                        </option>
                        <option> Card </option>
                        <option> Cash </option>
                    </OperationPaymentMethod>
                }
                <OperationLabel htmlFor="comment">
                    Comment
                </OperationLabel>
                <OperationComment
                    type="text"
                    id="comment"
                    ref={commentRef}
                    onChange={checkComment}
                />
            </OperationBodyContainer>
        </OperationContainer>
    )
}

export default CreateOperation;