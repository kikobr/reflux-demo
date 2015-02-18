var React 	= require('react'),
	Router 	= require('react-router');

module.exports = React.createClass({
  	mixins: [Router.State],
	render: function(){
		var title = "!Post #"+this.getParams().id,
			body = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi maxime dolorem optio veritatis provident modi a magnam error obcaecati recusandae excepturi, minus nihil, quibusdam quia rerum? Nisi eos ullam doloribus!";

		return (
			<article className="post">
				<h1>Detalhes do {title}</h1>
				<p>{body}</p>
			</article>
		);
	}
});
