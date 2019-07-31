
import { combineReducers } from 'redux';
import { tokenReducer } from './tokenReducer';


export interface IGlobalState {
    token: string;
};

export const reducers = combineReducers({
    token: tokenReducer
})