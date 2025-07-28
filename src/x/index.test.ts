import {
  betterSwitch,
} from '.';


test('exports', () => {
  [
    betterSwitch,
  ].map(item => expect(item).toBeDefined());
});
