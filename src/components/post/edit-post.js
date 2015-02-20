var React = require('react'),
    Router 	= require('react-router'),
    Reflux = require('reflux'),
    PostStore = require('../../stores/post'),
    LoginStore = require('../../stores/login'),
    AuthenticatedMixin = require('../../mixins/authenticated'),
    EditPostAction = require('../../actions')['edit-post'],
    DeletePostAction = require('../../actions')['delete-post'];

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
        var post = this.state.post;
        post.title = title;
        post.body = body;
        EditPostAction.trigger(this.state.post);
    },
    postSaved: function(){
        this.transitionTo("post", { id: this.getParams().id});
    },
    deletePost: function(){
        DeletePostAction.trigger(this.state.post);
    },
    // --------------------------------------------------------------
    getInitialState: function(){
        var post = PostStore.getPost(this.getParams().id);
        if(!post) { this.transitionTo('posts'); return null; }
        return {
            post: post
        };
    },
    render: function(){
        return (
            <form onSubmit={this.submit}>
                {this.state.error ? (
                    <p>{this.state.error}</p>
                ) : ''}
                <input type="text" ref="title" placeholder="Título" defaultValue={this.state.post.title} /><br/>
                <textarea ref="body" defaultValue={this.state.post.body}></textarea><br/>
                <button type="submit">Salvar</button>
                <a onClick={this.deletePost}>Excluir</a>
            </form>
        );
    }
});
