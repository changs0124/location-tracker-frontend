import { css } from "@emotion/react";
import { media } from "../../styles/breakpoints";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 80%;
    
    ${media.mobile} {
        width: 100%;
        height: 100%;
    }

    ${media.mobileLandscape} {
        width: 100%;
        height: 100%;
    }
`;

export const tableBox = css`
    box-sizing: border-box;
    display: flex;
    border-bottom: 3px solid #dbdbdb;
    width: 100%;
    max-height: 300px;
    overflow: auto;

    ::-webkit-scrollbar {
        display: none;
    }

    ${media.mobile} {
        max-height: 200px;
    }

    ${media.mobileLandscape} {
        max-height: 200px;
    }
`

export const tableLayout = css`
    width: 100%;
    border-collapse: collapse;
    

    th, td {
        border: 1px solid #dbdbdb;
        padding: 8px;
        text-align: center;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    th {
        background-color: #f8f8f8;
        color: #666666;
        font-weight: 600;
    }

    tr > td {
        cursor: pointer;
    }

    svg {
        font-size: 18px;
    }
`;