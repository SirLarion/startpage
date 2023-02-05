import React, { ChangeEvent, FC, useState } from "react";
import styled from "styled-components";

import { TAppConfig, TAppName } from "../../types";
import { APPLICATION_NAMES } from "../../constants";
import { ApplicationLink } from "../ApplicationLink";

export interface ISelectionComponentProps {
  app: TAppConfig;
  delay: number;
  setSelection: (name: TAppName) => void;
}

const StyledSelectionComponent = styled.div``;

const SelectionInput = styled.input`
  margin-top: 0.5rem;
`;

export const SelectionComponent: FC<ISelectionComponentProps> = ({
  app,
  delay,
  setSelection,
  ...restProps
}) => {
  const [input, setInput] = useState("");
  const [, setError] = useState(false);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const val = e.target.value;
    setInput(val);
    setError(false);
    const typedInput = val.toLowerCase() as TAppName;
    if (APPLICATION_NAMES.includes(typedInput)) {
      setSelection(typedInput);
    } else {
      setError(true);
    }
  };

  return (
    <StyledSelectionComponent {...restProps}>
      <ApplicationLink {...app} delay={delay} />
      <SelectionInput defaultValue={input} onChange={handleInput} />
    </StyledSelectionComponent>
  );
};
