
import { combineReducers } from 'redux';
import { tokenReducer } from './tokenReducer';
import { IPlayer } from '../interfaceIPlayer';
import { playersReducer } from './playersReducer';
import { IMsg } from '../interfaceIMsg';
import { messagesReducer } from './messagesReducer';
import { playerReducer } from './playerReducer';


export interface IGlobalState {
    token: string;
    players: IPlayer [];
    player: IPlayer;
    msgs: IMsg [];
};

export const reducers = combineReducers({
    token: tokenReducer,
    players: playersReducer,
    player: playerReducer,
    msgs: messagesReducer
})