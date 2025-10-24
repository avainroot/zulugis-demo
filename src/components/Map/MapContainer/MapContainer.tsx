import { MapConfig } from "@/config";
import { MapContext } from "@/context/mapContext";
import { Map } from "@components";
import OLMap from "ol/Map";
import { useEffect, useRef, useState } from "react";

const MapContainer = ({ children }: { children?: React.ReactNode }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<OLMap | null>(null);
  const { layers, vectorSource } = Map.Layers;

  useEffect(() => {
    if (!mapRef.current) return;

    const mapInstance = new OLMap({
      ...MapConfig,
      layers,
      target: mapRef.current,
    });

    setMap(mapInstance);

    return () => {
      if (mapInstance) {
        mapInstance.setTarget(undefined);
      }
    };
  }, [layers]);

  return (
    <div>
      <div ref={mapRef} key={"map"} className="h-screen" />
      <MapContext.Provider value={{ map, vectorSource }}>
        {children}
        <Map.Interaction />
      </MapContext.Provider>
    </div>
  );
};

export default MapContainer;
