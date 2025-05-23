const select = document.getElementById("board_size");
const chessboard = document.getElementById("chessboard");
const btnGerar = document.querySelector(".btn_gerar");

let board = [];
let size = 8;

const moves = [
    [2, 1], [1, 2], [-1, 2], [-2, 1],
    [-2, -1], [-1, -2], [1, -2], [2, -1]
];

function createEmptyBoard(n) {
    board = Array.from({ length: n }, () => Array(n).fill(-1));
}

function isSafe(x, y, n) {
    return x >= 0 && y >= 0 && x < n && y < n && board[x][y] === -1;
}

function solveKT(n) {
    createEmptyBoard(n);
    board[0][0] = 0;

if (solveKTUtil(0, 0, 1, n)) {
    return board;
    } else {
    alert("Sem solução encontrada.");
    return null;
    }
}

function solveKTUtil(x, y, movei, n) {
  if (movei === n * n) return true;

    for (let k = 0; k < 8; k++) {
        const nextX = x + moves[k][0];
        const nextY = y + moves[k][1];

        if (isSafe(nextX, nextY, n)) {
        board[nextX][nextY] = movei;
        if (solveKTUtil(nextX, nextY, movei + 1, n)) return true;
        board[nextX][nextY] = -1; // backtrack
        }
    }

    return false;
}

function renderBoard(boardData) {
    const n = boardData.length;
    chessboard.innerHTML = "";
    chessboard.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
    chessboard.style.gridTemplateRows = `repeat(${n}, 1fr)`;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
        const cell = document.createElement("div");
        cell.style.backgroundColor = (i + j) % 2 === 0 ? "#EAEFEF" : "#333446";
        cell.style.color = (i + j) % 2 === 0 ? "#333446" : "#EAEFEF"; 

        cell.textContent = boardData[i][j];
        chessboard.appendChild(cell);
        }
    }
    }

    // Cria tabuleiro inicial
    renderBoard(Array.from({ length: 5 }, () => Array(5).fill("")));

    // Atualiza quando muda o tamanho
    select.addEventListener("change", () => {
    const newSize = parseInt(select.value);
    renderBoard(Array.from({ length: newSize }, () => Array(newSize).fill("")));
    });

    // Demonstra a solução
    btnGerar.addEventListener("click", () => {
    size = parseInt(select.value);
    const solution = solveKT(size);
    if (solution) renderBoard(solution);
    });
