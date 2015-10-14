var UpdateNoteForm = React.createClass({
  getInitialState: function() {
    return {
      title: "",
      body: ""
    };
  },
  componentDidMount: function() {
    this.setState({title: this.props.note.title, body: this.props.note.body})
  },

  handleSubmit: function () {
    var newNote = $.extend(this.props.note, {title: this.state.title, body: this.state.body})
    ApiUtil.updateNote(newNote);
  },

  handleTitleChange: function (e) {
    this.setState({title: e.currentTarget.value});
  },

  handleBodyChange: function (e) {
    this.setState({body: e.currentTarget.value});
  },

  render: function() {
    return (
      <div className="update-note-div">
        <form>
          <div className="form-group">
            <label>Title</label>
            <input type="text" onChange={this.handleTitleChange} className="form-control" value={this.state.title}></input>
          </div>

          <div className="form-group">
            <label>Body</label>
            <textarea className="form-control" onChange={this.handleBodyChange} value={this.state.body}></textarea>
          </div>

          <button onClick={this.handleSubmit} className="btn btn-custom">Done</button>
        </form>
      </div>
    );
  }
});
