import createConvertUtil from "../src/index";

const keyMaps = {
  a: "A1",
  b: "B1",
  f: "F1",
} as const; // keyMaps Object must be delared as a const

const data = {
  a: 1,
  b: {
    b1: 1,
    b2: {},
    b3: "1",
  },
  c: null,
  d: "",
};

const revertData = {
  A1: 1,
  B1: {
    b1: 1,
    b2: {},
    b3: "1",
  },
  c: null,
  d: "",
};

test("create", () => {
    // @ts-ignore
    expect(() => createConvertUtil(null)).toThrow();

    const {convert, revert} = createConvertUtil(keyMaps);

    // @ts-ignore
    expect(() => convert(null)).toThrow();
    // @ts-ignore
    expect(() => convert(1)).toThrow();
    // @ts-ignore
    expect(() => convert('null')).toThrow();
    
    // @ts-ignore
    // @ts-ignore
    expect(() => revert(null)).toThrow();
    // @ts-ignore
    expect(() => revert(1)).toThrow();
    // @ts-ignore
    expect(() => revert('null')).toThrow();
});

test("convert", () => {
  const { convert } = createConvertUtil(keyMaps);

  expect(convert(data)).toEqual(revertData);
});

test("revert", () => {
  const { revert } = createConvertUtil(keyMaps);

  expect(revert(revertData)).toEqual(data);
});
