import { useState, useEffect } from "react";
import axios from "axios";

type TInitResponse = {
  status: "success" | "fail" | "pending";
  msg?: string;
};

export const useLoadContent = () => {
  const [init, setInit] = useState<TInitResponse>({ status: "pending" });

  const [moviesLoading, setMoviesLoading] = useState(false);
  const [seriesLoading, setSeriesLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [seriesList, setSeriesList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:12345/run/pirate-init").then(res => {
      if (res.status === 200) {
        setInit({ status: "success" });
      } else {
        setInit({ status: "fail", msg: res.data });
      }
    });
  }, []);

  console.log("init", init);
  useEffect(() => {
    if (
      init.status === "success" &&
      !(moviesLoading || seriesLoading) &&
      movieList.length === 0 &&
      seriesList.length === 0
    ) {
      setMoviesLoading(true);
      setSeriesLoading(true);

      axios.get("http://localhost:12345/content/movies").then(res => {
        setMovieList(res.data);
        setMoviesLoading(false);
      });
      axios.get("http://localhost:12345/content/series").then(res => {
        setSeriesList(res.data);
        setSeriesLoading(false);
      });
    }
  }, [
    init.status,
    movieList.length,
    moviesLoading,
    seriesList.length,
    seriesLoading,
  ]);

  return {
    movieList,
    seriesList,
    loading: init.status === "pending" || moviesLoading || seriesLoading,
  };
};
