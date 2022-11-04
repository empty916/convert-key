# convert-key


this package is used to convert key name of an object and revert a converted object to original key


  ```typescript
  import createConvertUtil from 'convert-key'

  const keyMaps = {
      a: 'A1',
      b: 'B1',
      f: 'F1'
  } as const; // keyMaps Object must be delared as a const

  const {convert, revert} = createConvertUtil(keyMaps);

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