/**
 * IndexController
 * @namespace thinkster.layout.controllers
 */
(function() {
    'use strict';

    angular
        .module('thinkster.layout.controllers')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$scope', 'Authentication', 'Deliveries', 'Snackbar'];

    /**
     * @namespace IndexController
     */
    function IndexController($scope, Authentication, Deliveries, Snackbar) {
        var vm = this;

        vm.isAuthenticated = Authentication.isAuthenticated();
        vm.deliveries = [];
        vm.setDetails = setDetails;

        vm.streams = ['KIRK', 'KRAMER', 'KESSLER', 'BART', 'HOMER', 'TROI', 'SPOCK'];
        activate();

        function setDetails(delivery) {
            Deliveries.setDetails(delivery);
        }

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf thinkster.layout.controllers.IndexController
         */
        function activate() {
            if (Authentication.isAuthenticated()) {
                Deliveries.get(Authentication.getAuthenticatedAccount().username).then(deliveriesSuccessFn, deliveriesErrorFn);
            } else {
                Deliveries.all().then(deliveriesSuccessFn, deliveriesErrorFn);
            }

            $scope.$on('delivery.created', function(event, delivery) {
                vm.deliveries.unshift(delivery);
            });

            $scope.$on('delivery.updated', function(event, delivery) {
                //TODO
            });

            $scope.$on('delivery.destroyed', function(event, delivery) {
                var index = vm.deliveries.indexOf(delivery);
                if (index >= 0) {
                  vm.deliveries.splice( index, 1 );
                }
            });



            /**
             * [deliveriesSuccessFn description]
             * @param  {[type]} data    [description]
             * @param  {[type]} status  [description]
             * @param  {[type]} headers [description]
             * @param  {[type]} config  [description]
             * @return {[type]}         [description]
             */
            function deliveriesSuccessFn(data, status, headers, config) {
                vm.deliveries = data.data;
            }


            /**
             * @name deliveriesErrorFn
             * @desc Show snackbar with error
             */
            function deliveriesErrorFn(data, status, headers, config) {
                Snackbar.error(data.error);
            }
        }
    }
})();