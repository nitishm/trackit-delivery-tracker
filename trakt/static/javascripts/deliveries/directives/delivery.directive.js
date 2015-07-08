/**
 * Delivery
 * @namespace thinkster.deliveries.directives
 */
(function() {
	'use strict';

	angular
		.module('thinkster.deliveries.directives')
		.directive('delivery', delivery);

	/**
	 * @namespace delivery
	 */
	function delivery() {
		/**
		 * @name directive
		 * @desc The directive to be returned
		 * @memberOf thinkster.deliveries.directives.Delivery
		 */
		var directive = {
			restrict: 'E',
			scope: {
				delivery: '=',
				vm: '='
			},
			templateUrl: '/static/templates/deliveries/delivery.html'
		};

		return directive;
	}
})();