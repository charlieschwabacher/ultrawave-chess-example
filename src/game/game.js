const validMoves = require('./valid_moves')
const numbers = [8,7,6,5,4,3,2,1]
const letters = 'abcdefgh'.split('')


module.exports = class Game {


  constructor(cursor) {
    this.cursor = cursor
    this.data = cursor.get()
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


  // returns a list of all valid moves for a piece, given a set of other pieces
  // sharing the board - this list includes moves that may be illegal (for
  // example moves that would put a player in check)
  validMoves(piece, pieces = this.data.pieces) {
    // get valid moves based on type, filter to stop pieces moving off the board
    return validMoves[piece.type](piece, pieces).filter(([i,j]) => {
      return i >= 0 && i < 8 && j >= 0 && j < 8
    })
  }


  // return a list of all legal moves for a piece - legal moves are moves that
  // are valid for the piece and do not leave the king in check
  legalMoves(piece) {
    const pieces = this.data.pieces

    return this.validMoves(piece, pieces).filter((move) => {

      // build a list of pieces as they will be after the move

      // remove any captured piece
      const [i, j] = move
      const newPieces = pieces.filter(({position}) => {
        const [ii, jj] = position
        return i !== ii || j != jj
      })

      // update position of moved piece
      const newPiece = {type: piece.type, color: piece.color, position: move}
      newPieces[newPieces.indexOf(piece)] = newPiece

      // move is illegal if it would leave the king in check
      return !this.isCheck(piece.color, newPieces)
    })
  }


  // returns a 2 layer map of legal moves for a piece {row: {col: true}}
  legalMovesMap(piece) {
    // convert list to map
    const result = {}
    for (let move of this.legalMoves(piece)) {
      const [i, j] = move
      result[i] = result[i] || {}
      result[i][j] = true
    }

    return result
  }


  // returns true if color's king is in check
  isCheck(color, pieces = this.data.pieces) {
    const king = pieces.find((p) => p.color === color && p.type === 'king')
    const [i, j] = king.position

    for (let piece of pieces) {
      if (piece.color !== color) {
        for (let [ii, jj] of this.validMoves(piece, pieces)) {
          if (i === ii && j === jj) return true
        }
      }
    }
    return false
  }


  // returns true if color cannot make a legal move
  isMate(color, pieces = this.data.pieces) {
    for (let piece of pieces) {
      if (piece.color === color && this.legalMoves(piece).length > 0) {
        return false
      }
    }
    return true
  }


  // move a piece to the position [i, j]
  movePiece(piece, [i, j]) {
    const opposingColor = piece.color === 'white' ? 'black' : 'white'
    const pieces = this.data.pieces
    const index = pieces.indexOf(piece)
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
    const to = this.labelFor([i, j])
    this.cursor.push('messages', {
      sender: null,
      text: `${piece.color} moved ${piece.type} from ${from} to ${to}`
    })
  }


}
