///////////////////////////////////////////////////////////////////
// MODE and CONTROLLER
//////////////////////

const NOBODY = '';

class Player  {
    constructor(name, path) {
        this.name;
        this.path;
    } 
}

const XPlayer = new Player("X", "<img src=\"assets/img/x.png\" with=\"40\" height=\"40\" alt=\"X\">");
const OPlayer = new Player("O", "<img src=\"assets/img/o.png\" with=\"40\" height=\"40\" alt=\"0\">");

// const XPlayer = "<img src=\"assets/img/x.png\" with=\"40\" height=\"40\" alt=\"X\">";
// const OPlayer = "<img src=\"assets/img/o.png\" with=\"40\" height=\"40\" alt=\"0\">";

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
        this.currentPlayer = XPlayer;
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

        this.board[index] = this.currentPlayer.path;
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
        this.currentPlayer = this.currentPlayer === XPlayer ? OPlayer : XPlayer;
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
        console.log(game.board[1]);
        console.log(game.board[2]);
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
            button.innerHTML = item;

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

const view2 = new ConsoleGameView(game);

game.attachView(view2);

game.move(1);
game.move(4);
game.move(0);
game.move(5);
game.move(2);