function Card (label, suit) {
	var self = this;

	self.label = label;
	self.suit = suit;
	self.value;


	// Assign the correct value based on letter values (caps expected, I know...)
	if (typeof self.label === "number") {
		self.value = self.label;
	} else {
		switch (self.label) {
			case "J" :
				self.value = 0;
				break;

			case "A" :
				self.value = 1;
				break;

			case "Q" :
				self.value = 12;
				break;

			case "K" :
				self.value = 13;
				break;
		}
	}	

	// Generate the DOM element assosciated with the card, append a unicode value assosciated with the suit string, attach this object to dom in Data.
	self.buildElement = function() {
		self.$element = $('<div class="card"><div class="card-content"><span class="card-value">' + self.label + '</span></div>');
		$suitChar = $('<span class="card-suit"></span>');

		switch (self.suit) {
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

		$suitChar.addClass(self.suit);
		self.$element.children('.card-content').append($suitChar);
		self.$element.data({obj: self});
	}

	self.buildElement();
}

function Piece (x, y, team) {
	var self = this;

	self.x = x;
	self.y = y;
	self.team = team;

	self.move = function(x, y) {

		var newX = x * app.cardWidth;
		var newY = y * app.cardWidth;

		var transformString = 'translate(' + newX + 'px, ' + newY + 'px)';		
		self.$element.css('transform', transformString);

	}

	self.init = function() {
		self.$element = $('<div class="piece"></div>');

		if (self.team === 0) {
			self.$element.addClass('away');
		} else {
			self.$element.addClass('home');
		}

		self.$element.data({obj: self});
		self.$element.height(app.cardWidth);
		app.gameHolder.append(self.$element);


		self.move(self.x, self.y);
	}

	

	self.init();



}

app = {	

	
	defaultHalf : 	[
		[new Card(7,    'heart'), new Card(4,   'heart'), new Card(2,   'heart'), new Card('A', 'heart'), new Card('K', 'spade'), new Card('K', 'diamond'), new Card('A',    'club'), new Card(2,    'club'), new Card(4,     'club'), new Card(7,     'club')],
		[new Card(8,    'heart'), new Card(5,   'heart'), new Card(3,   'heart'), new Card('Q', 'spade'), new Card('A', 'spade'), new Card('A', 'diamond'), new Card('Q', 'diamond'), new Card(3,    'club'), new Card(5,     'club'), new Card(8,     'club')],
		[new Card(9,    'heart'), new Card(6,   'heart'), new Card('Q', 'heart'), new Card(3,   'spade'), new Card(2,   'spade'), new Card(2,   'diamond'), new Card(3,   'diamond'), new Card('Q',  'club'), new Card(6,     'club'), new Card(9,     'club')],
		[new Card(10,   'heart'), new Card('K', 'heart'), new Card(6,   'spade'), new Card(5,   'spade'), new Card(4,   'spade'), new Card(4,   'diamond'), new Card(5,   'diamond'), new Card(6, 'diamond'), new Card('K',   'club'), new Card(10,    'club')],
		[new Card('J',  'joker'), new Card(10,  'spade'), new Card(9,   'spade'), new Card(8,   'spade'), new Card(7,   'spade'), new Card(7,   'diamond'), new Card(8,   'diamond'), new Card(9, 'diamond'), new Card(10, 'diamond'), new Card('J',  'joker')]
	],

	mirrorHalf : 	[
		[new Card(7,    'heart'), new Card(4,   'heart'), new Card(2,   'heart'), new Card('A', 'heart'), new Card('K', 'spade'), new Card('K', 'diamond'), new Card('A',    'club'), new Card(2,    'club'), new Card(4,     'club'), new Card(7,     'club')],
		[new Card(8,    'heart'), new Card(5,   'heart'), new Card(3,   'heart'), new Card('Q', 'spade'), new Card('A', 'spade'), new Card('A', 'diamond'), new Card('Q', 'diamond'), new Card(3,    'club'), new Card(5,     'club'), new Card(8,     'club')],
		[new Card(9,    'heart'), new Card(6,   'heart'), new Card('Q', 'heart'), new Card(3,   'spade'), new Card(2,   'spade'), new Card(2,   'diamond'), new Card(3,   'diamond'), new Card('Q',  'club'), new Card(6,     'club'), new Card(9,     'club')],
		[new Card(10,   'heart'), new Card('K', 'heart'), new Card(6,   'spade'), new Card(5,   'spade'), new Card(4,   'spade'), new Card(4,   'diamond'), new Card(5,   'diamond'), new Card(6, 'diamond'), new Card('K',   'club'), new Card(10,    'club')],
		[new Card('J',  'joker'), new Card(10,  'spade'), new Card(9,   'spade'), new Card(8,   'spade'), new Card(7,   'spade'), new Card(7,   'diamond'), new Card(8,   'diamond'), new Card(9, 'diamond'), new Card(10, 'diamond'), new Card('J',  'joker')]
	],

	homePieces : [],
	awayPieces : [],


	init: function() {

		app.gameHolder = $('#game-holder');

		app.mirrorHalf.reverse();

		for (var i=0; i < app.mirrorHalf.length; i++) {
			app.mirrorHalf[i].reverse();
		}

		

		app.fullBoard = app.mirrorHalf.concat(app.defaultHalf);

		app.drawBoard(app.fullBoard);
		app.cardWidth = $('.card').height();

		app.drawPieces();
	},

	drawBoard : function(board) {

		var thisBoard = board;

		for (var row=0;  row < board.length; row++) {

			var $thisRow = $('<div class="card-row"></div>');

			for(var card=0; card < board[row].length; card++) {
				var thisCard = board[row][card];

				$thisRow.append(thisCard.$element);				
			}

			app.gameHolder.append($thisRow);
		}
	},


	drawPieces : function() {

		// Start one over to account for Jack spaces
		for (var i=1; i < 9; i++) {


			// X, Y, Team(0/1)
			var awayPiece = new Piece (i, 0, 0);
			var homePiece = new Piece (i, 9, 1);


			app.awayPieces.push(awayPiece);
			app.homePieces.push(homePiece);
		}

	},

	
}

$(document).on('ready', function() {
	app.init();
})