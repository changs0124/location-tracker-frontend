import { css } from "@emotion/react";
import { media } from "../../styles/breakpoints";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

export const container = css`
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-grow: 1;
    width: 100%;

    ${media.mobile} {
        flex-direction: column;
    }

    ${media.mobileLandscape} {
        flex-direction: column;
    }
`;