import proxy from '.';

describe('proxy function', () => {
  test('object data use case', () => {
    const data = { a: 1 };
    const meta = { totalCount: 3 };
    const newData = proxy(data, { meta }) as { a: number, meta: Record<string, unknown>};
    expect(newData).toEqual(data);
    expect(newData.a).toEqual(1);
    expect(newData.meta).toEqual(meta);
  });

  test('array data use case', () => {
    const data = [{ a: 1 }];
    const meta = { totalCount: 3 };
    const newData = proxy(data, { meta });
    expect(newData).toEqual(data);
    expect(newData[0]).toEqual(data[0]);
    expect(newData[0].a).toEqual(data[0].a);
    expect((newData as unknown as { meta: Record<string, unknown> }).meta).toEqual(meta);
  });
});
