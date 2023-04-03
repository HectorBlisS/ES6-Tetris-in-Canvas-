import { BLOCK_SIZE, COLORS, ROWS, SHAPES } from "../constants.js";
import { checkIfFreeze, deleteShape, drawGrid, getEmptyGrid, setShape } from "./board.js";
import { setNextOrGameOver } from "./main.js";

const nextCanvas = document.querySelector('#next');
const nextCtx = nextCanvas.getContext('2d');
nextCanvas.width = 4*BLOCK_SIZE+4
nextCanvas.height = 4*BLOCK_SIZE
//nextCtx.scale(BLOCK_SIZE,BLOCK_SIZE);

export const drawBox = (x,y,
    number,
    context=nextCtx,
     drawBoarder ="border"
     ) => {
    const realX = x===0 ? x :x*BLOCK_SIZE;
    const realY = y===0?y:y*BLOCK_SIZE;
    context.fillStyle = drawBoarder==='no-border' ? COLORS[number] : number>0 ? COLORS[number]:"black"
    context.fillRect(realX,realY,BLOCK_SIZE,BLOCK_SIZE);
    if(drawBoarder==='no-border') return; 
    context.strokeStyle = "rgb(15 23 42)"
    context.lineWidth = 4;
    context.strokeRect(realX,realY, BLOCK_SIZE+2,BLOCK_SIZE);
}

const getRandomShape = () => {
    // return SHAPES[0];
    return SHAPES[Math.floor(Math.random()*SHAPES.length)]
}

export const drawPreview = (shape, context=nextCtx) => {
    // erease first
    nextCtx.clearRect(0,0,context.canvas.width,context.canvas.height);
    shape.forEach((row,y)=>{
        row.forEach((number,x)=>{
            if(number>0){
                drawBox(x,y,number,context);
            }
        })
    });
}

// this should be configurable
const getShapeName = (shape) => {
    const shapeCopy = [...shape];
   const totalSum = shapeCopy.flat().reduce((acc,number)=>acc+number,0)
   return totalSum/4
}

export const getShape = () =>{
    const shape = getRandomShape();
    drawPreview(shape);
    return {shape, shapeName:getShapeName(shape)}
}

export const moveDown = (board,shape,position) => {
    position.y++; // next line (future line)
    // need to know if touch freeze
    if(checkIfFreeze(position, shape)){
        setNextOrGameOver();
        return;
    }
    setShape(shape,board,position);
}


