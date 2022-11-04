
/**
 *
 * @param {*} obj
 */
function isObj(obj: any): obj is Object {
	return typeof obj === 'object' && obj !== null;
}

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
const createConvertUtil = <KM extends {readonly [k: string]: string}>(keyMaps: KM) => {
	if (!isObj(keyMaps)) {
		throw new Error('convert-key: keyMaps must be an Object!');
	}
    const convert = <
        DK extends keyof KM,
        D extends Partial<{[k in DK]: any}>
    >(data: D) => {
		if (!isObj(data)) {
			throw new Error('convert-key: data must be an Object!');
		}
        const Res = Object.keys(data).reduce((res, k) => {
            if (keyMaps[k]) {
                // @ts-ignore
                res[keyMaps[k]] = data[k]
            } else {
                // @ts-ignore
                res[k] = data[k]
            }
            return res;
        }, {} as {
            -readonly [PK in keyof KM as Extract<KM[PK], string>]: D[Extract<PK, keyof D>];
        } & {
            [PK in keyof D as Exclude<PK, keyof KM>]: D[PK];
        });
        
        type TR = typeof Res;
        type CK = TR extends Record<infer k, any> ? k : never;

        return Res as {
            [k in CK as TR[k] extends never ? never : k]: TR[k]
        };
    }

    const revertKeyMaps = Object.keys(keyMaps).reduce((res, k) => {
        // @ts-ignore
        res[keyMaps[k]] = k;
        return res;
    }, {} as {
        [k in keyof KM as KM[k]]: k;
    })
    const revert = <
        OK extends keyof KM,
        DK extends KM[OK],
        D extends Partial<{[k in DK]: any}>,
        RKM = {
            [K in OK as KM[K]]: K
        }
    >(data: D) => {
		if (!isObj(data)) {
			throw new Error('convert-key: data must be an Object!');
		}
        const Res = Object.keys(data).reduce((res, k) => {
            // @ts-ignore
            if (revertKeyMaps[k]) {
                // @ts-ignore
                res[revertKeyMaps[k] as any] = data[k]
            } else {
                // @ts-ignore
                res[k] = data[k]
            }
            return res;
        }, {} as {
            [K in DK as Extract<RKM[Extract<K, keyof RKM>], string>]: D[Extract<K, keyof D>];
        } & {
            [PK in keyof D as Exclude<PK, keyof RKM>]: D[PK];
        });

        type TR = typeof Res;
        type CK = TR extends Record<infer k, any> ? k : never;

        return Res as {
            [k in CK as TR[k] extends never ? never : k]: TR[k]
        };
    }
    return {
        convert,
        revert,
    }
};

export default createConvertUtil;