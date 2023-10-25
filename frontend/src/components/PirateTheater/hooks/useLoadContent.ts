import { useState, useEffect } from 'react';
import axios from 'axios';

type TInitResponse = {
  status: 'success' | 'fail' | 'pending';
  msg?: string;
};

type TContentObject = {
  loading: boolean;
  list: string[];
};

export const useLoadContent = () => {
  const [init, setInit] = useState<TInitResponse>({ status: 'pending' });

  const [movies, setMovies] = useState<TContentObject>({
    loading: false,
    list: [],
  });
  const [series, setSeries] = useState<TContentObject>({
    loading: false,
    list: [],
  });

  useEffect(() => {
    axios.get('http://localhost:12345/run/pirate-init').then(res => {
      if (res.status === 200) {
        setInit({ status: 'success' });
      } else {
        setInit({ status: 'fail', msg: res.data });
      }
    });
  }, []);

  useEffect(() => {
    if (
      init.status === 'success' &&
      !(movies.loading || series.loading) &&
      movies.list.length === 0 &&
      series.list.length === 0
    ) {
      setMovies(obj => ({ ...obj, loading: true }));
      setSeries(obj => ({ ...obj, loading: true }));

      axios.get('http://localhost:12345/content/movies').then(res => {
        setMovies(obj => ({
          ...obj,
          loading: false,
          list: res.data,
        }));
      });
      axios.get('http://localhost:12345/content/series').then(res => {
        setSeries(obj => ({
          ...obj,
          loading: false,
          list: res.data,
        }));
      });
    }
  }, [init.status, movies.list.length, movies.loading, series.loading]);

  return {
    movieList: movies.list,
    seriesList: series.list,
    loading: init.status === 'pending' || movies.loading || series.loading,
  };
};
