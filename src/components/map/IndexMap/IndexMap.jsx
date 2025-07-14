/** @jsxImportSource @emotion/react */
import * as s from './style';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';

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

const RecentLocation = ({ location }) => {
    const map = useMap();

    useEffect(() => {
        if (location) {
            map.setView(location);
        }
    }, [location, map]);

    return null;
};

function IndexMap({ user, position, positions, cargoLocations, userLocations }) {
    const defaultLocation = [user?.latitude, user?.longitude];
    const tempLocation = !!position.length ? position : defaultLocation;

    return (
        <div css={s.layout}>
            {
                user ?
                    <MapContainer
                        center={tempLocation}
                        zoom={17}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; OpenStreetMap contributors'
                        />
                        <RecentLocation
                            location={tempLocation}
                        />
                        {
                            (positions && positions.length > 1) &&
                            <Polyline
                                positions={positions}
                                pathOptions={{
                                    color: "green",
                                    weight: 4,
                                    dashArray: "10, 10"
                                }}
                            />
                        }
                        <Marker
                            icon={myIcon}
                            position={tempLocation}
                        />
                        {
                            cargoLocations?.map(cargo => (
                                <Marker
                                    icon={cargoIcon}
                                    key={cargo?.id}
                                    position={[cargo?.latitude, cargo?.longitude]}
                                >
                                    <Popup>
                                        <div css={s.popupBox}>
                                            <p>{cargo?.cargoName}</p>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))
                        }
                        {
                            userLocations?.map(user => (
                                <Marker
                                    key={user?.id}
                                    icon={user?.status === 1 ? runIcon : deviceIcon}
                                    position={[user?.latitude, user?.longitude]}
                                >
                                    <Popup>
                                        {
                                            <div css={s.popupBox}>
                                                <table css={s.tableLayout}>
                                                    <tbody>
                                                        <tr>
                                                            <th>이름</th>
                                                            <td>{user?.userName}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>장치</th>
                                                            <td>{user?.deviceNumber}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>최대 적재율</th>
                                                            <td>{Number(user?.deviceMaxVolume).toFixed(2)}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>목적지</th>
                                                            <td>{!!user?.status ? user?.cargoName : "현재 목적지 없음"}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>제품</th>
                                                            <td>{!!user?.status ? user?.productName : "현재 화물 없음"}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>수량</th>
                                                            <td>{!!user?.status ? user?.productCount : ""}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>적재율</th>
                                                            <td>{!!user?.status ? Number((user?.productVolume * user?.productCount / user?.deviceMaxVolume * 100)).toFixed(2) + "%" : "0.00%"}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        }
                                    </Popup>
                                </Marker>
                            ))
                        }
                    </MapContainer>
                    :
                    <MapContainer
                        center={[37.5662952, 126.9779451]}
                        zoom={17}
                        style={{ height: '100%', width: '100%' }}
                    />
            }
        </div >
    );
}

export default IndexMap;