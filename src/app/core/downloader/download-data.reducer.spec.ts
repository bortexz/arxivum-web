import { INITIAL_REDUCERS } from '@ngrx/store';
import * as DownloaderActions from './downloader.actions';
import {downloadDataReducer} from './download-data.reducer';

describe('downloadDataReducer', () => {
  it('should initialise to empty object', () => {
    const state = downloadDataReducer(undefined, {type: '@ngrx/store/init'})
    expect(state).toEqual({})
  })

  it('should add file progress', () => {
    const state = downloadDataReducer({}, new DownloaderActions.FileProgress('1', 50));
    expect(state).toEqual({
      '1': {
        progress: 50
      }
    })
  })

  it('should remove from state when removed file', () => {
    const removedState = downloadDataReducer({
      '1': {
        progress: 50
      }
    },  new DownloaderActions.RemoveFile({_id: '1'}))
  })
})
