import { BLOCK_SIZE, COLORS, COLS, KEY, ROWS, SHAPES } from "../constants.js";
import { drawBox, drawPreview } from "./nextPiece.js";

const xOffset = 3;
const yOffset = 2;

const canvas = document.querySelector('#main');
const ctx = canvas.getContext('2d');
canvas.width = COLS*BLOCK_SIZE;
canvas.height = ROWS*BLOCK_SIZE;

const drawGrid = (grid) => { // need two cicles to overdraw
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

export const setShape = (shape, board,position)=> {
    console.log("SHAPE? ", shape)
    // new grid
    board.grid =  getGrid()
    // what if square? @TODO==============================
    shape.shape.forEach((row,y)=>{
        row.forEach((number,x)=>{
            if(number>0) {
                board.grid[position.y+y][position.x+x] = number;
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