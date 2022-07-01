///////////////////////////////////////////////////////////////////
// MODE and CONTROLLER
//////////////////////

const NOBODY = '';

const WINNING_LINES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

class Game {
    constructor() {
        this.sessionId = new Date().getTime();
        this.views = [];
        this.currentPlayer = 'X';
        this.winningLine = [];
        this.board = [
            '', '', '',
            '', '', '',
            '', '', '',
        ];
    }

    attachView(view) {
        this.views.push(view);
        this.notifyGameUpdated();
    }

    move(index) {
        if (this.board[index] !== NOBODY) {
            return;
        }

        this.board[index] = this.currentPlayer;
        this.switchPlayer();
        this.checkWinner();
        this.notifyGameUpdated();
    }

    reset() {
        this.winningLine = [];
        this.board = new Array(9).fill('');
        this.notifyGameUpdated();
    }

    getWinner() {
        return this.winningLine.length > 0 ? this.board[this.winningLine[0]] : NOBODY;
    }

    // Private

    checkWinner() {
        WINNING_LINES.forEach(line => {
            if (this.board[line[0]] !== NOBODY && 
                this.board[line[0]] === this.board[line[1]] && 
                this.board[line[1]] === this.board[line[2]]) {
                this.winningLine = line;
            }
        });
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? '0' : 'X';
    }

    notifyGameUpdated() {
        this.views.forEach(view => view.onGameUpdated(this));
    }
}


/////////////////////////////////////////////////////////
// VIEW

class ConsoleGameView {
    onGameUpdated(game) {
        console.log(game.board);
    }
}

class HtmlGameView {

    constructor(game) {
        this.game = game;
        this.buttons = document.getElementsByClassName("button");
        this.resetButton = document.getElementById('reset');

        this.resetButton.addEventListener("click", () => {
            this.game.reset();
        });

        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].addEventListener("click", () => {
                this.game.move(i);
            }); 
        }
    }

    onGameUpdated(game) {
        for (let i = 0; i < game.board.length; i++) {
            let item = game.board[i];
            let button = this.buttons[i];
            button.textContent = item;

            if (item !== NOBODY) {
                button.classList.add('clicked');
            } else {
                button.classList.remove('clicked');
                button.classList.remove('winner');
            }

            if (game.winningLine.indexOf(i) >= 0) {
                button.classList.add('winner');
            } 
         }

         const winner = game.getWinner();
         if (winner !== NOBODY) {
            alert(winner);
         }
    }
}

const game = new Game();
const view = new HtmlGameView(game);

game.attachView(view);