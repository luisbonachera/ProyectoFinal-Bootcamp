
import { combineReducers } from 'redux';
import { tokenReducer } from './tokenReducer';
import { IPlayer } from '../interfaceIPlayer';
import { playersReducer } from './playersReducer';
import { IMsg } from '../interfaceIMsg';
import { messagesReducer } from './messagesReducer';


export interface IGlobalState {
    token: string;
    players: IPlayer [];
    msgs: IMsg [];
};

export const reducers = combineReducers({
    token: tokenReducer,
    players: playersReducer,
    msgs: messagesReducer
})