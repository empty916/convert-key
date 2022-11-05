import { createObjectConvertor } from "../src/createObjectConvertor";

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
  expect(() => createObjectConvertor(null)).toThrow();

  const { convert, revert } = createObjectConvertor(keyMaps);

  // @ts-ignore
  expect(() => convert(null)).toThrow();
  // @ts-ignore
  expect(() => convert(1)).toThrow();
  // @ts-ignore
  expect(() => convert("null")).toThrow();

  // @ts-ignore
  // @ts-ignore
  expect(() => revert(null)).toThrow();
  // @ts-ignore
  expect(() => revert(1)).toThrow();
  // @ts-ignore
  expect(() => revert("null")).toThrow();
});

test("convert", () => {
  const { convert } = createObjectConvertor(keyMaps);
  const cd = convert(data);
  expect(cd).toMatchSnapshot();
});

test("revert", () => {
  const { convert, revert } = createObjectConvertor(keyMaps);
  const cd = convert(data);
  const od = revert(cd);
  expect(od).toEqual(data);
});
