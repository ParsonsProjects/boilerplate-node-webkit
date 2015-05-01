
'use strict';
/*global m */
var app = app || {};

app.ENTER_KEY = 13;
app.ESC_KEY = 27;

m.route.mode = 'hash';
m.route(document.getElementById('todoapp'), '/app.html', {
	'/app.html': app,
	'/app.html:filter': app
});

require('./scripts/models/todo.js');
require('./scripts/models/storage.js');
require('./scripts/controllers/todo.js');
require('./scripts/views/main-view.js');
require('./scripts/views/footer-view.js');
