import { css } from "@emotion/react";
import { media } from "../../styles/breakpoints";

export const layout = (location) => css`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-bottom: 3px solid #dbdbdb;
    width: 100%;
    height: 10vh;

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
        border-right: 3px solid #dbdbdb;
        color: ${location === "/" ? "#000000" : "#666666"};

    }

    & > p:nth-of-type(2) {
        color: ${location === "/history" ? "#000000" : "#666666"};
    }

    ${media.mobile} {
        & > p {
            font-size: 20px;
        }
    }

    ${media.mobileLandscape} {
        & > p {
            font-size: 20px;
        }
    }
`;

