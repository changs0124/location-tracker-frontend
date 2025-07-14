import { css } from "@emotion/react";
import { media } from "../../../styles/breakpoints";

export const layout = css`
    display: none;

    ${media.mobile} {
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
    }
`;

export const container = css`
    box-sizing: border-box;
    display: flex;
    width: 100%;

    & > div:nth-of-type(1) {
        border-right: 1px solid #dbdbdb;
    }

    & > div:nth-of-type(2) {
        border-left: 1px solid #dbdbdb;
    }
`;

export const selectBox = (isShow) => css`
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 2px solid #dbdbdb;
    width: 50%;

    & > h2 {
        border-bottom: 2px solid #dbdbdb;
        padding: 5px 0px;
        width: 100%;
        color: #666666;
        font-size: 16px;
        text-align: center;
    }

    & > p {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding: 5px 10px;
        width: 100%;
        color: #666666;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;

        & > svg {
            position: absolute;
            right: 5px;
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
    max-height: 100px;
    background-color: #dbdbdb;
    overflow-y: auto;

    ::-webkit-scrollbar {
        display: none;
    }

    & > p {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ffffff;
        padding: 5px 5px 5px 15px;
        width: 100%;
        color: #666666;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
    }

    & > p:nth-last-of-type(1) {
        border-bottom: none;
    }
`;

export const inputBox = css`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    width: 100%;

    & > span {
        border-right: 3px solid #dbdbdb;
        width: 30%;
        color: #333333;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
    }

    & > input {
        padding: 0;
        width: 70%;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
    }
`;

export const buttonBox = css`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    width: 100%;
    z-index: 96;

    & > button {
        border: 2px solid #dbdbdb;
        border-radius: 20px;
        width: 49%;
        color: #666666;
        font-size: 16px;

        :disabled {
            color: #ffffff;
        }

        :active {
            background-color: #dbdbdb;
            color: #ffffff;
        }
    }
`;