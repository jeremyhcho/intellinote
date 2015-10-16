var Main = React.createClass({
  getInitialState: function() {
    return {
      currentPage: null,
      currentSlideOut: null,
      notebooks: []
    };
  },

  componentDidMount: function() {
    NotebookStore.addChangeHandler(this._onChange);
    ApiUtil.fetchAllNotebooks();
  },

  _onChange: function () {
    this.setState({notebooks: NotebookStore.all()}, this.showNotebooks);
  },

  handleLogOut: function () {
    ApiUtil.logUserOut(this.props.user);
  },

  addNote: function (notebook) {
    this.setState({currentPage: <AddNoteForm notebook={notebook} notebooks={this.state.notebooks}/>},
      this.showNotebooks);
  },

  updateNote: function (note) {
    this.setState({currentPage: <UpdateNoteForm note={note} notebooks={this.state.notebooks}/>})
  },

  showNotes: function () {
    this.setState({currentSlideOut: <NoteIndex />})
  },

  showNotebooks: function () {
    this.setState({currentSlideOut:
                    <NotebookIndex notebooks={this.state.notebooks}
                                   addNotebook={this.addNotebook}
                                   showNotebookDetail={this.showNotebookDetail}/>})
  },

  showNotebookDetail: function (notebook) {
    this.setState({currentPage: <NotebookDetail notebook={notebook}
                                                updateNote={this.updateNote}
                                                showNotebookDetail={this.showNotebookDetail}
                                                addNote={this.addNote}/>});
  },

  addNotebook: function (notebook) {
    this.setState({currentPage: <NotebookForm />});
  },

  search: function () {
    this.setState({currentPage: <Search />});
  },

  render: function() {
    return (
      <div className="containers">
        <div className="row">
          <Sidebar addNote={this.addNote}
                   showNotebooks={this.showNotebooks}
                   search={this.search}
                   showNotes={this.showNotes}/>
          <SlideOut updateNote={this.updateNote}
                    currentSlideOut={this.state.currentSlideOut} />
          {this.state.currentPage}
        </div>

        <button onClick={this.handleLogOut}>Log Out</button>
      </div>
    );
  }
});
