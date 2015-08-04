/**
 * DeliveryDetailsController
 * @namespace thinkster.deliveries.controllers
 */
(function() {
	'use strict';

	angular
		.module('thinkster.deliveries.controllers')
		.controller('DeliveryDetailsController', DeliveryDetailsController);

	DeliveryDetailsController.$inject = ['$scope', '$http', '$mdToast', 'Authentication', 'Deliveries', 'Snackbar'];
 		
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
	function getId(url) {
		return getLastUrlParam(stripTrailingSlash(url));
	}

	/**
	 * @namespace DeliveryDetailsController
	 */
	
	function DeliveryDetailsController($scope, $http, $mdToast, Authentication, Deliveries, Snackbar) {
		var vm = this;
		vm.details = Deliveries.getDetails();
		vm.show = false;
		var codereview_url = 'https://ap-codereview.us.oracle.com/api/review-requests/' + 
				getId(vm.details.codereview_url) + '?callback=JSON_CALLBACK';
		var jira_url = 'https://jira.oraclecorp.com/jira/rest/api/2/issue/' + 
				getId(vm.details.jira_url);

		$http.get(jira_url).then(jiraSuccessFn, jiraErrorFn).
		then($http.jsonp(codereview_url).then(codereviewSuccessFn,codereviewErrorFn));

		function codereviewSuccessFn(data, status, headers, config) {
			vm.show = true;
			console.log("Codereview Success");
			vm.codereviewDetails = data.data.review_request;
		}

		function codereviewErrorFn(data, status, headers, config) {
			vm.show = false;
			console.log("Codereview Failure");
			console.log(data);
			$mdToast.show(
				$mdToast.simple()
				.content("Codereview : Make sure you have accepted the security certificate warning when logging into codereview from chrome."+
				" Manually accept this warning.")
			);
		}	

		function jiraSuccessFn(data, status, header, config) {
			console.log("JIRA Success");
			console.log(data);
		}

		function jiraErrorFn(data, status, headers, config) {
			console.log("JIRA Failure");
			console.log(data);

			$mdToast.show(
				$mdToast.simple()
				.content("JIRA : Make sure you have accepted the security certificate warning when logging into codereview from chrome."+
				" Manually accept this warning.")
			);

		}
	}
})();