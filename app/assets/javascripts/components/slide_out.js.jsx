var SlideOut = React.createClass({
  render: function() {
    return (
      <div className="slide-out">
        <NoteIndex updateNote={this.props.updateNote} />
      </div>
    );
  }
});
