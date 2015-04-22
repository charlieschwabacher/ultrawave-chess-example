const React = require('react')
const {Color} = require('./prop_types')


class GameStatus extends React.Component {
  render() {
    const {playerColor, playerTurn} = this.props

    return (
      <div className='flex-none gray mb1 mt3 h5'>
        {playerColor ? `Playing as ${playerColor}` : 'Observing'}
        {
          playerColor && (
            (playerTurn)
            ? <span className='right green'>Your turn</span>
            : <span className='right'>Their turn</span>
          )
        }
      </div>
    )
  }
}


GameStatus.propTypes = {
  playerColor: Color,
  playerTurn: React.PropTypes.bool.isRequired
}


module.exports = GameStatus
