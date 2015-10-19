var Messages = React.createClass({
  getInitialState: function() {
    return {
      users: []
    };
  },

  componentDidMount: function() {
    MessageStore.addChangeHandler(this._onChange);
    ApiUtil.fetchAllMessages();
  },

  _onChange: function () {
    this.setState({users: MessageStore.allRecipients()});
  },

  componentWillUnmount: function () {
    MessageStore.removeChangeHandler(this._onChange);
  },

  render: function() {
    return (
      <div>
        <div className="upper-messages">
          <h1>MESSAGES</h1>
          <div onClick={this.props.addMessage} className="add-message"></div>
        </div>

        <div className="users-list">
          <ul>
            {
              this.state.users.map(function (user, idx) {
                return <MessageIndexItem user={user}
                                         key={idx}
                                         openConvo={this.props.openConvo}/>;
              }.bind(this))
            }
          </ul>
        </div>
      </div>
    );
  }
});
