
import { useEffect, useState } from 'react';
import './Grid.css'

const Grid = ({size, temp, req, active=false, clickEvent})=> {

    const [boardObj, setBoardObj] = useState({
        boardState: []
    })

    function generateBoard(){
        const tempBoardState = new Array(size).fill(' ').map(() => new Array(size).fill(' '));
        let map = ['X', 'O']
        let greater = Math.floor(Math.random() * 2)
        let greaterCount = 0;
        for(let i = 0; i< size; i++){
            for(let j = 0; j < size; j++){
                let random_x = 0;
                let random_y = 0;
                do{
                    random_x = Math.floor(Math.random() * (size))
                    random_y = Math.floor(Math.random() * (size))
                }while(tempBoardState[random_x][random_y] != ' ')
                console.log(random_x, random_y)
                if(greaterCount < (size + 1)) tempBoardState[random_x][random_y] = map[greater]
                else tempBoardState[random_x][random_y] = map[(greater + 1) % 2]
                greaterCount++;
            }
        }
        setBoardObj({boardState: tempBoardState})
    }

    useEffect(()=>{
        temp && generateBoard()
        req && setBoardObj(req)
    }, [size, temp, req])

    return (
        <div className="grid__container" style={{
            gridTemplateColumns: `repeat(${size}, minmax(90px, 1fr))`,
            gridTemplateRows: `repeat(${size}, minmax(90px, 1fr))`
            }}>
            {boardObj.boardState.map((row, row_idx)=>{
                return row.map((col, col_idx) =>{
                    return (
                        <div className="cell" key={row_idx+col_idx} onClick={()=> (active && col == ' ') && clickEvent(row_idx, col_idx)}>{col}</div>
                    )
                })
            })}
        </div>
    )
}

export default Grid;
