type SwitchCase<T extends PropertyKey> = (key: T) => void | undefined;
type SwitchCases<T extends PropertyKey> = Record<T, SwitchCase<T>> & { default?: SwitchCase<T> };

export default function betterSwitch<T extends PropertyKey>(key: T, switchCases: SwitchCases<T>) {
  const switchCase = switchCases[key] || switchCases.default;
  if (switchCase) {
    switchCase(key);
  }
}
