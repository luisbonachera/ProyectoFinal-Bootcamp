import { IPlayer } from "../interfaceIPlayer";
import { IMsg } from "../interfaceIMsg";


type TSetTokenAction = {
    type: "SET_TOKEN";
    token: string;
};

type TSetPlayersAction = {
    type: "SET_PLAYERS";
    players: IPlayer [];
};

type TSetPlayerAction = {
    type: "SET_PLAYER";
    player: IPlayer;
};

type TSetMsgsAction = {
    type: "SET_MESSAGES";
    msgs: IMsg [];
};

type TDeletePlayerAction = {
    type : "DELETE_PLAYER";
    id_player: number;
}

type TUpdatePlayerAction = {
    type : "UPDATE_PLAYER";
    player: IPlayer;
}

type TUpdatePlayersAction = {
    type : "UPDATE_PLAYERS";
    player: IPlayer;
}

export type TAction = TSetTokenAction | TSetPlayersAction | TSetPlayerAction | TSetMsgsAction | TDeletePlayerAction | TUpdatePlayerAction | TUpdatePlayersAction;