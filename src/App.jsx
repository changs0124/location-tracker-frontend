import 'leaflet/dist/leaflet.css';
import { Global } from '@emotion/react';
import { reset } from './styles/theme';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { instance } from './apis/instance';
import { useRecoilState } from 'recoil';
import DefaultPage from './pages/DefaultPage/DefaultPage';
import IndexPage from './pages/IndexPage/IndexPage';
import HistoryPage from './pages/HistoryPage/HistoryPage';
import { userCodeAtom } from './atoms/userAtoms';

function App() {
    const [userCode, setUserCode] = useRecoilState(userCodeAtom);

    useEffect(() => {
        const storedCode = localStorage.getItem("userCode");
        if (storedCode) {
            setUserCode(storedCode);
        } else {
            console.warn('로컬스토리지에 userCode가 없습니다.');
        }
    }, []);

    const user = useQuery({
        queryKey: ["user", userCode],
        queryFn: () => instance.get(`/user/location/${userCode}`),
        enabled: !!userCode,
        refetchOnWindowFocus: false,
        retry: 0
    });

    const cargoLocations = useQuery({
        queryKey: ["cargoLocations"],
        queryFn: () => instance.get("/cargos"),
        enabled: user?.isSuccess && !!user?.data?.data,
        refetchOnWindowFocus: false,
        retry: 0
    })

    const products = useQuery({
        queryKey: ["products"],
        queryFn: () => instance.get("/products"),
        enabled: user?.isSuccess && !!user?.data?.data,
        refetchOnWindowFocus: false,
        retry: 0
    })

    return (
        <>
            <Global styles={reset} />
            <Routes>
                <Route path="/" element={user?.isSuccess && !!user?.data?.data ? <IndexPage /> : <DefaultPage />} />
                <Route path="/history" element={user?.isSuccess && !!user?.data?.data ? <HistoryPage /> : <DefaultPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
}

export default App;