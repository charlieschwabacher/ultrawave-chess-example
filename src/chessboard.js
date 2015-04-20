const Ultrawave = require('ultrawave')
const React = require('react')
const range = require('./range')
const validMoves = require('./valid_moves')


const numbers = [8,7,6,5,4,3,2,1]
const letters = 'abcdefgh'.split('')


class Chessboard extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedPiece: null
    }
  }

  selectPiece(piece) {
    this.setState({selectedPiece: piece})
  }

  movePiece(piece, position) {
    const pieces = this.props.pieces.get()
    const index = pieces.indexOf(piece)
    if (index >= 0) {
      this.props.pieces.set([index, 'position'], position)
      this.clearSelection()
    }
  }

  clearSelection() {
    this.setState({selectedPiece: null})
  }

  render() {
    const pieces = this.props.pieces.get()
    const selectedPiece = this.state.selectedPiece
    const moves = selectedPiece ? validMoves(selectedPiece, pieces) : {}

    return <div className='chessboard flex flex-column flex-none'>
      {
        // map rows from the top
        range(8).map((i) => {
          const rowPieces = pieces.filter((p) => p.position[0] === i)

          return <div key={i} className='flex flex-auto'>
            {
              // map columns from the left
              range(8).map((j) => {
                const piece = rowPieces.find((p) => p.position[1] === j)
                const validMove = moves[i] && moves[i][j]

                return <div
                  key={j}
                  className={
                    'square flex-auto relative' +
                    (
                      // if the piece is selected, give it an aqua background
                      (piece && piece === selectedPiece)
                      ? ' bg-aqua'
                      // if a different piece is selected and this square is a
                      // valid move, darken it
                      : (selectedPiece && selectedPiece !== piece && validMove)
                      ? ' bg-blue'
                      // otherwise give it its normal checkered color
                      : ((i + j) % 2 === 0)
                      ? ' bg-darken-2'
                      : ' bg-darken-3'
                    )
                  }
                  onClick={
                    // if the player clicks their own piece, select it
                    (piece && piece.color === this.props.playerColor)
                    ? () => this.selectPiece(piece)
                    // otherwise if a piece is selected and the player clicks
                    // a square that can be moved to, move to that square
                    : (selectedPiece && validMove)
                    ? () => this.movePiece(selectedPiece, [i, j])
                    : () => this.clearSelection()
                  }
                >
                  <div className='absolute bottom-0 m1 h6 white'>
                    {letters[j] + numbers[i]}
                  </div>
                  {
                    piece &&
                    <div className={
                      'piece h1 mt1 absolute left-0 right-0 center ' +
                      `${piece.color} ${piece.type}`
                    }/>
                  }
                </div>
              })
            }
          </div>
        })
      }
    </div>
  }
}


Chessboard.propTypes = {
  pieces: React.PropTypes.instanceOf(Ultrawave.Cursor).isRequired,
  playerColor: React.PropTypes.string
}


module.exports = Chessboard
