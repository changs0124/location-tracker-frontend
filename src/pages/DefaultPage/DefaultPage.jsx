/** @jsxImportSource @emotion/react */
import * as s from './style';
import { useMutation, useQuery } from '@tanstack/react-query';
import { instance } from '../../apis/instance';
import { v4 as uuidv4 } from 'uuid';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import { HiChevronDown } from "react-icons/hi2";
import { userCodeAtom } from '../../atoms/userAtoms';

function DefaultPage() {
    const [userCode, setUserCode] = useRecoilState(userCodeAtom);

    const [user, setUser] = useState({
        userName: "",
        deviceId: 0,
        deviceNumber: "장치 넘버를 선택하여 주세요"
    });
    const [isShowDevice, setIsShowDevice] = useState(false)

    const devices = useQuery({
        queryKey: ["devices"],
        queryFn: () => instance.get("/devices"),
        enabled: true,
        refetchOnWindowFocus: false,
        retry: 0
    });

    const registerDevice = useMutation({
        mutationFn: ({ latitude, longitude }) =>
            instance.post("/user", {
                userCode,
                userName: user?.userName.replace(/\s+/g, ""),
                deviceId: user?.deviceId,
                latitude,
                longitude,
            }),
        onSuccess: () => {
            localStorage.setItem("userCode", userCode)
            alert("장치 등록 성공");
            window.location.reload("/");
        },
        onError: (error) => {
            alert(error?.response?.data?.message);
        },
    });

    const handleRegisterOnClick = () => {
        if (user?.userName?.trim() === "") {
            alert("장치 이름을 입력해주세요.")
            return
        }

        const tempCode = uuidv4();
        setUserCode(tempCode);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                registerDevice.mutate({
                    latitude,
                    longitude,
                })
            },
            (err) => {
                console.error('위치 권한 오류:', err);
                alert('위치 권한을 허용해주세요.');
            },
            { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 }
        );
    };

    const handleUserNameOnChange = (e) => {
        setUser(pre => ({
            ...pre,
            userName: e.target.value
        }))
    }

    const handleSelectBoxOnClick = () => {
        setIsShowDevice(!isShowDevice)
    }

    const handleSelectDeviceOnClick = (dev) => {
        setUser(pre => ({
            ...pre,
            deviceId: dev?.id,
            deviceNumber: dev?.deviceNumber
        }))
        setIsShowDevice(false)
    }  

    return (
        <div css={s.layout}>
            <div css={s.container}>
                <h2>장치 등록</h2>
                <div css={s.selectBox(isShowDevice, user?.deviceId)}>
                    <p onClick={handleSelectBoxOnClick}>{user?.deviceNumber}<HiChevronDown /></p>
                    <div css={s.optionBox}>
                        {
                            (isShowDevice && devices?.data?.data?.length > 0) && devices?.data?.data?.filter(dev => dev?.deviceNumber !== user?.deviceNumber)
                                .map(dev => (
                                    <p key={dev.id} onClick={() => handleSelectDeviceOnClick(dev)}>
                                        {dev?.deviceNumber}
                                    </p>
                                ))
                        }
                    </div>
                </div>
                {
                    (user.deviceId !== 0 && !isShowDevice) &&
                    <div css={s.inputBox}>
                        <input type="text" name="" value={user?.userName} onChange={handleUserNameOnChange} placeholder="장치 이름을 입력 해주세요." />
                    </div>
                }
                <div css={s.buttonBox}>
                    <button onClick={handleRegisterOnClick} disabled={registerDevice.isPending}>
                        {
                            registerDevice.isPending ? "등록 중..." : "확인"
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DefaultPage;