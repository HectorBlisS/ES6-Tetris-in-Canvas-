import { BLOCK_SIZE, COLORS, COLS, KEY, ROWS, SHAPES } from "../constants.js";
import { setNextOrGameOver } from "./main.js";
import { drawBox, drawPreview } from "./pieces.js";

const xOffset = 3;
const yOffset = 2;
let grid = Array.from({length:ROWS},()=>{
    return Array.from({length:COLS},()=>0);
});

const canvas = document.querySelector('#main');
const ctx = canvas.getContext('2d');
canvas.width = COLS*BLOCK_SIZE;
canvas.height = ROWS*BLOCK_SIZE;

export const getEmptyGrid = () => Array.from({length:ROWS},()=>{
    return Array.from({length:COLS},()=>0);
});
let freeze = getEmptyGrid();
freeze[19][0]=1
freeze[19][1]=1
freeze[19][2]=1
freeze[19][3]=1
freeze[19][4]=1
freeze[19][5]=1
freeze[19][6]=1
freeze[19][7]=1
freeze[19][8]=1
freeze[19][9]=1

export const showPause = ()=>{
    ctx.fillStyle="black"
    ctx.fillRect(1.5*BLOCK_SIZE+6,3*BLOCK_SIZE-6, 200,100)
    ctx.font = "44px Arial";
    ctx.fillStyle="white"
    ctx.fillText("PAUSE" ,2.5*BLOCK_SIZE,5*BLOCK_SIZE);



}

export const freezeGrid=(grid)=>{
    const newFreeze = [...freeze]
    // need to combine current freeze and grid
    grid.forEach((row,y)=>{
        row.forEach((number,x)=>{
            if(number>0){
                newFreeze[y][x] = number;
            }
        })  
    })
    freeze = [...newFreeze];
}

export const checkIfFreeze = (position,shape) => {
    let result = false;
        shape.shape.forEach((row,y)=>{
            row.forEach((number,x)=>{
// necesitamos verificar debajo solamente de los numeros no de los ceros            
                if(number>0){
                    if(freeze[position.y+y][position.x+x]>0){
                        // coliition
                        result = true
                    }
                }
         
            })
        })
        return result;
}

export const drawGrid = (grid) => { // need two cicles to overdraw
    // draw grid
    grid.forEach((row,y)=>{
        row.forEach((number, x)=>{
            if(number<1){
                drawBox(x,y,number, ctx);
            }
        })
    });

    // draw shape
    grid.forEach((row,y)=>{
        row.forEach((number, x)=>{
            if(number>0){
                drawBox(x,y,number, ctx);
            }
        })
    });
        // draw freeze
        freeze.forEach((row,y)=>{
            row.forEach((number,x)=>{
                if(number<1)return;
                drawBox(x,y,number,ctx)
            })
        })

}


const getGrid = () =>{
    drawGrid(grid);
    return grid; 
}

export const setShape = (shape, board,position)=> {
    // new grid
    board.grid = getEmptyGrid()
    // what if square? @TODO==============================
    const newPrint = getEmptyGrid();
    shape.shape.forEach((row,y)=>{
        row.forEach((number,x)=>{
            newPrint[position.y+y][position.x+x] = number;
        })
    });
    board.grid = newPrint;
    drawGrid(board.grid);

}

export const deleteShape = (board,shape,position) => {
    shape.shape.forEach((row,y)=>{
        row.forEach((_,x)=>{
            board.grid[position.y+y][position.x+x] = 0;
        })
    })
}

export const getBoard = () => ({
    grid:getGrid(),
    setShape,
}

)