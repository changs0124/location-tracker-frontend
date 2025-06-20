/** @jsxImportSource @emotion/react */
import * as s from './style';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { instance } from '../../../apis/instance';
import { HiChevronDown } from "react-icons/hi2";

function IndexBottomBar({ deviceId, cargoLocations, products, positions, setPositions, isTracking, setIsTracking }) {
    const [isShowCaroLoations, setIsShowCargoLocations] = useState(false);
    const [isShowProducts, setIsShowProducts] = useState(false);
    const [deliveryId, setDeliveryId] = useState(0);

    const [delivery, setDelivery] = useState({
        cargoId: 0,
        cargoName: "",
        productId: 0,
        productName: ""
    })

    useEffect(() => {
        if (!!cargoLocations?.length && !!products?.length) {
            setDelivery({
                cargoId: cargoLocations[0]?.id,
                cargoName: cargoLocations[0]?.cargoName,
                productId: products[0]?.id,
                productName: products[0]?.productName
            })
        }
    }, [cargoLocations, products])

    const startDelivery = useMutation({
        mutationFn: ({ productId, cargoId }) =>
            instance.post("/delivery", { deviceId, cargoId, productId }),
        onSuccess: (res) => {
            setDeliveryId(res?.data)
            alert("시작")
        },
        onError: err => console.error(err),
    })

    const finishDelivery = useMutation({
        mutationFn: () => {
            const positionsStr = JSON.stringify(positions);
            return instance.put("/delivery", { deliveryId, history: positionsStr })
        },
        onSuccess: () => {
            alert("완료")
        },
        onError: err => console.error(err)
    })

    const handleSelectDestinationOnClick = (cargo) => {
        setDelivery(pre => ({
            ...pre,
            cargoId: cargo?.id,
            cargoName: cargo?.cargoName,
        }));
        setIsShowCargoLocations(false)
    }

    const handleSelectProductOnClick = (product) => {
        setDelivery(pre => ({
            ...pre,
            productId:product?.id,
            productName: product?.productName
        }))
        setIsShowProducts(false)
    }

    const handleSelectDestinationBoxOnClick = () => {
        setIsShowCargoLocations(!isShowCaroLoations)
        setIsShowProducts(false)
    }

    const handleSelectProductBoxOnClick = () => {
        setIsShowProducts(!isShowProducts)
        setIsShowCargoLocations(false)
    }

    const handleStartTrackingOnClick = async () => {
        setIsShowCargoLocations(false)
        setIsShowProducts(false)
        await startDelivery.mutateAsync({ productId: delivery?.productId, cargoId: delivery?.cargoId })
        setIsTracking(true)
    }

    const handleStopTrackingOnClick = async () => {
        await finishDelivery.mutateAsync()
        setIsTracking(false)
        setPositions([])
    }

    return (
        <div css={s.layout}>
            <div css={s.container}>
                <div css={s.selectBox(isShowCaroLoations)}>
                    <h2>도착지</h2>
                    <p onClick={!isTracking ? handleSelectDestinationBoxOnClick : () => { }}>{delivery?.cargoName}<HiChevronDown /></p>
                    <div css={s.optionBox}>
                        {
                            (isShowCaroLoations && cargoLocations?.length > 0) && cargoLocations?.filter(cargo => cargo?.cargoName !== delivery?.cargoName)
                                .map(cargo => (
                                    <p key={cargo?.id} onClick={() => handleSelectDestinationOnClick(cargo)}>
                                        {cargo?.cargoName}
                                    </p>
                                ))
                        }
                    </div>
                </div>
                <div css={s.selectBox(isShowProducts)}>
                    <h2>제품</h2>
                    <p onClick={!isTracking ? handleSelectProductBoxOnClick : () => { }}>{delivery?.productName}<HiChevronDown /></p>
                    <div css={s.optionBox}>
                        {
                            (isShowProducts && products?.length > 0) && products?.filter(product => product?.productName !== delivery?.productName)
                                .map(product => (
                                    <p key={product?.id} onClick={() => handleSelectProductOnClick(product)}>
                                        {product?.productName}
                                    </p>
                                ))
                        }
                    </div>
                </div>
            </div>
            <div css={s.buttonBox}>
                <button onClick={handleStartTrackingOnClick} disabled={isTracking}>출발</button>
                <button onClick={handleStopTrackingOnClick} disabled={!isTracking}>도착</button>
            </div>
        </div>
    );
}

export default IndexBottomBar;