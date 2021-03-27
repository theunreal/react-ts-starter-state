import * as React from "react";
import { useEffect, useState } from "react";
import {
    FormControl,
    IconButton, Input,
    LinearProgress,
    makeStyles,
    MenuItem,
    Select,
    TextField,
} from "@material-ui/core";
import { fetchPlayers, playersResponse } from "../tournamentService";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

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
    }

}));

function PlayerList(): JSX.Element {
    const classes = useStyles();

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [result, setResult] = useState<playersResponse>();

    // Paging
    const [page, setPage] = useState(0);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [pageRowOptions, setPageRowOptions] = useState([10, 25, 50, 100]);

    // Selected level
    const [selectedLevel, setSelectedLevel] = useState('');
    // Free Search
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        setIsLoading(true);
        fetchPlayers(page, recordsPerPage, selectedLevel, searchText)
            .then((resultData) => {
                setResult(resultData)
                setIsLoading(false);
            })
            .catch((e) => setIsError(true))

    }, [page, recordsPerPage, selectedLevel, searchText]);


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
    if (!result || !result.data.length) {
        return (<>
            No records found.. Check back later!
        </>)
    }


    const maxPage = result.total / recordsPerPage;
    const levels = ['amateur', 'rookie', 'pro'];

    return (
        <>
            <div>
                <h1>Tournament 101 - Final Results</h1>
            </div>
            {isLoading ? <LinearProgress/> : null}

            <TextField id="standard-basic" label="Standard" onChange={(event => setSearchText(event.target.value))} />

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
                                onChange={event => setSelectedLevel(event.target.value as string)}
                            >
                                <MenuItem value=""><em>All</em></MenuItem>
                                {levels.map((level) => <MenuItem value={level}>{level}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </td>
                    <td>Score</td>
                </tr>
                </thead>
                {result.data.map(player => <tr>
                    <td>{player.id}</td>
                    <td className={classes.playerName}>{player.name}</td>
                    <td>{player.level}</td>
                    <td>{player.score}</td>
                </tr>)}
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
                                setPage(0)
                                setRecordsPerPage(Number(event.target.value))
                            }}
                        >
                            {pageRowOptions.map((option) => <MenuItem value={option}>{option}</MenuItem>)}
                        </Select>
                    </FormControl>
                </section>

                <section>
                    <IconButton
                        disabled={page === 0}
                        onClick={() => setPage(page - 1)}>
                        <NavigateBeforeIcon />
                    </IconButton>
                    <IconButton
                        disabled={page === maxPage - 1}
                        onClick={() => setPage(page + 1)}><NavigateNextIcon /></IconButton>
                </section>
            </section>
        </>
    );
}

export default PlayerList;
