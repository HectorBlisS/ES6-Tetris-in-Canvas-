import { BLOCK_SIZE, COLORS, SHAPES } from "../constants.js";

const nextCanvas = document.querySelector('#next');
const nextCtx = nextCanvas.getContext('2d');
nextCanvas.width = 4*BLOCK_SIZE+4
nextCanvas.height = 4*BLOCK_SIZE
//nextCtx.scale(BLOCK_SIZE,BLOCK_SIZE);

export const drawBox = (x,y,number,context=nextCtx) => {
    const realX = x===0 ? x :x*BLOCK_SIZE;
    const realY = y===0?y:y*BLOCK_SIZE;
    context.fillStyle = "none"
    context.fillRect(realX,realY,BLOCK_SIZE,BLOCK_SIZE);
    context.strokeStyle = COLORS[number];
    context.lineWidth = 4;
    context.strokeRect(realX,realY, BLOCK_SIZE+2,BLOCK_SIZE);
}

const getRandomShape = () => {
    // return SHAPES[0];
    return SHAPES[Math.floor(Math.random()*SHAPES.length)]
}

const drawPreview = (shape) => {
    shape.forEach((row,y)=>{
        row.forEach((number,x)=>{
            if(number>0){
                drawBox(x,y,number);
            }
        })
    });
}

export const getShape = () =>{
    const shape = getRandomShape();
    drawPreview(shape);
    return shape
}


