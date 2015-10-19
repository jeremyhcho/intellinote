var Home = React.createClass({
  render: function() {
    return (
      <div className="top-main">
        <div className="black-background">
          <Navbar />
          <div className="content">
            <div className="intro">
              <h1>IntelliNote</h1>
              <p>Create, edit, and share notes with the click of a button.
              An Evernote inspired web app created from scratch
              using <em>Ruby on Rails</em> and <em>Reactjs</em>.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
