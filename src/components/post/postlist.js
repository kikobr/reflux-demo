var React 		= require('react'),
	PostPreview = require('./post-preview');

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
			<div className="postlist">
				<span>Exibindo posts:</span>
				<section className="post-list">
					{
						this.props.posts.map(function(post, i){
							return <PostPreview id={i} key={i} />;
						})
					}
				</section>
			</div>
		);
	}
});
