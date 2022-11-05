import { convertObj } from "./createObjectConvertor";
import { KeyMaps } from "./model";
import { getRevertKeyMaps, isObj, isObjArray } from "./utils";

export const createArrayConvertor = <KM extends KeyMaps>(keyMaps: KM) => {
    if (!isObj(keyMaps)) {
		throw new Error('convert-key: keyMaps must be an Object!');
	}

    const convert = <
        A extends Array<Partial<{[k in keyof KM]: any}>>
    >(array: A) => {
        if (!isObjArray(array)) {
			throw new Error('convert-key: createArrayConvertor data must be an Object Array!');
		}
        return array.map((i: A[number]) => convertObj(keyMaps, i));
    }

    const revertKeyMaps = getRevertKeyMaps(keyMaps);
    type RKM = typeof revertKeyMaps;

    const revert = <
        A extends Array<Partial<{[k in keyof RKM]: any}>>
    >(array: A) => {
        if (!isObjArray(array)) {
			throw new Error('convert-key: createArrayConvertor data must be an Object Array!');
		}
        return array.map((i: A[number]) => convertObj(revertKeyMaps, i));
    }

    return {
        convert,
        revert,
    }
}

