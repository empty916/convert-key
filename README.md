# convert-key


this package is used to convert key name of an object and revert a converted object to original key


## shallow convert an object with createObjectConvertor

  ```typescript
  import {
    createObjectConvertor,
    createArrayConvertor,
    createDeepConvertor
  } from 'convert-key'

  const keyMaps = {
      a: 'A1',
      b: 'B1',
      f: 'F1'
  } as const; // keyMaps Object must be delared as a const

  const {convert, revert} = createObjectConvertor(keyMaps);

  const data = {
    a: 1,
    b: {
        b1: 1,
        b2: {},
        b3: '1'
    },
    c: null,
    d: ''
  }

  /**
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
  */
  const convertedData = convert(data);

  // revert back
  const sameAsData = revert(convertedData);

  ```


## shallow convert an array with createArrayConvertor

  ```typescript
  import {
    createArrayConvertor,
  } from 'convert-key'

  const keyMaps = {
      a: 'A1',
      b: 'B1',
      f: 'F1'
  } as const; // keyMaps Object must be delared as a const

  const {convert, revert} = createArrayConvertor(keyMaps);

  const data = [{
    a: 1,
    b: {
        b1: 1,
        b2: {},
        b3: '1'
    },
    c: null,
    d: ''
  }]

  /**
   * [{
   *     A1: number;
   *     B1: {
   *         b1: number;
   *         b2: {};
   *         b3: string;
   *     };
   *     c: null;
   *     d: string;
   * }]
   * 
  */
  const convertedData = convert(data);

  // revert back
  const sameAsData = revert(convertedData);

  ```


## deep convert an array or an object with createDeepConvertor

  ```typescript
  import {
    createDeepConvertor,
  } from 'convert-key'

  const keyMaps = {
      a: 'A1',
      b: 'B1',
      f: 'F1'
  } as const; // keyMaps Object must be delared as a const

  const {convert, revert} = createDeepConvertor(keyMaps);

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

  /**
   * [
   *   {
   *     "A1": 1,
   *     "B1": {
   *       "B1": 1,
   *       "b2": {
   *         "B1": [
   *           {
   *             "B1": 1,
   *             "b2": {},
   *             "b3": "1",
   *           },
   *         ],
   *       },
   *       "b3": "1",
   *     },
   *     "c": null,
   *     "d": "",
   *   },
   * ]
   * 
  */
  const convertedData = convert(data);

  // revert back
  const sameAsData = revert(convertedData);



  /**
   * {
   *   "A1": 1,
   *   "B1": {
   *     "B1": 1,
   *     "b2": {
   *       "B1": [
   *         {
   *           "B1": 1,
   *           "F1": {},
   *           "b2": {},
   *           "b3": "1",
   *         },
   *       ],
   *     },
   *     "b3": "1",
   *   },
   *   "c": null,
   *   "d": "",
   * }
   */
  const convertedData1 = convert(data1);

  // revert back
  const sameAsData1 = revert(convertedData1);


  ```
