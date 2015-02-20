var React 		= require('react'),
	Router 		= require('react-router'),
    DefaultRoute= Router.DefaultRoute,
    Route     	= Router.Route;

// Routes
var App 		= require('./components/app'),
	Inbox 		= require('./components/inbox'),
	PostList  	= require('./components/post/postlist'),
	Post  		= require('./components/post/post'),
	NewPost 	= require('./components/post/new-post'),
	EditPost 	= require('./components/post/edit-post'),
	Login  		= require('./components/login');

var ProtectedPage = require('./components/protected-page');

module.exports = (
<Route>
	<Route name="app" path="/" handler={App}>
	    <Route name="posts" path="posts">
			<Route name="new-post" path="new" handler={NewPost} />
	    	<Route name="post" path=":id">
				<Route name="edit-post" path="edit" handler={EditPost} />
				<DefaultRoute handler={Post} />
			</Route>
			<DefaultRoute name="posts-list" handler={PostList} />
	    </Route>
	    <Route name="inbox" handler={Inbox} />
		<Route name="protected-page" handler={ProtectedPage} />
	    <DefaultRoute handler={PostList} />
	</Route>
	<Route name="login" path="/admin" handler={Login} />
</Route>
);
