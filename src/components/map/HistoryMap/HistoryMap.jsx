/** @jsxImportSource @emotion/react */
import * as s from './style';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet';

const RecentLocation = ({ location }) => {
    const map = useMap();

    useEffect(() => {
        if (location && location.length === 2) {
            map.setView(location);
        }
    }, [location, map]);

    return null;
};

function HistoryMap({ user, index, history }) {
    const defaultLocation = [user?.latitude, user?.longitude];

    const [tempHistory, setTempHistory] = useState([]);

    useEffect(() => {
        if (!!history.length) {
            const temp = history?.map(h => JSON.parse(h.history))
            setTempHistory(temp)
        }
    }, [history])

    return (
        <div css={s.layout}>
            {
                user ?
                    <MapContainer
                        center={defaultLocation}
                        zoom={17}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; OpenStreetMap contributors'
                        />
                        <RecentLocation
                            location={!!tempHistory.length ? tempHistory[index][0] : defaultLocation}
                        />
                        {
                            !!tempHistory.length &&
                            <Polyline
                                positions={
                                    tempHistory[index]
                                }
                                pathOptions={{
                                    color: "green",
                                    weight: 4,
                                    dashArray: "10, 10"
                                }}
                            />
                        }
                    </MapContainer>
                    :
                    <MapContainer
                        center={[37.5662952, 126.9779451]}
                        zoom={17}
                        style={{ height: '100%', width: '100%' }}
                    />
            }
        </div>
    );
}

export default HistoryMap;