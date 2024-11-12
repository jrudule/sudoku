import { useState } from 'react'
import './App.css'

function App() {
  //Lai mainītu ciparu secību laukumā
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function isValid(board, row, col, num) {
    // Lai pārbaudītu, vai skaitlis ir derīgs konkrētā rindā un kolonnā
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) {
            return false;
        }
    }

    // Lai pārbaudītu, vai skaitlis ir derīgs konkrētā 3x3 laukumā
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }
    return true;
  }

  //Lai aizpildītu spēles laukumu
  function fillBoard(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                //Lai mainītu skaitļu secību pirms katras spēles
                let numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]); 

                for (let num of numbers) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;

                        if (fillBoard(board)) {
                            return true;
                        }
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
  }

  // Lai izveidotu sākuma masīvu
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));

  // Lai aizpildītu Sudoku matricu
  fillBoard(board);

  return (
    <>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((number, colIndex) => (
            <div 
              key={colIndex}
              className={`cell ${ 
                (rowIndex + 1) % 3 === 0 ? 'bottom-border' : '' 
              } ${
                (colIndex + 1) % 3 === 0 ? 'right-border' : ''
              } ${ 
                (rowIndex + 1) % 3 === 1 ? 'top-border' : '' 
              } ${ 
                (colIndex + 1) % 3 === 1 ? 'left-border' : '' 
              }`}
            >
              {number}
            </div>
          ))}
        </div>
      ))}
    </>
);

}

export default App
