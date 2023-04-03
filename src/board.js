import { BLOCK_SIZE, COLORS, COLS, ROWS, SHAPES } from "../constants.js";
import { drawBox } from "./nextPiece.js";

const canvas = document.querySelector('#main');
const ctx = canvas.getContext('2d');
canvas.width = COLS*BLOCK_SIZE;
canvas.height = ROWS*BLOCK_SIZE;

const drawGrid = (grid) => {
    console.table(grid);
    grid.forEach((row,y)=>{
        row.forEach((number, x)=>{
            drawBox(x,y,number, ctx);
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

export const getBoard = () => ({
    grid:getGrid(),
}
)