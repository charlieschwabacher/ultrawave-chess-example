const Ultrawave = require('ultrawave')
const React = require('react')


class Chat extends React.Component {
  onSubmit = (e) => {
    e.preventDefault()
    const input = this.refs.input.getDOMNode()
    const message = input.value
    input.value = ''

    // push the new message onto the array in ultrawave
    this.props.messages.push({sender: this.props.self, text: message})
  }

  render() {
    // get the messages array object out from our cursor
    const messages = this.props.messages.get()
    const self = this.props.self

    // make sure messages stay scrolled to the bottom
    setTimeout(() => {this.refs.messages.getDOMNode().scrollTop = Infinity})

    return <section className='chat flex flex-column flex-none bg-darken-1'>
      <div
        className='scroll-y flex flex-column flex-auto p1'
        ref='messages'
      >
        {
          messages.map(({sender, text}, i) =>
            <div
              key={i}
              className={
                'mb1 flex-none' +
                ((sender === self) ? ' bold' : '') +
                ((sender === null) ? ' gray' : '')
              }
            >
              {text}
            </div>
          )
        }
      </div>
      <form className='flex p1 flex-none' onSubmit={this.onSubmit}>
        <input
          type='text'
          className='field-light mr1 flex-auto not-rounded'
          ref='input'
          placeholder='Message'
        />
        <button
          type='submit'
          className='button not-rounded white '
        >
          Send
        </button>
      </form>
    </section>
  }
}


Chat.propTypes = {
  self: React.PropTypes.string.isRequired,
  messages: React.PropTypes.instanceOf(Ultrawave.Cursor).isRequired
}


module.exports = Chat
