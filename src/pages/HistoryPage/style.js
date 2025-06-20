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
        flex-grow: 0;
        height: 30vh;
        border-bottom: none;
    }

    ${media.mobileLandscape} {
        flex-grow: 0;
        height: 30vh;
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

    ::-webkit-scrollbar {
        display: none;
    }
    
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
        white-space: nowrap;
        cursor: pointer;
    }

    ${media.mobile} {
        overflow-x: auto;
        
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
            padding: 5px;
            width: fit-content;
            font-size: 13px;
            cursor: pointer;
        }

        & > p:nth-of-type(1) {
            padding-left: 23px;
        }
    }

`;