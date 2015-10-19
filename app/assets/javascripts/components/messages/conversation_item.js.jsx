var ConversationItem = React.createClass({
  render: function() {
    return (
      <li className={"conversation-item " + this.props.leftOrRight}>
        <p className="message-time">{this.props.message.formatted_date}</p>
        <p className="message-body">{this.props.message.body}</p>
      </li>
    );
  }
});
