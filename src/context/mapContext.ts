import { createContext } from "react";
import Map from "ol/Map";
import type VectorSource from "ol/source/Vector";

interface IMapContextType {
  map: Map | null;
  vectorSource: VectorSource | null;
}

export const MapContext = createContext<IMapContextType>({
  map: null,
  vectorSource: null,
});
