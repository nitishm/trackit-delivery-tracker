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
        vm.getJiraId = getJiraId;
        vm.getInitials = getInitials;
        vm.streams = [];
        activate();

        /**
         * [setDetails Pass all the delivery details to use across controllers]
         * @param {[delivery]} delivery [Delivery object data]
         */
        function setDetails(delivery) {
            Deliveries.setDetails(delivery);
        }

        /**
         * [stripTrailingSlash Strip trailing slash if present in URL]
         * @param  {[str]} str [URL]
         * @return {[str]}     [stripped URL]
         */
        function stripTrailingSlash(str) {
            if(str.substr(-1) === '/') {
                return str.substr(0, str.length - 1);
            }
            return str;
        }

        /**
         * [getLastUrlParam Get the last string from the URL]
         * @param  {[str]} url [Original URL]
         * @return {[type]}     [Last parameter from URL]
         */
        function getLastUrlParam(url) {
            return url.split("/").pop()
        }

        /**
         * [getJiraId Return the JIRA ID from the URL]
         * @param  {[url]} jira_url [Jira URL]
         * @return {[str]}          [Jira ID]
         */
        function getJiraId(jira_url) {
            return getLastUrlParam(stripTrailingSlash(jira_url));
        }

        function getInitials(author) {
            return author.first_name.charAt(0) + author.last_name.charAt(0)
        }
        /**
         * [activate description]
         * @return {[type]} [description]
         */
        function activate() {
            if (Authentication.isAuthenticated()) {
                Deliveries.get(Authentication.getAuthenticatedAccount().username).then(deliveriesSuccessFn, deliveriesErrorFn);
            } else {
                Deliveries.all().then(deliveriesSuccessFn, deliveriesErrorFn);
            }

            $scope.$on('delivery.created', function(event, delivery) {
                vm.deliveries.unshift(delivery);
                vm.streams = getStreams(vm.deliveries);
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

            function getStreams(deliveries) {
                var flags = {}, output = [], l = vm.deliveries.length, i, streams = [];
                for( i=0; i<l; i++) {
                    if( flags[vm.deliveries[i].stream_name] ) continue;
                    flags[vm.deliveries[i].stream_name] = true;
                    streams.push(vm.deliveries[i].stream_name);
                }
                return streams
            }

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
                vm.streams = getStreams(vm.deliveries);
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