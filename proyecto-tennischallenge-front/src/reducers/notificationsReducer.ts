import { TAction } from "../actions/actionType";
import { INotifications } from "../interfaceINotifications";

const initialState: INotifications = {
  number_messages: 0,
  numbers_requestFriend: 0,
  numbers_acceptedFriend: 0
};

export const notificationsReducer = (
  state: INotifications = initialState,
  action: TAction
): INotifications => {
  if (action.type === "SET_NOTIFICATIONS") {
    return action.notifications;
  }

  return state;
};
