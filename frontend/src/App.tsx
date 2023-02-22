import React from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";

import { LinkContainer } from "./components/LinkContainer";
import { AppsProvider } from "./providers/AppsProvider";
import { PlayProvider } from "./providers/PlayProvider";
import { AppSelectContainer } from "./components/AppSelectContainer";
import { PirateTheater } from "./components/PirateTheater";
import { hideScrollbar } from "./styles/common";

const StyledApp = styled.div`
  min-height: 100vh;
  max-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(p) => p.theme.background.primary};
  overflow-x: hidden;
  ${hideScrollbar}
`;

const App = () => {
  return (
    <StyledApp>
      <AppsProvider>
        <PlayProvider>
          <Routes>
            <Route path="/" element={<LinkContainer />} />
            <Route path="/select" element={<AppSelectContainer />} />
            <Route path="/pirate-theater" element={<PirateTheater />} />
          </Routes>
        </PlayProvider>
      </AppsProvider>
    </StyledApp>
  );
};

export default App;
