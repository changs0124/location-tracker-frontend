import { css } from "@emotion/react";
import { media } from "../../styles/breakpoints";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`;

export const container = css`
    box-sizing: border-box;
    display: flex;
    width: 100%;

    ${media.mobile} {
        flex-direction: column;
    }
`;