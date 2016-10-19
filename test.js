import test from 'tape';
import toSet from './index';

test('with allowFalse', (t) => {
  t.plan(7);

  const ds = toSet({
    component: 'link',
    'is-false': false,
    'is-deep': {deep: 1},
    'is-method': () => 'hello',
    'is-method-deep': () => ({a: 1, b: 2}),
    no: false
  });

  t.equal(ds['component'], 'link');
  t.equal(ds['is-false'], undefined);
  t.equal(ds['is-deep-deep'], '1');
  t.equal(ds['is-method'], 'hello');
  t.equal(ds['is-method-deep-a'], '1');
  t.equal(ds['is-method-deep-b'], '2');
  t.equal(ds['no'], undefined);
});


test('without allowFalse', (t) => {
  t.plan(1);

  const ds = toSet({
    no: false
  }, {allowFalse: true});

  t.equal(ds['no'], 'false');
});


test('with data', (t) => {
  t.plan(2);

  const ds = toSet({
    test: 'test'
  }, {
    data: {
      'preset': 'preset'
    }
  });

  t.equal(ds['test'], 'test');
  t.equal(ds['preset'], 'preset');
});


test('with prefix', (t) => {
  t.plan(2);

  const ds = toSet({
    test: 'test'
  }, {
    data: {
      preset: 'preset',
    },
    prefix: 'data',
  });

  t.equal(ds['data-test'], 'test');
  t.equal(ds['preset'], 'preset');
});
