import * as React from "react";
import { IPlayer } from "../player.interface";
import { makeStyles } from "@material-ui/core";

type PlayerProps = {
    player: IPlayer;
}

const useStyles = makeStyles(() => ({
        cheater: {
            borderLeft: '3px solid red',
        },
        playerName: {
            textTransform: 'uppercase'
        }}
));


function PlayerRow({ player }: PlayerProps): JSX.Element {
    const classes = useStyles();
    const { id, name, level, score, isCheater  } = player;

    return (
        <tr key={id} className={isCheater ? classes.cheater : ''}>
            <td>{id}</td>
            <td className={classes.playerName}>{name}</td>
            <td>{level}</td>
            <td>{score}</td>
        </tr>
    )
}

export default PlayerRow;
