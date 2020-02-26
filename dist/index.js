/**
 *
 * @param {*} obj
 */
function isObj(obj) {
    return typeof obj === 'object' && obj !== null;
}
function _reverseKey(convertKeyMaps) {
    if (!isObj(convertKeyMaps)) {
        throw new Error('convertKeyMaps必须是对象！');
    }
    return Object.keys(convertKeyMaps).reduce((res, oldKey) => {
        const newKey = convertKeyMaps[oldKey];
        res[newKey] = oldKey;
        return res;
    }, {});
}
function _convertKeyOfObj(convertKeyMaps, obj) {
    if (!isObj(convertKeyMaps)) {
        throw new Error('convertKeyMaps必须是对象！');
    }
    if (!isObj(obj)) {
        throw new Error('obj必须是对象！');
    }
    return Object.keys(convertKeyMaps).reduce((res, oldKey) => {
        const newKey = convertKeyMaps[oldKey];
        res[newKey] = obj[oldKey];
        return res;
    }, {});
}
/**
 * 转换key
 * @param {*} convertKeyMaps
 * @return convert
 *
 * const convertKeyMaps = {
 *  a: 'name',
 *  b: 'age',
 * };
 * const data = {
 *  a: 'tom',
 *  b: 11,
 * }
 * const convert = convertKey(convertKeyMaps);
 * const myData = convert(data);
 * myData: {
 *  name: 'tom',
 *  age: 11,
 * }
 *
 * convert.revert(myData): {
 *  a: 'tom',
 *  b: 11,
 * }
 */
function convertKey(convertKeyMaps) {
    const reverseKeyMap = _reverseKey(convertKeyMaps);
    const convert = (obj) => _convertKeyOfObj(convertKeyMaps, obj);
    convert.revert = (obj) => _convertKeyOfObj(reverseKeyMap, obj);
    return convert;
}
export default convertKey;
