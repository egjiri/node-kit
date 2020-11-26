import betterSwitch from '.';

test('test betterSwitch function', () => {
  const mock1 = jest.fn();
  const mock2 = jest.fn();
  const mock3 = jest.fn();
  const switchCases = { first: mock1, second: mock2, default: mock3 };
  const switchCasesWithoutDefault = { first: mock1, second: mock2 };

  betterSwitch<string>('first', switchCases);
  expect(mock1.mock.calls.length).toEqual(1);
  expect(mock2.mock.calls.length).toEqual(0);
  expect(mock3.mock.calls.length).toEqual(0);

  betterSwitch<string>('other', switchCases);
  expect(mock1.mock.calls.length).toEqual(1);
  expect(mock2.mock.calls.length).toEqual(0);
  expect(mock3.mock.calls.length).toEqual(1);

  betterSwitch<string>('other', switchCasesWithoutDefault);
  expect(mock1.mock.calls.length).toEqual(1);
  expect(mock2.mock.calls.length).toEqual(0);
  expect(mock3.mock.calls.length).toEqual(1);
});
