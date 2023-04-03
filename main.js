import Board from './board.js'
import { LEVEL } from './constants.js';

const canvas = document.querySelector("#main");
const canvasNext = document.querySelector('#next');
const ctxNext = canvasNext.getContext('2d')
const ctx = canvas.getContext("2d");
ctx.fillRect(0, 0, canvas.width, canvas.height);

// instances
let frames=0
let requestId;
let time = null;
let board = new Board(ctx, ctxNext);
const account ={};

  function resetGame() {
    account.score = 0;
    account.lines = 0;
    account.level = 0;
    board.reset();
    time = { 
        start: performance.now(), 
        elapsed: 0,
         level: LEVEL[account.level]
         };
}

const animate = (now=0) => {
    frames++;
    console.log("running");
    time.elapsed = now-time.start;
    if(time.elapsed > time.level){
        time.start = now;
        if(!board.drop()){     // moving the game
            //gameover
            return;
        }
    }

    //clear board first
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    board.draw();
    requestId = requestAnimationFrame(animate)
}

const pause = () => {
    if(!requestId) {
        document.querySelector('#play-btn').textContent='Pausar'
        animate();
        //sound
        return;
    }
    cancelAnimationFrame(requestId);
    requestId=null;
    ctx.fillStyle = 'black';
    ctx.fillRect(1, 3, 8, 1.2);
    ctx.font = '1px Arial';
    ctx.fillStyle = 'yellow';
    ctx.fillText('PAUSED', 3, 4);

}



const play = () => {
    if(requestId){
        cancelAnimationFrame(requestId);
    }
    animate();
    document.querySelector('#play-btn').textContent='Pausar'
}

// event listeners
document.querySelector('#play-btn').onclick=()=>{
    if(
      document.querySelector('#play-btn').textContent === 'Pausar' 
    ){
      pause() 
    }else{
      play();
    }
}
resetGame();
