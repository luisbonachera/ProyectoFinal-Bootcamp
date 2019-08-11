import { IMsg } from '../interfaceIMsg';
import { TAction } from '../actions/actionType';
import { IFriendship } from '../interfaceIFriendship';


const initialState : IFriendship [] = [];
//     id_friends: 0,
//     id_player1: 0,
//     id_player2: 0,
//     watched: false,
//     accepted: false,
//     username: ""
// }

export const friendshipsReducer = (
    state : IFriendship [] = initialState,
    action: TAction
): IFriendship [] => {

    if(action.type === "SET_FRIENDSHIPS"){
        return action.friendships;
    }
    return state;

}