var Sidebar = React.createClass({
  getInitialState: function() {
    return {
      responseMsgs: [],
      status: "",
      type: ""
    };
  },

  componentDidMount: function() {
    ResponseStore.addNotebookDeleteSuccessHandler(this._onNotebookDeleteSuccess);
    ResponseStore.addNotebookDeleteFailHandler(this._onNotebookDeleteFail);
    ResponseStore.addNoteAddSuccessHandler(this._onNoteAddSuccess);
    ResponseStore.addNoteUpdateSuccessHandler(this._onNoteUpdateSuccess);
    ResponseStore.addNoteAddFailHandler(this._onNoteAddFail);
  },

  componentWillUnmount: function () {
    ResponseStore.removeNotebookDeleteSuccessHandler(this._onNotebookDeleteSuccess);
    ResponseStore.removeNotebookDeleteFailHandler(this._onNotebookDeleteFail);
    ResponseStore.removeNoteAddSuccessHandler(this._onNoteAddSuccess);
    ResponseStore.removeNoteUpdateSuccessHandler(this._onNoteUpdateSuccess);
    ResponseStore.removeNoteAddFailHandler(this._onNoteAddFail);
  },

  _onNoteAddFail: function () {
    this.setState({responseMsgs: ResponseStore.findNoteAddFail(),
                   status: "FAIL", type: "NOTE"}, this.removeResponse);
  },

  _onNoteUpdateSuccess: function () {
    this.setState({responseMsgs: ResponseStore.findNoteUpdateSuccess(),
                   status: "SUCCESS", type: "NOTE"}, this.removeResponse);
  },

  _onNoteAddSuccess: function () {
    this.setState({responseMsgs: ResponseStore.findNoteAddSuccess(),
                   status: "SUCCESS", type: "NOTE"}, this.removeResponse);
  },

  _onNoteDeleteSuccess: function () {
    this.setState({responseMsgs: ResponseStore.findNoteDeleteSuccess(),
                   status: "SUCCESS", type: "NOTE"}, this.removeResponse);
  },

  _onNotebookDeleteFail: function () {
    this.setState({responseMsgs: ResponseStore.findNotebookDeleteFail(),
                   status: "FAIL", type: "NOTEBOOK"}, this.removeResponse);
  },

  _onNotebookDeleteSuccess: function () {
    this.setState({responseMsgs: ResponseStore.findNotebookDeleteSuccess(),
                   status: "SUCCESS", type: "NOTEBOOK"}, this.removeResponse);
  },

  removeResponse: function () {
    setTimeout(function () {
      this.setState({responseMsgs: []});
    }.bind(this), 3000);
  },

  displayNotebookResponse: function () {
    var response;

    if (typeof this.state.responseMsgs[0] !== "undefined") {
      if (this.state.type === "NOTEBOOK") {
        if (this.state.status === "SUCCESS") {
          // notebook success
          response = <div className="sidebar-success-msg notebook-delete-msg">{this.state.responseMsgs[0]}</div>;
        } else if (this.state.status === "FAIL") {
          // notebook fail
          response = <div className="sidebar-fail-msg notebook-delete-msg">{this.state.responseMsgs[0]}</div>
        }
      }
    }

    return response;
  },

  displayNoteResponse: function () {
    var response;
    if (typeof this.state.responseMsgs[0] !== "undefined") {
      if (this.state.type === "NOTE") {
        if (this.state.status === "SUCCESS") {
          response = <div className="sidebar-success-msg note-add-msg">{this.state.responseMsgs[0]}</div>;
        } else {
          response = <div className="sidebar-fail-msg note-add-msg">{this.state.responseMsgs[0]}</div>;
        }
      }
    }

    return response;
  },

  render: function() {
    return (
      <div className="sidebar-wrapper">
        <div className="sidebar">
          <img className="logo" src="/assets/logo" />
          <ul>
            <li onClick={this.props.addNote}
                className="upper-buttons new-note"
                data-content="Add Note"></li>
            <li onClick={this.props.search}
                className="upper-buttons search"
                data-content="Search"></li>
            <li onClick={this.props.showMessages}
                className="upper-buttons chat"
                data-content="Chat"></li>
          </ul>

          <ul className="lower-ul">
            <li onClick={this.props.showShortcuts}
                className="lower-buttons shortcuts"
                data-content="Shortcuts"></li>
            <li onClick={this.props.showNotes}
                className="lower-buttons notes"
                data-content="Notes">{this.displayNoteResponse()}</li>
            <li onClick={this.props.showNotebooks}
                className="lower-buttons notebooks"
                data-content="Notebooks">{this.displayNotebookResponse()}</li>
            <li className="lower-buttons tags"
                data-content="Tags"
                onClick={this.props.showTags}></li>
            <li className="log-out-li" data-content="Log Out">
              <button className="log-out" onClick={this.props.handleLogOut}></button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});
