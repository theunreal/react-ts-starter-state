import { PlayersResponse } from "./tournamentService";
import { IPlayer } from "./player.interface";

interface IAction {
    type: string;
    payload?: any;
}

interface IState {
    data: PlayersResponse | undefined;
    isLoading: boolean;
    isError: boolean;
    selectedLevel: string;
    searchText: string;
    cheaters: number[];
}

export const initialState: IState = {
    isLoading: false,
    data: {
        players: [],
        total: 0
    },
    isError: false,
    selectedLevel: '',
    searchText: '',
    cheaters: []
};

const updateCheaters = (players: IPlayer[], cheaters: number[]): IPlayer[] | undefined => {
    if (!cheaters || !cheaters.length || !players.length) {
        return;
    }
    return players.map((player) => {
        player.isCheater = cheaters.includes(player.id);
        return player;
    });
};

export const tournamentReducer = (state: IState, action: IAction): IState => {
    const { type, payload } = action;
    switch (type) {
        case 'FETCH_START':
            return {
                ...state,
                isLoading: true
            };
        case 'FETCH_SUCCESS':
            const players = state.cheaters.length ? updateCheaters(payload.players, state.cheaters) : payload.players;
            return {
                ...state,
                isLoading: false,
                data: {...payload, players},
                isError: false
            };
        case 'FETCH_ERROR':
            return {
                ...state,
                isError: true,
                isLoading: false
            };
        case 'FETCH_CHEATERS_SUCCESS':
            if (!state.data || !state.data.players) {
                return state;
            }
            const updatedPlayers = updateCheaters(state.data.players, payload);
            return {
                ...state,
                cheaters: payload,
                data: {...state.data, players: updatedPlayers}
            };
        case 'DO_SEARCH':
            return {
                ...state,
                searchText: payload
            };
        case 'SET_LEVEL':
            return {
                ...state,
                selectedLevel: payload
            };
        default:
            console.warn("Invalid action: " + type);
            return state;
    }
};
