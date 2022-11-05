import { KeyMaps } from "./model";

/**
 *
 * @param {*} obj
 */
export function isObj(obj: any): obj is Object {
  return typeof obj === "object" && obj !== null;
}

export function isObjArray(data: unknown): data is { [s: string]: any }[] {
  if (!Array.isArray(data)) {
    return false;
  }
  if (data.every(isObj)) {
    return true;
  }
  return false;
}

export function getRevertKeyMaps<KM extends KeyMaps>(keyMaps: KM) {
  return Object.keys(keyMaps).reduce(
    (res, k) => {
      // @ts-ignore
      res[keyMaps[k]] = k;
      return res;
    },
    {} as {
      [k in keyof KM as KM[k]]: k extends string ? k : never;
    }
  );
}

/**
 * Copy from d.ts file where is builded from createObjectConvertor.ts
 */
export type ConvertObj<
  KM extends KeyMaps,
  D extends Partial<{ [k in keyof KM]: any }>,
  R = {
    [PK in keyof KM as KM[PK]]: D[Extract<PK, keyof D>];
  } & {
    [PK in keyof D as Exclude<PK, keyof KM>]: D[PK];
  }
> = {
  [k in keyof R as R[k] extends never ? never : k]: R[k];
};


export type ConvertDataDeep<
  KM extends KeyMaps,
  O extends Partial<{ [k in keyof KM]: any }> | Partial<{ [k in keyof KM]: any }>[],
  D = O extends Array<infer I> ? I : O,
  DR = {
    [PK in keyof KM as KM[PK]]: D[Extract<PK, keyof D>];
  } & {
    [PK in keyof D as Exclude<PK, keyof KM>]: D[PK];
  },
  NNR = {
    [k in keyof DR as DR[k] extends never ? never : k]: DR[k];
  }
> = O extends Array<any> ?  ConvertDataDeep<KM, Extract<D, Partial<{ [k in keyof KM]: any }>>>[] : {
  -readonly [K in keyof NNR]: NNR[K] extends Partial<{ [k in keyof KM]: any }> | Partial<{ [k in keyof KM]: any }>[]
    ? ConvertDataDeep<KM, NNR[K]>
    : NNR[K];
};

