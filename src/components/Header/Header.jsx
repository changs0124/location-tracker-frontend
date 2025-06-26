/** @jsxImportSource @emotion/react */
import * as s from './style';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineXMark } from "react-icons/hi2";

function Header() {
    const nav = useNavigate();
    const location = useLocation();

    return (
        <div css={s.layout}>
            <div css={s.logoBox}>
                <div css={s.imgBox}>
                    <img src="/images/logo.png" alt="" />
                </div>
                <HiOutlineXMark />
                <div css={s.imgBox}>
                    <img src="/images/kimst_logo.png" alt="" />
                </div>
            </div>
            <div css={s.buttonBox(location.pathname)}>
                <p onClick={() => nav("/")}>실시간 위치</p>
                <p onClick={() => nav("/history")}>운송 이력</p>
            </div>
        </div>
    );
}

export default Header;