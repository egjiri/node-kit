import proxy from './proxy';

test('test proxy function', () => {
  const data = proxy([1, 2, 3], { meta: { totalCount: 3 }});
  expect(data).toEqual([1, 2, 3]);
  expect(data.meta).toEqual({ totalCount: 3 });
});
