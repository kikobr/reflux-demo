var React = require('react'),
    Router = require('react-router'),
    Reflux = require('reflux'),
    AuthenticatedMixin = require('../../mixins/authenticated'),
    NewPostAction = require('../../actions')['new-post'],
    PostStore = require('../../stores/post');

module.exports = React.createClass({
    mixins: [
        AuthenticatedMixin,
        Reflux.listenTo(PostStore,"postSaved")
    ],
    submit: function(){
        var title = this.refs.title.getDOMNode().value,
            body = this.refs.body.getDOMNode().value;
        // Check if they are filled
        if(!title || !body){ return this.setState({error: 'Preencha todos os campos!'}); }
        // Clear error
        if(this.state.error) this.setState({error: false});

        // All set up. Sending action
        NewPostAction.trigger({
            title: title,
            body: body
        });
    },
    postSaved: function(){
        this.transitionTo('posts');
    },
    // --------------------------------------------------------
    getInitialState: function(){
        return {};
    },
    render: function(){
        return (
            <form onSubmit={this.submit}>
                {this.state.error ? (
                    <p>{this.state.error}</p>
                ) : ''}
                <input type="text" ref="title" placeholder="Título" /><br/>
                <textarea ref="body"></textarea><br/>
                <button type="submit">Enviar</button>
            </form>
        );
    }
});
