var React 	= require('react'),
	Post  	= require('./post');

module.exports = React.createClass({
	getDefaultProps: function(){
		return {
			posts : [
				{
					title: 'post 1', body: 'texto do post 1',
				}, {				
					title: 'post 2', body: 'texto do post 2',
				}
			]
		};
	},
	render: function(){
		return (
			<div>
				<span>Exibindo posts:</span>
				<section className="post-list">
					{
						this.props.posts.map(function(post, i){
							return <Post title={post.title} body={post.body} />;
						})
					}
				</section>
			</div>
		);
	}
});