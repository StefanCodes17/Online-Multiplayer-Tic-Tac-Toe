export function GenerateTemplateBoard(size=3){
    const tempBoardState = new Array(size).fill(' ').map(() => new Array(size).fill(' '));
    let random_x;
    let random_y;
    let map = ['X', 'O']
    let greater = Math.floor(Math.random() * 2)
    let greaterCount = 0;
    for(let i = 0; i< size; i++){
        for(let j = 0; j < size; j++){
            do{
                random_x = Math.floor(Math.random() * (size))
                random_y = Math.floor(Math.random() * (size))
            }while(tempBoardState[random_x][random_y] !== ' ')
            if(greaterCount < (size + 1)) tempBoardState[random_x][random_y] = map[greater]
            else tempBoardState[random_x][random_y] = map[(greater + 1) % 2]
            greaterCount++;
        }
    }
    return tempBoardState
}
