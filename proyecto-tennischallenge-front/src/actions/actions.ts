import { ActionCreator } from "redux";
import { TAction } from "./actionType";
import { IPlayer } from "../interfaceIPlayer";
import { IMsg } from '../interfaceIMsg';



export const setToken: ActionCreator<TAction> = (token: string) => ({
    type: "SET_TOKEN",
    token
});

export const setPlayers: ActionCreator<TAction> = (players: IPlayer[]) => ({
    type: "SET_PLAYERS",
    players
});

export const setMessages: ActionCreator<TAction> = (msgs: IMsg[]) => ({
    type: "SET_MESSAGES",
    msgs
});