const Ultrawave = require('ultrawave')
const React = require('react')
const Chessboard = require('./chessboard')
const Chat = require('./chat')


class App extends React.Component {
  render() {
    return <main className='flex flex-column'>
      <h3 className='m0 p1 flex-none regular white bg-aqua'>ultrawave chess</h3>
      <div className='flex flex-auto'>
        <Chat
          self={this.props.self}
          messages={this.props.data.cursor('messages')}
        />
        <div
          className={
            'flex flex-center flex-auto scroll-x scroll-y'
          }
        >
          <div className='flex flex-grow flex-justify-center'>
            <Chessboard
              pieces={this.props.data.cursor('pieces')}
              playerColor='white'
            />
          </div>
        </div>
      </div>
    </main>
  }
}


App.propTypes = {
  data: React.PropTypes.instanceOf(Ultrawave.Cursor).isRequired
}


module.exports = App
