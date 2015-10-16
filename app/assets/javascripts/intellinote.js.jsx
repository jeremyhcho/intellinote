var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var IndexRoute = ReactRouter.IndexRoute;
var Link = ReactRouter.Link;
var ButtonToolbar = ReactBootstrap.ButtonToolbar

$(function () {
  var App = React.createClass({
    getInitialState: function() {
      return {
        user: LoginStore.returnUser()
      };
    },

    componentDidMount: function() {
      console.log('mount');
      LoginStore.addChangeHandler(this._onChange);
      ApiUtil.fetchCurrentUser();
    },

    _onChange: function () {
      this.setState({user: LoginStore.returnUser()})
    },

    render: function () {
      console.log('render');
      var component;

      if (typeof this.state.user !== "undefined" && typeof this.state.user.errors === "undefined") {
        component = <Main user={this.state.user}/>
      } else {
        component = <Home />
      }

      return (
        <div>
          { component }
          { this.props.children }
        </div>
      );
    }
  });

  var routes = (
    <Route component={App}>
      <Route path="/" components={{main: Main, home: Home}}>
      </Route>
    </Route>
  )
  console.log('accessing js files');
  React.render(<Router>{routes}</Router>, document.getElementById("main"))
});
