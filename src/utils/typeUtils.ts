export const typeUtils = {
  // 判断是否为 undefined
  isUndefined: (value: any) => typeof value === 'undefined',

  // 判断是否为 null
  isNull: (value: any) => value === null,

  // 判断是否为布尔值
  isBoolean: (value: any) => typeof value === 'boolean',

  // 判断是否为数字 (包括 NaN 检查)
  isNumber: (value: any) => typeof value === 'number' && !isNaN(value),

  // 判断是否为整数
  isInteger: (value: any) => Number.isInteger(value),

  // 判断是否为字符串
  isString: (value: any) => typeof value === 'string',

  // 判断是否为 Symbol
  isSymbol: (value: any) => typeof value === 'symbol',

  // 判断是否为 BigInt
  isBigInt: (value: any) => typeof value === 'bigint',

  // 判断是否为函数
  isFunction: (value: any) => typeof value === 'function',

  // 判断是否为对象 (包括数组、日期等，不包括null)
  isObject: (value: any) => value !== null && typeof value === 'object',

  // 判断是否为纯对象 (plain object)
  isPlainObject: (value: any) => {
    return Object.prototype.toString.call(value) === '[object Object]'
  },

  // 判断是否为数组
  isArray: (value: any) => Array.isArray(value),

  // 判断是否为日期对象
  isDate: (value: any) => value instanceof Date,

  // 判断是否为正则表达式
  isRegExp: (value: any) => value instanceof RegExp,

  // 判断是否为 Promise 对象
  isPromise: (value: any) => {
    return value && typeof value.then === 'function'
  },

  // 获取精确类型
  getType: (value: any) => {
    return Object.prototype.toString
      .call(value)
      .replace(/^\[object (\S+)\]$/, '$1')
      .toLowerCase()
  },
}
