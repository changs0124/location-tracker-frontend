import { css } from "@emotion/react";
import { media } from "../../styles/breakpoints";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-bottom: 3px solid #dbdbdb;
    width: 100%;
`;

export const logoBox = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 3px solid #dbdbdb;
    width: 20%;

    & > svg {
        margin-left: 15px;
        font-size: 25px;
    }

    ${media.mobile} {
        display: none;
    }

    ${media.mobileLandscape} {
        display: none;
    }
`;

export const imgBox = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 33%;
    overflow: hidden;

    & > img {
        width: 100%;
        object-fit: cover;
    }
`;

export const buttonBox = (location) => css`
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 80%;

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
        border-right: 1.5px solid #dbdbdb;
        color: ${location === "/" ? "#000000" : "#666666"};

    }

    & > p:nth-of-type(2) {
        border-left: 1.5px solid #dbdbdb;
        color: ${location === "/history" ? "#000000" : "#666666"};
    }

    ${media.mobile} {
        width: 100%;

        & > p {
            padding: 5px 10px;
            font-size: 20px;
        }
    }

    ${media.mobileLandscape} {
        width: 100%;

        & > p {
            padding: 5px 10px;
            font-size: 20px;
        }
    }
`;

