import { API, HEADERS } from "@/lib/constants";
import { SelectMixedTile } from "@/lib/xmltpl";
import { resolveImage } from "@/utils";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { ImageTile, OSM } from "ol/source";
import VectorSource from "ol/source/Vector";

const vectorSource = new VectorSource();
const vectorLayer = new VectorLayer({ source: vectorSource });

const MapLayers = {
  layers: [
    new TileLayer({
      source: new OSM({ attributions: "" }),
    }),
    new TileLayer({
      preload: 0,
      source: new ImageTile({
        crossOrigin: "anonymous",
        loader: (z, x, y) => {
          return new Promise((resolve, reject) => {
            fetch(API, {
              method: "POST",
              body: SelectMixedTile({ Z: z, X: x, Y: y }),
              ...HEADERS,
            })
              .then((response) => {
                if (!response.ok) throw new Error("Auth failed");
                return response.blob();
              })
              .then(resolveImage)
              .then(resolve)
              .catch(reject);
          });
        },
      }),
    }),
    vectorLayer,
  ],
  vectorSource,
};

export default MapLayers;
