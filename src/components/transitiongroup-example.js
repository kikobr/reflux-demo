var React = require('react');

/*
    Example usage:

    <ReactTransitionGroup component={React.DOM.span} transitionName="example">
        { this.state.isBoolean ? <ListItem key={i} /> : '' }
    </ReactTransitionGroup>

 */

module.exports = React.createClass({
    componentWillEnter: function(cb) {
        var domNode = this.getDOMNode();
        var player = domNode.animate([
            {transform: 'translate(0px, -100%)', opacity: 0},
            {transform: 'translate(0px, 0px)', opacity: 1}
        ], 1000);
        player.onfinish = function(e) { cb(); };
    },
    componentDidEnter: function(){ console.log('cb() on componentWillEnter was called'); },
    componentWillLeave: function(cb) {
        var domNode = this.getDOMNode();
        var player = domNode.animate([
            {transform: 'translate(0px, 0px)', opacity: 1},
            {transform: 'translate(0px, -100%)', opacity: 0}
        ], 1000);
        player.onfinish = function(e) { cb(); };
    },
    componentDidLeave: function(){ console.log('cb() on componentWillLeave was called'); },
    getDefaultProps: function(){
        return {
            number: 5,
            name: 'aaa'
        };
    },
    render: function(){
        var lines = [];
        return (
            <li onClick={this.props.parentClick}>{this.props.name}</li>
        );
    }
});
