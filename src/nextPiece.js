import { BLOCK_SIZE, COLORS, SHAPES } from "../constants.js";

const nextCanvas = document.querySelector('#next');
const nextCtx = nextCanvas.getContext('2d');
nextCanvas.width = 4*BLOCK_SIZE+4
nextCanvas.height = 4*BLOCK_SIZE
//nextCtx.scale(BLOCK_SIZE,BLOCK_SIZE);

export const drawBox = (x,y,number,context=nextCtx, drawBoarder ="border") => {
    const realX = x===0 ? x :x*BLOCK_SIZE;
    const realY = y===0?y:y*BLOCK_SIZE;
    context.fillStyle = drawBoarder==='no-border' ? COLORS[number] : "black";
    context.fillRect(realX,realY,BLOCK_SIZE,BLOCK_SIZE);
    if(drawBoarder==='no-border') return; 
    context.strokeStyle = COLORS[number];
    context.lineWidth = 4;
    context.strokeRect(realX,realY, BLOCK_SIZE+2,BLOCK_SIZE);
}

const getRandomShape = () => {
    // return SHAPES[0];
    return SHAPES[Math.floor(Math.random()*SHAPES.length)]
}

export const drawPreview = (shape, context=nextCtx) => {
    shape.forEach((row,y)=>{
        row.forEach((number,x)=>{
            if(number>0){
                drawBox(x,y,number,context);
            }
        })
    });
}

export const getShape = () =>{
    const shape = getRandomShape();
    drawPreview(shape);
    return shape
}


