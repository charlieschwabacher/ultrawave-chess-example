const React = require('react')
const Square = require('./square')
const range = require('../util/range')
const {Game, Color} = require('./prop_types')


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
    const {game, currentTurn, playerColor, frozen} = this.props
    const isPlayerTurn = currentTurn === playerColor
    const selected = game.pieceWithId(this.state.selectedId)
    const legalMoves = selected ? game.legalMovesMap(selected) : {}

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
                  const highlighted = !!(legalMoves[i] && legalMoves[i][j])

                  return (
                    <Square
                      key={j}
                      position={position}
                      piece={piece}
                      label={game.labelFor(position)}
                      active={active}
                      highlighted={highlighted}
                      onClick={
                        frozen ?
                          null
                        : piece && piece.color === playerColor && isPlayerTurn ?
                          () => this.selectPiece(piece)
                        : highlighted ?
                          () => {
                            game.movePiece(selected, position)
                            this.clearSelection()
                          }
                        :
                          () => this.clearSelection()
                      }
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
  frozen: React.PropTypes.bool.isRequired,
  game: Game.isRequired,
  currentTurn: Color.isRequired,
  playerColor: Color
}


module.exports = Chessboard
