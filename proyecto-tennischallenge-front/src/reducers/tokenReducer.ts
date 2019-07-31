import { TAction } from '../actions/actionType';

const initialState = "";

export const tokenReducer = (
    state: string = initialState,
    action: TAction
    ): string => {
        if(action.type === "SET_TOKEN"){
            return action.token;
        }
        return state;
};