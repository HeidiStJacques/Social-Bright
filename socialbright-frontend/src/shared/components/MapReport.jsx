import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';

// Town-to-manager assignments
export const caseManagerTowns = {
  Manchester: 'Manager A',
  Concord: 'Manager B',
  Nashua: 'Manager A',
  Derry: 'Manager C',
};

// Client data with location and assignments
export const clients = [
  {
    name: 'Jane Doe',
    city: 'Manchester',
    position: [43.005, -71.51],
    assignedTo: 'Manager A',
  },
  {
    name: 'John Smith',
    city: 'Concord',
    position: [43.2, -71.9],
    assignedTo: 'Manager A',
  },
  {
    name: 'Eva Li',
    city: 'Nashua',
    position: [42.765, -71.467],
    assignedTo: 'Manager A',
  },
  {
    name: 'Tom Allen',
    city: 'Derry',
    position: [42.8806, -71.3214],
    assignedTo: 'Manager B',
  },
];

// Default and alert marker icons
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const redIcon = new L.Icon({
  iconUrl: 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=•|ff0000',
  iconSize: [30, 45],
  iconAnchor: [15, 45],
});

export default function MapReport() {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-semibold mb-4 text-[#007B94]">Case Assignment Map</h2>
      <div className="rounded-xl overflow-hidden shadow border border-gray-300">
        <MapContainer
          center={[43.7, -71.5]}
          zoom={8.5}
          scrollWheelZoom={true}
          maxBounds={[[42.5, -73.5], [45.5, -69]]}
          maxBoundsViscosity={1.0}
          style={{ height: '500px', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Manager zones as soft blue circles */}
          {Object.entries(caseManagerTowns).map(([city, manager], index) => {
            const match = clients.find((c) => c.city === city);
            return match ? (
              <Circle
                key={index}
                center={match.position}
                radius={10000}
                pathOptions={{ color: '#007B94', fillOpacity: 0.15 }}
              />
            ) : null;
          })}

          {/* Client location markers */}
          {clients.map((client, i) => {
            const expectedManager = caseManagerTowns[client.city];
            const isCorrect = client.assignedTo === expectedManager;

            return (
              <Marker
                key={i}
                position={client.position}
                icon={isCorrect ? defaultIcon : redIcon}
              >
                <Popup>
                  <div className="text-sm text-gray-800">
                    <strong className="block text-base mb-1">{client.name}</strong>
                    City: {client.city} <br />
                    Assigned To: {client.assignedTo} <br />
                    Expected: {expectedManager} <br />
                    {isCorrect ? (
                      <span className="text-green-600 font-semibold">✅ Correct</span>
                    ) : (
                      <span className="text-red-600 font-semibold">🚨 Mismatch</span>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </section>
  );
}

// Clients with assignment mismatches
export const geographicMismatches = clients.filter(
  (client) => client.assignedTo !== caseManagerTowns[client.city]
);
