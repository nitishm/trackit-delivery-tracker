(function() {
	'use strict';

	angular
		.module('thinkster.config')
		.config(config);

	config.$inject = ['$locationProvider','$httpProvider'];

	/**
	 * @name config
	 * @desc Enable HTML5 routing
	 */
	function config($locationProvider, $httpProvider) {
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
		$locationProvider.html5Mode(true);
		$locationProvider.hashPrefix('!');
	}
})();