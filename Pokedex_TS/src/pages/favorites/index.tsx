import { useEffect, useState } from 'react'
import { Grid } from '@nextui-org/react';
import { Empty, FavoriteCard, Layout } from '@/components'
import {localFavorites} from '@/utils';

const Favorites = () => {
  const [favorites, setFavorites] = useState<{name:string, id: number}[]>([]);


  useEffect(() => {
    setFavorites(localFavorites.areThereFavorites())
  }, [])

  return (
    <Layout>
      {
        favorites.length === 0 ? (
          <Empty />
        ) : (
          <Grid.Container gap={2} justify='flex-start'>
            {favorites.map((pokemon) => (
              <FavoriteCard pokemonName={pokemon.name} pokemonID={pokemon.id} key={pokemon.name} />
            ))}
          </Grid.Container>
        )
      }
    </Layout>
  )
}

export default Favorites
