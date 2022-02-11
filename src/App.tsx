import React from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';

import { LinkContainer } from './components/LinkContainer';

const StyledApp = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  return (
    <StyledApp>
      <Routes>
        <Route path="/" element={<LinkContainer type="production" />} />
        <Route
          path="/entertainment"
          element={<LinkContainer type="entertainment" />}
        />
      </Routes>
    </StyledApp>
  );
};

export default App;
