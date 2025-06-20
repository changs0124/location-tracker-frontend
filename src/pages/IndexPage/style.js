import { css } from "@emotion/react";
import { media } from "../../styles/breakpoints";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 80%;

    ${media.mobile} {
        width: 100%;
    }

    ${media.mobileLandscape} {
        width: 100%;
    }
`;