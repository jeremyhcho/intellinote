var AddNoteForm = React.createClass({
  getInitialState: function() {
    return {
      title: "",
      body: ""
    };
  },

  handleSubmit: function () {
    ApiUtil.addNote({title: this.state.title, body: this.state.body});

    this.setState({title: "", body: ""});
  },

  handleTitleChange: function (e) {
    this.setState({title: e.currentTarget.value});
  },

  handleBodyChange: function (e) {
    this.setState({body: e.currentTarget.value});
  },

  render: function() {
    return (
      <div className="create-note-div">
        <form>
          <div className="form-group">
            <label>Title</label>
            <input type="text" onChange={this.handleTitleChange} className="form-control" value={this.state.title}></input>
          </div>

          <div className="form-group">
            <label>Body</label>
            <textarea className="form-control" onChange={this.handleBodyChange} value={this.state.body}></textarea>
          </div>

          <button onClick={this.handleSubmit} className="btn btn-custom">Add Note</button>
        </form>
      </div>
    );
  }
});
