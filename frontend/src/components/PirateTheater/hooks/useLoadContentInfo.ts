import axios from "axios";
import { useEffect, useState } from "react";
import { TContent } from "..";

export type TSeriesSeasons = Record<`s${number}`, string[]>;

type TContentInfo = {
  seasons?: TSeriesSeasons;
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
        .then(res => {
          setInfo(res.data || {});
          console.log(res);
          setLoading(false);
        });
    }
  }, [content, info, loading]);

  return {
    loading,
    seasons: info?.seasons,
  };
};
