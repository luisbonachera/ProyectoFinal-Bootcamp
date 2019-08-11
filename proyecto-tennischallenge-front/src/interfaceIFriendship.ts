export interface IFriendship {
    id_friends: number,
    id_player1: number,
    id_player2: number,
    watched: boolean,
    accepted: boolean,
    id_player: number;
    avatar: string;
    username: string;
    email: string;
    city: string;
    genre: string;
    rating: number;
    isAdmin: boolean;
}