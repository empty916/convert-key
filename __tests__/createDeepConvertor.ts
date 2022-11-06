import { createDeepConvertor } from "../src/createDeepConvertor";

const keyMaps = {
  a: "A1",
  b: "B1",
  f: "F1",
} as const; // keyMaps Object must be delared as a const

const data = [
  {
    a: 1,
    b: {
      b: 1,
      b2: {
        b: [
          {
            b: 1,
            b2: {},
            b3: "1",
          },
        ],
      },
      b3: "1",
    },
    c: null,
    d: "",
    // f: {}
  },
];

const data2 = {
  a: 1,
  b: {
    b: 1,
    b2: {
      b: [
        {
          b: 1,
          b2: {},
          b3: "1",
          f: {}
        },
      ],
    },
    b3: "1",
  },
  c: null,
  d: "",
  // f: {}
};



const data3 = {
  a: 1,
  b: {
    b: 1,
    b2: {
      b: [
        {
          b: 1,
          b2: {},
          b3: "1",
          f: {}
        },
      ],
    },
    b3: "1",
    b4: {
      b1: 1,
      b2: {},
      b3: "1",
    },
  },
  c: null,
  d: "",
  // f: {}
};

test("create", () => {
  // @ts-ignore
  expect(() => createDeepConvertor(null)).toThrow();

  const { convert, revert } = createDeepConvertor(keyMaps);

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

test("convert arr", () => {
  const { convert, revert } = createDeepConvertor(keyMaps);

  const cd = convert(data);
  const od = revert(cd);
  expect(cd).not.toEqual(data);
  expect(cd).toMatchSnapshot();
  expect(od).toEqual(data);
});

test("convert obj", () => {
  const { convert, revert } = createDeepConvertor(keyMaps);

  const cd = convert(data2);
  const od = revert(cd);
  expect(cd).not.toEqual(data2);
  expect(cd).toMatchSnapshot();
  expect(od).toEqual(data2);
});

test("convert obj2", () => {
  const { convert, revert } = createDeepConvertor(keyMaps);

  const cd = convert(data3);
  const od = revert(cd);
  expect(cd).not.toEqual(data3);
  expect(cd).toMatchSnapshot();
  expect(od).toEqual(data3);
});
