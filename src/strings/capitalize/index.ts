export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function capitalizeWords(str: string) {
  return str.split(' ').map(word => {
    const exceptionWords = ['in', 'on', 'is', 'to', 'for', 'width', 'and', 'on', 'by', 'a', 'at'];
    return exceptionWords.includes(word) ? word.toLowerCase() : capitalize(word);
  }).join(' ');
}

export function capitalizeSentences(str: string) {
  return str.split('. ').map(word => capitalize(word)).join('. ');
}
