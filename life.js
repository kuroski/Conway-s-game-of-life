(function() {
	
	var _ = self.Life = function(seed) {
		this.seed = seed;
		this.height = seed.length;
		this.width = seed[0].length;
		
		this.prevBoard = [];
		this.board = cloneArray(seed);	
	};
	
	_.prototype = {
		next: function() {
			this.prevBoard = cloneArray(this.board);
			
			for (var y=0; y<this.height; y++) {
				for (var x=0; x<this.width; x++) {
					var neighbors = this.aliveNeighbors(this.prevBoard, x, y); 
					var alive = !!this.board[y][x]
				}
			}
		},
		
		aliveNeighbors: function (array, x, y) {
			var prevRow = array[y-1] || [];
			var nextRow = array[y+1] || [];
			
			return [
				prevRow[x-1], prevRow[x], prevRow[x+1],
				array[y][x-1], array[y][x+1],
				nextRow[x-1], nextRow[x], nextRow[x+1]	
			].reduce(function (prev, cur) {
				// +undefined == NaN
				// !!undefined == false
				// +!!undefined == 0
				return prev + +!!cur;
			}, 0);
		},
		
		toString: function() {
			return this.board.map(function (row) { return row.join(' '); }).join('\n');
		}
	};
	
	// Helpers
	// Warning: Only clones 2D arrays
	function cloneArray(array) {
		return array.slice().map(function (row) { return row.slice(); });
	}
	
})();

var game = new Life([
	[0, 0, 0, 0, 0],
	[0, 0, 1, 0, 0],
	[0, 0, 1, 0, 0],
	[0, 0, 1, 0, 0],
	[0, 0, 0, 0, 0]
]);

console.log(game + '');

game.next();

console.log(game + '');