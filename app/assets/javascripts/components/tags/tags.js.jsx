var Tags = React.createClass({
  getInitialState: function() {
    return {
      tags: TagStore.all()
    };
  },

  componentDidMount: function() {
    TagStore.addChangeHandler(this._onChange);
    ApiUtil.fetchAllTags();
  },

  componentWillUnmount: function () {
    TagStore.removeChangeHandler(this._onChange);
  },

  _onChange: function () {
    this.setState({tags: TagStore.all()});
  },

  render: function() {
    var formattedTags = [];

    for (var i = 0; i < this.state.tags.length; i++) {
      if (i === this.state.tags.length - 1) {
        formattedTags.push(<TagIndexItem key={this.state.tags[i]} tag={this.state.tags[i]} />);
      } else if (i === 0 && this.state.tags[i].name[0] !== this.state.tags[i + 1].name[0]) {
        formattedTags.push(<li className="letters">{this.state.tags[i].name[0]}</li>);
        formattedTags.push(<TagIndexItem key={this.state.tags[i].id} tag={this.state.tags[i]} />);
        formattedTags.push(<li className="letters">{this.state.tags[i + 1].name[0]}</li>);
      } else if (i === 0) {
        formattedTags.push(<li className="letters">{this.state.tags[i].name[0]}</li>);
        formattedTags.push(<TagIndexItem key={this.state.tags[i].id} tag={this.state.tags[i]} />);
      } else if (this.state.tags[i].name[0] !== this.state.tags[i + 1].name[0]) {
        formattedTags.push(<TagIndexItem key={this.state.tags[i].id} tag={this.state.tags[i]} />);
        formattedTags.push(<li className="letters">{this.state.tags[i + 1].name[0]}</li>)
      } else {
        formattedTags.push(<TagIndexItem key={this.state.tags[i].id} tag={this.state.tags[i]} />);
      }
    }

    return (
      <div className="tags-div">
        <div className="tags-control">
          <h1>TAGS</h1>
        </div>

        <ul className="tags-ul">
          {formattedTags}
        </ul>
      </div>
    );
  }
});
