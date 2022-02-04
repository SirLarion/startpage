import React from 'react';
import styled from 'styled-components';

import {
  ApplicationLink,
  TAppConfig,
  ENTERTAINMENT_LINKS,
} from './components/ApplicationLink';

const StyledApp = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

const App = () => {
  return (
    <StyledApp>
      {ENTERTAINMENT_LINKS.map((link: TAppConfig) => (
        <ApplicationLink {...link} />
      ))}
    </StyledApp>
  );
};

export default App;
