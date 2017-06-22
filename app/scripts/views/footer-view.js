'use strict';
/*global m */
var Main = Main || {};

Main.footer = function (ctrl) {

	return m('footer#footer.ui inverted menu attached', Main.FooterSearch(ctrl) );

};