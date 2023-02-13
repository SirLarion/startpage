import React, { FC } from "react";
import styled from "styled-components";
import { useLoadContent } from "./useLoadContent";

const Content = styled.div`
  color: white;
`;

const StyledPirateTheater = styled.div``;

export const PirateTheater: FC = () => {
  const { movieList, seriesList, loading } = useLoadContent();
  if (!loading) {
    return (
      <StyledPirateTheater>
        {movieList.map(movie => (
          <Content>{movie}</Content>
        ))}
        {seriesList.map(series => (
          <Content>{series}</Content>
        ))}
      </StyledPirateTheater>
    );
  }
  return <div>borka borka</div>;
};
