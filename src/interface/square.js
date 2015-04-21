const React = require('react')
const {Piece, Position, Color} = require('./prop_types')


class Square extends React.Component {
  render() {
    const {position, piece, label, active, highlighted, onClick} = this.props
    const [i, j] = position

    // get class to apply color to tile
    let colorClass
    if (active) {
      colorClass = 'bg-aqua'
    } else if (highlighted) {
      colorClass = 'bg-blue'
    } else if ((i + j) % 2 === 0) {
      colorClass = 'bg-silver'
    } else {
      colorClass = 'bg-gray'
    }

    return <div
      className={`square flex-auto relative ${colorClass}`}
      onClick={onClick}
    >
      <div className='absolute bottom-0 m1 h6 white'>{label}</div>
      {
        piece &&
        <div className={
          'piece h1 mt1 absolute left-0 right-0 center ' +
          `${piece.color} ${piece.type}`
        }/>
      }
    </div>
  }
}


Square.propTypes = {
  position: Position.isRequired,
  piece: Piece,
  label: React.PropTypes.string.isRequired,
  active: React.PropTypes.bool.isRequired,
  highlighted: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func.isRequired
}


module.exports = Square
