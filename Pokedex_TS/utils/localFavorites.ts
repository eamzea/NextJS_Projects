const toggleFavorites = ({name, id}: {name: string, id: number}) => {
  let favorites: {name:string, id: number}[] = JSON.parse(localStorage.getItem('favorites') || '[]');

  if (favorites.find(pokemon => pokemon.name === name)) {
    favorites = favorites.filter(pokemon => pokemon.name !== name)
  } else {
    favorites.push({name, id})
  }

  localStorage.setItem('favorites', JSON.stringify(favorites))
}

const existsInFavorites = (name: string): boolean => {
  const favorites: {name:string, id: number}[] = typeof window === 'undefined' ? [] : JSON.parse(localStorage.getItem('favorites') || '[]');

  return !!favorites.find(pokemon => pokemon.name === name)
}

const areThereFavorites = () => {
  return typeof window === 'undefined' ? [] : JSON.parse(localStorage.getItem('favorites') || '[]');
}

export default {
  toggleFavorites,
  existsInFavorites,
  areThereFavorites
}
