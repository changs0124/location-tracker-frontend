import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { instance } from '../../apis/instance';
import { useRecoilValue } from 'recoil';
import { deviceIdAtom } from '../../atoms/deviceAtoms';
import Layout from '../../components/Layout/Layout';
import IndexSideBar from '../../components/bar/IndexSideBar/IndexSideBar';
import BottomBar from '../../components/bar/BottomBar/BottomBar';
import IndexMap from '../../components/map/IndexMap/IndexMap';

function IndexPage() {
    const [position, setPosition] = useState([]);
    const [positions, setPositions] = useState([]);
    const [isTracking, setIsTracking] = useState(false);

    const deviceId = useRecoilValue(deviceIdAtom)

    const location = useQuery({
        queryKey: ['deviceLocation', deviceId],
        queryFn: () => instance.get(`/location/${deviceId}`),
        enabled: !!deviceId,
        refetchOnWindowFocus: false,
        retry: 0
    });
    
    const cargoLocations = useQuery({
        queryKey: ["cargoLocations"],
        queryFn: () => instance.get("/locations/cargo"),
        enabled: !!deviceId,
        refetchOnWindowFocus: false,
        retry: 0
    })

    const products = useQuery({
        queryKey: ["products"],
        queryFn: () => instance.get("/products"),
        enabled: !!deviceId,
        refetchOnWindowFocus: false,
        retry: 0
    })

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
                cargoLocations={cargoLocations?.data?.data}
                products={products?.data?.data}
                positions={positions}
                setPositions={setPositions}
                isTracking={isTracking}
                setIsTracking={setIsTracking}
            />
            {location && (
                <IndexMap
                    location={location?.data?.data}
                    position={position}
                    positions={positions}
                    cargoLocations={cargoLocations?.data?.data}
                    deviceLocations={deviceLocations?.data?.data}
                />
            )}
            <BottomBar
                deviceId={deviceId}
                cargoLocations={cargoLocations?.data?.data}
                products={products?.data?.data}
                positions={positions}
                setPositions={setPositions}
                isTracking={isTracking}
                setIsTracking={setIsTracking}
            />
        </Layout>
    );
}

export default IndexPage;