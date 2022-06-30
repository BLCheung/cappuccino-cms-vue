import dayjs from 'dayjs';

const CommonUtils = {};

/**
 * 是否为空
 * @param value
 * @return {boolean}
 */
CommonUtils.isNull = value => !value && value !== 0 && typeof value !== 'boolean';

/**
 * 深拷贝源函数
 * @param obj
 * @param hash
 * @return {any|RegExp|Date}
 */
CommonUtils._clone = (obj, hash = new WeakMap()) => {
  // 如果是null或者undefined就不进行拷贝操作；可能是对象或者普通的值 如果是函数的话是不需要深拷贝
  if (CommonUtils.isNull(obj) || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Symbol) { return Object(Symbol.prototype.valueOf.call(obj)); }
  
  // 是否存在递归前已缓存的引用（为了防止循环引用，即对象的属性直接或间接的引用了自身的情况）
  if (hash.get(obj)) return hash.get(obj);
  
  if (obj instanceof Set) {
    const cloneSet = new Set();
    hash.set(obj, cloneSet);
    CommonUtils.forEach(obj.keys(), key => {
      cloneSet.add(CommonUtils._clone(key, hash));
    });
    return cloneSet;
  }
  
  if (obj instanceof Map) {
    const cloneMap = new Map();
    hash.set(obj, cloneMap);
    obj.forEach((value, key) => {
      cloneMap.set(key, CommonUtils._clone(value, hash));
    });
    return cloneMap;
  }
  // 找到的是所属类原型上的constructor，而原型上的constructor指向的是当前类本身
  const cloneObj = new obj.constructor();
  hash.set(obj, cloneObj);
  CommonUtils.forEach(Object.keys(obj), key => {
    // 实现一个递归拷贝
    obj.hasOwnProperty(key) && (cloneObj[key] = CommonUtils._clone(obj[key], hash));
  });
  return cloneObj;
}

/**
 * 深拷贝
 * @param from
 * @param to
 * @return {*}
 */
CommonUtils.deepClone = (from, to) => {
  if (CommonUtils.isNull(from)) return;
  const keys = Object.keys(from);
  CommonUtils.forEach(keys, key => {
    from.hasOwnProperty(key) && (to[key] = CommonUtils._clone(from[key]));
  });
  return to;
}

/**
 * 浅拷贝
 * @param from
 * @param to
 */
CommonUtils.copy = (from, to) => {
  if (CommonUtils.isNull(from)) return;
  const keys = Object.keys(from);
  CommonUtils.forEach(keys, key => {
    from.hasOwnProperty(key) && (to[key] = from[key]);
  });
}

/**
 * 浅拷贝（目标对象内必须存在该字段）
 * @param from
 * @param to
 */
CommonUtils.copyIfExist = (from, to) => {
  if (CommonUtils.isNull(from)) return;
  const keys = Object.keys(from);
  CommonUtils.forEach(keys, key => {
    if (to.hasOwnProperty(key)) {
      to[key] = from[key];
    }
  });
}

/**
 * 遍历
 * @param array
 * @param iterator
 * @return {*}
 */
CommonUtils.forEach = (array = [], iterator) => {
  const length = array.length;
  if (length === 0) return;
  let index = -1;
  while (++index < length) {
    iterator(array[index], index);
  }
  return array;
}

/**
 * 把数据源列表组装实体列表
 * @example const userEntityList = CommonUtils.transformList(list, UserEntity);
 * @param array 数据源列表
 * @param entity 实例类对象
 * @return {[]|*[]}
 */
CommonUtils.transformList = (array = [], entity = null) => {
  if (!array || !array.length) return array;
  if (!entity && typeof entity !== 'function') return array;
  const entityList = [];
  CommonUtils.forEach(array, item => {
    entityList.push(new entity(item));
  });
  return entityList;
}

/**
 * 基本数据类型的数组去重
 * @param values 基本类型值
 * @return {*[]}
 */
CommonUtils.uniqueValues = (values = []) => [ ...new Set(values) ];

/**
 * 实体数组去重
 * 给定一个实体属性，根据该实体属性对实体数组进行去重
 * @param entities 实体数组
 * @param entityKey 实体属性
 * @return {[]}
 */
CommonUtils.uniqueEntities = (entities = [], entityKey = 'id') => {
  const keyMap   = new WeakMap();
  const newItems = [];
  CommonUtils.forEach(entities, item => {
    if (!keyMap.has(item[entityKey])) {
      newItems.push(item);
      keyMap.set(item[entityKey], item[entityKey]);
    }
  });
  return newItems;
}

/**
 * 解析日期为字符串
 * @param dateStr
 * @return {string|string} YYYY-MM-DD HH:mm
 */
CommonUtils.parseDate2Str = (dateStr = '') => dateStr ? dayjs(dateStr).format('YYYY-MM-DD HH:mm') : '';

export default CommonUtils;
