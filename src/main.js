import { getBoard, setShape } from "./board.js";
import { getShape } from "./nextPiece.js";

const board = getBoard();
const shape = getShape();
// lets make'em interact
setShape(shape, board);
