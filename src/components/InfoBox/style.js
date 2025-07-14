import { css } from "@emotion/react";
import { media } from "../../styles/breakpoints";

export const layout = css`
    box-sizing: border-box;
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    flex-direction: column;
    border: 3px solid #dbdbdb;
    border-radius: 10px;
    width: 20%;
    color: #333333;
    text-align: center;
    background-color: #ffffff;
    z-index: 9999;

    ${media.mobile} {
        display: none;
    }
`;

export const tableLayout = css`
    width: 100%;
    border-collapse: collapse;

    th, td {
        border: 1px solid #dbdbdb;
        padding: 8px;
        font-weight: 500;
        text-align: center;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    th {
        background-color: #f8f8f8;
        color: #666666;
        font-weight: 600;
    }
`;