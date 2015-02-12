var React = require('react');

module.exports = React.createClass({
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
