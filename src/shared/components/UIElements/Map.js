import React, { useRef, useEffect } from "react";

import "./Map.css";

const Map = (props) => {
  const mapRef = useRef(); //pointer, referencja,  żeby było wiadomo, że mapka ma się renderować w danym divie, też może być używane w celu "przetrwania re-renderowania" komponentu, żeby nie stracić wartości

  const { center, zoom } = props;

  //OpenLayers Tutorial 1 | Map with a marker using JavaScript - https://www.youtube.com/watch?v=eusybY8qAac

  //https://docs.maptiler.com/openlayers/default-marker/

  useEffect(() => {
    const map = new window.ol.Map({
      target: mapRef.current.id,
      layers: [
        new window.ol.layer.Tile({
          source: new window.ol.source.OSM(),
        }),
      ],
      view: new window.ol.View({
        center: window.ol.proj.fromLonLat([center.lng, center.lat]),
        zoom: zoom,
      }),
    });
    const marker = new window.ol.layer.Vector({
      source: new window.ol.source.Vector({
        features: [
          new window.ol.Feature({
            geometry: new window.ol.geom.Point(
              window.ol.proj.fromLonLat([center.lng, center.lat])
            ),
          }),
        ],
      }),
      style: new window.ol.style.Style({
        image: new window.ol.style.Icon({
          src: "https://docs.maptiler.com/openlayers/default-marker/marker-icon.png",
        }),
      }),
    });

    map.addLayer(marker);
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
      id="map"
    ></div>
  );
};

export default Map;
