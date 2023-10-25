import axios from 'axios';
import { useEffect, useState } from 'react';
import { keys } from 'ramda';

import { TContent } from '..';

const YEAR_IN_MILLIS = 31557600000;

type TSeriesEpisode = {
  file: string;
  length: string;
  isSeen: boolean;
  lastPlayed: string;
};

export type TSeriesSeasons = Record<`s${number}`, TSeriesEpisode[]>;
export type TSeasonsRaw = Record<
  `s${number}`,
  Array<Omit<TSeriesEpisode, 'isSeen'>>
>;

type TContentInfo = {
  seasons?: TSeriesSeasons;
  length?: string;
};

export const useLoadContentInfo = (content: TContent | null) => {
  const [info, setInfo] = useState<TContentInfo | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!content && info !== undefined) {
      setInfo(undefined);
    }
    if (content && !loading && info === undefined) {
      setLoading(true);
      axios
        .get(
          `http://localhost:12345/content/${content.type}/${content.name}/info`
        )
        .then(({ data }) => {
          const seasonsObj = data.seasons as TSeriesSeasons | undefined;
          if (seasonsObj) {
            const seasons = keys(seasonsObj).reduce(
              (acc: TSeriesSeasons, s: `s${number}`) => {
                acc[s] = seasonsObj[s].map(ep => ({
                  ...ep,
                  isSeen:
                    !!ep.lastPlayed &&
                    Date.now() - new Date(ep.lastPlayed).getTime() <
                      YEAR_IN_MILLIS,
                }));

                return acc;
              },
              {} as TSeriesSeasons
            );
            setInfo({ ...data, seasons });
          } else {
            setInfo({
              ...data,
            });
          }
          setLoading(false);
        });
    }
  }, [content, info, loading]);

  return {
    loading,
    info,
  };
};
