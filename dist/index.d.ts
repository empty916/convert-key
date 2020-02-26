export declare type ConvertKeyMaps = {
    [k: string]: string;
};
declare type RevertKey<T extends ConvertKeyMaps, V extends T[keyof T] = T[keyof T]> = {
    [k in V]: string;
};
declare type ConvertKey<C extends ConvertKeyMaps, S extends {
    [k in keyof C]: any;
}> = {
    [k in keyof RevertKey<C>]: any;
};
declare type TConvertKey<T extends ConvertKeyMaps> = {
    <S extends {
        [k in keyof T]: any;
    }>(obj: S): ConvertKey<T, S>;
    revert: <S extends {
        [k in keyof RevertKey<T>]?: any;
    }>(obj: S) => {
        [k in keyof T]?: any;
    };
};
declare type AnyValue<T extends ConvertKeyMaps> = {
    [k in keyof T]: any;
};
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
declare function convertKey<T extends ConvertKeyMaps>(convertKeyMaps: AnyValue<T>): TConvertKey<T>;
export default convertKey;
