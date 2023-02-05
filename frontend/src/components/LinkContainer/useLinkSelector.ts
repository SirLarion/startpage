import { useCallback, useEffect, useRef, useState } from "react";

const mod = (n: number, m: number) => ((n % m) + m) % m;

export const useLinkSelector = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<undefined | number>(
    undefined
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const row = Math.floor((selectedIndex || 0) / 3);
      const col = (selectedIndex || 0) % 3;
      switch (e.key) {
        case "ArrowLeft":
          setSelectedIndex(row * 3 + mod(col - 1, 3));
          break;
        case "ArrowRight":
          setSelectedIndex(row * 3 + mod(col + 1, 3));
          break;
        case "ArrowUp":
          setSelectedIndex(mod(row - 1, 2) * 3 + col);
          break;
        case "ArrowDown":
          setSelectedIndex(mod(row + 1, 2) * 3 + col);
          break;
        default:
          break;
      }
    },
    [selectedIndex]
  );

  useEffect(() => {
    if (wrapperRef && wrapperRef.current) {
      const target = wrapperRef.current;
      target.addEventListener("keydown", handleKeyDown);

      return () => {
        target.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [wrapperRef, handleKeyDown]);

  return {
    wrapperRef,
    selectedIndex,
    setSelectedIndex,
  };
};
