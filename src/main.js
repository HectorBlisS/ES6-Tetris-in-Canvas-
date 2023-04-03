import { COLS, KEY } from "../constants.js";
import { getBoard, setShape } from "./board.js";
import { getShape } from "./nextPiece.js";

let board = getBoard();
let shape = getShape();
const position = {x:3,y:2}

const startGame = () => {
    board = getBoard();
    setShape(shape, board, position);
    shape = getShape();
}

// listeners
document.onkeydown=(e)=>{ 
        switch(e.keyCode){
            case KEY.LEFT:
                position.x--; // left
                if(position.x<0){
                    if(shape.shapeName===5){
                        position.x = -1;
                    }else{
                        position.x++;
                    }
                }
                setShape(shape, board, position);
                break;
            case KEY.RIGHT:
                position.x++ // is next line... ?
                if(position.x>COLS-4){
                 if(shape.shapeName===1){
                     position.x--;
                 }else{
                    position.x = COLS-3                    
                }  
                }
                setShape(shape,board,position);
            default:
                return null;
        }
    }


document.querySelector('#play-btn').onclick = startGame
