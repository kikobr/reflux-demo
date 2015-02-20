var LoginStore = require('../stores/login'),
    NavigationMixin = require('react-router').Navigation;

module.exports = {
    mixins: [NavigationMixin],
    statics: {
        willTransitionTo: function(transition, params, query){
            if(LoginStore.auth.user && LoginStore.auth.user.isLogged){}
            else {
                // this will require Router.Navigation mixin
                LoginStore.pendentTransition = transition;
                transition.redirect('login', params, {error: 'Faça login antes'});
                return;
            }
        }
    }
};
