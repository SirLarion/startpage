import React, { FC, useEffect, useRef, useState } from "react";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";

import { Hoverable } from "../../../Hoverable";

import search_button from "../../../../assets/search.svg";

export interface ISearchInputProps {
  searchString: string;
  setSearch: (value: string) => void;
}

const StyledSearchInput = styled(animated.input)`
  all: unset;
  position: fixed;
  min-width: 16rem;
  max-width: 16rem;
  padding: 1rem;
  top: 2rem;
  right: 3rem;
  transform-origin: center right;
  background-color: rgba(0, 0, 0, 0);
  border: 2px solid white;
  border-radius: 0.5rem;
  font-family: "Montserrat";
`;

const SearchButton = styled(Hoverable)`
  position: fixed;
  z-index: 20;
  top: 3rem;
  right: 2rem;
  opacity: 0.5;
  cursor: pointer;
`;

export const SearchInput: FC<ISearchInputProps> = ({
  searchString,
  setSearch,
  ...restProps
}) => {
  const [open, setOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const spring = useSpring({
    opacity: open ? 0.5 : 0,
    transform: open ? "scale3d(1, 1, 1)" : "scale3d(0, 1, 1)",
  });

  const hideSearchButtonSpring = useSpring({
    transform: open ? "translate3d(5rem, 0, 0)" : "translate3d(0rem, 0, 0)",
  });

  useEffect(() => {
    if (open && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open, inputRef]);

  return (
    <>
      <SearchButton scaleFactor={1.1}>
        <animated.img
          width={24}
          height={24}
          src={search_button}
          style={hideSearchButtonSpring}
          onClick={() => setOpen(true)}
          alt="search"
        />
      </SearchButton>
      <StyledSearchInput
        ref={inputRef}
        style={spring}
        defaultValue={searchString}
        onChange={e => setSearch(e.currentTarget.value)}
        onBlur={() => setOpen(false)}
        {...restProps}
      />
    </>
  );
};
