# Ultrawave Chess Example

This is a multiplayer chess game using [ultrawave](//github.com/charlieschwabcher/ultrawave)
to synchronize game state over WebRTC data channels.

To run locally, `npm install` and `npm start`, then visit [localhost:8080](http://localhost:8080/) in a few tabs and try making some moves.

Games are identified using the query string - the first user to connect with a given query string will create a game and play as white.  The second will play as black, and any subsequent users will be observers (able to join in the chat, but unable to move pieces).

The game is entirely peer to peer, with no data sent to the server.  Once a game is done and everyone has closed the tab, its query string will be available again for a new game.

The source is es6 and css4 - after editing, `npm run build` to compile w/ babel and cssnext.
