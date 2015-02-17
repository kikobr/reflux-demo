var React = require('react');

module.exports = React.createClass({
	render: function(){
		return (
			<article className="post">
				<h1>{this.props.title}</h1>
				<p>{this.props.body}</p>
			</article>
		);
	}
});