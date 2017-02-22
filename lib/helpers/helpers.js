export const shuffle = (array) => {
  const copy = array.slice()
  for (let i = copy.length; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    [copy[i - 1], copy[j]] = [copy[j], copy[i - 1]];
  }
  return copy
}
