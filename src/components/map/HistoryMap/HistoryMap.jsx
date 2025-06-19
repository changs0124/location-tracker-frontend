/** @jsxImportSource @emotion/react */
import * as s from './style';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';

function HistoryMap({ location, index, history }) {

    if (location?.isLoading) {
        return <></>;
    }
    if (location?.isError || !location?.isSuccess || !location?.data?.data) {
        return <></>;
    }

    const defaultCenter = [location?.data?.data?.latitude, location?.data?.data?.longitude];

    return (
        <div css={s.layout}>
            <div css={s.container}>
                <MapContainer
                    center={defaultCenter}
                    zoom={17}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; OpenStreetMap contributors'
                    />
                    {history.length > 0 && (
                        <Polyline
                            positions={
                                JSON.parse(history[index]) !== null ? JSON.parse(history[index]) : defaultCenter
                            }
                            pathOptions={{
                                color: "green",
                                weight: 4,
                                dashArray: "10, 10"
                            }}
                        />
                    )}
                </MapContainer>
            </div>
        </div>
    );
}

export default HistoryMap;