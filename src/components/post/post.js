var React 	= require('react'),
	Router 	= require('react-router'),
	Link 	= Router.Link,
	PostStore = require('../../stores/post'),
	LoginStore = require('../../stores/login');

module.exports = React.createClass({
  	mixins: [Router.State, Router.Navigation],
	getInitialState: function(){
		var post = PostStore.getPost(this.getParams().id);
		if(!post) { this.transitionTo('posts'); return null; }
		return { post: post };
	},
	render: function(){
		var admin = LoginStore.isAuthenticated() ? LoginStore.auth.user : false;
		return (
			<article className="post">
				<h1>
					Detalhes do {this.state.post.title}
					{admin ? (
						 <Link to="edit-post" params={{id: this.state.post.key}}>Editar</Link>
					):''}
					<br/>
					<small>
						Authored by {this.state.post.author} on {this.state.post.createdAt}
					</small>
				</h1>
				<hr/>
				<p>{this.state.post.body}</p>
			</article>
		);
	}
});
