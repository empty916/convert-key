import { createArrayConvertor } from "./../src/createArrayConvertor";

const keyMaps = {
  a: "A1",
  b: "B1",
  f: "F1",
} as const; // keyMaps Object must be delared as a const

const array = [
  {
    a: 1,
    b: {
      b1: 1,
      b2: {},
      b3: "1",
    },
    c: null,
    d: "",
    // f: {}
  },
  {
    a: 1,
    b: {
      b1: 1,
      b2: {},
      b3: "1",
    },
    c: null,
    d: "",
  },
];

test("create", () => {
  // @ts-ignore
  expect(() => createArrayConvertor(1)).toThrow();
  // @ts-ignore
  expect(() => createArrayConvertor("[1]")).toThrow();
  // @ts-ignore
  expect(() => createArrayConvertor(null)).toThrow();

  const {convert, revert} = createArrayConvertor(keyMaps);
  

});

test('convert', () => {
    const {convert} = createArrayConvertor(keyMaps);
    const ca = convert(array);
    expect(ca).toMatchSnapshot();
})


test('revert', () => {
    const {convert, revert} = createArrayConvertor(keyMaps);
    const ca = convert(array);
    const oa = revert(ca);
    expect(oa).toEqual(array);
});