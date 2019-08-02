import { IPlayer } from "../interfaceIPlayer";
import { IMsg } from "../interfaceIMsg";


type TSetTokenAction = {
    type: "SET_TOKEN";
    token: string;
};

type TSetUSersAction = {
    type: "SET_PLAYERS";
    players: IPlayer [];
};

type TSetMsgsAction = {
    type: "SET_MESSAGES";
    msgs: IMsg [];
};

export type TAction = TSetTokenAction | TSetUSersAction | TSetMsgsAction;