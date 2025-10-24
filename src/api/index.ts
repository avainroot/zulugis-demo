import { API, HEADERS, Layers } from "@/lib/constants";
import { SelectElemByID, SelectElemByXY } from "@/lib/xmltpl";
import type { ISelectElemByID, ISelectElemByXY, TElement } from "@/types";
import { parseXML } from "@/utils";

export const getElementDetails = async (params: ISelectElemByID) => {
  try {
    const response = await fetch(API, {
      method: "POST",
      body: SelectElemByID(params),
      ...HEADERS,
    });

    const xmlText = await response.text();
    return parseXML(xmlText);
  } catch {
    throw new Error(`Ошибка получения данных`);
  }
};

export const searchElementsByLayers = async ({
  X,
  Y,
  Scale,
}: Omit<ISelectElemByXY, "Layer">): Promise<TElement[]> => {
  try {
    const searchResults = await Promise.all(
      Layers.map((Layer) =>
        fetch(API, {
          method: "POST",
          body: SelectElemByXY({ X, Y, Scale, Layer }),
          ...HEADERS,
        })
          .then((r) => r.text())
          .then((xml) => {
            const parsed = parseXML(xml);
            return {
              layer: Layer,
              element: parsed.zwsResponse.SelectElemByXY.Element || null,
            };
          })
      )
    );

    const foundElements = searchResults.filter((r) => !!r.element);

    if (foundElements.length === 0) return [];

    const detailedResults = await Promise.all(
      foundElements.map(({ layer: Layer, element: { ElemID } }) =>
        getElementDetails({ Layer, ElemID })
          .then((details) => ({
            ...details.zwsResponse.GetElemsByID.Element,
          }))
          .catch(() => null)
      )
    );

    return detailedResults;
  } catch (error) {
    console.error("Ошибка:", error);
    return [];
  }
};
