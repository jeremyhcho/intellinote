var Messages = React.createClass({
  getInitialState: function() {
    return {
      users: MessageStore.all()
    };
  },

  componentDidMount: function() {
    MessageStore.addChangeHandler(this._onChange);
    ApiUtil.fetchAllMessages();
  },

  _onChange: function () {
    this.setState({users: MessageStore.all()});
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
              this.state.users.map(function (user) {
                return <li>{user.username}</li>;
              })
            }
          </ul>
        </div>
      </div>
    );
  }
});
