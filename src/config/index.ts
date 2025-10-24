import type { MapOptions } from "ol/Map";
import { fromLonLat } from "ol/proj";
import View from "ol/View";

export const MapConfig: MapOptions = {
  view: new View({
    center: fromLonLat([38.4379, 55.7963]),
    zoom: 18,
    constrainResolution: true,
    maxZoom: 20,
    minZoom: 15,
  }),
};
