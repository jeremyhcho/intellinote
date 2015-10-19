var Navbar = React.createClass({
  render: function() {
    return (
      <div className="navbar">
        <ul>
          <li><a href="https://github.com/hyungccho/intellinote"><span className="underline">Github</span></a></li>
          <li><a href="/session/new"><span className="underline">Sign In</span></a></li>
        </ul>
      </div>
    );
  }
});
