import * as React from "react";
import { useEffect, useReducer, useState } from "react";
import { FormControl, LinearProgress, makeStyles, MenuItem, Select, TextField, } from "@material-ui/core";
import { fetchCheaters, fetchPlayers, QueryOptions } from "../tournamentService";
import { initialState, tournamentReducer } from "../tournamentReducer";
import { Pagination } from "../../../components/pagination/Pagination";
import { usePagination } from "../../../components/pagination/paginationReducer";
import PlayerRow from "./PlayerRow";

const useStyles = makeStyles(() => ({
    playerTable: {
        width: '100%',
        backgroundColor: 'white',
        borderCollapse: 'collapse',
        padding: '10px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        "& tr": {
            "&:hover": {
                backgroundColor: '#eee',
            },
        },
        "& td": {
            padding: '6px',
        },
    },
    headerSubtitle: {
        display: 'flex',
        width: '20%',
        paddingLeft: '1em',
        color: 'grey',
    },
    smallSelect: {
        outline: 'none',
        border: 'none',
        background: 'none',
        fontSize: '14px',
        height: '18px',
        marginTop: '4px',
        marginLeft: '5px',
    },

}));

const useDebounce = (value: any, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        }
    }, [value, delay]);

    return debouncedValue;
};

function PlayerList(): JSX.Element {
    const classes = useStyles();

    const [state, dispatch] = useReducer(tournamentReducer, initialState);
    const { data, isLoading, isError, selectedLevel, searchText } = state;
    const { page, setPage, perPage, setPerPage } = usePagination();
    const debouncedSearchTerm = useDebounce(searchText, 500);


    useEffect(() => {
        const queryOptions: QueryOptions = { page, perPage, selectedLevel, searchText: debouncedSearchTerm };

        dispatch({ type: 'FETCH_START' });
        fetchPlayers(queryOptions)
            .then((resultData) => {
                dispatch({ type: 'FETCH_SUCCESS', payload: resultData });
            })
            .catch((e) => {
                dispatch({ type: 'FETCH_ERROR', payload: e });
            })
    }, [page, perPage, selectedLevel, debouncedSearchTerm]);

    useEffect(() => {
        const getCheaters = async () => {
            const cheaters = await fetchCheaters();
            dispatch({ type: 'FETCH_CHEATERS_SUCCESS', payload: cheaters });
        };
        getCheaters();
    }, []);

    const handleChangePage = (updatedValue: number) => {
        setPage(updatedValue);
    };
    const handleChangeRowsPerPage = (updatedValue: number) => {
        setPerPage(updatedValue)
    };


    if (isError) {
        return (<>
            <h4>Oops.. failed to load player list.</h4>
        </>);
    }

    /**
     * TODO: Fix issue when search return no results and there is no search input.
     * Possible fix: Move the table to another component and move the data check empty to there.
     * Same for pagination.
     */
    const noRecords = !data || !data.players || data.players.length === 0;

    const levels = ['amateur', 'rookie', 'pro'];

    return (
        <>
            <div>
                <h1>Tournament 101 - Final Results</h1>
            </div>
            {isLoading ? <LinearProgress/> : null}

            <TextField id="standard-basic" label="Standard" onChange={(event => {
                dispatch({ type: 'DO_SEARCH', payload: event.target.value });
            })}/>

            {data && data.players && data.players.length > 1 ?
                <section>
                    <table className={classes.playerTable}>
                        <thead>
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Level
                                <FormControl>
                                    <Select
                                        labelId="level-search-label"
                                        id="level-search"
                                        value={selectedLevel}
                                        className={classes.smallSelect}
                                        displayEmpty
                                        onChange={event => {
                                            dispatch({ type: 'SET_LEVEL', payload: event.target.value })
                                        }}
                                    >
                                        <MenuItem value=""><em>All</em></MenuItem>
                                        {levels.map((level) => <MenuItem key={level} value={level}>{level}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </td>
                            <td>Score</td>
                        </tr>
                        </thead>
                        <tbody>
                        {data.players.map((player) => <PlayerRow player={player}/>)}
                        </tbody>
                    </table>
                    <Pagination totalItems={data.total}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                page={page}
                                perPage={perPage}
                    />
                </section> :
                <section>
                    <h3>No Records Found</h3>
                </section>
            }
        </>
    );
}

export default PlayerList;
