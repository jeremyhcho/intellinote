var NoteToolBelt = React.createClass({
  getInitialState: function() {
    return {
      notebook: this.props.notebook || this.props.notebooks[0]
    };
  },

  handleClick: function (notebook) {
    this.setState({notebook: notebook});
    this.props.updateNoteNotebook(notebook.id);
  },

  render: function() {
    return (
      <div className="toolbelt">
        <div onClick={this.props.handleSubmit} className="toolbelt-icon check-icon"></div>
        <div className="toolbelt-icon reminder-icon"></div>
        <div className="toolbelt-icon shortcut-icon"></div>
        <div className="toolbelt-icon delete-icon"></div>
        <div className="notebook-dropdown-div">
          <p>{this.state.notebook && typeof this.state.notebook.id !== "undefined" ? this.state.notebook.title : this.props.notebooks[0].title}<span className="down-arrow"></span></p>
          <ul className="notebook-dropdown">
            <li className="no-hover">
              <input className="notebook-dropdown-search"
                   type="text"
                   placeholder="Find a notebook">
              </input>
            </li>
            {
              this.props.notebooks.map(function (notebook) {
                return <NotebookDropdownItem handleClick={this.handleClick} notebook={notebook} />;
              }.bind(this))
            }
          </ul>
        </div>
      </div>
    );
  }
});
