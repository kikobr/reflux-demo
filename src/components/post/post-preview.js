var React 		= require('react'),
	Router 		= require('react-router'),
	Link    	= Router.Link;

module.exports = React.createClass({
	getDefaultProps: function(){
		return {
			id: 'unidentified',
			title: "Post ",
			body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque velit alias, ea necessitatibus, magni quibusdam, quo assumenda quas aliquid placeat sint! Veritatis nihil harum incidunt cupiditate veniam consectetur magni. Officia.'
		};
	},
	render: function(){
		return (
			<Link to="post" params={{id: this.props.id}}>
				<h1>{this.props.title}</h1>
				<p>{this.props.body}</p>
			</Link>
		);
	}
});
