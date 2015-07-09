/**
 * DeliveryController
 * @namespace thinkster.deliveries.controllers
 */
(function() {
    'use strict';

    angular
        .module('thinkster.deliveries.controllers')
        .controller('DeliveryController', DeliveryController);

    DeliveryController.$inject = ['$rootScope', '$scope', 'Authentication', 'Snackbar', 'Deliveries'];

    /**
     * @namespace DeliveryController
     */
    function DeliveryController($rootScope, $scope, Authentication, Snackbar, Deliveries) {
        var vm = this;
        vm.create = create;
        vm.update = update;
        vm.destroy = destroy;
        vm.status = true;
        vm.flag = "create";

        var details = Deliveries.getDetails();
        //If this is an update populate all fields
        //Use boolean field is_update to use a different template
        if (details && details.stream_name) {
            console.log("This is an update/destroy call");
            vm.stream_name = details.stream_name;
            vm.activity_name = details.activity_name;
            vm.view_name = details.view_name;
            vm.jira = details.jira_url;
            vm.codereview = details.codereview_url;
            vm.description = details.description;
            vm.notes = details.notes;
            vm.flag = "update";
        }


        //TODO : Add the update function here
        /**
         * @name update
         * @desc Update a Delivery
         * @memberOf thinkster.deliveries.controllers.DeliveryController
         */
        function update() {
            $scope.closeThisDialog();

            var details = Deliveries.getDetails();
            Deliveries.update(details.id, vm.stream_name, vm.activity_name, vm.view_name, vm.codereview, vm.jira, vm.description, vm.notes, vm.status)
                .then(updateDeliverySuccessFn, updateDeliveryErrorFn);

            /**
             * @name createDeliverySuccessFn
             * @desc Show snackbar with success message
             */
            function updateDeliverySuccessFn(data, status, headers, config) {
                $rootScope.$broadcast('delivery.updated', data.data);
                Snackbar.show('Success! Delivery updated.');
            }


            /**
             * @name createDeliveryErrorFn
             * @desc Propogate error event and show snackbar with error message
             */
            function updateDeliveryErrorFn(data, status, headers, config) {
                $rootScope.$broadcast('delivery.updated.error');
                Snackbar.error(data.status + ' ' + data.statusText);
            }
        }

        //TODO : Add the update function here
        /**
         * @name destroy
         * @desc Destroy a Delivery
         * @memberOf thinkster.deliveries.controllers.DeliveryController
         */
        function destroy() {
            $scope.closeThisDialog();

            var details = Deliveries.getDetails();
            Deliveries.destroy(details.id)
                .then(destroyDeliverySuccessFn, destroyDeliveryErrorFn);

            /**
             * @name createDeliverySuccessFn
             * @desc Show snackbar with success message
             */
            function destroyDeliverySuccessFn(data, status, headers, config) {
                $rootScope.$broadcast('delivery.destroyed', details);
                Snackbar.show('Success! Delivery destroyed.');
            }


            /**
             * @name createDeliveryErrorFn
             * @desc Propogate error event and show snackbar with error message
             */
            function destroyDeliveryErrorFn(data, status, headers, config) {
                $rootScope.$broadcast('delivery.destroyed.error');
                Snackbar.error(data.status + ' ' + data.statusText);
            }
        }

        /**
         * @name create
         * @desc Create a new Delivery
         * @memberOf thinkster.deliveries.controllers.DeliveryController
         */
        function create() {
            $scope.closeThisDialog();

            Deliveries.create(vm.stream_name, vm.activity_name, vm.view_name, vm.codereview, vm.jira, vm.description, vm.notes, vm.status)
                .then(createDeliverySuccessFn, createDeliveryErrorFn);

            /**
             * @name createDeliverySuccessFn
             * @desc Show snackbar with success message
             */
            function createDeliverySuccessFn(data, status, headers, config) {
                $rootScope.$broadcast('delivery.created', data.data);
                Snackbar.show('Success! Delivery created.');
            }

            /**
             * @name createDeliveryErrorFn
             * @desc Propogate error event and show snackbar with error message
             */
            function createDeliveryErrorFn(data, status, headers, config) {
                $rootScope.$broadcast('delivery.created.error');
                Snackbar.error(data.status + ' ' + data.statusText);
            }
        }
    }
})();