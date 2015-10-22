var NoteIndexItem = React.createClass({
  getInitialState: function() {
    return {
      title: "",
      body: "",
      updatedAt: ""
    };
  },

  componentDidMount: function() {
    this.setState({title: this.props.note.title,
                   body: this.props.note.body,
                   updatedAt: this.props.note.updated_at});
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({title: newProps.note.title,
                   body: newProps.note.body,
                   updatedAt: newProps.note.updated_at});
  },

  handleClick: function (e) {
    $('.notes-ul').children().removeClass('clicked');

    e.currentTarget.className += " clicked";
    debugger;
    this.props.updateNote.call(null, this.props.note);
  },

  deleteNote: function (e) {
    e.stopPropagation();
    ApiUtil.deleteNote(this.props.note);
  },

  toggleShortcut: function (e) {
    e.stopPropagation();
    ApiUtil.addShortcut(this.props.note);
  },

  render: function() {
    var body;
    if (this.state.body === "") {
      body = this.state.body;
    } else {
      if (typeof this.state.body === "string") {
        body = JSON.parse(this.state.body).ops[0].insert;
      } else {
        body = this.state.body.ops[0].insert;
      }
    }

    return (
      <li onClick={this.handleClick} className="note-index-item">
        <div className="options">
          <div onClick={this.deleteNote} className="note-icon delete"></div>
          <div onClick={this.toggleShortcut} className="note-icon shortcut"></div>
        </div>
        <p className="title">{this.state.title}</p>
        <p className="timestamp">{this.state.updatedAt} ago</p>
        <p className="body">{body}</p>
      </li>
    );
  }
});
