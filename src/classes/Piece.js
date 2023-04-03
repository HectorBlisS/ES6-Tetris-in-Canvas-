import { BLOCK_SIZE, COLORS, SHAPES } from "../constants.js";

const getRandomShape = () => SHAPES[Math.floor(Math.random()*SHAPES.length)];

export class Piece{
    constructor(x=0,y=0){
        this.shape = getRandomShape();
        this.x = x;
        this.y = y;
        this.color = COLORS[this.shape[0][0]];
    }

    setPosition(x,y){
        // hard dropped?
        this.x = x;
        this.y = y;
    }

    draw(ctx){
        this.shape.forEach((row,y)=>{
            row.forEach((number,x)=>{
                if(number>0){
                    ctx.fillStyle = this.color;
                    ctx.strokeStyle = "#323232"
                    ctx.fillRect(
                        (this.x+x)*BLOCK_SIZE, // this is the way
                        (this.y+y)*BLOCK_SIZE,
                        BLOCK_SIZE,
                        BLOCK_SIZE);
                        ctx.strokeRect(
                            (this.x+x)*BLOCK_SIZE, // this is the way
                            (this.y+y)*BLOCK_SIZE,
                            BLOCK_SIZE,
                            BLOCK_SIZE);
                }
            })
        })
    }
}