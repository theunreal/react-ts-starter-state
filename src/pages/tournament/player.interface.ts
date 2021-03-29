export interface IPlayer {
    name: string;
    level: string;
    score: number;
    id: number;
    isCheater?: boolean;
}

export interface PlayerMap {
    [key: string]: IPlayer;
}
