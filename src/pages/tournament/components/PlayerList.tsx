import * as React from "react";
import { useEffect, useReducer } from "react";
import { FormControl, IconButton, LinearProgress, makeStyles, MenuItem, Select, TextField, } from "@material-ui/core";
import { fetchCheaters, fetchPlayers, QueryOptions } from "../tournamentService";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { initialState, tournamentReducer } from "../tournamentReducer";

const useStyles = makeStyles(() => ({
    playerTable: {
        width: '100%',
        backgroundColor: 'white',
        padding: '10px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
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
    pagination: {
        display: 'flex',
        marginTop: '10px',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    rowsPerPageLabel: {
        // marginTop: '4px'
    },
    rowsPerPageSelect: {
        outline: 'none',
        border: 'none',
        background: 'none',
        fontSize: '14px',
        height: '18px',
        marginTop: '4px',
        marginLeft: '5px',
    },
    cheater: {
        backgroundColor: 'red'
    }

}));

function PlayerList(): JSX.Element {
    const classes = useStyles();

    const [state, dispatch] = useReducer(tournamentReducer, initialState);
    const { data, isLoading, isError, page, recordsPerPage, pageRowOptions, selectedLevel, searchText, cheaters } = state;

    useEffect(() => {
        const queryOptions: QueryOptions = { page, recordsPerPage, selectedLevel, searchText };

        dispatch({ type: 'FETCH_START' });
        fetchPlayers(queryOptions)
            .then((resultData) => {
                dispatch({ type: 'FETCH_SUCCESS', payload: resultData });
            })
            .catch((e) => {
                dispatch({ type: 'FETCH_ERROR', payload: e });
            })

    }, [page, recordsPerPage, selectedLevel, searchText]);

    useEffect(() => {
        const getCheaters = async () => {
            const cheaters = await fetchCheaters();
            dispatch({ type: 'FETCH_CHEATERS_SUCCESS', payload: cheaters });
        };
        getCheaters();
    }, []);


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


    const maxPage = data.total / recordsPerPage;
    const levels = ['amateur', 'rookie', 'pro'];

    console.log(' players', data.players)

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
                                className={classes.rowsPerPageSelect}
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
                {data.players.map((player) => {
                    return (<tr key={player.id} className={player.isCheater ? classes.cheater : ''}>
                        <td>{player.id}</td>
                        <td className={classes.playerName}>{player.name}</td>
                        <td>{player.level}</td>
                        <td>{player.score}</td>
                    </tr>)
                })}
            </table>
            <section className={classes.pagination}>
                <section>
                    <span className={classes.rowsPerPageLabel}>Rows per page:</span>
                    <FormControl>
                        <Select
                            labelId="rows-per-page-label"
                            id="rows-select"
                            value={recordsPerPage}
                            className={classes.rowsPerPageSelect}
                            onChange={(event) => {
                                dispatch({ type: 'RESET_PAGE', payload: event.target.value })
                            }}
                        >
                            {pageRowOptions.map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                        </Select>
                    </FormControl>
                </section>

                <section>
                    <IconButton
                        disabled={page === 0}
                        onClick={() => {
                            dispatch({ type: 'SET_PAGE', payload: page - 1 })}
                        }>
                        <NavigateBeforeIcon/>
                    </IconButton>
                    <IconButton
                        disabled={page === maxPage - 1}
                        onClick={() => {
                            dispatch({ type: 'SET_PAGE', payload: page + 1 })
                        }}><NavigateNextIcon/></IconButton>
                </section>
            </section>
        </>
    );
}

export default PlayerList;
