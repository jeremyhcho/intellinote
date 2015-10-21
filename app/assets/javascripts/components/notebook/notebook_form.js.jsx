var NotebookForm = React.createClass({
  getInitialState: function() {
    return {
      title: "",
      errorMsgs: []
    };
  },

  componentDidMount: function() {
    ResponseStore.addNotebookErrorHandler(this._onError);
  },

  _onError: function () {
    this.setState({errorMsgs: ResponseStore.findNotebookErrors()});
  },

  componentWillUnmount: function () {
    ResponseStore.removeNotebookErrorHandler(this._onError);
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
    var notebookError;

    if (typeof this.state.errorMsgs[0] !== "undefined") {
      notebookError = <p className="notebook-errors">{this.state.errorMsgs}</p>;
    }

    return (
      <div className="create-notebook-div">
        <div className="create-notebook-wrapper">
          <div className="error-wrapper">
            {notebookError}
          </div>

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
