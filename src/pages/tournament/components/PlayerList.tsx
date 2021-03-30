import * as React from "react";
import { useEffect, useReducer } from "react";
import { FormControl, LinearProgress, makeStyles, MenuItem, Select, TextField, } from "@material-ui/core";
import { fetchCheaters, fetchPlayers, QueryOptions } from "../tournamentService";
import { initialState, tournamentReducer } from "../tournamentReducer";
import { Pagination } from "../../../components/pagination/Pagination";
import { usePagination } from "../../../components/pagination/paginationReducer";

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
    cheater: {
        borderLeft: '3px solid red',
    },
    playerName: {
        textTransform: 'uppercase'
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

function PlayerList(): JSX.Element {
    const classes = useStyles();

    const [state, dispatch] = useReducer(tournamentReducer, initialState);
    const { data, isLoading, isError, selectedLevel, searchText } = state;
    const { page, setPage, perPage, setPerPage } = usePagination();

    useEffect(() => {
        const queryOptions: QueryOptions = { page, perPage, selectedLevel, searchText };

        dispatch({ type: 'FETCH_START' });
        fetchPlayers(queryOptions)
            .then((resultData) => {
                dispatch({ type: 'FETCH_SUCCESS', payload: resultData });
            })
            .catch((e) => {
                dispatch({ type: 'FETCH_ERROR', payload: e });
            })

    }, [page, perPage, selectedLevel, searchText]);

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
    if (!data || !data.players || data.players.length === 0) {
        return (<>
            No records found.. Check back later!
        </>)
    }

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
                {data.players.map((player) => {
                    return (<tr key={player.id} className={player.isCheater ? classes.cheater : ''}>
                        <td>{player.id}</td>
                        <td className={classes.playerName}>{player.name}</td>
                        <td>{player.level}</td>
                        <td>{player.score}</td>
                    </tr>)
                })}
                </tbody>
            </table>
            <Pagination totalItems={data.total}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        page={page}
                        perPage={perPage}


            />
        </>
    );
}

export default PlayerList;
