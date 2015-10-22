var NotebookIndexItem = React.createClass({
  deleteNotebook: function (e) {
    e.stopPropagation();
    ApiUtil.deleteNotebook(this.props.notebook);
    ApiUtil.fetchAllNotes();
  },

  render: function() {
    return (
      <li onClick={this.props.showNotebookDetail.bind(null, this.props.notebook)} className="notebook-list-item">
        {this.props.notebook.title}
        <div className="notebook-list-icons">
          <div onClick={this.deleteNotebook} className="notebook-icon notebook-trash"></div>
        </div>
      </li>
    );
  }
});
