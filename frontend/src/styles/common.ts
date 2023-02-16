import { css } from "styled-components";

export const hideScrollbar = css`
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;
