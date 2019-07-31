import { IPlayer } from "../interfaceIPlayer";


type TSetTokenAction = {
    type: "SET_TOKEN";
    token: string;
};

type TSetUSersAction = {
    type: "SET_PLAYERS";
    players: IPlayer [];
};

export type TAction = TSetTokenAction | TSetUSersAction;