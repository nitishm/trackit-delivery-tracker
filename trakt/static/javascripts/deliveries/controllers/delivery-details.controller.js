/**
 * DeliveryDetailsController
 * @namespace thinkster.deliveries.controllers
 */
(function() {
	'use strict';

	angular
		.module('thinkster.deliveries.controllers')
		.controller('DeliveryDetailsController', DeliveryDetailsController);

	DeliveryDetailsController.$inject = ['$scope', 'Authentication', 'Deliveries'];

	/**
	 * @namespace DeliveryDetailsController
	 */
	function DeliveryDetailsController($scope, Authentication, Deliveries) {
		var vm = this;
		vm.details = Deliveries.getDetails();
	}
})();