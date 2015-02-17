var React 		= require('react'),
	Router 		= require('react-router'),
    DefaultRoute= Router.DefaultRoute,
    Route     	= Router.Route;

// Routes
var App 		= require('./components/app'),
	Inbox 		= require('./components/inbox'),
	Posts  		= require('./components/post/posts'),
	PostList  	= require('./components/post/postlist'),
	Post  		= require('./components/post/post');

module.exports = (
<Route name="app" path="/" handler={App}>
    <Route name="posts" path="/posts" handler={Posts}>
    	<Route name="post" path=":id" handler={Post} />
    	<DefaultRoute handler={PostList} />
    </Route>
    <Route name="inbox" handler={Inbox} />
    <DefaultRoute handler={PostList} />
</Route>
);