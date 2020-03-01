# convert-key


作用是转化key的名称，**此工具可以做前后端的接口数据隔离，建议将接口适配放到service模块中**

  ```typescript
  import convertKey from 'convert-key'

  const keyMaps = {
    pdName: 'productName',
    uName: 'userName',
  }
  type KeyMaps = {
    pdName: 'productName',
    uName: 'userName',
  }

  const convertDataKey = convertKey<KeyMaps>(keyMaps);

  const myData = convertDataKey({
    pdName: '余额宝',
    uName: 'tom',
  });

  /**
   * myData: {
   *  productName: '余额宝',
   *  userName: 'tom',
   * }
   * 
  */

  // 如果想要转换回去，可以使用
  const theirData = convertDataKey.revert(myData);

  /**
   * theirData: {
   *  pdName: '余额宝',
   *  uName: 'tom',
   * }
   * 
  */

  ```