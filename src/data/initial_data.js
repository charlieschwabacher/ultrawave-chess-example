module.exports = {
  messages: [],
  players: {
    white: null,
    black: null
  },
  currentTurn: 'white',
  pieces: [
    // white
    {id: 'wp1', color: 'white', type: 'pawn',   position: [6, 0]},
    {id: 'wp2', color: 'white', type: 'pawn',   position: [6, 1]},
    {id: 'wp3', color: 'white', type: 'pawn',   position: [6, 2]},
    {id: 'wp4', color: 'white', type: 'pawn',   position: [6, 3]},
    {id: 'wp5', color: 'white', type: 'pawn',   position: [6, 4]},
    {id: 'wp6', color: 'white', type: 'pawn',   position: [6, 5]},
    {id: 'wp7', color: 'white', type: 'pawn',   position: [6, 6]},
    {id: 'wp8', color: 'white', type: 'pawn',   position: [6, 7]},
    {id: 'wr1', color: 'white', type: 'rook',   position: [7, 0]},
    {id: 'wk1', color: 'white', type: 'knight', position: [7, 1]},
    {id: 'wb1', color: 'white', type: 'bishop', position: [7, 2]},
    {id: 'wqq', color: 'white', type: 'queen',  position: [7, 3]},
    {id: 'wkk', color: 'white', type: 'king',   position: [7, 4]},
    {id: 'wb2', color: 'white', type: 'bishop', position: [7, 5]},
    {id: 'wk2', color: 'white', type: 'knight', position: [7, 6]},
    {id: 'wr2', color: 'white', type: 'rook',   position: [7, 7]},

    // black
    {id: 'bp1', color: 'black', type: 'pawn',   position: [1, 0]},
    {id: 'bp2', color: 'black', type: 'pawn',   position: [1, 1]},
    {id: 'bp3', color: 'black', type: 'pawn',   position: [1, 2]},
    {id: 'bp4', color: 'black', type: 'pawn',   position: [1, 3]},
    {id: 'bp5', color: 'black', type: 'pawn',   position: [1, 4]},
    {id: 'bp6', color: 'black', type: 'pawn',   position: [1, 5]},
    {id: 'bp7', color: 'black', type: 'pawn',   position: [1, 6]},
    {id: 'bp8', color: 'black', type: 'pawn',   position: [1, 7]},
    {id: 'br1', color: 'black', type: 'rook',   position: [0, 0]},
    {id: 'bk1', color: 'black', type: 'knight', position: [0, 1]},
    {id: 'bb1', color: 'black', type: 'bishop', position: [0, 2]},
    {id: 'bqq', color: 'black', type: 'queen',  position: [0, 3]},
    {id: 'bkk', color: 'black', type: 'king',   position: [0, 4]},
    {id: 'bb2', color: 'black', type: 'bishop', position: [0, 5]},
    {id: 'bk2', color: 'black', type: 'knight', position: [0, 6]},
    {id: 'br2', color: 'black', type: 'rook',   position: [0, 7]}
  ]
}