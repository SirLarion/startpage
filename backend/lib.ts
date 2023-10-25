import ffmpeg from 'fluent-ffmpeg';
import { any } from 'ramda';

const { THEATER_PATH } = process.env;

const VALID_VIDEO_FILETYPES = ['.mp4', '.mkv', '.avi'];

type TMetadata = {
  length: string;
};

export const getIsTheaterInit = async () => {
  return await Bun.file(`${THEATER_PATH}/probe`).exists();
};

export const getVideoFile = (files: string[]) =>
  files.find((file: string) =>
    any((ft: string) => file.endsWith(ft))(VALID_VIDEO_FILETYPES)
  );

export const toUtfSpaces = (str: string) => str.replace(/%20/g, ' ');

export const getMetaData = (videoFile: string) =>
  new Promise<TMetadata>((resolve, reject) => {
    ffmpeg.ffprobe(videoFile, (err, meta) => {
      if (err) reject(err);

      const duration = meta?.format?.duration || 0;
      const hours = Math.floor(duration / 3600);
      const minutes = (duration / 3600 - hours) * 60;
      resolve({
        length: `${hours > 0 ? hours + 'h ' : ''}${Math.floor(minutes)}m`,
      });
    });
  });
