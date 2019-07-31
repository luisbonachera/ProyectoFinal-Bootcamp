
import { combineReducers } from 'redux';
import { tokenReducer } from './tokenReducer';
import { IPlayer } from '../interfaceIPlayer';
import { playersReducer } from './playersReducer';


export interface IGlobalState {
    token: string;
    players: IPlayer [];
};

export const reducers = combineReducers({
    token: tokenReducer,
    players: playersReducer
})