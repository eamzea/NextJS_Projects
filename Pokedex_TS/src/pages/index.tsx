import { GetStaticProps, NextPage } from 'next';
import { Layout } from '@/components';
import {pokeApi} from '@/api';
import { Pokemon, PokemonResponse } from '@/types';
import { Card, Grid, Text } from '@nextui-org/react';
import PokemonCard from '@/components/PokemonCard';

interface HomeProps {
  pokemons: Pokemon[]
}

const Home: NextPage<HomeProps> = ({pokemons}) => {
  return (
    <Layout title='Pokedex'>
      <Grid.Container gap={2} justify='flex-start'>
        {pokemons.map((pokemon) => (
          <PokemonCard pokemon={pokemon} key={pokemon.id}/>
        ))}
      </Grid.Container>
    </Layout>
  )
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonResponse>('/pokemon?limit=251');
  const pokemons = data.results.map((poke, index) => ({
    ...poke,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`,
    id: index + 1
  }))

  return {
    props: {
      pokemons
    }
  }
}

export default Home
