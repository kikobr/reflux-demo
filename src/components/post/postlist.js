var React 		= require('react'),
	PostPreview = require('./post-preview'),
	PostStore = require('../../stores/post');

module.exports = React.createClass({
	getInitialState: function(){
		return {
			posts: PostStore.getPosts()
		};
	},
	render: function(){
		return (
			<div className="postlist">
				<span>Exibindo posts:</span>
				<section className="post-list">
					{
						this.state.posts.map(function(post, i){
							return <PostPreview {...post} key={i} id={post.key} admin={this.props.admin} />;
						}.bind(this))
					}
				</section>
			</div>
		);
	}
});
