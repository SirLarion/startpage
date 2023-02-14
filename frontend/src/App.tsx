import React from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";

import { LinkContainer } from "./components/LinkContainer";
import { AppsProvider } from "./providers/AppsProvider";
import { AppSelectContainer } from "./components/AppSelectContainer";
import { PirateTheater } from "./components/PirateTheater";

const StyledApp = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${p => p.theme.background.primary};
  overflow-x: hidden;
`;

const App = () => {
  return (
    <StyledApp>
      <AppsProvider>
        <Routes>
          <Route path="/" element={<LinkContainer />} />
          <Route path="/select" element={<AppSelectContainer />} />
          <Route path="/pirate-theater" element={<PirateTheater />} />
        </Routes>
      </AppsProvider>
    </StyledApp>
  );
};

export default App;
