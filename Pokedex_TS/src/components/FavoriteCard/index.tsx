import { Card, Grid } from '@nextui-org/react'
import { useRouter } from 'next/router';

const FavoriteCard: React.FC<{ pokemonName: string, pokemonID: number }> = ({ pokemonName, pokemonID }) => {
  const router = useRouter();

  const handleClick = (name: string) => {
    router.push(`/pokemon/${name}`)
  }

  return (
    <Grid xs={6} sm={3} md={2} xl={1}>
      <Card isHoverable isPressable onClick={() => handleClick(pokemonName)}>
        <Card.Body css={{p: '1rem'}}>
          <Card.Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg`} width='100%' height={140} />
        </Card.Body>
      </Card>
    </Grid>
  )
}

export default FavoriteCard
