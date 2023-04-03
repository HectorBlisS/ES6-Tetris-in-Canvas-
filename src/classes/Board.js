import { BLOCK_SIZE, COLORS, COLS, KEY, LEVEL, ROWS } from "../constants.js";
import { moves } from "../utils.js";
import { Piece } from "./Piece.js";

const getEmptyGrid = () => Array.from({length:ROWS},()=>{
    return Array.from({length:COLS},()=>0);
});

export class Board{
    constructor(ctx,ctxNext, options){
        this.ctx = ctx;
        this.ctxNext = ctxNext;
        this.grid = getEmptyGrid();
        this.piece = new Piece(3,0);
        this.next = new Piece();
        this.init();
        this.level = options?.level ?? 0
    }
 
    init(){
        this.ctx.canvas.width = BLOCK_SIZE*COLS;
        this.ctx.canvas.height = BLOCK_SIZE*ROWS;
        this.ctxNext.canvas.width = BLOCK_SIZE*4
        this.ctxNext.canvas.height = BLOCK_SIZE*3
        this.drawPreview();
        this.draw();
        this.piece.draw(this.ctx)
    }

    move(frames){
        // check if overflow??
        if(this.grid[0].some((number)=>number>0)){
            return false
        }
        // happy path
        if(frames%LEVEL[this.level]!==0) return true; // this could be improved
        const movedPiece = moves[KEY.DOWN](this.piece); // moving
        console.log(movedPiece)
        if(this.isValid(movedPiece)) {
            this.piece.setPosition(movedPiece.x,movedPiece.y);
            this.draw();
            // happy path reachs here
            return true;
        }
        // can't move further so, freeze, then set new piece and next
        this.freeze();
        // CLEAR LINESSSS ??? return true
        this.piece = this.next
        this.piece.ctx = this.ctx;
        this.piece.setPosition(3,0);
        this.next = new Piece();
        // next piece so, it can move:
        return true;
    }

    freeze(){
        this.piece.shape.forEach((row,y)=>{
            row.forEach((number,x)=>{
                if(number>0){
                    this.grid[this.piece.y+y][this.piece.x+x] = number
                }
            })
        })
    }

    isValid(p){
        return p.shape.every((row,dy)=>{
            return row.every((number,dx)=>{
                const x = p.x+dx;
                const y = p.y+dy;
                return number === 0 || (this.isInsideWalls(x,y) && this.notUsed(x,y))
            })
        }) 
    }

    isInsideWalls (x,y){
        return x>=0 && x<COLS && y<=ROWS;
    }

    notUsed(x,y){
        return this.grid[y] && this.grid[y][x] === 0;
    }

    drawPreview (){
        this.ctxNext.clearRect(0,0,this.ctxNext.canvas.width,this.ctxNext.canvas.height)
        this.next.draw(this.ctxNext);
    }

    draw(){
        this.drawBoard();
        this.piece.draw(this.ctx);
        this.drawPreview();
    }

    drawBoard(){
        this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
        this.grid.forEach((row,y)=>{
            row.forEach((number, x)=>{
                const realX = x===0?0:x*BLOCK_SIZE;
                const realY = y === 0?0:y*BLOCK_SIZE;
                this.ctx.fillStyle = COLORS[number];
                this.ctx.fillRect(realX,realY, BLOCK_SIZE,BLOCK_SIZE);
                this.ctx.strokeStyle="rgb(15 23 42)";
                this.ctx.strokeRect(realX,realY,BLOCK_SIZE,BLOCK_SIZE);
            })
        });
    }

}