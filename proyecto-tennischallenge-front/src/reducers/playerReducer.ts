import { TAction } from '../actions/actionType';
import { IPlayer } from '../interfaceIPlayer';

const initialState: IPlayer = {
    id_player: 0,
    username: "",
    email: "",
    city: "",
    genre: "",
    rating: 0,
    isAdmin: false
};

export const playerReducer = (
    state: IPlayer = initialState,
    action: TAction
): IPlayer => {
    if (action.type === "SET_PLAYER") {
        return  action.player;
    }
    else if (action.type === "UPDATE_PLAYER") {
        return  action.player;
    }
    return state;
}