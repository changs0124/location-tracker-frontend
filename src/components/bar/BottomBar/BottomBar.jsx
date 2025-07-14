/** @jsxImportSource @emotion/react */
import * as s from './style';
import { useEffect } from 'react';
import { HiChevronDown } from "react-icons/hi2";
import { useLocation } from 'react-router-dom';

function BottomBar({ user, delivery, setDelivery, isShowCargoLoations, setIsShowCargoLocations, cargoLocations, isShowProducts, setIsShowProducts, products, isTracking, onClick1, onClick2 }) {
    const location = useLocation();

    useEffect(() => {
        if (!cargoLocations?.length && !products?.length) return

        setDelivery(pre => ({
            ...pre,
            cargoId: cargoLocations?.[0]?.id,
            cargoName: cargoLocations?.[0]?.cargoName,
            productId: products?.[0]?.id,
            productName: products?.[0]?.productName,
            productVolume: products?.[0]?.volume,
        }))
    }, [cargoLocations, products])

    const handleProductCountOnChange = (e) => {
        if (Number(delivery?.productVolume) * Number(e.target.value) > Number(user?.deviceMaxVolume)) {

            alert(`최대 적재량을 초과했습니다.\n최대 ${Math.floor(Number(user?.deviceMaxVolume) / Number(delivery?.productVolume))}개까지 가능합니다.`);
            setDelivery(prev => ({
                ...prev,
                productCount: Math.floor(Number(user?.deviceMaxVolume) / Number(delivery?.productVolume))
            }));
            return
        }

        setDelivery(prev => ({
            ...prev,
            productCount: Number(e.target.value) < 1 ? 1 : Number(e.target.value)
        }));
    }

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
            productId: product?.id,
            productName: product?.productName,
            productVolume: product?.volume,
            productCount: 1
        }))
        setIsShowProducts(false)
    }

    const handleSelectDestinationBoxOnClick = () => {
        setIsShowCargoLocations(!isShowCargoLoations)
        setIsShowProducts(false)
    }

    const handleSelectProductBoxOnClick = () => {
        setIsShowProducts(!isShowProducts)
        setIsShowCargoLocations(false)
    }
    
    return (
        <div css={s.layout}>
            <div css={s.container}>
                <div css={s.selectBox(isShowCargoLoations)}>
                    <h2>도착지</h2>
                    {
                        location.pathname === "/"
                            ?
                            <p onClick={!isTracking ? handleSelectDestinationBoxOnClick : () => { }}>{delivery?.cargoName}<HiChevronDown /></p>
                            :
                            <p onClick={handleSelectDestinationBoxOnClick}>{delivery?.cargoName}<HiChevronDown /></p>
                    }
                    <div css={s.optionBox}>
                        {
                            (isShowCargoLoations && cargoLocations?.length > 0) && cargoLocations?.filter(cargo => cargo?.cargoName !== delivery?.cargoName)
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
                    {
                        location.pathname === "/"
                            ?
                            <p onClick={!isTracking ? handleSelectProductBoxOnClick : () => { }}>{delivery?.productName}<HiChevronDown /></p>
                            :
                            <p onClick={handleSelectProductBoxOnClick}>{delivery?.productName}<HiChevronDown /></p>
                    }
                    {
                        (location.pathname === "/" && !isShowProducts) &&
                        <div css={s.inputBox}>
                            <span>수량</span>
                            <input type="number" value={delivery?.productCount} onChange={handleProductCountOnChange} />
                        </div>
                    }
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
            {
                location.pathname === "/"
                    ?
                    <div css={s.buttonBox}>
                        <button onClick={onClick1} disabled={isTracking}>출발</button>
                        <button onClick={onClick2} disabled={!isTracking}>도착</button>
                    </div>
                    :
                    <div css={s.buttonBox}>
                        <button onClick={onClick1}>검색</button>
                        <button onClick={onClick2}>초기화</button>
                    </div>
            }
        </div>
    );
}

export default BottomBar;