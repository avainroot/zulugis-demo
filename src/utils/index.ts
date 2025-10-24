import { XMLParser } from "fast-xml-parser";
import { fromLonLat } from "ol/proj";

export const resolveImage = (blob: Blob): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(blob);

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };

    image.onerror = (error) => {
      URL.revokeObjectURL(objectUrl);
      reject(error);
    };

    image.src = objectUrl;
  });
};

export const parseXML = (data: string | Uint8Array) => {
  const parser = new XMLParser();
  return parser.parse(data);
};

export const parseCoords = (coordString: string) => {
  return coordString
    .trim()
    .split("\n")
    .map((coordPair: string) => {
      const [lon, lat] = coordPair.split(",").map(Number);
      return fromLonLat([lon, lat]);
    });
};
