var UpdateNoteForm = React.createClass({
  getInitialState: function() {
    return {
      title: "",
      body: ""
    };
  },
  componentDidMount: function() {
    this.setState({title: this.props.note.title, body: this.props.note.body});
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({title: newProps.note.title, body: newProps.note.body});
  },

  handleSubmit: function () {
    var newNote = $.extend(this.props.note, {title: this.state.title, body: this.state.body});
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
        <NoteToolBelt notebooks={this.props.notebooks} handleSubmit={this.handleSubmit} />
        <form>
          <div className="form-group">
            <input type="text"
                   onChange={this.handleTitleChange}
                   className="note-title"
                   value={this.state.title}></input>
          </div>

          <ReactQuill theme="snow"
                      styles={false}
                      onChange={this.handleBodyChange}
                      defaultValue={this.state.body} />
        </form>
      </div>
    );
  }
});
