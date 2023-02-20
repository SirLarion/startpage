import React, { FC } from "react";
import styled from "styled-components";

import { TContent } from "..";

export interface IOpenContentProps {
  content: TContent | null;
  play: (path: string) => void;
  close: () => void;
}

const Modal = styled.div`
  position: absolute;
  z-index: 50;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledOpenContent = styled.div``;

export const OpenContent: FC<IOpenContentProps> = ({
  content,
  play,
  close,
}) => {
  if (content) {
    return (
      <Modal onClick={close}>
        <StyledOpenContent>
          <img
            src={`http://localhost:12345/content/${content.type}/${content.name}`}
            alt={`${content.name} large`}
          />
        </StyledOpenContent>
      </Modal>
    );
  }
  return null;
};
