import { COLS, KEY, LEVEL } from "../constants.js";
import { freezeGrid, getBoard, setShape, showPause } from "./board.js";
import { getShape, moveDown } from "./pieces.js";



let board = getBoard();
let nextShape=getShape();
let shape ={...nextShape}
let frame;
let frames = 0;
let level = LEVEL[5];

let position = {x:3,y:2}

const animate = ()=>{
    frames++;
    if(frames%level === 0){
        moveDown(board, shape, position);
    }

    frame = requestAnimationFrame(animate);
}

export const setNextOrGameOver = () => {
    // freeze board
    freezeGrid(board.grid);
    //part 1 set Next
    position = {x:3,y:2}
    // se envía y se almacena como current
    shape = {...nextShape}
    setShape(shape, board, position);
    // se actualiza el siguiente
    nextShape=getShape();
    // part2 game over
}

const startGame = () => {
    // el board se limpia
    board = getBoard();
    setNextOrGameOver();
    // movement?
    animate();
    // cleanup
    document.querySelector('#play-btn').remove();
}

const keyHandlers = {
    [KEY.P]:()=>{
        if(!frame) {
            requestAnimationFrame(animate);
        }
        showPause();
        cancelAnimationFrame(frame);
        frame=null;
    },
    [KEY.LEFT]:()=>{
        position.x--; // left
        if(position.x<0){
            if(shape.shapeName===5){
                position.x = -1;
            }else{
                position.x++;
            }
        }
        setShape(shape, board, position);
    },
    [KEY.RIGHT]:()=>{
        position.x++ // is next line... ?
        if(position.x>COLS-4){
         if(shape.shapeName===1){
             position.x--;
         }else{
            position.x = COLS-3                    
        }  
        }
        setShape(shape,board,position);
    }
}

// listeners
document.onkeydown=(event)=>{
    const handler = keyHandlers[event.keyCode];
    if(handler){
        handler(event)
    }
}


document.querySelector('#play-btn').onclick = startGame
