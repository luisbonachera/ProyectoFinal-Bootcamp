export interface IMsg {
    id_messages: number,
    id_player_destiny: number;
    id_player_sent: number;
    subject: string,
    date: Date,
    text: string;
    watched: boolean;
  }