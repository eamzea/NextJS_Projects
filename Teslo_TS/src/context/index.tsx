import React, { ComponentProps, FC, ReactElement } from 'react';
import { UiProvider } from './ui/provider';

interface Props {
  children: React.ReactNode;
}

export const AppProviders: React.FC<Props> = ({ children, ...rest }) => {
  const providers: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>> = [UiProvider]
  return (
    <>
      {providers.reduceRight(
        (acc, Provider) => (
          <Provider {...rest}>{acc}</Provider>
        ),
        children,
      )}
    </>
  );
};

export default AppProviders;
