const React = require('react')
const Chessboard = require('./chessboard')
const Chat = require('./chat')
const GameStatus = require('./game_status')
const {Game, Cursor} = require('./prop_types')


class App extends React.Component {
  playerColor() {
    const players = this.props.data.get('players')
    const self = this.props.self

    if (players.white === this.props.self) {
      return 'white'
    } else if (players.black === this.props.self) {
      return 'black'
    }
  }

  render() {
    const playerColor = this.playerColor()
    const playerTurn = playerColor === this.props.data.get('currentTurn')

    return <main className='flex flex-column'>
      <div className='flex-none py1 px2 white bg-aqua'>
        <span className='knight'/> Chess
        <a
          className="right"
          href="//github.com/charlieschwabacher/ultrawave-chess-example"
        >
          Github
        </a>
      </div>
      <div className='flex flex-auto'>
        <Chat
          messages={this.props.data.cursor('messages')}
          name={playerColor || `Observer ${this.props.self.slice(0,4)}`}
        />
        <div className='flex flex-column flex-justify-center flex-auto scroll'>
          <div className='mx-auto px3'>
            <GameStatus
              playerColor={playerColor}
              playerTurn={playerTurn}
            />
            <div className='flex-auto'>
              <Chessboard
                game={this.props.game}
                playerColor={playerColor}
                playerTurn={playerTurn}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  }
}


App.propTypes = {
  data: Cursor.isRequired,
  game: Game.isRequired,
  self: React.PropTypes.string
}


module.exports = App
