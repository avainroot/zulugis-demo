import { useMap } from "@/hooks/useMap";
import type { TElement } from "@/types";
import { parseCoords } from "@/utils";
import { Feature } from "ol";
import { LineString, Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { Circle, Fill, Stroke, Style } from "ol/style";
import { useMemo } from "react";

export const useVectorLayer = () => {
  const { vectorSource } = useMap();

  const clearVectorLayer = () => vectorSource?.clear();

  const styles = useMemo(
    () => ({
      line: new Style({
        stroke: new Stroke({ color: "red", width: 4 }),
      }),
      point: new Style({
        image: new Circle({
          radius: 10,
          fill: new Fill({ color: "red" }),
          stroke: new Stroke({ color: "white", width: 2 }),
        }),
      }),
    }),
    []
  );

  const drawPoint = (coordinates?: string) => {
    if (!coordinates) return;

    const [lon, lat] = coordinates.split(",").map(Number);
    const coordinate = fromLonLat([lon, lat]);

    const point = new Feature({
      geometry: new Point(coordinate),
    });

    point.setStyle(styles.point);
    vectorSource?.addFeature(point);
  };

  const drawLine = (coordinates?: string) => {
    if (!coordinates) return;

    const line = new Feature({
      geometry: new LineString(parseCoords(coordinates)),
    });

    line.setStyle(styles.line);
    vectorSource?.addFeature(line);
  };

  const renderObjects = (elements: TElement[]) => {
    elements.map(({ GraphType, ...rest }) => {
      switch (GraphType) {
        case "Point":
          drawPoint(rest.Geometry.KML.Placemark.Point?.coordinates);
          break;
        case "Line":
          drawLine(rest.Geometry.KML.Placemark.LineString?.coordinates);
          break;
      }
    });
  };

  return {
    clearVectorLayer,
    renderObjects,
  };
};
