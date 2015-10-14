var Main = React.createClass({
  getInitialState: function() {
    return {
      currentPage: null
    };
  },
  handleLogOut: function () {
    ApiUtil.logUserOut(this.props.user);
  },

  addNote: function () {
    this.setState({currentPage: <AddNoteForm />});
  },

  updateNote: function (note) {
    this.setState({currentPage: <UpdateNoteForm note={note} />})
  },

  render: function() {
    var upperButtons = ["new_note", "search", "chat"]
    var lowerButtons = ["shortcuts", "notes", "notebooks", "tags"]

    return (
      <div className="container">
        <div className="row">
          <Sidebar addNote={this.addNote} upperButtons={upperButtons} lowerButtons={lowerButtons}/>
          <SlideOut updateNote={this.updateNote} />
          {this.state.currentPage}
        </div>

        <button onClick={this.handleLogOut}>Log Out</button>
      </div>
    );
  }
});
