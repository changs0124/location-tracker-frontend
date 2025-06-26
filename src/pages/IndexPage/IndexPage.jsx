import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { instance } from '../../apis/instance';
import { useRecoilValue } from 'recoil';
import { deviceIdAtom } from '../../atoms/deviceAtoms';
import Layout from '../../components/Layout/Layout';
import IndexMap from '../../components/map/IndexMap/IndexMap';
import SideBar from '../../components/bar/SideBar/SideBar';
import BottomBar from '../../components/bar/BottomBar/BottomBar';

function IndexPage() {
    const [position, setPosition] = useState([]);
    const [positions, setPositions] = useState([]);
    const [isTracking, setIsTracking] = useState(false);
    const [isShowCargoLoations, setIsShowCargoLocations] = useState(false);
    const [isShowProducts, setIsShowProducts] = useState(false);
    const [deliveryId, setDeliveryId] = useState(0);
    const [delivery, setDelivery] = useState({
        cargoId: 0,
        cargoName: "",
        productId: 0,
        productName: ""
    })

    const deviceId = useRecoilValue(deviceIdAtom)

    useEffect(() => {
        const savedDeliveryId = localStorage.getItem("deliveryId");
        const savedPositions = localStorage.getItem("positions");

        if (savedDeliveryId && savedPositions) {
            const parsedPositions = JSON.parse(savedPositions)

            if (Array.isArray(parsedPositions)) {
                setPositions(parsedPositions);
                setDeliveryId(savedDeliveryId);
                setIsTracking(true);
            }
        }
    }, [])

    useEffect(() => {
        if (!position.length) return;

        const interval = setInterval(() => {
            localStorage.setItem("positions", JSON.stringify(positions));
        }, 7000)

        return () => clearInterval(interval);
    }, [positions])

    useEffect(() => {
        const handleBeforeUnload = () => {
            if (!!positions.length && deliveryId) {
                localStorage.setItem("positions", JSON.stringify(positions));
                localStorage.setItem("deliveryId", deliveryId);
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [positions, deliveryId]);

    const queryClient = useQueryClient();
    const location = queryClient.getQueryData(["deviceLocation", deviceId])
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
        onError: (error) => {
            alert(error?.response?.data?.message);
        }
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
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 10000 }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, [deviceId, isTracking]);

    const startDelivery = useMutation({
        mutationFn: ({ productId, cargoId }) =>
            instance.post("/delivery", { deviceId, cargoId, productId }),
        onSuccess: (res) => {
            setDeliveryId(res?.data)
            localStorage.setItem("deliveryId", res?.data)
            alert("출발")
        },
        onError: (error) => {
            alert(error?.response?.data?.message);
        }
    })

    const finishDelivery = useMutation({
        mutationFn: () => {
            const positionsStr = JSON.stringify(positions);
            return instance.put("/delivery", { deliveryId, history: positionsStr })
        },
        onSuccess: () => {
            localStorage.removeItem("deliveryId");
            localStorage.removeItem("positions");
            alert("도착")
        },
        onError: (error) => {
            alert(error?.response?.data?.message);
        }
    })

    const handleStartTrackingOnClick = async () => {
        setIsShowCargoLocations(false)
        setIsShowProducts(false)
        await startDelivery.mutateAsync({ productId: delivery?.productId, cargoId: delivery?.cargoId })
        setIsTracking(true)
    }

    const handleStopTrackingOnClick = async () => {
        await finishDelivery.mutateAsync()
        setIsTracking(false)
        setPositions([])
    }

    return (
        <Layout>
            <SideBar
                delivery={delivery}
                setDelivery={setDelivery}
                isShowCargoLoations={isShowCargoLoations}
                setIsShowCargoLocations={setIsShowCargoLocations}
                cargoLocations={cargoLocations?.data}
                isShowProducts={isShowProducts}
                setIsShowProducts={setIsShowProducts}
                products={products?.data}
                positions={positions}
                setPositions={setPositions}
                isTracking={isTracking}
                setIsTracking={setIsTracking}
                onClick1={handleStartTrackingOnClick}
                onClick2={handleStopTrackingOnClick}
            />
            {
                location &&
                <IndexMap
                    location={location?.data}
                    position={position}
                    positions={positions}
                    cargoLocations={cargoLocations?.data}
                    deviceLocations={deviceLocations?.data?.data}
                />
            }
            <BottomBar
                delivery={delivery}
                setDelivery={setDelivery}
                isShowCargoLoations={isShowCargoLoations}
                setIsShowCargoLocations={setIsShowCargoLocations}
                cargoLocations={cargoLocations?.data}
                isShowProducts={isShowProducts}
                setIsShowProducts={setIsShowProducts}
                products={products?.data}
                positions={positions}
                setPositions={setPositions}
                isTracking={isTracking}
                setIsTracking={setIsTracking}
                onClick1={handleStartTrackingOnClick}
                onClick2={handleStopTrackingOnClick}
            />
        </Layout>
    );
}

export default IndexPage;