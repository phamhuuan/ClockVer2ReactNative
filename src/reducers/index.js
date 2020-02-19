import {stopWatchReducer, sortReducer} from './StopWatchReducer';
import {createStore, combineReducers} from 'redux';

export const store = createStore(
	combineReducers({stopWatchReducer, sortReducer}),
);
