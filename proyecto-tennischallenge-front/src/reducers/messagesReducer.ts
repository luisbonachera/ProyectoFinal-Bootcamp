import { IMsg } from '../interfaceIMsg';
import { TAction } from '../actions/actionType';


const initialState : IMsg [] = [];

export const messagesReducer = (
    state : IMsg [] = initialState,
    action: TAction
): IMsg [] => {

    if(action.type === 'SET_MESSAGES'){
        return action.msgs;
    }
    return state;

}