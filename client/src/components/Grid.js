
import { useEffect, useState } from 'react';
import './Grid.css'

const Grid = ({size, temp})=> {

    const [boardObj, setBoardObj] = useState({
        boardState: []
    })

    function generateBoard(){
        const tempBoardState = []
        let randomNumber;
        let map =  ['X', 'O']
        for(let i = 0; i < size; i++ ){
            let tempRow = []
            for(let j = 0; j < size; j++){
                randomNumber = Math.floor(Math.random() * 2)
                tempRow.push(map[randomNumber])
            }
            tempBoardState.push(tempRow)
        }
        setBoardObj({boardState: tempBoardState})
    }

    useEffect(()=>{
        generateBoard()
    }, [size])

    return (
        <div className="grid__container" style={{
            gridTemplateColumns: `repeat(${size}, minmax(90px, 1fr))`,
            gridTemplateRows: `repeat(${size}, minmax(90px, 1fr))`
            }}>
            {boardObj.boardState.map((row, row_idx)=>{
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
