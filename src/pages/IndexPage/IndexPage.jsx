import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { instance } from '../../apis/instance';
import { useRecoilValue } from 'recoil';
import Layout from '../../components/Layout/Layout';
import IndexMap from '../../components/map/IndexMap/IndexMap';
import SideBar from '../../components/bar/SideBar/SideBar';
import BottomBar from '../../components/bar/BottomBar/BottomBar';
import { userCodeAtom } from '../../atoms/userAtoms';
import InfoBox from '../../components/InfoBox/InfoBox';

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
        productName: "",
        productCount: 1
    })

    const userCode = useRecoilValue(userCodeAtom);

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
        }, 5000)

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
    const user = queryClient.getQueryData(["user", userCode])
    const cargoLocations = queryClient.getQueryData(["cargoLocations"])
    const products = queryClient.getQueryData(["products"])

    const userLocations = useQuery({
        queryKey: ["userLocations"],
        queryFn: () => instance.get(`/user/locations/${userCode}`),
        enabled: !!userCode,
        refetchInterval: 5000,
        refetchOnWindowFocus: false,
        retry: 0
    })

    const updateLocation = useMutation({
        mutationFn: ({ latitude, longitude }) =>
            instance.put("/user/location", { userCode, latitude, longitude }),
        onError: (error) => {
            alert(error?.response?.data?.message);
        }
    });

    useEffect(() => {
        if (!userCode || !navigator.geolocation) return;

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
    }, [userCode, isTracking]);

    const startDelivery = useMutation({
        mutationFn: ({ productId, cargoId, productCount }) =>
            instance.post("/delivery", { userCode, cargoId, productId, productCount }),
        onSuccess: (res) => {
            setDeliveryId(res?.data)
            localStorage.setItem("deliveryId", res?.data)
            alert("출발")
            queryClient.invalidateQueries(["user", userCode])
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
            queryClient.invalidateQueries(["user", userCode])
        },
        onError: (error) => {
            alert(error?.response?.data?.message);
        }
    })

    const handleStartTrackingOnClick = async () => {
        setIsShowCargoLocations(false)
        setIsShowProducts(false)
        await startDelivery.mutateAsync({ productId: delivery?.productId, cargoId: delivery?.cargoId, productCount: delivery?.productCount })
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
                user={user?.data}
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
                user &&
                <IndexMap
                    user={user?.data}
                    position={position}
                    positions={positions}
                    cargoLocations={cargoLocations?.data}
                    userLocations={userLocations?.data?.data}
                />
            }
            {
                user &&
                <InfoBox user={user?.data} />
            }
            <BottomBar
                user={user?.data}
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