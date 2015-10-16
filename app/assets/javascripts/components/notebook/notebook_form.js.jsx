var NotebookForm = React.createClass({
  getInitialState: function() {
    return {
      title: ""
    };
  },

  handleTitleChange: function (e) {
    this.setState({title: e.currentTarget.value});
  },

  handleSubmit: function (e) {
    e.preventDefault();

    ApiUtil.addNotebook({title: this.state.title});
    this.setState({title: ""});
  },

  render: function() {
    return (
      <div className="create-notebook-div">
        <div className="create-notebook-wrapper">
          <div className="notebook-icon-header"></div>
            <form>
              <input type="text"
                     placeholder="Title your notebook"
                     onChange={this.handleTitleChange}
                     className="notebook-title"
                     value={this.state.title}></input>

             <button onClick={this.handleSubmit}>Create</button>
            </form>
          </div>
      </div>
    );
  }
});
