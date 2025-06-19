import 'leaflet/dist/leaflet.css';
import { Global } from '@emotion/react';
import { reset } from './styles/theme';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { instance } from './apis/instance';
import { useRecoilState } from 'recoil';
import { deviceIdAtom } from './atoms/deviceAtoms';
import DefaultPage from './pages/DefaultPage/DefaultPage';
import IndexPage from './pages/IndexPage/IndexPage';
import HistoryPage from './pages/HistoryPage/HistoryPage';


function App() {
    const [deviceId, setDeviceId] = useRecoilState(deviceIdAtom);

    useEffect(() => {
        const storedId = localStorage.getItem('deviceId');
        if (storedId) {
            setDeviceId(storedId);
        } else {
            console.warn('로컬스토리지에 deviceId가 없습니다.');
        }
    }, []);

    const auth = useQuery({
        queryKey: ['getDeviceId'],
        queryFn: () => instance.get(`/device/${deviceId}`),
        enabled: !!deviceId,
        refetchOnWindowFocus: false,
        retry: 0
    });

    return (
        <>
            <Global styles={reset} />
            <Routes>
                <Route path="/" element={auth?.data?.data > 0 ? <IndexPage /> : <DefaultPage />} />
                <Route path="/history" element={auth?.data?.data > 0 ? <HistoryPage /> : <DefaultPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
}

export default App;