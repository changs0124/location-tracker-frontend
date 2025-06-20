import { css } from "@emotion/react";
import { media } from "../../../styles/breakpoints";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    width: 100%;
    height: 55vh;

    ${media.mobile} {
        height: 30vh;
    }
`;