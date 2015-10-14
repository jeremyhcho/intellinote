var NoteIndexItem = React.createClass({
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
        <p className="title">{this.props.note.title}</p>
        <p className="timestamp">{this.props.note.updated_at} ago</p>
        <p className="body">{this.props.note.body}</p>
      </li>
    );
  }
});
