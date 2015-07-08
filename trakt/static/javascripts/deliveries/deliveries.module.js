(function() {
	'use strict';

	angular
		.module('thinkster.deliveries', [
			'thinkster.deliveries.controllers',
			'thinkster.deliveries.directives',
			'thinkster.deliveries.services'
		]);

	angular
		.module('thinkster.deliveries.controllers', []);

	angular
		.module('thinkster.deliveries.directives', ['ngDialog']);

	angular
		.module('thinkster.deliveries.services', []);
})();