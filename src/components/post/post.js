var React 	= require('react'),
	Router 	= require('react-router'),
	Link 	= Router.Link,
	PostStore = require('../../stores/post'),
	LoginStore = require('../../stores/login');

module.exports = React.createClass({
  	mixins: [Router.State],
	render: function(){
		var post = PostStore.getPost(this.getParams().id),
			admin = LoginStore.isAuthenticated() ? LoginStore.auth.user : false;
		return (
			<article className="post">
				<h1>
					Detalhes do {post.title}
					{admin ? (
						 <Link to="edit-post" params={{id: post.key}}>Editar</Link>
					):''}
					<br/>
					<small>
						Authored by {post.author} on {post.createdAt}
					</small>
				</h1>
				<hr/>
				<p>{post.body}</p>
			</article>
		);
	}
});
