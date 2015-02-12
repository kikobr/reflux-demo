var React     = require('react');

var RefluxApp   = require('./reflux');

var Component = require('./component.jsx')(RefluxApp.statusStore, RefluxApp.statusUpdate);

React.render(<Component />, document.getElementById('mount-point'));
