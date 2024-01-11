import { Container, Image, Text } from '@nextui-org/react'
import React from 'react'

const Empty = () => {
  return (
    <Container
      css={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 100px)',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center'
      }}
    >
      <Text h1>You don&apos;t have Favorites, yet !</Text>
      <Image src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/172.svg' width={320} height={320} />
    </Container>
  )
}

export default Empty
