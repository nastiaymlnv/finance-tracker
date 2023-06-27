import styled, {css} from "styled-components";

export const OperationContainer = styled.div`

`;

export const OperationHeader = styled.section`
    height: 60px;
    border: 1px solid #000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
`;

export const OperationBodyContainer = styled.section`
    display: flex;
    flex-direction: column;
    padding: 20px 10px;
`;

export const CancelBtn = styled.button`

`;

export const OperationTypeList = styled.select`

`;

export const ConfirmBtn = styled.button`

`;

export const OperationLabel = styled.p`

`;

const Input = css`
    border: 1px solid #000;
    margin: 5px 0 10px 0;
    padding: 10px;
    height: 40px;
`;

export const OperationPrice = styled.input`
    ${Input};
    border-color: ${props => !props.valid && 'red'};
`;

export const OperationCategory = styled.select`
    ${Input};
`;

export const OperationDate = styled.input`
    ${Input};
`;

export const TransferContainer = styled.section`
    display: flex;
    justify-content: space-between;
    gap: 10px;
`;

export const TransferAccountContainer = styled.section`
    width: 100%;
`;

export const TransferLabel = styled.p`

`;

export const TransferPaymentMethod = styled.select`
    ${Input};
    width: 100%;
`;

export const OperationPaymentMethod = styled.select`
    ${Input};
`;

export const OperationComment = styled.input`
    ${Input};
`;