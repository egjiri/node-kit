import { Frequency } from './types';

export function compareFrequencies(frequency: Frequency, referenceFrequency: Frequency): boolean {
  const frequencies = Object.values(Frequency);
  return frequencies.indexOf(frequency) <= frequencies.indexOf(referenceFrequency);
}
