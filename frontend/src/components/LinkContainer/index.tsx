import React, { FC, useContext } from "react";
import styled from "styled-components";

import { ApplicationLink } from "../ApplicationLink";
import { AppsContext } from "../../providers/AppsProvider";
import { TAppConfig } from "../../types";
import { APPLICATION_LINKS } from "../../constants";
import { useLinkSelector } from "./useLinkSelector";

const StyledLinkContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 2rem;
`;

export const LinkContainer: FC = ({ ...restProps }) => {
  const { wrapperRef, selectedIndex, setSelectedIndex } = useLinkSelector();

  const appInfo = useContext(AppsContext);
  const selected = appInfo?.apps.map(a => APPLICATION_LINKS[a]) || [];
  return (
    <StyledLinkContainer ref={wrapperRef} {...restProps}>
      {selected.map((link: TAppConfig, index: number) => (
        <ApplicationLink
          {...link}
          key={index}
          selected={index === selectedIndex}
          setSelected={(selected: boolean) => setSelectedIndex(selected ? index : undefined)}
          delay={index * 100}
        />
      ))}
    </StyledLinkContainer>
  );
};
