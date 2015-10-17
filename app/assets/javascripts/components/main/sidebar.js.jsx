var Sidebar = React.createClass({
  render: function() {
    return (
      <div className="col-xs-1">
        <div className="sidebar">
          <img className="logo" src="/assets/logo" />
          <ul>
            <li onClick={this.props.addNote}
                className="upper-buttons new-note"
                data-content="Add Note"></li>
            <li onClick={this.props.search}
                className="upper-buttons search"
                data-content="Search"></li>
            <li className="upper-buttons chat"
                data-content="Chat"></li>
          </ul>

          <ul className="lower-ul">
            <li onClick={this.props.showShortcuts}
                className="lower-buttons shortcuts"
                data-content="Shortcuts"></li>
            <li onClick={this.props.showNotes}
                className="lower-buttons notes"
                data-content="Notes"></li>
            <li onClick={this.props.showNotebooks}
                className="lower-buttons notebooks"
                data-content="Notebooks"></li>
            <li className="lower-buttons tags"
                data-content="Tags"></li>
          </ul>
        </div>
      </div>
    );
  }
});
