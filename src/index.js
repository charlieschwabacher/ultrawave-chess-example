require('./util/polyfill')

const Ultrawave = require('ultrawave')
const React = require('react')
const App = require('./interface/app')
const Game = require('./game/game')
const initialData = require('./data/initial_data')


// connect to our local peering server (or, if this is running on github pages,
// connect to the example server on openshift)

const ultrawave = new Ultrawave(
  location.hostname === 'localhost'
  ? 'ws://localhost:8000'
  : 'ws://examples-ultrawave.rhcloud.com:8000'
)


// create a group based on the url search string, update our react app
// when data changes

ultrawave
  .joinOrCreate(`chess:${location.search}`, initialData, (data) => {
    const game = new Game(data)
    React.render(
      <App
        data={data}
        game={game}
        self={ultrawave.id}
      />
    , document.body)
  })
  .then((handle) => {
    // after connecting, claim a color if both have not already been taken
    const data = handle.data()
    if (data.players.white == null) {
      handle.set(['players', 'white'], ultrawave.id)
    } else if (data.players.black == null) {
      handle.set(['players', 'black'], ultrawave.id)
    }
  })
  .catch((e) => console.log(e.stack))
