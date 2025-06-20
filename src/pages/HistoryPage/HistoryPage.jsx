/** @jsxImportSource @emotion/react */
import * as s from './style';
import { useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { deviceIdAtom } from '../../atoms/deviceAtoms';
import { useEffect, useState } from 'react';
import { HiOutlineStop, HiMiniCheck } from "react-icons/hi2";
import HistoryBottomBar from '../../components/bar/HistoryBottomBar/HistoryBottomBar';
import Header from '../../components/Header/Header';
import HistorySideBar from '../../components/bar/HistorySideBar/HistorySideBar';
import Layout from '../../components/Layout/Layout';
import HistoryMap from '../../components/map/HistoryMap/HistoryMap';

function HistoryPage() {
    const [index, setIndex] = useState(0);
    const [history, setHistory] = useState([]);
    const [tempCargoLocations, setTempCargoLocations] = useState([]);
    const [tempProducts, setTempProducts] = useState([]);

    const deviceId = useRecoilValue(deviceIdAtom);

    const queryClient = useQueryClient();
    const location = queryClient.getQueryData(['deviceLocation', deviceId])
    const cargoLocations = queryClient.getQueryData(["cargoLocations"])
    const products = queryClient.getQueryData(["products"])

    useEffect(() => {
        if (cargoLocations?.status === 200) {
            setTempCargoLocations([
                { id: 0, cargoName: "전체" },
                ...cargoLocations?.data
            ])
        }
        if (products?.status === 200) {
            setTempProducts([
                { id: 0, productName: "전체" },
                ...products?.data
            ])
        }
    }, [cargoLocations, products])

    const handleSelectHistoryOnClick = (data) => {
        setIndex(data)
    }

    return (
        <Layout>
            <HistorySideBar
                deviceId={deviceId}
                tempCargoLocations={tempCargoLocations}
                tempProducts={tempProducts}
                setHistory={setHistory}
            />
            <div css={s.layout}>
                <Header />
                <HistoryMap
                    location={location?.data}
                    index={index}
                    history={history}
                />
                <div css={s.historyBox}>
                    {
                        history?.map((his, idx) => (
                            <div key={his?.id} css={s.historyItem} onClick={() => handleSelectHistoryOnClick(idx)}>
                                {
                                    index === idx ? <HiMiniCheck /> : <HiOutlineStop />
                                }
                                <p>목적지 : {his?.cargoName}</p>
                                <p>제품 : {his?.productName}</p>
                                <p>시작 시간 : {his?.startTime?.replace("T", " ").substring(0, 16)}</p>
                                <p>종료 시간 : {his?.endTime?.replace("T", " ").substring(0, 16)}</p>
                            </div>
                        ))
                    }
                </div>
                <HistoryBottomBar
                    deviceId={deviceId}
                    tempCargoLocations={tempCargoLocations}
                    tempProducts={tempProducts}
                    setHistory={setHistory}
                />
            </div>

        </Layout>
    );
}

export default HistoryPage;