'use strict';
/*global m */

(function( window ) {
    'use strict';

	m.route(document.getElementById('window'), '/login', {
		'/login': Login,
		'/:route': App
	});

})(window);
