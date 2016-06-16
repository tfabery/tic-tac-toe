//=======================backend=========================
function Player(num, mark) {
  this.mark = mark;
  this.num = num;
  this.score = 0;
  // var markArray = ['X', 'O'];
  // for (i = 0; i < markArray.length; i ++) {
  //   this.mark[i] = markArray[i];
  // };
};

Player.prototype.select = function(x, y) {
  if (board.spaces[x][y].markBy === null) {
    board.spaces[x][y].markBy = this.mark;
    return true;
  }
  else {
    alert('Selected space is already marked select an unmarked space');
    return false;
  }
};

function Board() {
  this.width = 3;
  this.height = 3;
  this.spaces = [];

  var x, y;
  var indicator = 1
  for (x = 1; x <= this.width; x ++) {
    this.spaces[x] = [];
    for (y = 1; y <= this.height; y ++) {
      this.spaces[x][y] = new Boardspace(indicator);
      indicator += indicator;
    };
  };
};

Board.prototype.tie = function() {
  var markedArray = [];
  for (i = 1; i <= this.width; i++) {
    for (j = 1; j <= this.height; j++) {
      if (this.spaces[i][j].markBy === null) {
        return false;
      }
      markedArray.push('true');
    };
  };
  return markedArray.length;
};

var win = [7, 56, 73, 84, 146, 273, 292, 448];
Board.prototype.winCheck = function() {
  // debugger;
  for (var i = 0; i < win.length; i ++) {
    if ((win[i] & player.score)  === win[i]) {
      return true;
    }
  };
  return false;
};

function Boardspace(indicator) {
  this.markBy = null;
  this.indicator = indicator;
};

// Boardspace.prototype.isMarked = function(x, y, player) {
//   if (this.markBy === null) {
//     return false;
//   }
//   else {
//     return true;
//   }
// };

function BoardInterface(board, selector) {
  this.board = board;
  this.selector = selector;
};

BoardInterface.prototype.renderBoard = function() {
  var $board = $('<div class="board">');
  var $boardRow, $boardSpace;
  for (var y = 1; y <= this.board.height; y ++) {
    $boardRow = $('<div class="boardRow" id="y' + y + '">').appendTo($board);
    for (var x = 1; x <= this.board.width; x ++) {
      $boardSpace = $('<div class="boardSpace" id="x' + x + '">').appendTo($boardRow);
    }
  }
  return $board;
};

BoardInterface.prototype.render = function() {
  $(this.selector).empty().append(this.renderBoard());
  $('.btn').hide();
}

function clicked() {
  for (var y = this.board.height; y >= 1; y -= 1) {
    for (var x = 1; x <= this.board.width; x += 1) {
      $('#y' + y + ' #x' + x).click(function() {
        var xCord = parseInt($(this).attr('id').substring(1));
        var yCord = parseInt($(this).parent().attr('id').substring(1));
        var selected = player.select(xCord, yCord);
        if (selected) {
          if (player.mark === 'X') {
            $('<span class="glyphicon glyphicon-remove"></span>').appendTo($(this));
            player.score += board.spaces[xCord][yCord].indicator;
            if (board.winCheck()) {
              alert('Player 1 wins');
              homePage();
            }
            else if (board.tie() === 9) {
              alert('Draw....');
              homePage();
            }
            else {
              player = player2
            }
          }
          else if (player.mark === 'O') {
            $('<span class="glyphicon glyphicon-unchecked"></span>').appendTo($(this));
            player.score += board.spaces[xCord][yCord].indicator;
            if (board.winCheck()) {
              alert('Player 2 wins');
              homePage();
            }
            else if (board.tie() === 9) {
              alert('Draw....');
              homePage();
            }
            else {
              player = player1
            }
          }
        }
      });
    };
  };
};
function homePage() {
  $(".newBoard").empty();
  $(".btn").show();
}
function startNew() {
  player1 = new Player(1, 'X');
  player2 = new Player(2, 'O');
  player = player1;
  board = new Board();
  var ui = new BoardInterface(board, '.newBoard');
  ui.render();
  clicked();
}
//=======================frontend========================
var player1;
var player2;
var player;
var board;
$(function() {
  $("#vPlayer").click(function() {
    startNew();
  });

  $("#vAi").click(function() {
    startNew();
  });

});
