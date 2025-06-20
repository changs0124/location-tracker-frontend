import { css } from "@emotion/react";
import { media } from "../../../styles/breakpoints";

export const layout = css`
    display: none;

    ${media.mobile} {
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: column;
        border-top: 3px solid #dbdbdb;
        width: 100%;
        height: 40vh;
        overflow: auto;
    }
`;

export const container = css`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export const selectBox = (isShow) => css`
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 3px solid #dbdbdb;
    width: 50%;

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

    ${media.mobile} {
        & > h2 {
            padding: 5px 0px;
            font-size: 16px;
        }

        & > p {
            padding: 5px 10px;
            font-size: 14px;
        }
    }
`;

export const optionBox = css`
    box-sizing: border-box;
    position: absolute;
    top: 105px;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: auto;
    z-index: 97;
    background-color: #cccccc;

    & > p {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        border-bottom: 3px solid #dbdbdb;
        padding: 10px 10px 10px 20px;
        width: 100%;
        color: #666666;
        font-size: 18px;
        font-weight: 500;
        cursor: pointer;
    }

    ${media.mobile} {
        top: 69px;

        & > p {
            padding: 5px 5px 5px 15px;
            font-size: 15px;
        }
    }
`;

export const buttonBox = css`
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: end;
    padding: 10px;
    width: 100%;
    z-index: 96;

    & > button {
        border: 3px solid #dbdbdb;
        border-radius: 20px;
        font-size: 20px;

        :active {
            background-color: #dbdbdb;
            color: #ffffff;
            font-size: 20px;
        }
    }

    & > :not(:nth-last-of-type(1)) {
        margin-bottom: 10px;
    }

    ${media.mobile} {
        padding: 5px;
        & > button {
            font-size: 16px;
        }
    }
`;