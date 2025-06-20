/** @jsxImportSource @emotion/react */
import * as s from './style';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { instance } from '../../apis/instance';
import { useRecoilValue } from 'recoil';
import { deviceIdAtom } from '../../atoms/deviceAtoms';
import Layout from '../../components/Layout/Layout';
import IndexSideBar from '../../components/bar/IndexSideBar/IndexSideBar';
import IndexMap from '../../components/map/IndexMap/IndexMap';
import Header from '../../components/Header/Header';
import IndexBottomBar from '../../components/bar/IndexBottomBar/IndexBottomBar';

function IndexPage() {
    const [position, setPosition] = useState([]);
    const [positions, setPositions] = useState([]);
    const [isTracking, setIsTracking] = useState(false);

    const deviceId = useRecoilValue(deviceIdAtom)

    const queryClient = useQueryClient();
    const location = queryClient.getQueryData(['deviceLocation', deviceId])
    const cargoLocations = queryClient.getQueryData(["cargoLocations"])
    const products = queryClient.getQueryData(["products"])

    const deviceLocations = useQuery({
        queryKey: ["deviceLocations"],
        queryFn: () => instance.get(`/locations/device/${deviceId}`),
        enabled: !!deviceId,
        refetchInterval: 5000,
        refetchOnWindowFocus: false,
        retry: 0
    })

    const updateLocation = useMutation({
        mutationFn: ({ latitude, longitude }) =>
            instance.put("/location", { deviceId, latitude, longitude }),
        onError: err => console.error('위치 업데이트 실패', err),
    });

    useEffect(() => {
        if (!deviceId || !navigator.geolocation) return;

        const watchId = navigator.geolocation.watchPosition(
            ({ coords }) => {
                const lat = coords.latitude;
                const lng = coords.longitude;

                setPosition([lat, lng])

                if (isTracking) {
                    setPositions(prev => [...prev, [lat, lng]]);
                }

                updateLocation.mutate({ latitude: lat, longitude: lng });
            },
            err => console.error('위치 수집 에러', err),
            { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, [deviceId, isTracking]);

    return (
        <Layout>
            <IndexSideBar
                deviceId={deviceId}
                cargoLocations={cargoLocations?.data}
                products={products?.data}
                positions={positions}
                setPositions={setPositions}
                isTracking={isTracking}
                setIsTracking={setIsTracking}
            />
            <div css={s.layout}>
                <Header />
                {location && (
                    <IndexMap
                        location={location?.data}
                        position={position}
                        positions={positions}
                        cargoLocations={cargoLocations?.data}
                        deviceLocations={deviceLocations?.data?.data}
                    />
                )}
                <IndexBottomBar
                    deviceId={deviceId}
                    cargoLocations={cargoLocations?.data}
                    products={products?.data}
                    positions={positions}
                    setPositions={setPositions}
                    isTracking={isTracking}
                    setIsTracking={setIsTracking}
                />
            </div>
        </Layout>
    );
}

export default IndexPage;