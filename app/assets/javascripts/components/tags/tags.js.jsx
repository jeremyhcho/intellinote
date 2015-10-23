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
    var uniqueTags = [];
    var uniqueTagnames = [];
    var tagNames = this.state.tags.map(function (tag) {
      return tag.name;
    });

    this.state.tags.forEach(function (tag) {
      if (uniqueTagnames.indexOf(tag.name) === -1) {
        uniqueTags.push(tag);
        uniqueTagnames.push(tag.name);
      }
    });

    for (var i = 0; i < uniqueTags.length; i++) {
      if (i === uniqueTags.length - 1) {
        formattedTags.push(<TagIndexItem key={uniqueTags[i].id} tag={uniqueTags[i]} />);
      } else if (i === 0 && uniqueTags[i].name[0] !== uniqueTags[i + 1].name[0]) {
        formattedTags.push(<li className="letters">{uniqueTags[i].name[0]}</li>);
        formattedTags.push(<TagIndexItem key={uniqueTags[i].id} tag={uniqueTags[i]} />);
        formattedTags.push(<li className="letters">{uniqueTags[i + 1].name[0]}</li>);
      } else if (i === 0) {
        formattedTags.push(<li className="letters">{uniqueTags[i].name[0]}</li>);
        formattedTags.push(<TagIndexItem key={uniqueTags[i].id} tag={uniqueTags[i]} />);
      } else if (uniqueTags[i].name[0] !== uniqueTags[i + 1].name[0]) {
        formattedTags.push(<TagIndexItem key={uniqueTags[i].id} tag={uniqueTags[i]} />);
        formattedTags.push(<li className="letters">{uniqueTags[i + 1].name[0]}</li>)
      } else {
        formattedTags.push(<TagIndexItem key={uniqueTags[i].id} tag={uniqueTags[i]} />);
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
