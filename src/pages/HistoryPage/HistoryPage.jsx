/** @jsxImportSource @emotion/react */
import * as s from './style';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { deviceIdAtom } from '../../atoms/deviceAtoms';
import HistorySideBar from '../../components/bar/HistorySideBar/HistorySideBar';
import Layout from '../../components/Layout/Layout';
import HistoryMap from '../../components/map/HistoryMap/HistoryMap';
import { instance } from '../../apis/instance';
import { useState } from 'react';
import { HiOutlineStop, HiMiniCheck } from "react-icons/hi2";
import HistoryBottomBar from '../../components/bar/HistoryBottomBar/HistoryBottomBar';

function HistoryPage() {
    const [history, setHistory] = useState([]);
    const [index, setIndex] = useState(0);

    const deviceId = useRecoilValue(deviceIdAtom);

    const location = useQuery({
        queryKey: ['deviceLocation', deviceId],
        queryFn: () => instance.get(`/location/${deviceId}`),
        enabled: !!deviceId,
        refetchOnWindowFocus: false,
        retry: 0
    });

    const cargoLocations = useQuery({
        queryKey: ["cargoLocations"],
        queryFn: () => instance.get("/locations/cargo").then(res => {
            const list = [
                { id: 0, cargoName: "전체" },
                ...res.data
            ];
            return list;
        }),
        enabled: !!deviceId,
        refetchOnWindowFocus: false,
        retry: 0
    })

    const products = useQuery({
        queryKey: ["products"],
        queryFn: () => instance.get("/products").then(res => {
           const list = [
                { id: 0, productName: "전체" },
                ...res.data
            ];
            return list;
        }),
        enabled: !!deviceId,
        refetchOnWindowFocus: false,
        retry: 0
    })

    const handleSelectHistoryOnClick = (data) => {
        setIndex(data)
    }

    return (
        <Layout>
            <HistorySideBar deviceId={deviceId} cargoLocations={cargoLocations?.data} products={products?.data} setHistory={setHistory} />
            <div css={s.layout}>
                <HistoryMap location={location} index={index} history={history.map(h => h.history)} />
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
            </div>
            <HistoryBottomBar deviceId={deviceId} cargoLocations={cargoLocations?.data?.data} products={products?.data?.data} setHistory={setHistory} />
        </Layout>
    );
}

export default HistoryPage;