/** @jsxImportSource @emotion/react */
import * as s from './style';
import { useMutation } from '@tanstack/react-query';
import { instance } from '../../apis/instance';
import { v4 as uuidv4 } from 'uuid';
import { useRecoilState } from 'recoil';
import { deviceIdAtom } from '../../atoms/deviceAtoms';

function DefaultPage() {
    const [deviceId, setDeviceId] = useRecoilState(deviceIdAtom);

    const registerDevice = useMutation({
        mutationFn: ({ latitude, longitude }) => instance.post("/device", { deviceId, latitude, longitude, }),
        onSuccess: () => {
            console.log("장치 등록 성공");
            localStorage.setItem("deviceId", deviceId)
            alert("장치 등록 성공");
            window.location.reload("/");
        },
        onError: (error) => {
            console.error("등록 실패:", error);
            alert("장치 등록 실패");
        },
    });

    const handleRegisterOnClick = () => {
        const id = uuidv4();
        setDeviceId(id);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude, accuracy } = position.coords;
                console.log(`lat=${latitude}, lng=${longitude}, accuracy=${accuracy}m`);
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
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    return (
        <div css={s.layout}>
            <div css={s.container}>
                <h2>장치 등록</h2>
                <p>현재 장치를 등록하려면 확인을 눌러주세요.</p>
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