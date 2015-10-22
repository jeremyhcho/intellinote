var UpdateNoteForm = React.createClass({
  getInitialState: function() {
    return {
      title: "",
      body: ""
    };
  },

  componentDidMount: function() {
    TagStore.addChangeHandler(this._onChange);
    if (typeof TagStore.all()[0] === "undefined") {
      ApiUtil.fetchAllTags();
    }

    this.t = $("#tagBox").tagging({"no-duplicate-callback": function () {
      console.log("No duplicates");
    }, "no-spacebar": true});

    this.setState({title: this.props.note.title, body: this.props.note.body});
  },

  componentWillReceiveProps: function (newProps) {
    var tags = TagStore.findByNote(newProps.note.id);
    var tagNames = tags.map(function (tag) {
      return tag.name;
    });

    this.t[0].tagging("removeAll");
    this.t[0].tagging("add", tagNames);
    this.setState({title: newProps.note.title, body: newProps.note.body});
  },

  _onChange: function () {
    var tags = TagStore.findByNote(this.props.note.id);
    var tagNames = tags.map(function (tag) {
      return tag.name;
    });

    this.t[0].tagging("add", tagNames);
  },

  handleSubmit: function () {
    var newNote = $.extend(this.props.note, {title: this.state.title, body: this.state.body});
    newNote.tags = this.t[0].tagging("getTags");

    ApiUtil.updateNote(newNote);
    ApiUtil.fetchAllTags();
  },

  handleTitleChange: function (e) {
    this.setState({title: e.currentTarget.value});
  },

  handleBodyChange: function (str) {
    this.setState({body: str});
  },

  render: function() {
    return (
      <div className="update-note-div">
        <NoteToolBelt update={true}
                      handleClick={this.handleClick}
                      notebooks={this.props.notebooks}
                      handleSubmit={this.handleSubmit} />
        <input type="text"
               onChange={this.handleTitleChange}
               className="note-title"
               value={this.state.title}></input>
        <div data-tags-input-name="tag" id="tagBox"></div>
        <RichText handleBodyChange={this.handleBodyChange} update={true} body={this.state.body || this.props.note.body}/>
      </div>
    );
  }
});
