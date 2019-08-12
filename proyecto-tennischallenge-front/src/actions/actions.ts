import { ActionCreator } from "redux";
import { TAction } from "./actionType";
import { IPlayer } from "../interfaceIPlayer";
import { IMsg } from '../interfaceIMsg';
import { IFriendship } from "../interfaceIFriendship";



export const setToken: ActionCreator<TAction> = (token: string) => ({
    type: "SET_TOKEN",
    token
});

export const setPlayers: ActionCreator<TAction> = (players: IPlayer[]) => ({
    type: "SET_PLAYERS",
    players
});

export const setPlayer: ActionCreator<TAction> = (player: IPlayer) => ({
    type: "SET_PLAYER",
    player
});

export const setMessages: ActionCreator<TAction> = (msgs: IMsg[]) => ({
    type: "SET_MESSAGES",
    msgs
});

export const deletePlayer: ActionCreator<TAction> = (id_player: number) => ({
    type : "DELETE_PLAYER",
    id_player
});

export const updatePlayer: ActionCreator<TAction> = (player: IPlayer) => ({
    type: "UPDATE_PLAYER",
    player
});

export const updatePlayers: ActionCreator<TAction> = (player: IPlayer) => ({
    type: "UPDATE_PLAYERS",
    player
});

export const setFriendships: ActionCreator<TAction> = (friendships: IFriendship []) => ({
    type: "SET_FRIENDSHIPS",
    friendships
});

export const deleteFriendship: ActionCreator<TAction> = (id_friendship: number) => ({
    type: "DELETE_FRIENDSHIP",
    id_friendship
});

