
import './Grid.css'

const template = {
    gameID: 'n8dg12h9d8t3178d91',
    playerTurn: 0, // 0 - (n-1) /* references index in socket player array
    boardState: [
        ['X', 'O', 'X'],
        ['O', 'X', 'X'],
        ['O', ' ', ' ']
    ]
}

const Grid = ({size})=> {
    return(
        <div className="grid__container">
            {template.boardState.map((row, row_idx)=>{
                return row.map((col, col_idx) =>{
                    return (
                        <div className="cell" key={row_idx+col_idx}>{col}</div>
                    )
                })
            })}
        </div>
    )
}

export default Grid;
