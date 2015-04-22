const React = require('react')
const Square = require('./square')
const range = require('../util/range')
const {Game, Cursor} = require('./prop_types')


class Chessboard extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedId: null
    }
  }

  selectPiece({id}) {
    this.setState({selectedId: id})
  }

  clearSelection() {
    this.setState({selectedId: null})
  }

  render() {
    const {game, playerTurn, playerColor} = this.props
    const pieces = game.pieces()
    const selected = game.pieceWithId(this.state.selectedId)
    const validMoves = selected ? game.validMoves(selected, pieces) : {}

    return (
      <div className='chessboard mb3 flex flex-column flex-none'>
        {
          range(8).map((i) =>
            <div key={i} className='flex flex-auto'>
              {
                range(8).map((j) => {
                  const position = [i, j]
                  const piece = game.pieceAtPosition(position)
                  const active = !!(piece && piece === selected)
                  const highlighted = !!(validMoves[i] && validMoves[i][j])

                  // get click action for tile
                  let onClick
                  if (piece && piece.color === playerColor && playerTurn) {
                    onClick = () => this.selectPiece(piece)
                  } else if (highlighted) {
                    onClick = () => {
                      game.movePiece(selected, position)
                      this.clearSelection()
                    }
                  } else {
                    onClick = () => this.clearSelection()
                  }

                  return (
                    <Square
                      key={j}
                      position={position}
                      piece={piece}
                      label={game.labelFor(position)}
                      active={active}
                      highlighted={highlighted}
                      onClick={onClick}
                    />
                  )
                })
              }
            </div>
          )
        }
      </div>
    )
  }
}


Chessboard.propTypes = {
  game: Game.isRequired,
  playerColor: React.PropTypes.string,
  playerTurn: React.PropTypes.bool
}


module.exports = Chessboard
