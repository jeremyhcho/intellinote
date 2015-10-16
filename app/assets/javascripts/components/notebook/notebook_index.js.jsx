var NotebookIndex = React.createClass({
  getInitialState: function() {
    return {
      notebookSearch: "",
      notebooks: this.props.notebooks
    };
  },

  componentDidMount: function() {
    NoteStore.addChangeHandler(this._onChange);
  },

  _onChange: function () {
    ApiUtil.fetchAllNotebooks();

    this.setState({notebooks: NotebookStore.all()});
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({notebooks: newProps.notebooks});
  },

  handleInput: function (e) {
    this.setState({notebookSearch: e.currentTarget.value});
  },

  render: function () {
    var notebooks = this.props.notebooks.filter(function (notebook) {
      return notebook.title.toLowerCase().match(this.state.notebookSearch);
    }.bind(this));

    return (
      <div className="notebook-index">
        <div className="upper-notebook-index">
          <div className="notebook-control">
            <h1>NOTEBOOKS</h1>
            <div onClick={this.props.addNotebook} className="add-notebook-icon"></div>
          </div>

          <input className="notebook-search"
                 type="text"
                 placeholder="Find a notebook"
                 value={this.state.notebookSearch}
                 onChange={this.handleInput}></input>
       </div>

       <div className="notebook-list-div">
         <ul className="notebook-list">
           {
             notebooks.map(function (notebook) {
               return (
                 <NotebookIndexItem key={notebook.id}
                                    notebook={notebook}
                                    showNotebookDetail={this.props.showNotebookDetail} />
               );
             }.bind(this))
           }
         </ul>
       </div>
      </div>
    );
  }
});
