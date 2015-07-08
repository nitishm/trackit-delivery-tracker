(function() {
	'use strict';

	angular
		.module('thinkster', [
			'thinkster.config',
			'thinkster.routes',
			'thinkster.authentication',
			'thinkster.layout',
			'thinkster.utils',
			'thinkster.deliveries'
		]);

	angular
		.module('thinkster.config', []);

	angular
		.module('thinkster.routes', ['ngRoute']);

	angular
		.module('thinkster')
		.run(run);

	run.$inject = ['$http', '$rootScope', '$templateCache'];

	/**
	 * @name run
	 * @desc Update xsrf $http headers to align with Django's defaults
	 */
	function run($http, $rootScope, $templateCache) {
		$http.defaults.xsrfHeaderName = 'X-CSRFToken';
		$http.defaults.xsrfCookieName = 'csrftoken';
		$rootScope.$on('$viewContentLoaded', function() {
			$templateCache.removeAll();
		});
	}

})();