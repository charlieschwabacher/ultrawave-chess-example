const React = require('react')
const {Color} = require('./prop_types')


class GameStatus extends React.Component {
  render() {
    const {isCheck, isMate, playerColor, currentTurn} = this.props
    const isPlayerTurn = currentTurn === playerColor

    if (isMate) {
      return (
        <div className='flex-none mb1 mt3 h5 center bold'>
          {
            isCheck && isPlayerTurn ?
              <span className='red'>CHECKMATE (you lose)</span>
            : isCheck && playerColor ?
              <span className='green'>CHECKMATE (you win)</span>
            : isCheck ?
              <span className='green'>
                CHECKMATE ({currentTurn === 'white' ? 'black' : 'white'} wins)
              </span>
            :
              <span className='gray'>STALEMATE</span>
          }
        </div>
      )
    } else {
      return (
        <div className='flex-none gray mb1 mt3 h5'>
          <span className='gray'>
            {playerColor ? `Playing as ${playerColor}` : 'Observing'}
          </span>
          {
            playerColor && (
              <span className={`right ${isPlayerTurn ? 'green' : 'gray'}`}>
                {isPlayerTurn ? 'Your turn' : 'Their turn'}
                {
                  isCheck && isPlayerTurn ?
                    <span className='red'> (you are in check)</span>
                  :
                    null
                }
                {
                  isCheck && ! isPlayerTurn ?
                    <span className='green'> (they are in check)</span>
                  :
                    null
                }
              </span>
            )
          }
        </div>
      )
    }
  }
}


GameStatus.propTypes = {
  isCheck: React.PropTypes.bool.isRequired,
  isMate: React.PropTypes.bool.isRequired,
  currentTurn: Color.isRequired,
  playerColor: Color
}


module.exports = GameStatus
