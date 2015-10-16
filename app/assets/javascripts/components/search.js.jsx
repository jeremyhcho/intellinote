var Search = React.createClass({
  getInitialState: function() {
    return {
      search: "",
      notes: NoteStore.all(),
      text: "your notebooks"
    };
  },

  componentDidMount: function() {
    NoteStore.addChangeHandler(this._onChange);
    if (NoteStore.all().length === 0) {
      ApiUtil.fetchAllNotes();
    }
  },

  _onChange: function () {
    this.setState({notes: NoteStore.all()});
  },

  handleInput: function (e) {
    this.setState({search: e.currentTarget.value});
  },

  changeSearchingNotebook: function (notebook) {
    if (notebook === "all notebooks") {
      this.setState({notes: NoteStore.all(), text: "your notebooks"});
    } else {
      this.setState({notes: notebook.notes, text: notebook.title});
    }
  },

  render: function() {
    var filteredNotes = [];

    if (this.state.search !== "") {
      filteredNotes = this.state.notes.filter(function (note) {
        return note.title.toLowerCase().match(this.state.search.toLowerCase());
      }.bind(this));
    }

    return (
      <div className="search-wrapper">
        <input placeholder="search notes"
               type="text"
               className="lg-search-bar"
               value={this.state.search}
               onChange={this.handleInput}></input>
        <div className="bottom-border">
          <p>searching in</p>
          <div className="search-dropdown-div">
            <p className="current-notebook">{this.state.text}<span className="green-arrow"></span></p>
            <ul className="search-notebook-dropdown">
              <li onClick={this.changeSearchingNotebook.bind(null, "all notebooks")}
                  className="all-notebooks">your notebooks</li>
              {
                NotebookStore.all().map(function (notebook) {
                  return <li onClick={this.changeSearchingNotebook.bind(null, notebook)}
                             className="dropdown-item" key={notebook.id}>
                            <span className="sm-notebook-icon"></span>&nbsp;&nbsp;
                            {notebook.title}
                         </li>;
                }.bind(this))
              }
            </ul>
          </div>
        </div>
          <div>
            <ul>
              {
                filteredNotes.length !== 0 ? (
                  filteredNotes.map(function (note) {
                    return <NoteIndexItem note={note} />;
                  })
                ) : (
                  <li></li>
                )
              }
            </ul>
          </div>
      </div>
    );
  }
});
