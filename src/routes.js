var React 		= require('react'),
	Router 		= require('react-router'),
    DefaultRoute= Router.DefaultRoute,
    Route     	= Router.Route;

// Routes
var App 		= require('./components/app'),
	Inbox 		= require('./components/inbox'),
	PostList  	= require('./components/post/postlist');

module.exports = (
<Route name="app" path="/" handler={App}>
    <Route name="inbox" handler={Inbox} />
    <DefaultRoute handler={PostList} />
</Route>
);