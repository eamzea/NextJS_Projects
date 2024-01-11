import { Card, Grid, Text } from '@nextui-org/react'
import React from 'react'
import { Pokemon } from '@/types'
import { useRouter } from 'next/router'

const PokemonCard = ({ pokemon: { name, id, img } }: { pokemon: Pokemon }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/pokemon/${name}`)
  }

  return (
    <Grid xs={6} sm={3} md={2} xl={1} key={name}>
      <Card isHoverable isPressable onClick={handleClick}>
        <Card.Body css={{p: '1rem'}}>
          <Card.Image src={img} width='100%' height={140} />
        </Card.Body>
        <Card.Footer isBlurred css={{justifyContent: 'space-between'}}>
          <Text>#{id}</Text>
          <Text transform='capitalize'>{name}</Text>
        </Card.Footer>
      </Card>
    </Grid>
  )
}

export default PokemonCard
