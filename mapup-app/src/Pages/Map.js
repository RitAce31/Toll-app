import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import img from "../images/toll-marker.svg";
import endpoint from "../images/location.svg";
import { decode } from "@googlemaps/polyline-codec";

var tollIcon = L.icon({
  iconUrl: img,
  iconSize: [40, 40], // size of the icon
});
var endPointIcon = L.icon({
  iconUrl: endpoint,
  iconSize: [40, 40],
});
export default function Map({ from, to, path, data }) {
  const mapRef = useRef();
  const defPos = [51.505, -0.09];
  const [line, setline] = useState([]);
  const [tolls, setTolls] = useState([]);
  useEffect(() => {
    if (from) {
      if (Object.keys(from) != 0 && from.lat != 0) {
        mapRef.current.flyTo([from.lat, from.lng], 13);
      }
    }
  }, [from]);

  useEffect(() => {
    if (to) {
      if (Object.keys(to) != 0 && to.lat != 0) {
        mapRef.current.flyTo([to.lat, to.lng], 13);
      }
    }
  }, [to]);

  useEffect(() => {
    if (data) {
      console.log(data);
      if (Object.keys(data).length != 0) {
        if (data.routes) {
          let arr = [];
          let tollArr = [];
          data.routes.forEach((o) => {
            arr.push(decode(o.polyline));
            if (o.summary.hasTolls === true) {
              o.tolls.forEach((item, index) => {
                if (item.type === "ticketSystem1") {
                  console.log("item.start", item.start);
                  tollArr.push({
                    lat: item.start.lat,
                    lng: item.start.lng,
                    name: item.start.name,
                    cost: item.tagCost,
                  });
                  tollArr.push({
                    lat: item.end.lat,
                    lng: item.end.lng,
                    name: item.end.name,
                    cost: item.tagCost,
                  });
                } else if (item.type == "barrier") {
                  tollArr.push({
                    lat: item.lat,
                    lng: item.lng,
                    name: item.name,
                    cost: item.tagCost,
                  });
                }
              });
              setTolls(tollArr);
            }
          });
          setline(arr);
        }
      }
    }
  }, [data]);

  return (
    <MapContainer
      style={{ zIndex: 5 }}
      ref={mapRef}
      center={Object.keys(from) == 0 ? defPos : [from.lat, from.lng]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {line.map((item, index) => {
        return <Polyline positions={item} key={index} />;
      })}
      {Object.keys(from) != 0 && from.lng != 0 ? (
        <Marker position={[from.lat, from.lng]} icon={endPointIcon}>
          <Popup>{from.name}</Popup>
        </Marker>
      ) : null}
      {Object.keys(to) != 0 && to.lng != 0 ? (
        <Marker position={[to.lat, to.lng]} icon={endPointIcon}>
          <Popup>{from.name}</Popup>
        </Marker>
      ) : null}
      {tolls.map((item, index) => {
        const pos = [item.lat, item.lng];
        return (
          <Marker position={pos} icon={tollIcon}>
            <Popup>
              <div>{item.name}</div>
              <div>Price : {item.cost} $</div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
