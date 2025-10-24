export interface ISelectMixedTile {
  X: number;
  Y: number;
  Z: number;
}

export interface ISelectElemByXY {
  X: number;
  Y: number;
  Scale?: number;
  Layer: string;
}

export interface ISelectElemByID {
  Layer: string;
  ElemID: string;
}

export type TElement = {
  ElemID: number;
  Geometry: {
    KML: {
      Placemark: {
        Point?: {
          coordinates: string;
        };
        LineString?: {
          coordinates: string;
        };
      };
    };
  };
  GraphType: string;
  Layer: string;
  Records: {
    Record: TRecord | TRecord[];
  };
};

export type TRecord = {
  Field: TField[];
};

export type TField = {
  Name: string;
  UserName: string;
  Value: string | number;
};
