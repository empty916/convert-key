import { KeyMaps } from "./model";
import { ConvertDataDeep, getRevertKeyMaps, isObj, isObjArray } from "./utils";

export const convertDataDeep = <
  KM extends KeyMaps,
  D extends
    | Partial<{ [k in keyof KM]: any }>
    | Array<Partial<{ [k in keyof KM]: any }>>
>(
  keyMaps: KM,
  data: D
): ConvertDataDeep<KM, D> => {
  if (!isObj(data) && !isObjArray(data)) {
    return data;
    // throw new Error("convert-key createDeepConvertor: data must be an Object Or an Object Array!");
  }
  if (Array.isArray(data)) {
    // @ts-ignore
    return data.map((i: D[number]) => convertDataDeep(keyMaps, i));
  }
  return Object.keys(data).reduce((res, k) => {
    let d = data[k];
    if (isObj(d)) {
      d = convertDataDeep(keyMaps, d as D);
    }
    if (keyMaps[k]) {
      // @ts-ignore
      res[keyMaps[k]] = d;
    } else {
      // @ts-ignore
      res[k] = d;
    }
    return res;
  }, {} as ConvertDataDeep<KM, D>);
};

export const createDeepConvertor = <KM extends KeyMaps>(keyMaps: KM) => {
  if (!isObj(keyMaps)) {
    throw new Error("convert-key: keyMaps must be an Object!");
  }
  const convert = <
    D extends
      | Partial<{ [k in keyof KM]: any }>
      | Array<Partial<{ [k in keyof KM]: any }>>
  >(
    data: D
  ) => {
    return convertDataDeep(keyMaps, data);
  };
  const revertKeyMaps = getRevertKeyMaps(keyMaps);
  type RKM = typeof revertKeyMaps;

  const revert = <
    D extends
      | Partial<{ [k in keyof RKM]: any }>
      | Array<Partial<{ [k in keyof RKM]: any }>>
  >(
    data: D
  ) => {
    return convertDataDeep(revertKeyMaps, data);
  };
  return {
    convert,
    revert,
  }
};
