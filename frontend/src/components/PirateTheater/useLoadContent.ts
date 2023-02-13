import { useState, useEffect } from "react";
import axios from "axios";

export const useLoadContent = () => {
  const [moviesLoading, setMoviesLoading] = useState(false);
  const [seriesLoading, setSeriesLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [seriesList, setSeriesList] = useState([]);

  useEffect(() => {
    if (
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
  }, [movieList.length, moviesLoading, seriesList.length, seriesLoading]);

  return {
    movieList,
    seriesList,
    loading: moviesLoading || seriesLoading,
  };
};
