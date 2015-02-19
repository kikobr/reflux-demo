var React         = require('react'),
    Reflux        = require('reflux'),
    LoginStore    = require('../stores/login'),
    LoginAction   = require('../actions').login,
    LogoutAction  = require('../actions').logout,
    TransitionGroup = require('react/lib/ReactCSSTransitionGroup');

module.exports = React.createClass({
    mixins: [Reflux.listenTo(LoginStore,"loginStatus")],
    getInitialState: function(){
        return LoginStore.auth;
    },
    componentDidMount: function(){ this.setState({error: false}); },
    // --------------------------------------
    login: function(){
        var username = this.refs.username.getDOMNode().value,
            password = this.refs.password.getDOMNode().value;
        // form incompleto
        if(!username || !password) { return this.setState({error: 'Preencha todos os dados!'}); }
        LoginAction.trigger({ username: username, password: password });
    },
    logout: function(){ LogoutAction.trigger(); },
    loginStatus: function(auth){
        this.setState(auth);
    },
    // ---------------------------------------
    render: function(){
        var output = this.state.user.isLogged ? (
            <div>
                <h1>You are logged in, {this.state.user.username}.</h1>
                <button onClick={this.logout}>Logout</button>
            </div>
        ) :
        (
            <div>
                <TransitionGroup transitionName="fadein">
                    {this.state.error ? <span key="1">{this.state.error}</span> : ''}
                </TransitionGroup>
                <form onSubmit={this.login}>
                    <input type="text" ref="username" placeholder="username" />
                    <input type="password" ref="password" placeholder="password" />
                    <button type="submit">Login</button>
                </form>
            </div>
        );
        return output;
    }
});
