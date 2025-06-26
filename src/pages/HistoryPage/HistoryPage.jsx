/** @jsxImportSource @emotion/react */
import * as s from './style';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { deviceIdAtom } from '../../atoms/deviceAtoms';
import { useEffect, useState } from 'react';
import { HiOutlineStop, HiMiniCheck } from "react-icons/hi2";
import { instance } from '../../apis/instance';
import Layout from '../../components/Layout/Layout';
import HistoryMap from '../../components/map/HistoryMap/HistoryMap';
import SideBar from '../../components/bar/SideBar/SideBar';
import BottomBar from '../../components/bar/BottomBar/BottomBar';

function HistoryPage() {
    const [index, setIndex] = useState(0);
    const [history, setHistory] = useState([]);
    const [tempCargoLocations, setTempCargoLocations] = useState([]);
    const [tempProducts, setTempProducts] = useState([]);
    const [isShowCargoLoations, setIsShowCargoLocations] = useState(false);
    const [isShowProducts, setIsShowProducts] = useState(false);
    const [delivery, setDelivery] = useState({
        cargoId: 0,
        cargoName: "",
        productId: 0,
        productName: ""
    })

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

    const search = useMutation({
        mutationFn: ({ cargoId, productId }) =>
            instance.get(`/history?cargoId=${cargoId}&productId=${productId}`),
        onSuccess: (res) => {
            setHistory(res?.data)
        },
        onError: (error) => {
            alert(error?.response?.data?.message);
        }
    });

    const handleSearchOnClick = async () => {
        await search.mutateAsync({ cargoId: delivery?.cargoId, productId: delivery?.productId });
    }

    const handleResetOnClick = async () => {
        setDelivery({
            cargoId: 0,
            cargoName: "전체",
            productId: 0,
            productName: "전체"
        })
        setIsShowCargoLocations(false);
        setIsShowProducts(false);
        setHistory([]);
    }

    const handleSelectHistoryOnClick = (data) => {
        setIndex(data)
    }

    return (
        <Layout>
            <SideBar
                delivery={delivery}
                setDelivery={setDelivery}
                isShowCargoLoations={isShowCargoLoations}
                setIsShowCargoLocations={setIsShowCargoLocations}
                cargoLocations={tempCargoLocations}
                isShowProducts={isShowProducts}
                setIsShowProducts={setIsShowProducts}
                products={tempProducts}
                onClick1={handleSearchOnClick}
                onClick2={handleResetOnClick}
            />
            <div css={s.layout}>
                <HistoryMap
                    location={location?.data}
                    index={index}
                    history={history}
                />
                {
                    !!history?.length &&
                    <div css={s.tableBox}>
                        <table css={s.tableLayout}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>목적지</th>
                                    <th>장치</th>
                                    <th>제품</th>
                                    <th>시작 시간</th>
                                    <th>종료 시간</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history?.map((his, idx) => (
                                    <tr key={his?.id} onClick={() => handleSelectHistoryOnClick(idx)} >
                                        <td>{index === idx ? <HiMiniCheck /> : <HiOutlineStop />}</td>
                                        <td>{his?.cargoName}</td>
                                        <td>{his?.deviceName}</td>
                                        <td>{his?.productName}</td>
                                        <td>{his?.startTime?.replace("T", " ").substring(0, 16)}</td>
                                        <td>{his?.endTime?.replace("T", " ").substring(0, 16)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
            <BottomBar
                delivery={delivery}
                setDelivery={setDelivery}
                isShowCargoLoations={isShowCargoLoations}
                setIsShowCargoLocations={setIsShowCargoLocations}
                cargoLocations={tempCargoLocations}
                isShowProducts={isShowProducts}
                setIsShowProducts={setIsShowProducts}
                products={tempProducts}
                onClick1={handleSearchOnClick}
                onClick2={handleResetOnClick}
            />
        </Layout>
    );
}

export default HistoryPage;