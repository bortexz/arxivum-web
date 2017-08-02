import { PlayerActions } from './player.actions';
import { IDownloadingFile } from '../downloader/downloader.reducer';

/**
 * While the file gets loaded in webtorrent, we only have id
 */
export interface PlayerState {
  id: string; // Used to know which file is being played
  file?: IDownloadingFile;
}

const initialState: PlayerState = {
  id: null
};

export function playerReducer (state = initialState, { type, payload }) {
  switch (type) {
    case PlayerActions.PLAY_FILE:
      return { id: payload.file._id };
    case PlayerActions.PLAY_FILE_READY:
      return { file: payload.file };
  }
  return state;
}
