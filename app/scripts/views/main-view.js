'use strict';
/*global m */
var app = app || {};

// View utility
app.watchInput = function (onenter, onescape) {
	return function (e) {
		if (e.keyCode === app.ENTER_KEY) {
			onenter();
		} else if (e.keyCode === app.ESC_KEY) {
			onescape();
		}
	};
};

app.view = (function() {
	var focused = false;

	return function (ctrl) {
		return [
			m('header.l-container', [
				m('h1', 'todos'),
				m('.e-field u-inline', [
					m('input.s-input[placeholder="What needs to be done?"]', {
						onkeyup: app.watchInput(ctrl.add.bind(ctrl),
							ctrl.clearTitle.bind(ctrl)),
						value: ctrl.title(),
						oninput: m.withAttr('value', ctrl.title),
						config: function (element) {
							if (!focused) {
								element.focus();
								focused = true;
							}
						}
					})
				])
			]),
			m('section.l-container', {
				style: {
					display: ctrl.list.length ? '' : 'none'
				}
			}, [
				m('.u-inline e-checkbox', [
					m('input.s-input[type=checkbox]', {
						onclick: ctrl.completeAll.bind(ctrl),
						checked: ctrl.allCompleted()
					}),
					m('label.s-label', 'Check All')
				]),
				m('ul#todo-list', [
					ctrl.list.filter(ctrl.isVisible.bind(ctrl)).map(function (task, index) {
						return m('li', { class: (function () {
							var classes = '';
							classes += task.completed() ? 'completed' : '';
							classes += task.editing() ? ' editing' : '';
							return classes;
						})()
						}, [
							m('.view', [
								m('.e-checkbox', [
									m('input.s-input toggle[type=checkbox]', {
										onclick: m.withAttr('checked', ctrl.complete.bind(ctrl, task)),
										ondblclick: ctrl.edit.bind(ctrl, task),
										checked: task.completed()
									}),
									m('label.s-label', task.title())
								]),
								m('button.e-button m-negative', {
									onclick: ctrl.remove.bind(ctrl, index)
								}, 'Remove'),
								m('p')
							]),
							m('.e-field', [
								m('input.s-input edit', {
									value: task.title(),
									onkeyup: app.watchInput(ctrl.doneEditing.bind(ctrl, task, index),
										ctrl.cancelEditing.bind(ctrl, task)),
									oninput: m.withAttr('value', task.title),
									config: function (element) {
										if (task.editing()) {
											element.focus();
											element.selectionStart = element.value.length;
										}
									},
									onblur: ctrl.doneEditing.bind(ctrl, task, index)
								})
							])
						]);
					})
				])
			]), ctrl.list.length === 0 ? '' : app.footer(ctrl)
		];
	}
})();
