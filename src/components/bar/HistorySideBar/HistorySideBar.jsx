/** @jsxImportSource @emotion/react */
import { useMutation } from '@tanstack/react-query';
import * as s from './style';
import { HiChevronDown } from "react-icons/hi2";
import { instance } from '../../../apis/instance';
import { useState } from 'react';

function HistorySideBar({ cargoLocations, products, setHistory }) {  
    const [isShowDestionation, setIsShowDestintation] = useState(false);
    const [isShowProduct, setIsShowProduct] = useState(false);

    const [delivery, setDelivery] = useState({
        destination: { id: 0, cargoName: "전체" },
        product: { id: 0, productName: "전체" }
    })

    const search = useMutation({
        mutationFn: ({ cargoId, productId }) =>
            instance.get(`/history/${cargoId}/${productId}`),
        onSuccess: (res) => {
            console.log(res?.data);
            setHistory(res?.data)
        },
        onError: err => console.error(err)
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

    const handleSearchOnClick = async () => {
        await search.mutateAsync({ productId: delivery?.product?.id, cargoId: delivery?.destination?.id })
    }

    const handleResetOnClick = async () => {
        setDelivery({
            product: { id: 0, productName: "전체" },
            destination: { id: 0, cargoName: "전체" }
        });
        setHistory([])
    }

    return (
        <div css={s.layout}>
            <div css={s.selectBox(isShowDestionation)}>
                <h2>도착지</h2>
                <p onClick={handleSelectDestinationBoxOnClick}>{delivery?.destination?.cargoName}<HiChevronDown /></p>
                <div css={s.optionBox}>
                    {
                        (isShowDestionation && cargoLocations?.length > 0) && cargoLocations?.filter(cargo => cargo?.cargoName !== delivery?.destination?.cargoName)
                            .map(cargo => (
                                <p key={cargo?.id} onClick={() => handleSelectDestinationOnClick(cargo)}>
                                    {cargo?.cargoName}
                                </p>
                            ))
                    }
                </div>
            </div>
            <div css={s.selectBox(isShowProduct)}>
                <h2>제품</h2>
                <p onClick={handleSelectProductBoxOnClick}>{delivery.product.productName}<HiChevronDown /></p>
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
                <button onClick={handleSearchOnClick}>검색</button>
                <button onClick={handleResetOnClick}>초기화</button>
            </div>
        </div>
    );
}

export default HistorySideBar;