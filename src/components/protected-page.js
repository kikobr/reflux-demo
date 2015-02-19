var React = require('react'),
    AuthenticatedMixin = require('../mixins/authenticated');

module.exports = React.createClass({
    mixins: [AuthenticatedMixin],
    render: function(){
        return (
            <div>
                this is a protected page!
            </div>
        );
    }
});
