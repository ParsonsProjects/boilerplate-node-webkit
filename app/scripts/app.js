'use strict';
/*global m */

var gui = require('nw.gui');
var path = require('path-extra');

var app = app || {};

app.name = 'appName';
app.homeDir = path.homedir(),
app.tempFolder = '/.' + app.name + '/temp',
app.collectionsFolder = '/.' + app.name + '/collections';
app.version = m.prop(gui.App.manifest.version);

Messenger.options = {
    extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
    theme: 'flat',
    maxMessages: 3,
}