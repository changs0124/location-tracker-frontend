/** @jsxImportSource @emotion/react */
import * as s from './style';
import { useMutation } from '@tanstack/react-query';
import { instance } from '../../apis/instance';
import { v4 as uuidv4 } from 'uuid';
import { useRecoilState } from 'recoil';
import { deviceIdAtom } from '../../atoms/deviceAtoms';
import { useState } from 'react';

function DefaultPage() {
    const [deviceId, setDeviceId] = useRecoilState(deviceIdAtom);

    const [deviceName, setDeviceName] = useState("");

    const registerDevice = useMutation({
        mutationFn: ({ latitude, longitude }) =>
            instance.post("/device", {
                deviceId,
                deviceName: deviceName.replace(/\s+/g, ""),
                latitude,
                longitude,
        }),
        onSuccess: () => {
            localStorage.setItem("deviceId", deviceId)
            alert("장치 등록 성공");
            window.location.reload("/");
        },
        onError: (error) => {
            alert(error?.response?.data?.message);
        },
    });

    const handleRegisterOnClick = () => {
        if(deviceName.trim() === "") {
            alert("장치 이름을 입력해주세요.")
            return
        }

        const id = uuidv4();
        setDeviceId(id);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                registerDevice.mutate({
                    deviceId: id,
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

    const handleDeviceNameOnChange = (e) => {
        setDeviceName(e.target.value)
    }

    return (
        <div css={s.layout}>
            <div css={s.container}>
                <h2>장치 등록</h2>
                <div css={s.inputBox}>
                    <input type="text" name="" value={deviceName} onChange={handleDeviceNameOnChange} placeholder="장치 이름을 입력 해주세요."/>
                </div>
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