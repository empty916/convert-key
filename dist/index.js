/**
 *
 * @param {*} obj
 */
function isObj(obj) {
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
var createConvertUtil = function (keyMaps) {
    if (!isObj(keyMaps)) {
        throw new Error('convert-key: keyMaps must be an Object!');
    }
    var convert = function (data) {
        if (!isObj(data)) {
            throw new Error('convert-key: data must be an Object!');
        }
        var Res = Object.keys(data).reduce(function (res, k) {
            if (keyMaps[k]) {
                // @ts-ignore
                res[keyMaps[k]] = data[k];
            }
            else {
                // @ts-ignore
                res[k] = data[k];
            }
            return res;
        }, {});
        return Res;
    };
    var revertKeyMaps = Object.keys(keyMaps).reduce(function (res, k) {
        // @ts-ignore
        res[keyMaps[k]] = k;
        return res;
    }, {});
    var revert = function (data) {
        if (!isObj(data)) {
            throw new Error('convert-key: data must be an Object!');
        }
        var Res = Object.keys(data).reduce(function (res, k) {
            // @ts-ignore
            if (revertKeyMaps[k]) {
                // @ts-ignore
                res[revertKeyMaps[k]] = data[k];
            }
            else {
                // @ts-ignore
                res[k] = data[k];
            }
            return res;
        }, {});
        return Res;
    };
    return {
        convert: convert,
        revert: revert
    };
};
export default createConvertUtil;
