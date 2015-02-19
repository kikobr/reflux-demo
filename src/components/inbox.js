var React 		= require('react');

module.exports = React.createClass({
    componentDidMount: function(){ console.log('mounted'); },
    render: function(){
        return (
            <section>
                <h1>This is inbox page.</h1>
            </section>
        );
    }
});
