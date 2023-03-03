import React, { FC, createContext, useState } from "react";
import axios from "axios";

export const PlayContext = createContext({
  playing: false,
  play: (_: string) => {},
});

export const PlayProvider: FC = ({ children }) => {
  const [playing, setPlaying] = useState(false);

  const play = (contentPath: string) => {
    setPlaying(true);
    setTimeout(() => setPlaying(false), 5000);
    setTimeout(
      () => axios.get(`http://localhost:12345/play/${contentPath}`),
      1000
    );
  };

  return (
    <PlayContext.Provider value={{ playing, play }}>
      {children}
    </PlayContext.Provider>
  );
};
