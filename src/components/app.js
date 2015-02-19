var React 			= require('react'),
	Reflux 			= require('reflux'),
	qwest 			= require('qwest'), // qwest is our micro library for ajax actions
	Router 			= require('react-router'),
	Link    		= Router.Link,
	RouteHandler 	= Router.RouteHandler,
	TransitionGroup = require('react/lib/ReactCSSTransitionGroup'),
	LoginStore 		= require('../stores/login'),
	LogoutAction 	= require('../actions').logout;

module.exports 	= React.createClass({
	mixins: [
		Router.State,
		Reflux.listenTo(LoginStore,"loginStatus")
	],
    getInitialState: function(){
        return {
            body: '',
			admin: LoginStore.auth.user.isLogged ? LoginStore.auth.user : false
        };
    },
	loginStatus: function(status){
		this.setState({admin: status.user});
	},
	logout: function(){ LogoutAction.trigger(); },
    componentDidMount: function(){
        // qwest.get('https://community-wikipedia.p.mashape.com/api.php', {
        //     action: 'query',
        //     format: 'json',
        //     prop: 'revisions',
        //     rvprop: 'content',
        //     titles: 'Main Page'
        // }, {
        //     headers: {
        //         'X-Mashape-Key': 'uaxZleWenSmshxZZbgEF4WTlBsoQp1eobtsjsn5QRbJx0BpZ2s'
        //     }
        // })
        // .then(function(res){
        //     res = JSON.parse(res);
        //     this.setState({
        //         body: res.query.pages['15580374'].title
        //     });
        // }.bind(this));
    },
    render: function(){
		var name = this.getRoutes().reverse()[0].name;
        return (
            <div className="app">
                <header className="app-header">
                	<h1>Blog maroto</h1>
                	<nav>
	                    <ul>
	                        <li><Link to="posts">Posts</Link></li>
	                        <li><Link to="inbox">Inbox</Link></li>
	                    </ul>
                    </nav>
                </header>

                <div className="app-body">
                	<section className="app-content">
                		{/* outlet */}
						<TransitionGroup component="div" className="fullAnimationContainer" transitionName="fadein">
							<RouteHandler key={name} admin={this.state.admin.isLogged ? this.state.admin : false} />
						</TransitionGroup>
                	</section>
                	<section className="app-sidebar">
						{this.state.admin ? (
							<section>
								<span> Logged in as {this.state.admin.username}</span>
								<br/>
								<button onClick={this.logout}>Logout</button>
							</section>
						) : ''}
                	</section>
                </div>
            </div>
        );
    }
});
