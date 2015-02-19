var Reflux = require('reflux');
var React = require('react');
var actions = require('./actions');

module.exports = Reflux.createStore({
    // setup
    init: function(){
        // registrando à ação statusUpdate
        this.listenTo(actions.statusUpdate, this.output);
    },
    // Callback
    output: function(flag){
        var status = !flag;
        // Passando pros ouvintes
        this.trigger(status);
    }
});
