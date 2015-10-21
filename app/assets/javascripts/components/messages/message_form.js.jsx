var MessageForm = React.createClass({
  getInitialState: function() {
    return {
      username: "",
      body: ""
    };
  },

  handleUserChange: function (e) {
    this.setState({username: e.currentTarget.value});
  },

  handleBodyChange: function (e) {
    this.setState({body: e.currentTarget.value});
  },

  handleSubmit: function () {
    ApiUtil.sendMessage({username: this.state.username,
                         body: this.state.body});

    this.props.openConvo.call(null, MessageStore.findUserByUsername(this.state.username));
  },

  render: function() {
    return (
      <div className="form-wrapper">
        <form>
          <div className="form-grp">
            <label>To:</label>
            <input type="text"
                   placeholder="Enter username"
                   value={this.state.username}
                   onChange={this.handleUserChange}></input>
          </div>
          <textarea value={this.state.body}
                    onChange={this.handleBodyChange}></textarea>
          <button className="send-message" onClick={this.handleSubmit}>Send</button>
        </form>
      </div>
    );
  }
});
