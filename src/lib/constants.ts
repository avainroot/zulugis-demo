export const API = import.meta.env.VITE_ZULU_SERVER;
export const HEADERS = {
  headers: {
    Authorization:
      "Basic " +
      btoa(
        `${import.meta.env.VITE_ZULU_USERNAME}:${
          import.meta.env.VITE_ZULU_PASSWORD
        }`
      ),
    "Content-Type": "application/xml",
  },
};

export const Layers = ["mo:vo", "mo:vp", "mo:thermo", "mo:defekt_demo"];

export const LayersName: Record<string, string> = {
  "mo:vo": "Водоотведение",
  "mo:vp": "Водопровод",
  "mo:thermo": "Тепловая сеть",
  "mo:defekt_demo": "Дефекты",
};
