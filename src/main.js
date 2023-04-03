import { Board } from "./classes/Board.js"
//refs
const mainCanvas = document.querySelector('#main');
const previewCanvas = document.querySelector('#next');
// counters
let frame;
let frames = 0;
//instances
let board = new Board(
    mainCanvas.getContext('2d'),
    previewCanvas.getContext('2d'),
    {
        level:6
    }
    );

// aux functions
const animate = () =>{
    console.log("running");
    frames++;
    // drawing;
    board.draw();
    // dropping?
    if(!board.move(frames)){ // this is the main functions (the movement)
        // gameover
        console.log("Stopped")
        return;
    }

    frame = requestAnimationFrame(animate)
}


// main functions
const startGame = () => {
    document.querySelector('#play-btn').remove();
    frame = requestAnimationFrame(animate)
}

// listeners
document.querySelector('#play-btn').onclick = startGame
// document.onkeydown=(event)=>getHandler(event)
