import styled, {css} from "styled-components";

export const AddBtnContainer = styled.div`
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(180deg, #FFB532 0%, #FFD521 100%);
    filter: drop-shadow(0px 1px 2px grey);
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 0 50px 30px 0;
    position: fixed;
    z-index: 1;
`;

const Line = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 2px;
`;

export const VerticalLine = styled.span`
    transform: rotate(-90deg);
    ${Line};
    height: 5px;
    width: 25px;
`;

export const HorizontalLine = styled.span`
    ${Line};
    height: 25px;
    width: 5px;
`;