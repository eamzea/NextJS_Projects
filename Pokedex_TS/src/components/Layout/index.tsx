import Head from 'next/head'
import React from 'react'
import Navbar from '../Navbar'

const Layout = ({children, title}: {children: JSX.Element | JSX.Element[], title?: string}) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name='author' content='Edgar Zea' />
        <meta name='description' content='Pokemon data' />
        <meta name='keywords' content='Pokemon, pokedex' />
      </Head>
      <Navbar />
      <main style={{padding: '0 20px'}}>
        {children}
      </main>
    </>
  )
}

export default Layout
