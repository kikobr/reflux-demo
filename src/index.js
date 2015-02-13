var React     = require('react');

var RefluxApp   = require('./reflux');

var Component = require('./component.jsx')(RefluxApp.statusStore, RefluxApp.statusUpdate);

var Router = require('react-router'),
    DefaultRoute = Router.DefaultRoute,
    Link     = Router.Link,
    Route     = Router.Route,
    RouteHandler = Router.RouteHandler;

// qwest is our micro library for ajax actions
var qwest = require('qwest');

var App = React.createClass({
    getInitialState: function(){
        return {
            body: ''
        };
    },
    componentDidMount: function(){
        qwest.get('https://community-wikipedia.p.mashape.com/api.php', {
            action: 'query',
            format: 'json',
            prop: 'revisions',
            rvprop: 'content',
            titles: 'Main Page'
        }, {
            headers: {
                'X-Mashape-Key': 'uaxZleWenSmshxZZbgEF4WTlBsoQp1eobtsjsn5QRbJx0BpZ2s'
            }
        })
        .then(function(res){
            res = JSON.parse(res);
            this.setState({
                body: res.query.pages['15580374'].title
            });
        }.bind(this));
    },
    render: function(){
        return (
            <div>
                <header>
                    <ul>
                        <li><Link to="app">Dash</Link></li>
                        <li><Link to="inbox">Inbox</Link></li>
                    </ul>
                    <br />
                    {this.state.body}
                </header>

                {/* outlet */}
                <RouteHandler/>
            </div>
        );
    }
});

var Inbox = React.createClass({
    componentDidMount: function(){ console.log('mounted'); },
    render: function(){
        return (
            <h1>This is inbox page.</h1>
        );
    }
});

var routes = (
    <Route name="app" path="/" handler={App}>
        <Route name="inbox" handler={Inbox} />
        <DefaultRoute handler={Component} />
    </Route>
);

//React.render(<Component />, document.getElementById('mount-point'));
Router.run(routes, function(Handler){
    React.render(<Handler/>, document.getElementById('mount-point'));
});
