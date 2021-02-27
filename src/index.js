"use strict;";
import "./styles.css";

const app = document.getElementById("app");
const inp = document.createElement("input");
inp.type = "text";
const params = document.createElement("p");
const tb = document.createElement("table");
app.append(inp);
app.append(params);
app.append(tb);

let number = 5;
main();

inp.oninput = function() {
  number = inp.value;
  main();
};

function main() {
  let cells = [];
  let spiral = [];
  tb.innerHTML = "";

  const sq = Math.floor(Math.sqrt(number));
  const cellsRowsNum = sq * sq === number ? sq : sq % 2 ? sq + 2 : sq + 1;
  const count = cellsRowsNum * cellsRowsNum;
  params.textContent = `Размер таблицы ${cellsRowsNum} на ${cellsRowsNum}, ${count} ячеек`;

  for (let i = 0; i < cellsRowsNum; i++) {
    let tr = tb.insertRow(-1);
    cells.push([]);
    for (let j = 0; j < cellsRowsNum; j++) {
      let td = tr.insertCell();
      cells[i].push(td);
    }
  }

  while (cells.length > 0) {
    let lastRow = cells.pop().reverse();
    for (let j = 0; j < lastRow.length; j++) {
      spiral.unshift(lastRow[j]);
    }
    for (let f = cells.length - 1; f > -1; f--) {
      let firstEl = cells[f].shift();
      spiral.unshift(firstEl);
    }
    let firstRow = cells.shift();
    if (firstRow) {
      for (let fr = 0; fr < firstRow.length; fr++) {
        spiral.unshift(firstRow[fr]);
      }
    }
    for (let e = 0; e < cells.length; e++) {
      let lastEl = cells[e].pop();
      spiral.unshift(lastEl);
    }
  }

  for (let i = 0; i < spiral.length; i++) {
    if (i > number - 1) spiral[i].classList.add("over");
    addNum(spiral[i], i);
  }

  nextPrime: for (let s = 2; s <= number; s++) {
    for (let n = 2; n < s; n++) {
      if (s % n === 0) continue nextPrime;
    }
    spiral[s - 1].classList.add("simple");
  }

  function addNum(spir, i) {
    setTimeout(() => {
      spir.textContent = i + 1;
    }, 50 * i);
  }
}
