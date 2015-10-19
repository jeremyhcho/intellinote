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
    this.showNotebooks();
  },

  componentWillUnmount: function () {
    NotebookStore.removeChangeHandler(this._onChange);
  },

  _onChange: function () {
    this.setState({notebooks: NotebookStore.all()});
  },

  handleLogOut: function () {
    ApiUtil.logUserOut(this.props.user);
  },

  addNote: function (notebook) {
    this.setState({currentPage: <AddNoteForm notebook={notebook} notebooks={this.state.notebooks}/>});
  },

  updateNote: function (note) {
    this.setState({currentPage: <UpdateNoteForm note={note} notebooks={this.state.notebooks}/>})
  },

  showNotes: function () {
    this.setState({currentSlideOut: <NoteIndex updateNote={this.updateNote}/>})
  },

  showNotebooks: function () {
    this.setState({currentSlideOut:
                    <NotebookIndex notebooks={this.state.notebooks}
                                   addNotebook={this.addNotebook}
                                   showNotebookDetail={this.showNotebookDetail}/>});
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

  showShortcuts: function () {
    this.setState({currentSlideOut: <Shortcuts updateNote={this.updateNote}/>});
  },

  showMessages: function () {
    this.setState({currentSlideOut: <Messages addMessage={this.addMessage}
                                              openConvo={this.openConvo}/>});
  },

  openConvo: function (user) {
    this.setState({currentSlideOut: <Conversation user={user}/>});
  },

  addMessage: function () {
    this.setState({currentSlideOut: <MessageForm />});
  },

  render: function() {
    return (
      <div className="containers">
        <div className="row">
          <Sidebar addNote={this.addNote}
                   showNotebooks={this.showNotebooks}
                   search={this.search}
                   showNotes={this.showNotes}
                   showShortcuts={this.showShortcuts}
                   showMessages={this.showMessages} />
          <SlideOut updateNote={this.updateNote}
                    currentSlideOut={this.state.currentSlideOut} />
          {this.state.currentPage}
        </div>

        <button onClick={this.handleLogOut}>Log Out</button>
      </div>
    );
  }
});
