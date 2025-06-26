import { css } from "@emotion/react";

export const reset = css`    
    html, body, #root {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }
    
    h1, h2, h3, ul, p {
        margin: 0;
        padding: 0;
        cursor: default;
    }

    td, th {
        padding: 0;
    }

    input {
        border: none;
        outline: none;
    }

    button {
        border: none;
        padding: 10px 15px;
        color: #000000;
        background-color: transparent;
        outline: none;
        font-weight: 500;
        cursor: pointer;

        :disabled {
            color: #ffffff;
            background-color: #dbdbdb;
            cursor: default;
        }
    }
`;