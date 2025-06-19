/** @jsxImportSource @emotion/react */
import * as s from './style';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import blackIconUrl from 'leaflet-color-markers/img/marker-icon-black.png';
import blackIconRetina from 'leaflet-color-markers/img/marker-icon-2x-black.png';

import greenIconUrl from 'leaflet-color-markers/img/marker-icon-green.png';
import greenIcon2x from 'leaflet-color-markers/img/marker-icon-2x-green.png';

import grayIconUrl from 'leaflet-color-markers/img/marker-icon-grey.png';
import grayIcon2x from 'leaflet-color-markers/img/marker-icon-2x-grey.png';
import { useEffect } from 'react';

const myIcon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

const cargoIcon = L.icon({
    iconUrl: blackIconUrl,
    iconRetinaUrl: blackIconRetina,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

const deviceIcon = L.icon({
    iconUrl: grayIconUrl,
    iconRetinaUrl: grayIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

const runIcon = L.icon({
    iconUrl: greenIconUrl,
    iconRetinaUrl: greenIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

const RecenterMapToUser = ({ center }) => {
    const map = useMap();

    useEffect(() => {
        if (center) {
            map.setView(center);
        }
    }, [center, map]);

    return null;
};

function IndexMap({ location, position, positions, cargoLocations, deviceLocations }) {

    const defaultCenter = [location?.latitude, location?.longitude];
    const center = position.length > 0 ? position : defaultCenter;

    return (
        <div css={s.layout}>
            <div css={s.container}>
                {
                    (location && position) &&
                    <MapContainer
                        center={center}
                        zoom={17}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; OpenStreetMap contributors'
                        />

                        <RecenterMapToUser center={center} />

                        {positions && positions.length > 1 && (
                            <Polyline
                                positions={positions}
                                pathOptions={{
                                    color: "green",
                                    weight: 4,
                                    dashArray: "10, 10"
                                }}
                            />
                        )}

                        <Marker icon={myIcon} position={center}></Marker>

                        {
                            cargoLocations?.map(cargo => (
                                <Marker icon={cargoIcon} key={cargo.id} position={[cargo.latitude, cargo.longitude]}>
                                    <Popup>{cargo.cargoName}</Popup>
                                </Marker>
                            ))
                        }
                        {
                            deviceLocations?.map(device => (
                                <Marker key={device?.id} icon={device?.status === 1 ? runIcon : deviceIcon} position={[device?.latitude, device?.longitude]}>
                                    <Popup>
                                        {
                                            device?.status === 1
                                                ?
                                                <div css={s.popupBox}>
                                                    <p>목적지 : {device?.cargoName}</p>
                                                    <p>화물 : {device?.productName}</p>
                                                </div>
                                                :
                                                <p css={s.defaultBox}>운행 정보 없음</p>
                                        }
                                    </Popup>
                                </Marker>
                            ))
                        }
                    </MapContainer>
                }
            </div>
        </div>
    );
}

export default IndexMap;