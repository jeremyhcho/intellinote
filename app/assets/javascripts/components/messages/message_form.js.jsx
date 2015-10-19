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
  },

  render: function() {
    return (
      <div className="form-wrapper">
        <form>
          <input type="text"
                 placeholder="username"
                 value={this.state.username}
                 onChange={this.handleUserChange}></input>
          <textarea placeholder="message"
                    value={this.state.body}
                    onChange={this.handleBodyChange}></textarea>
          <button className="send-message" onClick={this.handleSubmit}>Send</button>
        </form>
      </div>
    );
  }
});
