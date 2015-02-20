var Reflux = require('reflux'),
    actions = require('../actions'),
    LoginStore = require('./login'),
    LocalStorage = require('../local-storage')('posts');

var posts = [];

module.exports = Reflux.createStore({
    // setup
    init: function(){
        // registrando actions
        this.listenTo(actions['new-post'], this.newPost);
        this.listenTo(actions['edit-post'], this.editPost);
        this.listenTo(actions['delete-post'], this.deletePost);

        this.refreshPosts();
    },
    // ----------------------------------------------
    // Callback
    refreshPosts: function(){
        posts = [];
        LocalStorage.all(function(array){
            array.map(function(obj, i){
                posts.push(obj);
            });
        });
        return posts;
    },
    getPosts: function(){ return posts; },
    getPost: function(id){
        var post;
        LocalStorage.get(id, function(obj){
            post = obj;
        });
        return post;
    },
    newPost: function(data){
        if(!LoginStore.isAuthenticated() || !data.title || !data.body) return false;
        LocalStorage.save({
            title: data.title,
            body: data.body,
            author: LoginStore.auth.user.username,
            createdAt: new Date(),
        }, function(res){
            posts.push(res);
            this.trigger();
        }.bind(this));
    },
    editPost: function(data){
        if(!LoginStore.isAuthenticated() || !data.title || !data.title || !data.body) return false;
        LocalStorage.save(data, function(res){
            this.refreshPosts();
            this.trigger();
        }.bind(this));
    },
    deletePost: function(data){
        if(!LoginStore.isAuthenticated() || !data.title || !data.title || !data.body) return false;
        LocalStorage.remove(data, function(res){
            this.refreshPosts();
            this.trigger();
        }.bind(this));
    }
});
