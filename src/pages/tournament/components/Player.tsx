import * as React from "react";
import { Card } from "../../../components/card/Card";
import { IPlayer } from "../player.interface";

type PlayerProps = {
    player: IPlayer;
}


function Player({ player }: PlayerProps): JSX.Element {

    const { id, name, level, score  } = player;

    return (
        <article>

            <Card>
                {{
                    header: name,
                    content: level,
                }}

            </Card>
        </article>
    )
}

export default Player;
