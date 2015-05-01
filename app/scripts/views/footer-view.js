'use strict';
/*global m */
var app = app || {};

app.footer = function (ctrl) {
	var amountCompleted = ctrl.amountCompleted();
	var amountActive = ctrl.list.length - amountCompleted;

	return m('footer.l-container', [
		m('p', [
			m('strong', amountActive), ' item' + (amountActive !== 1 ? 's' : '') + ' left'
		]),
		m('.e-buttons', [
			m('a.e-button m-blue m-basic[href=/]', {
				config: m.route,
				class: ctrl.filter() === '' ? 'selected' : ''
			}, 'All'),
			m('a.e-button m-blue m-basic[href=/active]', {
				config: m.route,
				class: ctrl.filter() === 'active' ? 'selected' : ''
			}, 'Active'),
			m('a.e-button m-blue m-basic[href=/completed]', {
				config: m.route,
				class: ctrl.filter() === 'completed' ? 'selected' : ''
			}, 'Completed'),
		]),
		m('p'),
		ctrl.amountCompleted() === 0 ? '' : m('button.e-button u-block m-negative', {
			onclick: ctrl.clearCompleted.bind(ctrl)
		}, 'Clear completed')
	]);
};
