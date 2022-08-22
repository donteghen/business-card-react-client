import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { useEffect, useRef } from "react"

export default function Maper ({from_location, to_location, current_location}) {
    

    const popupref = useRef(null);

    return (
        <MapContainer center={[current_location?.lat, current_location?.log]} zoom={8} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[from_location?.lat, from_location?.log]}>
                <Popup >
                Source Location
                </Popup>
            </Marker>
            <Marker position={[current_location?.lat, current_location?.log]}>
                <Popup permanent>
                current Location
                </Popup>
            </Marker>  
            <Marker position={[to_location?.lat, to_location?.log]}>
                <Popup>
                Destination Location
                </Popup>
            </Marker>          
        </MapContainer>
    )
}