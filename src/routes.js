var React 		= require('react'),
	Router 		= require('react-router'),
    DefaultRoute= Router.DefaultRoute,
    Route     	= Router.Route;

// Routes
var App 		= require('./components/app'),
	Inbox 		= require('./components/inbox'),
	RouteHandler= require('./components/animated-route-handler'), // empty handler
	PostList  	= require('./components/post/postlist'),
	Post  		= require('./components/post/post');

module.exports = (
<Route name="app" path="/" handler={App}>
    <Route name="posts" path="/posts" handler={RouteHandler}>
    	<Route name="post" path=":id" handler={Post} addHandlerKey={false} />
    	<DefaultRoute name="posts-list" handler={PostList} addHandlerKey={false} />
    </Route>
    <Route name="inbox" handler={Inbox} />
    <DefaultRoute handler={PostList} />
</Route>
);
