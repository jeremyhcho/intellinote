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
                   updatedAt: this.props.note.updated_at})
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({title: newProps.note.title,
                   body: newProps.note.body,
                   updatedAt: newProps.note.updated_at})
  },

  handleClick: function (e) {
    $('.notes-ul').children().removeClass('clicked');

    e.currentTarget.className += " clicked"
    this.props.updateNote.call(null, this.props.note)
  },

  deleteNote: function (e) {
    e.stopPropagation();
    ApiUtil.deleteNote(this.props.note);
  },

  render: function() {
    return (
      <li onClick={this.handleClick} className="note-index-item">
        <div className="options">
          <div onClick={this.deleteNote} className="delete"></div>
        </div>
        <p className="title">{this.state.title}</p>
        <p className="timestamp">{this.state.updatedAt} ago</p>
        <p className="body" dangerouslySetInnerHTML={{__html: this.state.body}}></p>
      </li>
    );
  }
});
