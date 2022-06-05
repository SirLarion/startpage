import React, { FC, useState, useMemo, useContext, useEffect } from 'react';
import styled from 'styled-components';

import { AppsContext, TAppInfo } from '../../providers/AppsProvider';
import { TAppConfig, TAppName } from '../../types';
import { APPLICATION_LINKS } from '../../constants';
import { SelectionComponent } from './SelectionComponent';
import axios from 'axios';

const StyledAppSelectContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 2rem;
`;

const SaveButton = styled.button``;

export const AppSelectContainer: FC = ({ ...restProps }) => {
  const [selection, setSelection] = useState<TAppInfo>(undefined);
  const appInfo = useContext(AppsContext);
  const selected = useMemo(
    () => selection?.apps.map((a) => APPLICATION_LINKS[a]) || [],
    [selection]
  );

  const handleSelection = (index: number, name: TAppName) => {
    const mode = selection?.mode || 'entertainment';
    const apps = selection?.apps || [];
    setSelection({
      mode,
      apps: apps.map((a: TAppName, i: number) => (i === index ? name : a)),
    });
  };

  const handleSubmitSelection = () => {
    axios.post('http://localhost:12345/applications', selection);
  };

  useEffect(() => {
    setSelection(appInfo);
  }, [appInfo]);

  return (
    <StyledAppSelectContainer {...restProps}>
      {selected.map((link: TAppConfig, index: number) => (
        <SelectionComponent
          app={link}
          key={index}
          delay={index * 100}
          setSelection={(name: TAppName) => handleSelection(index, name)}
        />
      ))}
      <SaveButton onClick={handleSubmitSelection}>Save</SaveButton>
    </StyledAppSelectContainer>
  );
};
