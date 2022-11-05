import { KeyMaps } from "./model";
import { ConvertDataDeep, getRevertKeyMaps, isObj, isObjArray } from "./utils";

export const convertObj = <
  KM extends KeyMaps,
  D extends Partial<{ [k in keyof KM]: any }>
>(
  keyMaps: KM,
  data: D
) => {
  if (!isObj(data)) {
    throw new Error("convert-key: data must be an Object!");
  }
  const Res = Object.keys(data).reduce(
    (res, k) => {
      if (keyMaps[k]) {
        // @ts-ignore
        res[keyMaps[k]] = data[k];
      } else {
        // @ts-ignore
        res[k] = data[k];
      }
      return res;
    },
    {} as {
      -readonly [PK in keyof KM as KM[PK]]: D[Extract<PK, keyof D>];
    } & {
      [PK in keyof D as Exclude<PK, keyof KM>]: D[PK];
    }
  );

  type TR = typeof Res;
  type CK = keyof typeof Res;
  return Res as {
    [k in CK as TR[k] extends never ? never : k]: TR[k];
  };
};

/**
 * @example
 * import { createObjectConvertor } from 'convert-key';
 *
 * const keyMaps = {
 * 	a: 'A1',
 * 	b: 'B1',
 * 	f: 'F1'
 * } as const;
 *
 * const data = {
 * 	a: 1,
 * 	b: {
 * 	    b1: 1,
 * 	    b2: {},
 * 	    b3: '1'
 * 	},
 * 	c: null,
 * 	d: ''
 * }
 * const {convert, revert} = createObjectConvertor(keyMaps);
 * const convertData = convert(data);
 *
 * // convertData is
 * {
 *     A1: number;
 *     B1: {
 *         b1: number;
 *         b2: {};
 *         b3: string;
 *     };
 *     c: null;
 *     d: string;
 * }
 *
 * // originalData is equal to data
 * const originalData = revert(convertData);
 * @param keyMaps key maps
 * @returns
 */
export const createObjectConvertor = <KM extends KeyMaps>(keyMaps: KM) => {
  if (!isObj(keyMaps)) {
    throw new Error("convert-key: keyMaps must be an Object!");
  }
  const convert = <D extends Partial<{ [k in keyof KM]: any }>>(data: D) => {
    return convertObj(keyMaps, data);
  };

  const revertKeyMaps = getRevertKeyMaps(keyMaps);

  type RKM = typeof revertKeyMaps;

  const revert = <D extends Partial<{ [k in keyof RKM]: any }>>(data: D) => {
    if (!isObj(data)) {
      throw new Error("convert-key: data must be an Object!");
    }
    return convertObj(revertKeyMaps, data);
  };
  return {
    convert,
    revert,
  };
};
