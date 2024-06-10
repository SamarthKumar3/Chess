import React from 'react';

import './Tile.css'

interface TileProps {
    number: number;
    image: string;
}


const Tile = (props: TileProps) => {
    if ((props.number + 2) % 2 == 0) {
        return (
            <div className='chessboard-tile dark' >
                {props.image && <div style={{ backgroundImage: `url('${props.image}')` }} className='chess-piece'></div>}
            </div>
        )
    } else {
        return (
            <div className='chessboard-tile light' >
                {props.image && <div className="chess-piece" style={{ backgroundImage: `url('${props.image}')` }}></div>}
            </div>
        )
    }
}

export default Tile;    