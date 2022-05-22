import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { ModeContext } from './providers/ModeProvider';
import { LinkContainer } from './components/LinkContainer';

const StyledApp = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(p) => p.theme.background.primary};
`;

const App = () => {
  const navigate = useNavigate();
  const mode = useContext(ModeContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => navigate(mode), []);

  return (
    <StyledApp>
      <Routes>
        <Route
          path="/production"
          element={<LinkContainer type="production" />}
        />
        <Route
          path="/entertainment"
          element={<LinkContainer type="entertainment" />}
        />
      </Routes>
    </StyledApp>
  );
};

export default App;
