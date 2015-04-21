const pieceAtPosition = (position, pieces) => {
  const [i, j] = position
  for (let piece of pieces) {
    const [ii, jj] = piece.position
    if (i === ii && j === jj) return true
  }
  return false
}

const pieceOfColorAtPosition = (color, position, pieces) => {
  const [i, j] = position
  for (let piece of pieces) {
    const [ii, jj] = piece.position
    if (i === ii && j === jj && piece.color === color) return true
  }
  return false
}


const validMoves = {

  pawn: ({color, position}, pieces) => {
    const [i, j] = position
    const direction = color === 'white' ? -1 : 1
    const opposingColor = color === 'white' ? 'black' : 'white'
    const origin = color === 'white' ? 6 : 1
    const moves = []

    // pawns can move one or two spaces directly forward if unblocked
    if (!pieceAtPosition([i + direction, j], pieces)) {
      moves.push([i + direction, j])
      if (i === origin && !pieceAtPosition([i + 2 * direction, j], pieces)) {
        moves.push([i + 2 * direction, j])
      }
    }

    // pawns can move one space forward diagonally in either direction if they
    // are capturing an opposing piece
    if (pieceOfColorAtPosition(opposingColor, [i + direction, j - 1], pieces)) {
      moves.push([i + direction, j - 1])
    }
    if (pieceOfColorAtPosition(opposingColor, [i + direction, j + 1], pieces)) {
      moves.push([i + direction, j + 1])
    }

    return moves
  },

  rook: ({color, position}, pieces) => {
    const [i, j] = position
    const moves = []

    // rooks can move in a straight line in any direction until they encounter
    // a piece
    const processMove = (position) => {
      if (!pieceOfColorAtPosition(color, position, pieces)) {
        moves.push(position)
      }
      return pieceAtPosition(position, pieces)
    }
    for (var ii = i + 1; ii <= 7; ii++) {
      if (processMove([ii, j])) break
    }
    for (var ii = i - 1; ii >= 0; ii--) {
      if (processMove([ii, j])) break
    }
    for (var jj = j + 1; jj <= 7; jj++) {
      if (processMove([i, jj])) break
    }
    for (var jj = j - 1; jj >= 0; jj--) {
      if (processMove([i, jj])) break
    }

    return moves
  },

  knight: ({color, position}, pieces) => {
    const [i, j] = position

    // knights can jump over pieces, moving to any of these 8 positions as long
    // as they are unnocupied by a friendly piece
    const moves = [
      [-2, -1], [-2, 1], [-1, -2], [-1, 2], [2, -1], [2, 1], [1, -2], [1, 2]
    ]
      .map(([ii, jj]) => [i + ii, j + jj])
      .filter((move) => !pieceOfColorAtPosition(color, move, pieces))

    return moves
  },

  bishop: ({color, position}, pieces) => {
    const moves = []

    // bishops can move in a diagonal line in any direction until they encounter
    // a piece
    const processMove = (position) => {
      const [i, j] = position
      if (!pieceOfColorAtPosition(color, position, pieces)) {
        moves.push(position)
      }
      return (
        pieceAtPosition(position, pieces) || i < 0 || i > 7 || j < 0 || j > 7
      )
    }

    for (let iDirection of [1, -1]) {
      for (let jDirection of [1, -1]) {
        let [i, j] = position
        while (!processMove([i + iDirection, j + jDirection])) {
          i += iDirection
          j += jDirection
        }
      }
    }

    return moves
  },

  queen: (piece, pieces) => {
    // the queen move in either a straight or diagonal line in any direction
    // until she encouters a piece (she can make any move a rook or bishop can
    // make)
    const rook = validMoves.rook(piece, pieces)
    const bishop = validMoves.bishop(piece, pieces)
    return rook.concat(bishop)
  },

  king: ({color, position}, pieces) => {
    const [i, j] = position

    // the king can move one space in any direction as long as the space is not
    // occupied by a friendly piece
    const moves = [
      [1, -1], [1, 0], [1, 1], [0, -1], [0, 1], [-1, -1], [-1, 0], [-1, 1]
    ]
      .map(([ii, jj]) => [i + ii, j + jj])
      .filter((move) => !pieceOfColorAtPosition(color, move, pieces))

    return moves
  }

}


module.exports = validMoves
