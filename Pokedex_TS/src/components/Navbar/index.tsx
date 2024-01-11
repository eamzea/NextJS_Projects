import { Link, Spacer, Text } from '@nextui-org/react'
import Image from 'next/image'
import NextLink from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav style={{
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'start',
      padding: '0 20px',
      backgroundColor: '#EF5350'
    }}>
      <div style={{display:'flex', alignItems: 'baseline'}}>
        <Image src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' alt='Pikachu image' width={50} height={50} style={{ transform: 'translateY(18px)' }} />
        <NextLink href='/' passHref style={{display: 'flex'}}>
            <Text h2 weight='normal'>P</Text>
            <Text h3>okemon</Text>
        </NextLink>
      </div>
      <Spacer css={{flex: 1}} />

      <NextLink href='/favorites' passHref>
          <Text>Favorites</Text>
      </NextLink>
    </nav>
  )
}

export default Navbar
