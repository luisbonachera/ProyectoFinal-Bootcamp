import { TAction } from "../actions/actionType";
import { IPlayer } from "../interfaceIPlayer";

const initialState: IPlayer[] = [];

export const playersReducer = (
  state: IPlayer[] = initialState,
  action: TAction
): IPlayer[] => {
  if (action.type === "SET_PLAYERS") {
    return action.players;
  } else if (action.type === "DELETE_PLAYER") {
    const index = state.findIndex(u => u.id_player === action.id_player);
    state.splice(index, 1); // esto me elimina con el splice el ultimo elemento de mi array
    return [...state]; //aqui me retorna los estados
  } else if (action.type === "UPDATE_PLAYERS") {
    const index = state.findIndex(u => u.id_player === action.player.id_player);
    state[index] = {
      ...state[index],
      ...action.player
    };
    state[index] = action.player; // esto me elimina con el splice el ultimo elemento de mi array
    return [...state]; //aqui me retorna los estados
  }
  return state;
};
