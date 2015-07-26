function Card (value, suit) {
	this.value = value;
	this.suit = suit;
}

app = {	

	
	defaultHalf : 	[
		[new Card(7,    'heart'), new Card(4,   'heart'), new Card(2,   'heart'), new Card('A', 'heart'), new Card('K', 'spade'), new Card('K', 'diamond'), new Card('A',    'club'), new Card(2,    'club'), new Card(4,     'club'), new Card(7,     'club')],
		[new Card(8,    'heart'), new Card(5,   'heart'), new Card(3,   'heart'), new Card('Q', 'spade'), new Card('A', 'spade'), new Card('A', 'diamond'), new Card('Q', 'diamond'), new Card(3,    'club'), new Card(5,     'club'), new Card(8,     'club')],
		[new Card(9,    'heart'), new Card(6,   'heart'), new Card('Q', 'heart'), new Card(3,   'spade'), new Card(2,   'spade'), new Card(2,   'diamond'), new Card(3,   'diamond'), new Card('Q',  'club'), new Card(6,     'club'), new Card(9,     'club')],
		[new Card(10,   'heart'), new Card('K', 'heart'), new Card(6,   'spade'), new Card(5,   'spade'), new Card(4,   'spade'), new Card(4,   'diamond'), new Card(5,   'diamond'), new Card(6, 'diamond'), new Card('K',   'club'), new Card(10,    'club')],
		[new Card('J',  'joker'), new Card(10,  'spade'), new Card(9,   'spade'), new Card(8,   'spade'), new Card(7,   'spade'), new Card(7,   'diamond'), new Card(8,   'diamond'), new Card(9, 'diamond'), new Card(10, 'diamond'), new Card('J',  'joker')]
	],


	init: function() {

		app.gameHolder = $('#game-holder');
		app.mirrorHalf = $.extend(true, [], app.defaultHalf);

		app.mirrorHalf.reverse();

		for (var i=0; i < app.mirrorHalf.length; i++) {
			app.mirrorHalf[i].reverse();
		}

		

		app.fullBoard = app.mirrorHalf.concat(app.defaultHalf);

		app.drawBoard(app.fullBoard);
	},

	drawBoard : function(board) {

		var thisBoard = board;

		for (var row=0;  row < board.length; row++) {

			var $thisRow = $('<div class="card-row"></div>');

			for(var card=0; card < board[row].length; card++) {
				var thisCard = board[row][card];

				var $newElement = $('<div class="card"><div class="card-content"><span class="card-value">' + thisCard.value + '</span></div>')

				var $suitChar = $('<span class="card-suit"></span>');

				switch (thisCard.suit) {

					case 'spade':
						
						$suitChar.html('\u2660');						
						break;

					case 'heart':
						
						$suitChar.html('\u2665');						
						break;

					case 'club':

						$suitChar.html('\u2663');						
						break;

					case 'diamond':

						$suitChar.html('\u2666');						
						break;

					case 'joker':
						$suitChar.html('');
						break;
				}

				$suitChar.addClass(thisCard.suit);


				$newElement.children('.card-content').append($suitChar);


				$thisRow.append($newElement);				
			}

			app.gameHolder.append($thisRow);
		}
	},


	initPieces : function() {

	}
}

$(document).on('ready', function() {
	app.init();
})