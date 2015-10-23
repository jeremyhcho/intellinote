var NoteToolBelt = React.createClass({
  getInitialState: function() {
    return {
      notebook: this.props.notebook || this.props.notebooks[0],
      searchText: "",
      notebooks: this.props.notebooks,
      shortcut: false
    };
  },

  handleClick: function (notebook) {
    this.setState({notebook: notebook});
    this.props.updateNoteNotebook(notebook.id);
  },

  handleChange: function (e) {
    this.setState({searchText: e.currentTarget.value});
  },

  toggleShortcut: function () {
    this.setState({shortcut: !this.state.shortcut});
  },

  render: function() {
    var notebooks = this.props.notebooks.filter(function (notebook) {
      return notebook.title.toLowerCase().match(this.state.searchText.toLowerCase());
    }.bind(this));

    var toggledShortcut;
    if (this.state.shortcut) {
      toggledShortcut = " toggled-shortcut";
    }

    return (
      <div className="toolbelt">
        <div onClick={this.props.handleSubmit.bind(null, this.state.shortcut)}
             className="toolbelt-icon check-icon"></div>
        <div onClick={this.toggleShortcut} className={"toolbelt-icon shortcut-icon" + toggledShortcut}></div>
        <div className="notebook-dropdown-div">
          <p>{this.state.notebook && typeof this.state.notebook.id !== "undefined" ? this.state.notebook.title : this.props.notebooks[0].title}<span className="down-arrow"></span></p>
          <ul className="notebook-dropdown">
            <li className="no-hover">
              <input className="notebook-dropdown-search"
                   type="text"
                   placeholder="Find a notebook"
                   onChange={this.handleChange}
                   value={this.state.searchText}>
              </input>
            </li>
            {
              notebooks.map(function (notebook) {
                return <NotebookDropdownItem handleClick={this.handleClick} notebook={notebook} />;
              }.bind(this))
            }
          </ul>
        </div>
      </div>
    );
  }
});
