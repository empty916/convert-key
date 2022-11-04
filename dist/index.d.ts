/**
 * @example
 * import createConvertUtil from 'convert-key';
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
 * const {convert, revert} = createConvertUtil(keyMaps);
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
declare const createConvertUtil: <KM extends {
    readonly [k: string]: string;
}>(keyMaps: KM) => {
    convert: <DK extends keyof KM, D extends Partial<{ [k in DK]: any; }>>(data: D) => { [k_2 in { -readonly [PK in keyof KM as Extract<KM[PK], string>]: D[Extract<PK, keyof D>]; } & { [PK_1 in keyof D as Exclude<PK_1, keyof KM>]: D[PK_1]; } extends Record<infer k_1 extends string | number | symbol, any> ? k_1 : never as ({ -readonly [PK in keyof KM as Extract<KM[PK], string>]: D[Extract<PK, keyof D>]; } & { [PK_1 in keyof D as Exclude<PK_1, keyof KM>]: D[PK_1]; })[k_2] extends never ? never : k_2]: ({ -readonly [PK in keyof KM as Extract<KM[PK], string>]: D[Extract<PK, keyof D>]; } & { [PK_1 in keyof D as Exclude<PK_1, keyof KM>]: D[PK_1]; })[k_2]; };
    revert: <OK extends keyof KM, DK_1 extends KM[OK], D_1 extends Partial<{ [k_3 in DK_1]: any; }>, RKM = { [K in OK as KM[K]]: K; }>(data: D_1) => { [k_5 in { [K_1 in DK_1 as Extract<RKM[Extract<K_1, keyof RKM>], string>]: D_1[Extract<K_1, keyof D_1>]; } & { [PK_2 in keyof D_1 as Exclude<PK_2, keyof RKM>]: D_1[PK_2]; } extends Record<infer k_4 extends string | number | symbol, any> ? k_4 : never as ({ [K_1 in DK_1 as Extract<RKM[Extract<K_1, keyof RKM>], string>]: D_1[Extract<K_1, keyof D_1>]; } & { [PK_2 in keyof D_1 as Exclude<PK_2, keyof RKM>]: D_1[PK_2]; })[k_5] extends never ? never : k_5]: ({ [K_1 in DK_1 as Extract<RKM[Extract<K_1, keyof RKM>], string>]: D_1[Extract<K_1, keyof D_1>]; } & { [PK_2 in keyof D_1 as Exclude<PK_2, keyof RKM>]: D_1[PK_2]; })[k_5]; };
};
export default createConvertUtil;
