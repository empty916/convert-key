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


export type ConvertObj<
  KM extends KeyMaps,
  D extends Partial<{ [k in keyof KM]: any }>,
  R = {
    [PK in keyof KM as KM[PK]]: D[Extract<PK, keyof D>];
  } & {
    [PK in keyof D as Exclude<PK, keyof KM>]: D[PK];
  },
  MK = {
    [K in keyof D]: K extends keyof KM ? KM[K]: K
  },
  OK = {
    -readonly [K in keyof MK as Extract<MK[K], string>]: K
  }
> = {
  [k in keyof OK]: R[Extract<k, keyof R>];
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
  MK = {
    [K in keyof D]: K extends keyof KM ? KM[K]: K
  },
  OK = {
    [K in keyof MK as Extract<MK[K], string>]: K
  },
  NNR = {
    [k in keyof OK]: DR[Extract<k, keyof DR>];
  }
> = O extends Array<any> ?  ConvertDataDeep<KM, Extract<D, Partial<{ [k in keyof KM]: any }>>>[] : {
  [K in keyof NNR]: NNR[K] extends Partial<{ [k in keyof KM]: any }> | Partial<{ [k in keyof KM]: any }>[]
    ? ConvertDataDeep<KM, NNR[K]>
    : NNR[K];
};

