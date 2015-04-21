require('./util/polyfill')

const Ultrawave = require('ultrawave')
const React = require('react')
const App = require('./interface/app')
const Game = require('./game/game')
const initialData = require('./data/initial_data')


// connect to our peering server on port 8081

const ultrawave = new Ultrawave(`ws://${location.hostname}:8081`)


// create a group based on the url search string, update our react app
// when data changes

ultrawave
  .joinOrCreate(location.search, initialData, (data) => {
    React.render(
      <App
        data={data}
        game={new Game(data)}
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
