import { IPlayer } from "./player.interface";
import axiosIntsance from "../../config/axios";

export type playersResponse = {
    data: IPlayer[],
    total: number
}

export const fetchPlayers = async(page: any = 0,
                                  recordsPerPage = 10,
                                  level: string | null = null,
                                  search: string | null = null): Promise<playersResponse> => {
    const start = page * recordsPerPage;
    let url = `players?start=${start}&n=${recordsPerPage}`;
    if (level) {
        url += `&level=${level}`;
    }

    if (search) {
        url += `&search=${search}`
    }

    const response = await axiosIntsance.get<IPlayer[]>(url);

    return { data: response.data, total: response.headers['x-total']};
};
