export const shuffle = (array) => {
  const copy = array.slice()
  for (let i = copy.length; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    [copy[i - 1], copy[j]] = [copy[j], copy[i - 1]];
  }
  return copy
}

export const sortByAlpha = (array) => {
  return array.sort((a,b) => {
    const teamA = a.name.toLowerCase()
    const teamB = b.name.toLowerCase();
    if(teamA < teamB) return -1
    if(teamA > teamB) return 1
    return 0
  })
}
