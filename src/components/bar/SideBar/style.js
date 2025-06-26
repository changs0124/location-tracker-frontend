import { css } from "@emotion/react";
import { media } from "../../../styles/breakpoints";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border-right: 3px solid #dbdbdb;
    width: 20%;
    background-color: #ffffff;

    ${media.mobile} {
        display: none;
    }

    ${media.mobileLandscape} {
        display: none;
    }
`;

export const selectBox = (isShow) => css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 3px solid #dbdbdb;
    width: 100%;
    height: 50%;
    overflow: auto;

    & > h2 {
        padding: 10px 0px;
        width: 100%;
        color: #666666;
        text-align: center;
    }

    & > p {
        box-sizing: border-box;
        position: relative;
        display: flex;
        align-items: center;
        border-top: 3px solid #dbdbdb;
        border-bottom: 3px solid #dbdbdb;
        padding: 10px 15px;
        width: 100%;
        color: #333333;
        font-size: 20px;
        font-weight: 500;
        cursor: pointer;

        & > svg {
            position: absolute;
            right: 10px;
            transform: rotate(${isShow ? '180deg' : '0deg'});
            transition: transform 0.3s ease;
            cursor: pointer;
        }
    }
`;

export const optionBox = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: auto;
    
    ::-webkit-scrollbar {
        display: none;
    }

    & > p {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #dbdbdb;
        padding: 10px 25px;
        width: 100%;
        color: #333333;
        font-size: 18px;
        font-weight: 500;
        cursor: pointer;
    }
`;

export const buttonBox = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    width: 100%;

    & > button {
        border: 3px solid #dbdbdb;
        border-radius: 20px;
        font-size: 20px;

        :hover {
            background-color: #dbdbdb;
            color: #ffffff;
            font-size: 20px;
        }
    }

    & > :not(:nth-last-of-type(1)) {
        margin-bottom: 10px;
    }
`;