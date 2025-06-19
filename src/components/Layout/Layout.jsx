/** @jsxImportSource @emotion/react */
import * as s from './style';
import Header from '../Header/Header';

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