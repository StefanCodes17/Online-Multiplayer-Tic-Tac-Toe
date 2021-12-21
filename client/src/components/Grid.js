import './Grid.css'

const Grid = ({board, active=false, clickEvent})=> {

    return (
        <div className="grid__container" style={{
            gridTemplateColumns: `repeat(${board.length}, minmax(90px, 1fr))`,
            gridTemplateRows: `repeat(${board.length}, minmax(90px, 1fr))`
        }}>
            {board.map((row, row_idx)=>{
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
