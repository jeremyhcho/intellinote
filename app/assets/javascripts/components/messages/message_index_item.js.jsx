var MessageIndexItem = React.createClass({
  render: function() {
    return (
      <li onClick={this.props.openConvo.bind(null, this.props.user)}>
        <p>{this.props.user.username}</p>
        <div className="message-icons">
          <div className="message-icon message-trash"></div>
        </div>
        <p className="timestamp">{this.props.user.updated_at} ago</p>
      </li>
    );
  }
});
