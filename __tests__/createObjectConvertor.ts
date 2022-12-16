import { createObjectConvertor } from "../src/createObjectConvertor";

const keyMaps = {
  b: "B1",
  a: "A1",
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
