import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { Directions } from "./directions";
import { useApi } from "../helpers/api";

const iconMap = {
  flood: "https://cdn-icons-png.flaticon.com/512/414/414927.png",         // bright water droplet
  fire: "https://cdn-icons-png.flaticon.com/512/889/889311.png",          // vivid flame icon :contentReference[oaicite:1]{index=1}
  protest: "https://cdn-icons-png.flaticon.com/512/3540/3540930.png",     // bright megaphone
  accident: "https://cdn-icons-png.flaticon.com/512/684/684908.png",      // bold accident icon
  maintenance: "https://cdn-icons-png.flaticon.com/512/3064/3064428.png", // bright wrench
  concert: "https://cdn-icons-png.flaticon.com/512/888/888879.png",       // bright music note
};

// 12.926199038743462 77.57069938158335
export const Maps = () => {
  const { data, callApi } = useApi();
 const [events, setEvents] = useState([
  {
    type: "flood",
    description: "Heavy flooding reported near Silk Board Junction.",
    severity: "high",
    status: "active",
    image: "https://example.com/flood.jpg",
    location: "Bangalore",
    coordinates: { lat: 12.9172, lng: 77.6232 },
  },
  {
    type: "fire",
    description: "Fire near Koramangala 5th Block. Emergency services on site.",
    severity: "high",
    status: "active",
    image: "https://example.com/fire.jpg",
    location: "Bangalore",
    coordinates: { lat: 12.9352, lng: 77.6142 },
  },
  {
    type: "protest",
    description: "Public protest near Town Hall. Expect diversions.",
    severity: "medium",
    status: "ongoing",
    image: "https://example.com/protest.jpg",
    location: "Bangalore",
    coordinates: { lat: 12.9611, lng: 77.5836 },
  },
  {
    type: "accident",
    description: "Vehicle collision near MG Road. Traffic is heavy.",
    severity: "medium",
    status: "active",
    image: "https://example.com/accident.jpg",
    location: "Bangalore",
    coordinates: { lat: 12.9740, lng: 77.6122 },
  },
  {
    type: "maintenance",
    description: "Ongoing road repair work at HSR Layout.",
    severity: "low",
    status: "in-progress",
    image: "https://example.com/maintenance.jpg",
    location: "Bangalore",
    coordinates: { lat: 12.9121, lng: 77.6446 },
  },
  {
    type: "concert",
    description: "Live music concert at Indiranagar Club.",
    severity: "low",
    status: "scheduled",
    image: "https://example.com/concert.jpg",
    location: "Bangalore",
    coordinates: { lat: 12.9719, lng: 77.6412 },
  },
]);

  const getSuggestions = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      console.log("User location:", lat, lng);
      callApi({
        url: `data/agentic_predictive_layer?lat=${lat}&lng=${lng}&radius_km=100&user_id=alice@example.com`,
      });
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log("User location:", lat, lng);
        callApi({
          url: `data/get_relevant_incidents?lat=${lat}&lng=${lng}&radius_km=100&user_id=alice@example.com`,
        });
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div
        style={{
          width: "50vh",
          height: "50vh",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Map
          style={{ width: "100%", height: "100%" }}
          defaultCenter={{ lat: 12.92619, lng: 77.57069 }}
          defaultZoom={3}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          onClick={(e) => {
            const lat = e.detail.latLng.lat;
            const lng = e.detail.latLng.lng;
            console.log("User clicked at:", lat, lng);
            // Add to state if you want to display it
          }}
          mapId={"4abad0676e69254277cf9136"}
        >
          {events.map((event, index) => (
            <AdvancedMarker key={index} position={event.coordinates}>
              <div style={{ color: "black", fontWeight: "bold" }}>
                <img
                  src={iconMap[event.type]}
                  alt={event.type}
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    border: "2px solid black",
                    background: "white",
                  }}
                />
              </div>
            </AdvancedMarker>
          ))}
          {/* <Directions /> */}
        </Map>
      </div>
    </APIProvider>
  );
};
