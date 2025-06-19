import { css } from "@emotion/react";
import { media } from "../../../styles/breakpoints";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-grow: 1;

    ${media.mobile} {
        height: 50vh;
    }
`;

export const container = css`
    box-sizing: border-box;
    display: flex;
    width: 100%;
`;

export const defaultBox = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #666666;
    font-size: 18px;
    font-weight: 500;
`;

export const popupBox = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: fit-content;

    & > p {
        margin-top: 10px;
        margin-bottom: 0;
        color: #666666;
        font-size: 18px;
        font-weight: 500;
    }
`;