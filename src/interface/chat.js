const React = require('react')
const {Cursor} = require('./prop_types')


class Chat extends React.Component {

  onSubmit = (e) => {
    e.preventDefault()
    const input = this.refs.input.getDOMNode()
    const message = input.value
    input.value = ''

    // push the new message onto the array in ultrawave
    if (message.length > 0) {
      this.props.messages.push({sender: this.props.name, text: message})
    }
  }

  render() {
    // get the messages array object out from our cursor
    const messages = this.props.messages.get()
    const name = this.props.name

    // make sure messages stay scrolled to the bottom
    setTimeout(() => {this.refs.messages.getDOMNode().scrollTop = Infinity})

    return <section className='chat flex flex-column flex-none bg-darken-1'>
      <div
        className='flex flex-column flex-auto scroll py2'
        ref='messages'
      >
        {
          messages.map(({sender, text}, i) =>
            <div
              key={i}
              className={
                'py1 px2 flex-none' +
                ((sender === name) ? ' bg-white' : '') +
                ((sender === null) ? ' gray' : '')
              }
            >
              {
                sender ?
                  <span className='bold'>{sender}: </span>
                :
                  null
              }
              {text}
            </div>
          )
        }
      </div>
      <form className='flex p2 flex-none' onSubmit={this.onSubmit}>
        <input
          type='text'
          className='field-light border-white flex-auto rounded-left'
          ref='input'
          placeholder='Message'
        />
        <button
          type='submit'
          className='button rounded-right white regular bg-aqua x-group-item'
        >
          Send
        </button>
      </form>
    </section>
  }
}


Chat.propTypes = {
  name: React.PropTypes.string.isRequired,
  messages: Cursor.isRequired,
}


module.exports = Chat
