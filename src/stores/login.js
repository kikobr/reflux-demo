var Reflux = require('reflux'),
    actions = require('../actions'),
    LocalStorage = require('../local-storage');

var STORAGE_KEY = 'loginInfo';

module.exports = Reflux.createStore({
    // setup
    init: function(){
        // registrando à ação statusUpdate
        this.listenTo(actions.login, this.validateLogin);
        this.listenTo(actions.logout, this.logout);

        LocalStorage.get(STORAGE_KEY, function(res){
            // Não há essa entrada no localstorage
            if(res === null){
                this.auth = {
                    user: {
                        username: '',
                        isLogged: false
                    }
                };
            } else {
                this.auth = res;
            }
        }.bind(this));
    },
    // ----------------------------------------------
    // Callback
    login: function(data){
        LocalStorage.save({
            key: STORAGE_KEY,
            user: {
                username: data.username,
                isLogged: true,
            },
            error: ''
        }, function(res){
            this.auth = res;
            this.trigger(res);
        }.bind(this));
    },
    validateLogin: function(data){
        var matchuser = {
            username: 'kiko',
            password: 123
        };
        if(data.username == matchuser.username &&
            data.password == matchuser.password){
            this.login(data);
        } else {
            this.auth.error = 'Usuário inválido';
            this.trigger(this.auth);
        }
    },
    logout: function(){
        LocalStorage.save({
            key: STORAGE_KEY,
            user: {
                username: '',
                isLogged: false,
            }
        }, function(res){
            this.auth = res;
            this.trigger(res);
        }.bind(this));
    }
});
