let players = ['x', 'o'];
//let activePlayer = 0; // комментируем, что первый игрок всегда Х

let n = 4; // разрядность поля
let activePlayer = Math.trunc(Math.random() * 2); // заменим на рандомный выбор игрока из двух
let board = new Array(); //массив для игрового поля

paintBoard(); //заполняем игровое поле пустыми элементами

// функция заполняет поле n элементами, в каждом из которых n элемента. Т.о. получаем квадрат n x n
function paintBoard() {
  board = new Array();
  for (let count = 0; count < n; count++) {
    board.push(new Array());
    for (let countElement = 0; countElement < n; countElement++) {
      board[count].push('');
    }
  }
}

//console.log(board);

function startGame() {
  console.log('starting game!');

  // отрисовываем поле при старте игры
  paintBoard();
  renderBoard(board);

  activePlayer = Math.trunc(Math.random() * 2); //заменим на рандомный выбор игрока из двух
  if (activePlayer === 0) {
    console.log('1-ыми  ходят Х-ки');
  } else {
    console.log('1-ыми  ходят 0-ки');
  }
}

function click(row, col) {
  console.log('Ваш ход');
  
  //console.log(row, col);
  board[row][col] = players[activePlayer];
  renderBoard(board);
  chekWinner(activePlayer); //проверка на выигрыш

  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  } // смена игрока
}

function chekWinner(player) {
  let symbolPlayer = players[player]; //проверяемый символ игрока
  //проверка диагоналей, если диагонали неивыигрышны переходим к горизонталям и вертикалям
  let diagonalLeft = true;
  let diagonalRight = true;

  for (i = 0; i < n; i++) {
    diagonalRight = diagonalRight && (board[i][i] === symbolPlayer);
    diagonalLeft = diagonalLeft && (board[n - i - 1][i] === symbolPlayer);
  }

  if (diagonalRight || diagonalLeft) {
    console.log(player);
    showWinner(player); // победитель - номер игрока из массива players
  } else {
    //проверка горизонталей и вертикалей
    let columns = true;
    let rows = true;
    i = 0;
    for (i = 0; i < n; i++) {
      columns = true;
      rows = true;
      for (let j = 0; j < n; j++) {
        rows = rows && (board[i][j] === symbolPlayer);
        columns = columns && (board[j][i] === symbolPlayer);
      }
      if (columns || rows) {
        console.log(player);
        showWinner(player); // победитель - номер игрока из массива players
      }
    }
  }
}