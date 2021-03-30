import * as React from "react";
import { FormControl, IconButton, makeStyles, MenuItem, Select } from "@material-ui/core";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

type Props = {
    totalItems: number,
    perPage: number,
    page: number,
    onChangePage?: (updatedValue: number) => void,
    onChangeRowsPerPage?: (updatedValue: number) => void,
    pageRowOptions?: number[]
}
const useStyles = makeStyles(() => ({
    pagination: {
        display: 'flex',
        marginTop: '10px',
        alignItems: 'center',
        justifyContent: 'space-between'
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

}));

export function Pagination({
                               page, totalItems,
                               perPage = 10,
                               pageRowOptions = [10, 25, 50, 100],
                               onChangePage,
                               onChangeRowsPerPage
                           }: Props) {
    const classes = useStyles();

    if (page === null || !totalItems) {
        console.error(`page / totalItems attributes are not provided!`);
        return <></>;
    }

    const maxPage = totalItems / page;


    return <section className={classes.pagination}>
        <section>
            <span>Rows per page:</span>
            <FormControl>
                <Select
                    labelId="rows-per-page-label"
                    id="rows-select"
                    value={perPage}
                    className={classes.rowsPerPageSelect}
                    onChange={(event) => {
                        if (typeof(onChangeRowsPerPage) === 'function') {
                            onChangeRowsPerPage(parseInt(event.target.value as string, 10))
                        }
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
                    if (typeof(onChangePage) === 'function') {
                        onChangePage(page - 1)
                    }
                }
                }>
                <NavigateBeforeIcon/>
            </IconButton>
            <IconButton
                disabled={page === maxPage - 1}
                onClick={() => {
                    if (typeof(onChangePage) === 'function') {
                        onChangePage(page + 1)
                    }
                }}><NavigateNextIcon/></IconButton>
        </section>
    </section>


}

