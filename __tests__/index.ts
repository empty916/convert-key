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
  // f: {}
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
  expect(convert(data)).toMatchSnapshot();
});

test("revert", () => {
  const { convert, revert } = createConvertUtil(keyMaps);
  expect(revert(convert(data))).toEqual(data);
});
