/** @jsxImportSource @emotion/react */
import * as s from './style';
import { useMutation } from '@tanstack/react-query';
import { HiChevronDown } from "react-icons/hi2";
import { instance } from '../../../apis/instance';
import { useEffect, useState } from 'react';

function IndexSideBar({ deviceId, cargoLocations, products, positions, setPositions, isTracking, setIsTracking }) {
    const [isShowDestionation, setIsShowDestintation] = useState(false);
    const [isShowProduct, setIsShowProduct] = useState(false);
    const [deliveryId, setDeliveryId] = useState(0);

    const [delivery, setDelivery] = useState({
        product: {},
        destination: {}
    })

    useEffect(() => {
        if (cargoLocations?.length > 0 && products?.length > 0) {
            setDelivery({
                destination: cargoLocations[0],
                product: products[0]
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
        onError: err => console.error(err)
    });

    const finishDelivery = useMutation({
        mutationFn: () => {
            const positionsStr = JSON.stringify(positions);
            return instance.put("/delivery", { deliveryId, history: positionsStr })
        },
        onSuccess: () => {
            alert("완료")
        },
        onError: err => console.error(err),
    });

    const handleSelectDestinationOnClick = (data) => {
        setDelivery(pre => ({
            ...pre,
            destination: data
        }))
        setIsShowDestintation(false)
    }

    const handleSelectProductOnClick = (data) => {
        setDelivery(pre => ({
            ...pre,
            product: data
        }))
        setIsShowProduct(false)
    }

    const handleSelectDestinationBoxOnClick = () => {
        setIsShowDestintation(!isShowDestionation);
        setIsShowProduct(false);
    }

    const handleSelectProductBoxOnClick = () => {
        setIsShowProduct(!isShowProduct);
        setIsShowDestintation(false);
    }

    const handleStartTrackingOnClick = async () => {
        await startDelivery.mutateAsync({ productId: delivery?.product?.id, cargoId: delivery?.destination?.id })
        setIsTracking(true);
    }

    const handleStopTrackingOnClick = async () => {
        await finishDelivery.mutateAsync()
        setIsTracking(false);
        setPositions([]);
    }

    return (
        <div css={s.layout}>
            <div css={s.selectBox(isShowDestionation)}>
                <h2>도착지</h2>
                <p onClick={!isTracking ? handleSelectDestinationBoxOnClick : () => { }}>{delivery?.destination?.cargoName}<HiChevronDown /></p>
                <div css={s.optionBox}>
                    {
                        (isShowDestionation && cargoLocations?.length > 0) && cargoLocations?.filter(cargo => cargo?.cargoName !== delivery?.destination?.cargoName)
                            .map(cargo => (
                                <p key={cargo.id} onClick={() => handleSelectDestinationOnClick(cargo)}>
                                    {cargo.cargoName}
                                </p>
                            ))
                    }
                </div>
            </div>
            <div css={s.selectBox(isShowProduct)}>
                <h2>제품</h2>
                <p onClick={!isTracking ? handleSelectProductBoxOnClick : () => { }}>{delivery.product.productName}<HiChevronDown /></p>
                <div css={s.optionBox}>
                    {
                        (isShowProduct && products?.length > 0) && products?.filter(product => product?.productName !== delivery?.product?.productName)
                            .map(product => (
                                <p key={product.id} onClick={() => handleSelectProductOnClick(product)}>
                                    {product?.productName}
                                </p>
                            ))
                    }
                </div>
            </div>
            <div css={s.buttonBox}>
                <button onClick={handleStartTrackingOnClick} disabled={isTracking}>출발</button>
                <button onClick={handleStopTrackingOnClick} disabled={!isTracking}>도착</button>
            </div>
        </div>
    );
}

export default IndexSideBar;