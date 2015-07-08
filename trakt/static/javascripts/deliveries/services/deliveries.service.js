/**
 * deliveries
 * @namespace thinkster.deliveries.services
 */
(function() {
    'use strict';

    angular
        .module('thinkster.deliveries.services')
        .factory('Deliveries', Deliveries);

    Deliveries.$inject = ['$http'];

    /**
     * @namespace Deliveries
     * @returns {Factory}
     */
    function Deliveries($http) {
        var Details = {};

        var Deliveries = {
            all: all,
            create: create,
            update: update,
            destroy: destroy,
            get: get,
            setDetails:setDetails,
            getDetails:getDetails
        };

        return Deliveries;

        ////////////////////

        /**
         * @name all
         * @desc Get all deliveries
         * @returns {Promise}
         * @memberOf thinkster.deliveries.services.deliveries
         */
        function all() {
            return $http.get('/api/v1/deliveries/');
        }


        /**
         * @name create
         * @desc Create a new delivery
         * @param {string} content The content of the new delivery
         * @returns {Promise}
         * @memberOf thinkster.deliveries.services.deliveries
         */
        function create(stream_name, activity_name, view_name, jira, codereview, description, notes, status) {
            return $http.post('/api/v1/deliveries/', {
                stream_name: stream_name,
                activity_name: activity_name,
                view_name: view_name,
                jira_url: jira,
                codereview_url: codereview,
                description: description,
                notes: notes,
                status: status,
            });
        }

        /**
         * @name update
         * @desc Update a Delivery
         * @param {string,...} content The content of the new Delivery
         * @returns {Promise}
         * @memberOf thinkster.deliveries.services.deliveries
         */
        function update(id, stream_name, activity_name, view_name, jira, codereview, description, notes, status) {
            return $http.put('/api/v1/deliveries/' + id + '/', {
                stream_name: stream_name,
                activity_name: activity_name,
                view_name: view_name,
                jira_url: jira,
                codereview_url: codereview,
                description: description,
                notes: notes,
                status: status,
            });
        }

        /**
         * @name destroy
         * @desc Destroy a Delivery
         * @param {id,...} id Primary key of Delivery
         * @returns {Promise}
         * @memberOf thinkster.deliveries.services.deliveries
         */
        function destroy(id) {
            return $http.delete('/api/v1/deliveries/' + id + '/');
        }

        /**
         * @name get
         * @desc Get the deliveries of a given user
         * @param {string} username The username to get deliveries for
         * @returns {Promise}
         * @memberOf thinkster.deliveries.services.deliveries
         */
        function get(username) {
            return $http.get('/api/v1/accounts/' + username + '/deliveries/');
        }

        /**
         * @param {[Delivery object]}
         */
        function setDetails(delivery) {
            Details = delivery;
        }

        /**
         * @return {[Delivery object]}
         */
        function getDetails() {
            return Details;
        }
    }
})();