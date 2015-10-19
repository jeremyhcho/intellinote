var Conversation = React.createClass({
  getInitialState: function() {
    return {
      messages: MessageStore.conversationMessages(this.props.user.id),
      messageText: ""
    };
  },

  componentDidMount: function () {
    $(".convo").scrollTop($(".convo")[0].scrollHeight);
    MessageStore.addChangeHandler(this._onChange);
    ApiUtil.fetchAllMessages();
  },

  componentWillUnmount: function () {
    MessageStore.removeChangeHandler(this._onChange);
  },

  _onChange: function () {
    this.setState({messages: MessageStore.conversationMessages(this.props.user.id)}, function () {
      $(".convo").scrollTop($(".convo")[0].scrollHeight);
    });
  },

  handleChange: function (e) {
    this.setState({messageText: e.currentTarget.value});
  },

  handleSubmit: function () {
    ApiUtil.sendMessage({username: this.props.user.username,
                         body: this.state.messageText});

    this.setState({messageText: ""});
  },

  render: function() {
    return (
      <div className="conversation-wrapper">
        <div className="chat-info">
          <span>
            {this.props.user.username}
          </span>
        </div>

        <ul className="convo">
          {
            this.state.messages.map(function (message) {
              var leftOrRight = "";

              if (message.sender_id === this.props.user.id) {
                leftOrRight = "left";
              } else {
                leftOrRight = "right";
              }

              return <ConversationItem leftOrRight={leftOrRight} message={message}/>;
            }.bind(this))
          }
        </ul>

        <div className="conversation-submit">
          <textarea className="msg-input"
                    value={this.state.messageText}
                    onChange={this.handleChange}></textarea>
          <button onClick={this.handleSubmit} className="send-message">Send</button>
        </div>
      </div>
    );
  }
});
