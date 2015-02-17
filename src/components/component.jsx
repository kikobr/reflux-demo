var React = require('react/addons'),
    ListItem = require('./list-item'),
    statusUpdate = require('../actions').statusUpdate,
    Store = require('../store');

var PostList = require('./post/postlist');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var list = [];
for(var i=0; i < 100; i++){ list.push(i); }

module.exports = React.createClass({
    getInitialState: function(){
        return {
            name: "kiko herrschaft",
            status: false,
            statusMsg: 'OFFLINE',
            lines: list
        };
    },
    componentDidMount: function(){
        this.unsubscribe = Store.listen(this.onStatusChange);
    },
    componentWillUnmount: function(){
        this.unsubscribe();
    },
    onStatusChange: function(status){
        this.setState({
            status: status,
            statusMsg: status ? 'ONLINE' : 'OFFLINE'
        });
    },
    clicked: function(){
        statusUpdate(this.state.status);
    },
    listClicked: function(i){
        var newLines = this.state.lines;
        newLines[i] += 1;
        this.setState({ lines: newLines });
    },
    changeName: function(evt){
        this.setState({ name: evt.target.value });
    },
    render: function(){
        return (
            <div>
                Hello, {this.state.name}.

                You are {this.state.statusMsg} <br/>
                <input type="text" onKeyUp={this.changeName} defaultValue={this.state.name} />

                <br></br>
                <button onClick={this.clicked}>Toggle</button>
                <ul>
                    {
                        this.state.status ?
                            this.state.lines.map(function(item, i) {
                                return (
                                    <ListItem parentClick={this.listClicked.bind(this, i)} name={this.state.lines[i]} key={i} />
                                );
                            }, this)
                        : ''
                    }
                </ul>

                <PostList posts={[{title: 'post 1', body: 'conteudo do post 1'}, {title: 'post 2', body: 'conteudo do post 2'}]} />
            </div>
        );
    }
});
