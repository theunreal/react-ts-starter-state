import { IPlayer } from "./player.interface";
import axiosIntsance from "../../config/axios";

export type PlayersResponse = {
    players: IPlayer[] | undefined,
    total: number,
}

export type QueryOptions = {
    page: number;
    recordsPerPage: number;
    selectedLevel: string;
    searchText: string;
}

const defaultQueryOptions: QueryOptions  = {
    page: 0,
    recordsPerPage: 10,
    selectedLevel: '',
    searchText: ''
}

export const fetchPlayers = async(queryOptions: QueryOptions = defaultQueryOptions, cheaters: number[] = []): Promise<PlayersResponse> => {
    const { page, recordsPerPage, selectedLevel, searchText } = queryOptions;

    const start = page * recordsPerPage;
    let url = `players?start=${start}&n=${recordsPerPage}`;
    if (selectedLevel) {
        url += `&level=${selectedLevel}`;
    }

    if (searchText) {
        url += `&search=${searchText}`
    }

    const response = await axiosIntsance.get<IPlayer[]>(url);
    if (cheaters) {
        response.data = response.data.map((player) => {
            player.isCheater = cheaters.includes(player.id);
            return player;
        })
    }
    return { players: response.data, total: response.headers['x-total']};
};

export const fetchCheaters = async(): Promise<number[]> => {
    const response = await axiosIntsance.get<number[]>('players/suspects');

    return response.data;
};
