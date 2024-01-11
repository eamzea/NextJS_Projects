import { useEffect, useState } from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react'
import confetti from 'canvas-confetti'
import { Layout } from '@/components'
import { FullPokemon, PokemonResponse } from '@/types'
import {pokeApi} from '@/api'
import { getPokemonInfo, localFavorites } from '@/utils'

const PokemonPage: NextPage<{ pokemon: FullPokemon }> = ({ pokemon }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(localFavorites.existsInFavorites(pokemon.name))
  }, [])

  const handleFavorite = () => {
    localFavorites.toggleFavorites({name: pokemon.name, id: pokemon.id})
    setIsFavorite(!isFavorite)

    if (!isFavorite) {

      confetti({
        angle: Math.random() * (125 - 55) + 55,
        spread: Math.random() * (150 - 50) + 50,
        particleCount: Math.random() * (100 - 50) + 50,
        origin: { x: 0.4,y: 0.6 }
      });
      confetti({
        angle: Math.random() * (125 - 55) + 55,
        spread: Math.random() * (150 - 50) + 50,
        particleCount: Math.random() * (100 - 50) + 50,
        origin: { x: 0.5,y: 0.6 }
      });
      confetti({
        angle: Math.random() * (125 - 55) + 55,
        spread: Math.random() * (150 - 50) + 50,
        particleCount: Math.random() * (100 - 50) + 50,
        origin: { x: 0.6,y: 0.6 }
      });
    }
  }


  return (
    <Layout title={`#${pokemon.id} - ${pokemon.name.toLocaleUpperCase()}`}>
      <Grid.Container css={{ marginTop: '1rem' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: '1rem' }}>
            <Card.Body>
              <Card.Image src={pokemon.sprites.other?.dream_world.front_default || ''} width='100%' height='10rem'/>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform='capitalize'>{pokemon.name}</Text>
              <Button color='gradient' ghost={!isFavorite} onClick={handleFavorite}>{isFavorite ? 'Remove Fav': 'Save as Fav'}</Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container display='flex' direction='row'>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />

              </Container>
            </Card.Body>
          </Card>
        </Grid>

      </Grid.Container>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: {results: pokemons} } = await pokeApi.get<PokemonResponse>('/pokemon?limit=251');

  return {
    paths: pokemons.map(({name}) => ({params: {name}})),
    // fallback: false
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pokemon = await getPokemonInfo((params as {name: string}).name)

  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      pokemon: {
        name: pokemon.name,
        id: pokemon.id,
        sprites: pokemon.sprites
      }
    },
    revalidate: 43200
  }
}

export default PokemonPage
