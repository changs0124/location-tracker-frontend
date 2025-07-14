import { css } from "@emotion/react";
import { media } from "../../styles/breakpoints";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export const container = css`
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
    border: 3px solid #dbdbdb;
    border-radius: 30px;
    width: 40%;
    height: 70%;
    text-align: center;

    & > h2 {
        padding-bottom: 20px;
        color: #666666;
        font-size: 35px;
        font-weight: 600;
    }

    ${media.mobile} {
        width: 90%;
    }

    ${media.mobileLandscape} {
        width: 90%;
    }
`;

export const selectBox = (isShow, deviceId) => css`
    box-sizing: border-box;
    display: flex;
    flex-grow: ${!!deviceId ? 0 : 1};
    flex-direction: column;
    align-items: center;
    margin-bottom: ${!!deviceId ? "35px" : 0};
    width: 60%;
    overflow: auto;

    & > p {
        box-sizing: border-box;
        position: relative;
        display: flex;
        align-items: center;
        border: 3px solid #dbdbdb;
        padding: 10px 15px;
        width: 100%;
        color: #333333;
        font-size: 20px;
        font-weight: 500;
        cursor: pointer;

        & > svg {
            position: absolute;
            right: 10px;
            transform: rotate(${isShow ? '180deg' : '0deg'});
            transition: transform 0.3s ease;
            cursor: pointer;
        }
    }
`;

export const optionBox = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: auto;
    
    ::-webkit-scrollbar {
        display: none;
    }

    & > p {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #dbdbdb;
        padding: 10px 25px;
        width: 100%;
        color: #333333;
        font-size: 18px;
        font-weight: 500;
        cursor: pointer;
    }
`;

export const inputBox =css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;

    & > input {
        border-bottom: 2px solid #dbdbdb;
        padding: 5px 10px;
        width: 100%;
        text-align: center;
        font-size: 18px;
    }
    
`;

export const buttonBox = css`
    box-sizing: border-box;
    position: absolute;
    bottom: 40px;
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

    :active {
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