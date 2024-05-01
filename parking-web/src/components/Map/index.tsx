import React, { useState, useEffect } from "react";
import { Map, InfoWindow, AdvancedMarker } from "@vis.gl/react-google-maps";

interface MapProps {
  setPosition: (lat: number, lng: number) => void;
  setAddress: (address: string) => void;
}

const GoogleMap: React.FC<MapProps> = ({ setPosition, setAddress }) => {
  const [marker, setMarker] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });
  const [pos, setPos] = useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPos({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoaded(true);
      },
      (error) => {
        console.error("Can not get location: " + error);
        setLoaded(true);
      },
    );
  }, []);

  if (!loaded) {
    return <div>Loading map ...</div>;
  }

  return (
    <Map
      mapId={import.meta.env.VITE_MAP_ID}
      defaultCenter={pos}
      defaultZoom={12}
      onClick={(e) => {
        const lat = e.detail.latLng.lat;
        const lng = e.detail.latLng.lng;
        console.log(lat.toPrecision(10));
        console.log(lng.toPrecision(10));
        setMarker({ lat, lng });
        setPosition(lat, lng);

        const geocoder = new window.google.maps.Geocoder();
        const request = {
          location: new window.google.maps.LatLng(lat, lng),
        };
        geocoder.geocode(request, (results, status) => {
          if (status === "OK") {
            const address = results[0].formatted_address;
            setAddress(address);
          } else {
            console.error("Geocoder failed: ", status);
          }
        });
      }}
    >
      <AdvancedMarker
        position={marker}
        onClick={() => setInfoWindowOpen(true)}
      />

      {infoWindowOpen && (
        <InfoWindow onCloseClick={() => setInfoWindowOpen(false)}>
          <div>
            Latitude: {marker.lat.toFixed(6)}
            <br />
            Longitude: {marker.lng.toFixed(6)}
            <br />
          </div>
        </InfoWindow>
      )}
    </Map>
  );
};

export default GoogleMap;
