import { TAction } from '../actions/actionType';
import { IPlayer } from '../interfaceIPlayer';

const initialState: IPlayer [] = [];

export const playersReducer = (
    state: IPlayer [] = initialState,
    action: TAction
): IPlayer [] =>{
    if (action.type === "SET_PLAYERS"){
        return action.players;
    }
    return state;
}