/** @jsxImportSource @emotion/react */
import Header from '../Header/Header';
import * as s from './style';

function Layout({ children }) {
    return (
        <div css={s.layout}>
            <Header />
            <div css={s.container}>
                {children}
            </div>
        </div>
    );
}

export default Layout;