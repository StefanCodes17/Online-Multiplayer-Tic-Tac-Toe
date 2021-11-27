
import { useEffect, useState } from 'react';
import './Grid.css'

const Grid = ({board, active=false, clickEvent})=> {

    const [boardState, setBoardState] = useState(board)

    //Rerender if board changes
    useEffect(()=>{
        setBoardState(board)
    }, [board])

    return (
        <div className="grid__container" style={{
            gridTemplateColumns: `repeat(${boardState.length}, minmax(90px, 1fr))`,
            gridTemplateRows: `repeat(${boardState.length}, minmax(90px, 1fr))`
        }}>
            {boardState.map((row, row_idx)=>{
                return row.map((col, col_idx) =>{
                    //Possible Cell Class extrapolation
                    return (
                        <div className="cell" key={row_idx+col_idx} onClick={()=> (active && col === ' ') && clickEvent(row_idx, col_idx)}>{col}</div>
                    )
                })
            })}
        </div>
    )
}

export default Grid;
