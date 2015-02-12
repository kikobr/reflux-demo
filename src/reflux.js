var Reflux = require('reflux');
var React = require('react');
var statusUpdate = require('./actions');

module.exports = {
    statusUpdate: statusUpdate,
    statusStore: Reflux.createStore({
        // setup
        init: function(){
            // registrando à ação statusUpdate
            this.listenTo(statusUpdate, this.output);
        },
        // Callback
        output: function(flag){
            var status = !flag;
            // Passando pros ouvintes
            this.trigger(status);
        }
    })
};
