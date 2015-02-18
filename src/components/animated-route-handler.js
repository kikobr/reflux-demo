var React 				= require('react'),
	CSSTransitionGroup 	= require('react/lib/ReactCSSTransitionGroup'),
	Router 				= require('react-router'),
	RouteHandler 		= Router.RouteHandler;

module.exports = React.createClass({
	mixins: [ Router.State ],
	render: function(){
		var name = this.getRoutes().reverse()[0].name;

		return (
			<CSSTransitionGroup component="div" transitionName="fadein">
				<RouteHandler key={name}/>
			</CSSTransitionGroup>
		);
	}
});
