var React = require('react'),
    Router 	= require('react-router'),
    Reflux = require('reflux'),
    PostStore = require('../../stores/post'),
    LoginStore = require('../../stores/login'),
    AuthenticatedMixin = require('../../mixins/authenticated'),
    EditPostAction = require('../../actions')['edit-post'];

module.exports = React.createClass({
    mixins: [
        AuthenticatedMixin,
        Router.State,
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
        EditPostAction.trigger({
            id: this.getParams().id,
            title: title,
            body: body
        });
    },
    postSaved: function(){
        this.transitionTo("post", { id: this.getParams().id});
    },
    // --------------------------------------------------------------
    getInitialState: function(){ return {}; },
    render: function(){
        var post = PostStore.getPost(this.getParams().id);

        return (
            <form onSubmit={this.submit}>
                {this.state.error ? (
                    <p>{this.state.error}</p>
                ) : ''}
                <input type="text" ref="title" placeholder="Título" defaultValue={post.title} /><br/>
                <textarea ref="body" defaultValue={post.body}></textarea><br/>
                <button type="submit">Salvar</button>
            </form>
        );
    }
});
