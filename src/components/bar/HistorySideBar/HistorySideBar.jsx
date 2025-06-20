/** @jsxImportSource @emotion/react */
import * as s from './style';
import { useMutation } from '@tanstack/react-query';
import { HiChevronDown, HiOutlineXMark } from "react-icons/hi2";
import { instance } from '../../../apis/instance';
import { useState } from 'react';

function HistorySideBar({ tempCargoLocations, tempProducts, setHistory }) {
    const [isShowDestionation, setIsShowDestintation] = useState(false);
    const [isShowProduct, setIsShowProduct] = useState(false);

    const [delivery, setDelivery] = useState({
        cargoId: 0,
        cargoName: "전체",
        productId: 0,
        productName: "전체"
    })

    const search = useMutation({
        mutationFn: ({ cargoId, productId }) =>
            instance.get(`/history/${cargoId}/${productId}`),
        onSuccess: (res) => {
            setHistory(res?.data)
        },
        onError: err => console.error(err)
    });

    const handleSelectCargoOnClick = (cargo) => {
        setDelivery(pre => ({
            ...pre,
            cargoId: cargo?.id,
            cargoName: cargo.cargoName
        }))
        setIsShowDestintation(false)
    }

    const handleSelectProductOnClick = (product) => {
        setDelivery(pre => ({
            ...pre,
            productId: product?.id,
            productName: product?.productName
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
        await search.mutateAsync({ cargoId: delivery?.cargoId, productId: delivery?.productId });
    }

    const handleResetOnClick = async () => {
        setDelivery({
            cargoId: 0,
            cargoName: "전체",
            productId: 0,
            productName: "전체"
        })
        setIsShowDestintation(false);
        setIsShowProduct(false);
        setHistory([]);
    }

    return (
        <div css={s.layout}>
            <div css={s.logoBox}>
                <div css={s.imgBox}>
                    <img src="/images/logo.png" alt="" />
                </div>
                <HiOutlineXMark />
                <div css={s.imgBox}>
                    <img src="/images/kimst_logo.png" alt="" />
                </div>
            </div>
            <div css={s.selectBox(isShowDestionation)}>
                <h2>도착지</h2>
                <p onClick={handleSelectDestinationBoxOnClick}>{delivery?.cargoName}<HiChevronDown /></p>
                <div css={s.optionBox}>
                    {
                        (isShowDestionation && tempCargoLocations?.length > 0) && tempCargoLocations?.filter(cargo => cargo?.cargoName !== delivery?.cargoName)
                            .map(cargo => (
                                <p key={cargo?.id} onClick={() => handleSelectCargoOnClick(cargo)}>
                                    {cargo?.cargoName}
                                </p>
                            ))
                    }
                </div>
            </div>
            <div css={s.selectBox(isShowProduct)}>
                <h2>제품</h2>
                <p onClick={handleSelectProductBoxOnClick}>{delivery?.productName}<HiChevronDown /></p>
                <div css={s.optionBox}>
                    {
                        (isShowProduct && tempProducts?.length > 0) && tempProducts?.filter(product => product?.productName !== delivery?.productName)
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