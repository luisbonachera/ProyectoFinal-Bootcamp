import { IPlayer } from "../interfaceIPlayer";
import { IMsg } from "../interfaceIMsg";
import { IFriendship } from "../interfaceIFriendship";
import { INotifications } from "../interfaceINotifications";

type TSetTokenAction = {
  type: "SET_TOKEN";
  token: string;
};

type TSetPlayersAction = {
  type: "SET_PLAYERS";
  players: IPlayer[];
};

type TSetPlayerAction = {
  type: "SET_PLAYER";
  player: IPlayer;
};

type TSetMsgsAction = {
  type: "SET_MESSAGES";
  msgs: IMsg[];
};

type TDeletePlayerAction = {
  type: "DELETE_PLAYER";
  id_player: number;
};

type TUpdatePlayerAction = {
  type: "UPDATE_PLAYER";
  player: IPlayer;
};

type TUpdatePlayersAction = {
  type: "UPDATE_PLAYERS";
  player: IPlayer;
};

type TSetFriendshipAction = {
  type: "SET_FRIENDSHIPS";
  friendships: IFriendship[];
};

type TDeleteFriendshipAction = {
  type: "DELETE_FRIENDSHIP";
  id_friendship: number;
};

type TSetNotificationsAction = {
  type: "SET_NOTIFICATIONS";
  notifications: INotifications;
};

type TSetYourFriendshipAction = {
  type: "SET_YOURFRIENDSHIPS";
  yourFriendships: IFriendship[];
};

type TDeleteYourFriendshipAction = {
  type: "DELETE_YOURFRIENDSHIP";
  id_friendship: number;
};

export type TAction =
  | TSetTokenAction
  | TSetPlayersAction
  | TSetPlayerAction
  | TSetMsgsAction
  | TDeletePlayerAction
  | TUpdatePlayerAction
  | TUpdatePlayersAction
  | TSetFriendshipAction
  | TDeleteFriendshipAction
  | TSetNotificationsAction
  | TSetYourFriendshipAction
  | TDeleteYourFriendshipAction;
