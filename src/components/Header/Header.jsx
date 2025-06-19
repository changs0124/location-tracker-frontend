/** @jsxImportSource @emotion/react */
import * as s from './style';
import { useLocation, useNavigate } from 'react-router-dom';

function Header() {
    const nav = useNavigate();
    const location = useLocation();
    
    return (
        <div css={s.layout}>
            <div css={s.container}>
                <div css={s.logoBox} onClick={() => nav("/")}>
                    <img src="/images/logo.png" alt="" />
                </div>
                <div css={s.menuBox(location.pathname)}>
                    <p onClick={() => nav("/")}>실시간 위치</p>
                    <p onClick={() => nav("/history")}>운송 이력</p>
                </div>
            </div>
        </div>
    );
}

export default Header;