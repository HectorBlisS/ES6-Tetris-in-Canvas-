import { BLOCK_SIZE, COLORS, COLS, ROWS, SHAPES } from "../constants.js";
import { drawBox, drawPreview } from "./nextPiece.js";

const canvas = document.querySelector('#main');
const ctx = canvas.getContext('2d');
canvas.width = COLS*BLOCK_SIZE;
canvas.height = ROWS*BLOCK_SIZE;

const drawGrid = (grid) => { // need two cicles to overdraw
    console.table(grid);
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
    })
}

const getGrid = () =>{
    const grid = Array.from({length:ROWS},()=>{
        return Array.from({length:COLS},()=>0);
    });
    drawGrid(grid);
    return grid; 
}

export const setShape = (shape, board)=> {
    // what if square? @TODO==============================
    const xOffset = 3;
    const yOffset = 2;
    let i = 0;
    let j = 0;

    shape.forEach((row,y)=>{
        row.forEach((number,x)=>{
            if(number>0) {
                board.grid[yOffset+y][xOffset+x] = number;
            }
        })
    })

    drawGrid(board.grid);

}

export const getBoard = () => ({
    grid:getGrid(),
    setShape,
}
)