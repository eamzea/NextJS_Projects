import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { CssBaseline } from '@nextui-org/react';

const CustomDocument = () => {
  return (
    <Html lang="en">
      <Head>{CssBaseline.flush()}</Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export const getInitialProps = async (ctx: DocumentContext) => {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: React.Children.toArray([initialProps.styles])
    };
}

export default CustomDocument
