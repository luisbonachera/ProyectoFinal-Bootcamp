import { TAction } from '../actions/actionType';
import { IFriendship } from '../interfaceIFriendship';


const initialState : IFriendship [] = [];

export const yourFriendshipsReducer = (
    state : IFriendship [] = initialState,
    action: TAction
): IFriendship [] => {

    if(action.type === "SET_YOURFRIENDSHIPS"){
        return action.yourFriendships;
    }else if (action.type === "DELETE_YOURFRIENDSHIP"){
        let index = state.findIndex(f=> f.id_friends === action.id_friendship);
    state.splice(index,1)
    return [...state]; //aqui me retorna los estados
    }
    return state;
}