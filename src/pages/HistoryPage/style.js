import { css } from "@emotion/react";
import { media } from "../../styles/breakpoints";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 80%;

    ${media.mobile} {
        width: 100%;
    }

    ${media.mobileLandscape} {
        width: 100%;
    }
`;

export const historyBox = css`
    box-sizing: border-box;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    border-top: 3px solid #dbdbdb;
    border-bottom: 3px solid #dbdbdb;
    width: 100%;
    overflow: auto;

    ${media.mobile} {
        height: 20vh;
        border-bottom: none;
    }

    ${media.mobileLandscape} {
        height: 20vh;
        border-bottom: none;
    }
`;

export const historyItem = css`
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    cursor: pointer;
    
    & > svg {
        position: absolute;
        left: 25px;
        font-size: 25px;
        cursor: pointer;
    }

    & > p {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        border-right: 3px solid #dbdbdb;
        border-bottom: 3px solid #dbdbdb;
        padding: 5px 10px 5px 45px;
        width: 25%;
        cursor: pointer;
    }

    ${media.mobile} {
        overflow: auto;
        & > svg {
            left: 5px;
            font-size: 15px;
        }

        & > p {
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            border-right: 3px solid #dbdbdb;
            border-bottom: 3px solid #dbdbdb;
            padding: 5px 10px 5px 45px;
            width: fit-content;
            font-size: 16px;
            cursor: pointer;
        }
    }

`;