# Object to hyphenated set

```js
  toSet({ foo: 'bar', nofoo: false, deep: { foo: bar } })
  // => { foo: 'bar', 'deep-foo': 'bar' }
```

## API

```js
  toSet(hash, {data = {}, prefix = '', allowFalse = true} = {});
```

### hash
The object to convert to a hyphenated set.

- Hash values can be of type String, Number, Boolean, Function and Object.
- Strings, Numbers and Booleans will be parsed as string values.
- Functions will be called and recursively added to the set.
- Objects will be recursively added to the set.

### data (optional)
The data object where the set will be merged into. Defaults to {}.

### allowFalse (optional)
Set falsy attributes, otherwise ignore. Defaults to false.

### prefix (optional)
Prefixes all objects in `hash`, except for the optional attributes (in `data`) when given.


## Example

```js
import toSet from 'to-set';

const data = toSet({
  component: 'link',
  'is-false': false,
  'is-deep': {
    deep: 1
  },
  'is-method': () => 'hello',
  'is-method-deep': () => ({
    a: 1,
    b: 2
  }),
  no: false
});

/* => {
  'component': 'link',
  'is-deep-deep': '1',
  'is-method': 'hello',
  'is-method-deep-a': '1',
  'is-method-deep-b': '2',
};
*/

```

## Example how to create data attributes

```js
import toSet from 'to-set';

const data = toSet({
  component: 'link',
  'is-deep': {
    deep: 1
  },
  'is-method': () => 'hello',
  'is-method-deep': () => ({
    a: 1,
    b: 2
  }),
  no: false
}, {
  prefix: 'data'
});

/* => {
  'data-component': 'link',
  'data-is-deep-deep': '1',
  'data-is-method': 'hello',
  'data-is-method-deep-a': '1',
  'data-is-method-deep-b': '2',
};
*/

```
