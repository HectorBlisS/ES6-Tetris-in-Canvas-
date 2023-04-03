import {KEY} from './constants.js'

export const moves = { // check the others!
    [KEY.LEFT]: (p) => ({ ...p, x: p.x - 1 }),
    [KEY.RIGHT]: (p) => ({ ...p, x: p.x + 1 }),
    [KEY.DOWN]: (p) => ({ ...p, y: p.y +1 }),
    [KEY.SPACE]: (p) => ({ ...p, y: p.y + 1 }),
    [KEY.UP]: (p) => board.rotate(p, ROTATION.RIGHT),
    [KEY.Q]: (p) => board.rotate(p, ROTATION.LEFT)
  };
  let accountValues = {
    score: 0,
    level: 0,
    lines: 0
  };
  let account = new Proxy(accountValues, {
    set: (target, key, value) => {
      target[key] = value;
      updateAccount(key, value);
      return true;
    }
  });
  
  function updateAccount(key, value) {
    let element = document.getElementById(key);
    if (element) {
      element.textContent = value;
    }
  }
