const validMoves = require('./valid_moves')
const numbers = [8,7,6,5,4,3,2,1]
const letters = 'abcdefgh'.split('')


module.exports = class Game {
  constructor(cursor) {
    this.cursor = cursor
    this.data = cursor.get()
  }

  pieces() {
    return this.data.pieces
  }

  pieceAtPosition([i, j]) {
    return this.data.pieces.find(({position}) => {
      const [ii, jj] = position
      return ii === i && jj === j
    })
  }

  pieceWithId(id) {
    return this.data.pieces.find((piece) => piece.id === id)
  }

  labelFor([i, j]) {
    return `${letters[j]}${numbers[i]}`
  }

  validMoves(piece) {
    const moves = validMoves[piece.type](piece, this.data.pieces)
    const result = {}

    for (let move of moves) {
      const [i, j] = move
      result[i] = result[i] || {}
      result[i][j] = true
    }
    return result
  }

  movePiece(piece, [i, j]) {
    const opposingColor = piece.color === 'white' ? 'black' : 'white'
    const pieces = this.data.pieces
    const index = pieces.indexOf(piece)

    if (index >= 0) {
      const initialPosition = piece.position

      // update position of piece
      this.cursor.set(['pieces', index, 'position'], [i, j])

      // remove any captured piece
      const capturedPieceIndex = pieces.findIndex(({position}) => {
        const [ii, jj] = position
        return i === ii && j === jj
      })
      if (capturedPieceIndex >= 0) {
        this.cursor.splice(['pieces'], capturedPieceIndex, 1)
      }

      // if a pawn has moved to the last row, promote it to a queen
      const advanceRow = piece.color === 'white' ? 0 : 7
      if (piece.type === 'pawn' && i === advanceRow) {
        this.cursor.set(['pieces', index, 'type'], 'queen')
      }

      // update current turn
      this.cursor.set('currentTurn', opposingColor)

      // post a message
      const from = this.labelFor(initialPosition)
      const to = this.labelFor(piece.position)
      this.cursor.push('messages', {
        sender: null,
        text: `${piece.color} moved ${piece.type} from ${from} to ${to}`
      })
    }
  }
}