const React = require('react')
const Ultrawave = require('ultrawave')
const Game = require('../game/game')


module.exports = {

  Game: React.PropTypes.instanceOf(Game),

  Cursor: React.PropTypes.instanceOf(Ultrawave.Cursor),

  Position: React.PropTypes.array,

  Color: React.PropTypes.oneOf(['white', 'black']),

  Piece: React.PropTypes.shape({
    type: React.PropTypes.oneOf([
      'pawn', 'rook', 'knight', 'bishop', 'queen', 'king'
    ]).isRequired,
    color: React.PropTypes.oneOf(['white', 'black']).isRequired,
    position: React.PropTypes.array
  })

}
