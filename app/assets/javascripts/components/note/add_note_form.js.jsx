var AddNoteForm = React.createClass({
  getInitialState: function() {
    return {
      title: "",
      body: "",
      notebookId: this.props.notebooks[0].id
    };
  },

  handleSubmit: function () {
    ApiUtil.addNote({title: this.state.title,
                     body: this.state.body,
                     notebook_id: this.state.notebookId});

    this.setState({title: "", body: ""});
  },

  handleTitleChange: function (e) {
    this.setState({title: e.currentTarget.value});
  },

  handleBodyChange: function (value, delta, src) {
    this.setState({body: value});
  },

  updateNoteNotebook: function (notebookId) {
    this.setState({notebookId: notebookId});
  },

  render: function() {
    return (
      <div className="create-note-div">
        <NoteToolBelt notebooks={this.props.notebooks}
                      notebook={this.props.notebook}
                      handleSubmit={this.handleSubmit}
                      updateNoteNotebook={this.updateNoteNotebook}/>

        <input type="text"
               placeholder="Title your note"
               onChange={this.handleTitleChange}
               className="note-title"
               value={this.state.title}></input>

       <ReactQuill theme="snow"
                   styles={ false }
                   onChange={this.handleBodyChange}/>
      </div>
    );
  }
});
