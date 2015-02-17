var React 		= require('react'),
	qwest 		= require('qwest'), // qwest is our micro library for ajax actions
	Router 		= require('react-router'),
	Link    	= Router.Link,
	RouteHandler= Router.RouteHandler;

module.exports 	= React.createClass({
    getInitialState: function(){
        return {
            body: ''
        };
    },
    componentDidMount: function(){
        // qwest.get('https://community-wikipedia.p.mashape.com/api.php', {
        //     action: 'query',
        //     format: 'json',
        //     prop: 'revisions',
        //     rvprop: 'content',
        //     titles: 'Main Page'
        // }, {
        //     headers: {
        //         'X-Mashape-Key': 'uaxZleWenSmshxZZbgEF4WTlBsoQp1eobtsjsn5QRbJx0BpZ2s'
        //     }
        // })
        // .then(function(res){
        //     res = JSON.parse(res);
        //     this.setState({
        //         body: res.query.pages['15580374'].title
        //     });
        // }.bind(this));
    },
    render: function(){
        return (
            <div className="app">
                <header className="app-header">
                	<h1>Blog maroto</h1>
                	<nav>
	                    <ul>
	                        <li><Link to="app">Dash</Link></li>
	                        <li><Link to="inbox">Inbox</Link></li>
	                    </ul>
                    </nav>
                </header>

                <div className="app-body">
                	<section className="app-content">
                		{/* outlet */}
                		<RouteHandler/>
                	</section>
                	<section className="app-sidebar">
                		aaaa
                	</section>
                </div>
            </div>
        );
    }
});