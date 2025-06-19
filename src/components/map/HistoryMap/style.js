import { css } from "@emotion/react";
import { media } from "../../../styles/breakpoints";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    height: 55vh;

    ${media.mobile} {
        height: 30vh;
    }
`;

export const container = css`
    box-sizing: border-box;
    display: flex;
    width: 100%;
`;