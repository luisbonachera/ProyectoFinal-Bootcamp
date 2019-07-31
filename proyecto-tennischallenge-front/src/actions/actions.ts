import { ActionCreator } from "redux";
import { TAction } from "./actionType";


export const setToken: ActionCreator<TAction> = (token: string) => ({
    type: "SET_TOKEN",
    token
})