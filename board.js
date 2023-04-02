class Board{
    constructor(ctx, ctxNext){
        this.ctx = ctx;
        this.ctxNext = ctxNext;
        this.init();
    }
    init(){
    // Calculate size of canvas from constants.
        this.ctx.canvas.width = COLS * BLOCK_SIZE;
        this.ctx.canvas.height = ROWS * BLOCK_SIZE;
            
        this.grid = this.getEmptyGrid();
        console.log("grid:", this.grid, this.ctx.canvas.height)
        this.getNewPiece()
    }
    draw(){
        this.piece.draw();
        this.drawBoard();

    }

    drawBoard(){
        this.fillStyle = 'indigo'
        this.grid.forEach((row, y)=>{
            row.forEach((value,x)=>{
                if(value>0){
                            // scale to not size need
                    this.ctx.fillStyle = COLORS[value];
                    this.ctx.fillRect(x,y,1,1);
                }
            })
        })
    }

    getEmptyGrid() {
        // first rows, then cols
        return Array.from({ length: 20 }, () => Array(10).fill(0));
      }

      reset(){
        this.grid = this.getEmptyGrid();
        this.piece = new Piece(this.ctx);
        this.piece.setStartingPosition();
        this.getNewPiece();
      }
      getNewPiece(){
        const {width,height}=this.ctxNext.canvas;
        this.next = new Piece(this.ctxNext);
        this.ctxNext.clearRect(0,0,width,height);
        this.next.draw();
      }

      drop(){
        // change this
        if(!this.piece){
            this.piece = this.next
            this.getNewPiece()
        }
        let p = moves[KEY.DOWN](this.piece);
        if(this.valid(p)){
            this.piece.move(p)
        }else{
            console.log("notValid");
           if( this.piece.y===0){
               return false
           }
           this.piece = this.next;
           this.piece.ctx = this.ctx;
           this.piece.setStartingPosition();
           this.getNewPiece();
        }
        return true;

      }

      valid(piece){
        return piece.shape.every((row,dy)=>{
            return row.every((value, dx)=>{
                let x = piece.x+dx;
                let y=piece.y+dy;
                return value===0||(this.isInsideWalls(x,y) && this.notOccupied(x,y))
            })
        })
      }

      isInsideWalls(x, y) {
        return x >= 0 && x < COLS && y <= ROWS;
      }

      notOccupied(x, y) {
        return this.grid[y] && this.grid[y][x] === 0;
      }
}