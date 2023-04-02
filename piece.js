class Piece {
    constructor(ctx){
        this.ctx=ctx;
        this.ctx.canvas.width=180
        this.ctx.canvas.height=180
        this.spawn();
    }

    spawn(){
        this.typeId = this.randomTetra(COLORS.length-1);
        this.shape = SHAPES[this.typeId];
        this.color = COLORS[this.typeId];
        this.x = 0;
        this.y = 0;
        this.hardDropped = false;
        this.ctx.scale(BLOCK_SIZE,BLOCK_SIZE);
    }

    draw(){
        this.ctx.fillStyle=this.color
        this.shape.forEach((row,y)=>{
            row.forEach((value,x)=>{
                if(value>0){
                    this.ctx.fillRect(this.x+x,this.y+y,1,1);
                    // this.ctx.fillStyle="#323232"
                    // this.ctx.strokeRect(this.x+x,this.y+y,1,1)
                }
            })
        })
    }

    move(p){
        if(!this.hardDropped) {
            this.x = p.x
            this.y = p.y
        }
        this.shape = p.shape;
    }

    hardDrop() {
        this.hardDropped = true;
      }

    setStartingPosition(){
        this.x=this.typeId === 4 ? 4 :3;
    }

    randomTetra(noOfTypes){
        return Math.floor(Math.random()*noOfTypes+1);
    }
}