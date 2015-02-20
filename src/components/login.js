var React         = require('react'),
    Router        = require('react-router'),
    Link          = Router.Link,
    Reflux        = require('reflux'),
    LoginStore    = require('../stores/login'),
    LoginAction   = require('../actions').login,
    LogoutAction  = require('../actions').logout,
    TransitionGroup = require('react/lib/ReactCSSTransitionGroup');

module.exports = React.createClass({
    mixins: [
        Router.State,
        Reflux.listenTo(LoginStore,"loginStatus")
    ],
    getInitialState: function(){
        return {
            admin: LoginStore.auth.user.isLogged ? LoginStore.auth.user : false
        };
    },
    componentDidMount: function(){
        var error = false;
        if(this.getQuery().error){ error = this.getQuery().error; }
        this.setState({error: error});
    },
    // --------------------------------------
    login: function(){
        var username = this.refs.username.getDOMNode().value,
            password = this.refs.password.getDOMNode().value;
        // form incompleto
        if(!username || !password) { return this.setState({error: 'Preencha todos os dados!'}); }
        LoginAction.trigger({ username: username, password: password });
    },
    logout: function(){ LogoutAction.trigger(); },
    loginStatus: function(status){
        var admin = status.user.isLogged ? status.user : false;
        // this.setState({
        //     admin: admin,
        //     error: status.error
        // });
        if(admin && LoginStore.pendentTransition){
            LoginStore.pendentTransition.retry();
            LoginStore.pendentTransition = undefined;
        }
    },
    // ---------------------------------------
    render: function(){
        var output = this.state.admin ? (
            <div>
                <h1>You are logged in, {this.state.admin.username}.</h1>
                <button onClick={this.logout}>Logout</button>
                <br/>
                <Link to="posts">Posts</Link>
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
