/** @jsxImportSource @emotion/react */
import * as s from './style';

function InfoBox({ user }) {

    return (
        <div css={s.layout}>
            <h2>{user?.userName}</h2>
            <table css={s.tableLayout}>
                <tbody>
                    <tr>
                        <th>장치</th>
                        <td>{user?.deviceNumber}</td>
                    </tr>
                    <tr>
                        <th>최대 적재율</th>
                        <td>{Number(user?.deviceMaxVolume).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th>목적지</th>
                        <td>{!!user?.status ? user?.cargoName : "현재 목적지 없음"}</td>
                    </tr>
                    <tr>
                        <th>제품</th>
                        <td>{!!user?.status ? user?.productName : "현재 화물 없음"}</td>
                    </tr>
                    <tr>
                        <th>수량</th>
                        <td>{!!user?.status ? user?.productCount : ""}</td>
                    </tr>
                    <tr>
                        <th>적재율</th>
                        <td>{!!user?.status ? Number((user?.productVolume * user?.productCount / user?.deviceMaxVolume * 100)).toFixed(2) + "%" : "0.00%"}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default InfoBox;