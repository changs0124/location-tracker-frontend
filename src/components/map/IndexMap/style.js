import { css } from "@emotion/react";
import { media } from "../../../styles/breakpoints";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-grow: 1;
    width: 80%;

    ${media.mobile} {
        border-bottom: 3px solid #dbdbdb;
        width: 100%;
    }
`;

export const popupBox = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: fit-content;

    & > p {
        margin-top: 5px;
        margin-bottom: 0;
        color: #666666;
        font-size: 16px;
        font-weight: 500;
    }

    & > p:nth-of-type(1) {
        margin-top: 0;
    }
`;