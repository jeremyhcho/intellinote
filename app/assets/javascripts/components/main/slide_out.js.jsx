var SlideOut = React.createClass({
  render: function() {
    return (
      <div className="slide-out">
        {this.props.currentSlideOut}
      </div>
    );
  }
});
