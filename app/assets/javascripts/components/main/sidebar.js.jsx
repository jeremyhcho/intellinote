var Sidebar = React.createClass({
  render: function() {
    return (
      <div className="col-xs-1">
        <div className="sidebar">
          <img className="logo" src="/assets/logo" />
          <ul>
            <li onClick={this.props.addNote} className="upper-buttons new-note"></li>
            <li onClick={this.props.search} className="upper-buttons search"></li>
            <li className="upper-buttons chat"></li>
          </ul>

          <ul className="lower-ul">
            <li className="lower-buttons shortcuts"></li>
            <li onClick={this.props.showNotes} className="lower-buttons notes"></li>
            <li onClick={this.props.showNotebooks} className="lower-buttons notebooks"></li>
            <li className="lower-buttons tags"></li>
          </ul>
        </div>
      </div>
    );
  }
});
