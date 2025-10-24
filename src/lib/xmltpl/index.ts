import type {
  ISelectElemByID,
  ISelectElemByXY,
  ISelectMixedTile,
} from "@/types";
import { XMLBuilder } from "fast-xml-parser";
import { Layers } from "@/lib/constants";

const builder = new XMLBuilder({
  format: true,
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
});

const zulu = (command: string, content: Record<string, unknown>) =>
  builder.build({
    "zulu-server": {
      "@_service": "zws",
      "@_version": "1.0.0",
      Command: { "@_lang": "ru", [command]: content },
    },
  });

export const SelectMixedTile = (params: ISelectMixedTile) =>
  zulu("GetLayersTile", {
    ...params,
    Layer: Layers.map((Name) => ({ Name, ShowDirection: "no" })),
  });

export const SelectElemByXY = (params: ISelectElemByXY) =>
  zulu("SelectElemByXY", {
    ...params,
    CRS: "EPSG:3857",
    Geometry: "No",
    Attr: "No",
    ModeList: "No",
  });

export const SelectElemByID = (params: ISelectElemByID) =>
  zulu("GetElemsByID", {
    ...params,
    Geometry: "Yes",
    Attr: "Yes",
  });
