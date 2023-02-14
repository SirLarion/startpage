import { useState } from "react";
import axios from "axios";

export const usePlayContent = () => {
  const [playing, setPlaying] = useState(false);
  const playContent = (contentPath: string) => {
    setPlaying(true);
    setTimeout(() => setPlaying(false), 5000);
    setTimeout(
      () => axios.get(`http://localhost:12345/play/${contentPath}`),
      1000
    );
  };

  return {
    playContent,
    playing,
  };
};
