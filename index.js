const toSet = (hash, {data = {}, prefix = '', allowFalse = false} = {}) => {
  const notNull = v => v != null;
  const notEmpty = v => notNull(v) && v.length > 0;

  for (let key in hash) {
    if (allowFalse && notNull(hash[key]) || hash[key]) {
      const val = hash[key];

      switch (typeof val) {
      case 'string':
      case 'number':
      case 'boolean':
        const attr = [prefix, key].filter(notEmpty).join('-');
        data[attr] = val.toString();

        break;
      case 'function':
        data = toSet({[key]: val()}, {data, prefix, allowFalse});

        break;
      case 'object':
        const prefixed = [prefix].concat(key).filter(notEmpty).join('-');
        data = toSet(val, {data, prefix: prefixed, allowFalse});

        break;
      }
    }
  }

  return data;
}

export default toSet;
