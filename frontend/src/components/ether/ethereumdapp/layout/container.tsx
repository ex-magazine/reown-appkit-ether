import type { ReactNode } from 'react';

import MainContainer from './main-container';

type Props = {
  children: ReactNode;
};

const Container = ({ children }: Props) => (
  <>
    <MainContainer>{children}</MainContainer>
  </>
);

export default Container;
