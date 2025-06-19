import { css } from "@emotion/react";
import { media } from "../../styles/breakpoints";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`;

export const container = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
    border: 3px solid #dbdbdb;
    width: 40%;
    text-align: center;

    & > h2 {
        padding-bottom: 10px;
        color: #666666;
        font-size: 30px;
        font-weight: 600;
    }

    & > p {
        margin-bottom: 30px;
        color: #666666;
        font-size: 20px;
        font-weight: 500;
    }

    ${media.mobile} {
        width: 90%;
    }

    ${media.mobileLandscape} {
        width: 90%;
    }
`;

export const buttonBox = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid #dbdbdb;
    border-radius: 20px;
    width: 40%;
    padding: 10px 15px;
    cursor: pointer;

    & > button {
        width: 100%;
        font-size: 25px;
    }

    :hover {
        background-color: #dbdbdb;
    
        & > button {
            color: #ffffff;
        }
    }

    ${media.mobile} {
        width: 70%;

        :active {
            background-color: #dbdbdb;
        
            & > button {
                color: #ffffff;
            }
        }
    }
`;