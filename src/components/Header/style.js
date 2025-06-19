import { css } from "@emotion/react";
import { media } from "../../styles/breakpoints";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-bottom: 3px solid #dbdbdb;
    width: 100%;
    height: 10vh;
`;

export const container = css`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px;

    ${media.mobile} {
        padding: 10px 20px;
    }

    ${media.mobileLandscape} {
        flex-direction: column;
        padding: 10px 20px;
    }
`;

export const logoBox = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    width: 20%;
    color: #666666;
    font-size: 50px;
    cursor: pointer;

    & > img {
        width: 50%;
    }

    ${media.mobile} {
        display: none;
    }

    ${media.mobileLandscape} {
        font-size: 25px;
    }
`;

export const menuBox = (location) => css`
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    flex-grow: 1;

    & > p {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
        color: #666666;
        font-size: 30px;
        font-weight: 500;
        cursor: pointer;

        :hover {
            color: #000000;
        }
    }

    & > p:nth-of-type(1) {
        color: ${location === "/" ? "#000000" : "#666666"};
    }

    & > p:nth-of-type(2) {
        color: ${location === "/history" ? "#000000" : "#666666"};
    }

    ${media.mobile} {
        & > p {
            font-size: 20px;
        }
    }

    ${media.mobileLandscape} {
        & > p {
            font-size: 20px;
        }
    }
`;

export const selectedHeader = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    color: #000000;
    font-size: 30px;
    font-weight: 500;
    cursor: pointer;
`;