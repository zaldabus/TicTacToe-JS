// NB: This doesn't include any AI.

(function (root) {
  // if (!(typeof(require) === "undefined")) {
 //    _ = require('./underscore.js');
 //  }

  // var readline = require('readline');
  // var READER = readline.createInterface({
  //   input: process.stdin,
  //   output: process.stdout
  // });

  var TTT = root.TTT = (root.TTT || {});

  var Game = TTT.Game = function TTT(displayGrid) {
    this.player = Game.marks[0];
    this.board = this.makeBoard();
    this.displayGrid = displayGrid;
  }

  Game.marks = ["X", "O"];

  Game.prototype.diagonalWinner = function () {
    var game = this;

    var diagonalPositions1 = [[0, 0], [1, 1], [2, 2]];
    var diagonalPositions2 = [[2, 0], [1, 1], [0, 2]];

    var winner = null;
    _(Game.marks).each(function (mark) {
      function didWinDiagonal (diagonalPositions) {
        return _.every(diagonalPositions, function (pos) {
          return game.board[pos[0]][pos[1]] === mark;
        });
      }

      var won = _.any(
        [diagonalPositions1, diagonalPositions2],
        didWinDiagonal
      );

      if (won) {
        winner = mark;
      }
    });

    return winner;
  };


  Game.prototype.horizontalWinner = function () {
    var game = this;

    var winner = null;
    _(Game.marks).each(function (mark) {
      var indices = _.range(0, 3);

      var won = _(indices).any(function (i) {
        return _(indices).every(function (j) {
          return game.board[i][j] === mark;
        });
      });

      if (won) {
        winner = mark;
      }
    });

    return winner;
  };

  Game.prototype.verticalWinner = function () {
    var game = this;

    var winner = null;
    _(Game.marks).each(function (mark) {
      var indices = _.range(0, 3);

      var won = _(indices).any(function (j) {
        return _(indices).every(function (i) {
          return game.board[i][j] === mark;
        });
      });

      if (won) {
        winner = mark;
      }
    });

    return winner;
  };

  Game.prototype.winner = function () {
    return (
      this.diagonalWinner() || this.horizontalWinner() || this.verticalWinner()
    );
  };

  Game.prototype.makeBoard = function () {
    return _.times(3, function (i) {
      return _.times(3, function (j) {
        return null;
      });
    });
  };

  Game.prototype.placeMark = function (pos) {
    this.board[pos[0]][pos[1]] = this.player;
  };

  Game.prototype.switchPlayer = function () {
    if (this.player === Game.marks[0]) {
      this.player = Game.marks[1];
    } else {
      this.player = Game.marks[0];
    }
  };

  Game.prototype.makeMove = function($li) {
    this.render($li);
    var id = parseInt($li.attr("id"));
    var coords = this.getCoordinates(id)
    this.placeMark(coords);
    if (this.winner()) {
      var $lis = this.displayGrid.children();
      $lis.each(function(index, li){
        $(li).addClass("clicked");
        $(li).off('click');
      })
      console.log("You won but you'll never know!");
    }
    else{
      this.switchPlayer();
    }
  }

  Game.prototype.render = function($li) {
    $li.append(this.player);
    $li.addClass("clicked");
    $li.off('click');
  }

  Game.prototype.getCoordinates = function(id) {
    var counter = 1
    for (var i = 0; i < this.board.length; i++) {
      for (var j = 0; j < this.board.length; j++) {
        if(counter === id){
          return [i, (2 - j)];
        }
        counter ++;
      }
    }

  }


  // Game.prototype.isEmptyPos = function (pos) {
  //   return (this.board[pos[0]][pos[1]] === null);
  // };
  // Game.prototype.move = function (pos) {
  //   if (!this.isEmptyPos(pos)) {
  //     return false;
  //   }
  //
  //   this.placeMark(pos);
  //   this.switchPlayer();
  //   return true;
  // };



  // Game.prototype.valid = function (pos) {
  //   // Check to see if the co-ords are on the board and the spot is
  //   // empty.
  //
  //   function isInRange (pos) {
  //     return (0 <= pos) && (pos < 3);
  //   }
  //
  //   return _(pos).all(isInRange) && _.isNull(this.board[pos[0]][pos[1]]);
  // };



  // Game.prototype.printBoard = function () {
  //   var game = this;
  //
  //   game.board.forEach(function(row){
  //     var first = row[0] == null ? " " : row[0];
  //     var second = row[1] == null ? " " : row[1];
  //     var third = row[2] == null ? " " : row[2];
  //
  //     console.log(first + " | " + second + " | " + third);
  //   })
  // }
  //
  // Game.prototype.run = function () {
  //   var game = this;
  //
  //   game.turn(function(){
  //   if (game.winner()) {
  //     console.log("Someone won!");
  //       // READER.close();
  //     } else {
  //       // game.printBoard();
  //       game.run();
  //     }
  //   });
  // }



  // Game.prototype.turn = function (callback) {
 //    var game = this;
    // game.placeMark();


    // READER.question("Enter coordinates like [row,column]: ",function(strCoords){
    //   var coords = eval(strCoords); // Totally insecure way to parse the string "[1,2]" into the array [1,2].
    //   if (game.valid(coords)) {
    //     game.move(coords);
    //     callback();
    //   } else {
    //     console.log("Invalid coords!");
    //     game.turn(callback);
    //   }
    // });
  // }
})(this);


// First we instantiate a new object with the this.TTT.Game() constructor function.


// Then we enter the game's run loop.
