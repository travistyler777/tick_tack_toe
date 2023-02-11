const Gameboard = (() => {
  //Return if start button is not clicked

  const squares = document.querySelectorAll(".square");

  let gameboardArr = [];
  const winningMoves = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return {
    set xxxgameboardArr(value) { gameboardArr.push(value)},
    get yyygameboardArr() {return gameboardArr},
    squares,
    winningMoves
  };
})();

const displayController = (() => {
  const gameDisplay = document.querySelector("#game-display");
  const markerPointer = document.querySelector(".marker-pointer");
  const startBtn = document.querySelector(".start-btn");
  const player1Input = document.querySelector(".player1-input");
  const player2Input = document.querySelector(".player2-input");
  const restartBtn = document.querySelector(".restart-btn");


  const displayAlert = (alert) => {
    gameDisplay.textContent = alert;
  };

  const disableAllSquares = () => {
    Gameboard.squares.forEach((square) => {
      square.classList.add("disable");
    });
  };

  const addBoardMarker = (square, activePlayer) => {
    square.innerHTML =
    activePlayer.marker === "X"
      ? '<span class="marker">X</span>'
      : '<span class="marker">O</span>';
  }

  const triggerConfetti = () => {
    // do this for 30 seconds
    let duration = 2 * 1000;
    let end = Date.now() + duration;

    (function frame() {
      // launch a few confetti from the left edge
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      // and launch a few from the right edge
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      // keep going until we are out of time
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };


  // const checkWinner = (boardmoves, winningmoves, activeplayer) => {
  //   const xBoardMoves = boardmoves
  //     .map((index) => index)
  //     .filter((items) => items.marker === "X");
  //   const xBoardMovesMap = xBoardMoves.map((index) => index.square);

  //   const oBoardMoves = boardmoves
  //     .map((index) => index)
  //     .filter((items) => items.marker === "O");
  //   const oBoardMovesMap = oBoardMoves.map((index) => index.square);

  //   //Checks both arrays for winning combos
  //   const xHasWinningCombination = winningmoves.some((winningCombination) =>
  //     winningCombination.every((value) => xBoardMovesMap.includes(value))
  //   );

  //   const oHasWinningCombination = winningmoves.some((winningCombination) =>
  //     winningCombination.every((value) => oBoardMovesMap.includes(value))
  //   );

  //   const xWinningCombinationFound = winningmoves.find((winningCombination) =>
  //     winningCombination.every((value) => xBoardMovesMap.includes(value))
  //   );
  //   const oWinningCombinationFound = winningmoves.find((winningCombination) =>
  //     winningCombination.every((value) => oBoardMovesMap.includes(value))
  //   );


  //   //Returns results of matching items
  //   if (xHasWinningCombination) {
  //     lightWinningSquares(xWinningCombinationFound);
  //     triggerConfetti();
  //     disableAllSquares();
  //     displayController.markerPointer.classList.remove("pointer-position2");
  //     displayController.markerPointer.classList.add("pointer-position1");
  //     return displayAlert(`🎉 ${player1.name} wins!`);
  //   } else if (oHasWinningCombination) {
  //     lightWinningSquares(oWinningCombinationFound);
  //     displayController.markerPointer.classList.remove("pointer-position1");
  //     displayController.markerPointer.classList.add("pointer-position2");
  //     triggerConfetti();
  //     disableAllSquares();
  //     return displayAlert(`🎉 ${player2.name} wins!`);
  //   } else {
  //     if (boardmoves.length >= 9) {
  //       disableAllSquares();
  //       displayController.markerPointer.classList.add("hide");
  //       return displayAlert("Tie Game!");
  //     } else {
  //       return activeplayer === player1
  //         ? displayAlert(`${player1.name}'s turn`)
  //         : displayAlert(`${player2.name}'s turn`);
  //     }
  //   }
  // };

//   const lightWinningSquares = (winningsquares) => {
//     const squareArr = winningsquares.flatMap((item) =>
//       Array.from(Gameboard.squares).filter((square, index) => item === index)
//     );

//     squareArr.forEach((square) => {
//       square.classList.add("lightup");
//     });
//   };

//   return {
//     displayAlert,
//     checkWinner,
//     startBtn,
//     markerPointer,
//     player1Input,
//     player2Input,
//     addBoardMarker
//   };

})();


const gameController = (activeplayer) => {

  //PLayer Toggle
  let activePlayer = activeplayer;

  const toggleActivePlayer = () => {
    if (activePlayer === player2) {
      displayController.markerPointer.classList.remove("pointer-position2");
      displayController.markerPointer.classList.add("pointer-position1");
      activePlayer = player1;
    } else {
      activePlayer = player2;
      displayController.markerPointer.classList.remove("pointer-position1");
      displayController.markerPointer.classList.add("pointer-position2");
    }
  };

  const disableDiv = (div) => {
    div.classList.add("disable");
  };

  // restartBtn.addEventListener("click", () => {
  //   Gameboard.clear();
  // });


  //Gameboard Squares
  Gameboard.squares.forEach((square, index) => {
      square.addEventListener("click", () => {
        
        //Add marker to gameboard Array



        Gameboard.setGameboard = {square: index, marker: activeplayer.marker};
        
        console.log(activeplayer.marker);
        console.log(Gameboard.gameboardArr);
        //Add marker symbol to square
        displayController.addBoardMarker(square, activePlayer)
        
        //Toggle player
        toggleActivePlayer();
        
        //Check winner
        displayController.checkWinner(Gameboard.gameboardArr, Gameboard.winningMoves, activePlayer);

        //Disable square
        disableDiv(square);

      });
    });

  return {
    activePlayer,
    disableDiv,
  };
};


const startGame = (() => {
  let start = false;

  displayController.startBtn.addEventListener("click", (e) => {
    //Prevent form from reloading screen
    e.preventDefault();
  
    //Clear disables buttons
    Gameboard.squares.forEach((square) => {
      square.classList.remove("disable");
    });

    start = true;

    //Unhide finger pointer
    displayController.markerPointer.classList.remove("hide");
    
    //Create player
    player1 = Players(displayController.player1Input.value, "X");
    player2 = Players(displayController.player2Input.value, "O");
   

    //Disable Elements
    displayController.player1Input.disabled = true;
    displayController.player2Input.disabled = true;
   
    //Change Alert Info
    displayController.displayAlert(`${player1.name}'s turn`);
    if (displayController.player1Input.value === "") {
      displayController.displayAlert("❗️Player 1 Name!");
      return;
    } else if (displayController.player2Input.value === "") {
      displayController.displayAlert("❗️Player 2 Name!");
      return;
    }

    console.log(player1)
  });
  return { start };
})();

// const clear = (() => {
//   gameboard.length = 0;
//   squares.forEach((square) => {
//     square.innerHTML = "";
//     square.classList.remove("disable");
//     square.classList.remove("lightup");
//     square.classList.add("disable");
//   });
//   displayController.markerPointer.classList.remove("pointer-position2");
//   displayController.markerPointer.classList.remove("pointer-position1");
//   displayController.markerPointer.classList.add("hide");
//   displayController.displayAlert("Enter Name's");
//   gameController.activePlayer = player1;
//   displayController.player1Input.disabled = false;
//   displayController.player2Input.disabled = false;
//   displayController.player1Input.value = "";
//   displayController.player2Input.value = "";

// })();


const Players = (name, marker) => {
  return { name, marker };
};

let player1 = Players("Player 1", "X");
let player2 = Players("Player 2", "O");

gameController(player1);
//Gameboard.clear();