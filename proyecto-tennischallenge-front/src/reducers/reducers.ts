
import { combineReducers } from 'redux';
import { tokenReducer } from './tokenReducer';
import { IPlayer } from '../interfaceIPlayer';
import { playersReducer } from './playersReducer';
import { IMsg } from '../interfaceIMsg';
import { messagesReducer } from './messagesReducer';
import { playerReducer } from './playerReducer';
import { IFriendship } from '../interfaceIFriendship';
import { friendshipsReducer } from './friendshipReducers';
import { INotifications } from '../interfaceINotifications';
import { notificationsReducer } from './notificationsReducer';
import { yourFriendshipsReducer } from './yourFrinedshipReducers';

export interface IGlobalState {
    token: string;
    players: IPlayer [];
    player: IPlayer;
    msgs: IMsg [];
    friendships: IFriendship [];
    notifications: INotifications;
    yourFriendships: IFriendship [];
};

export const reducers = combineReducers({
    token: tokenReducer,
    players: playersReducer,
    player: playerReducer,
    msgs: messagesReducer,
    friendships: friendshipsReducer,
    notifications: notificationsReducer,
    yourFriendships: yourFriendshipsReducer
})