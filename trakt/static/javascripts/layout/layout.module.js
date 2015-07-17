(function() {
    'use strict';

    angular
        .module('thinkster.layout', [
            'thinkster.layout.controllers'
        ]);
    
    angular
    .module('thinkster.layout')
    	.filter('startFrom', function() {
			return function(input, start) {
				if (input) {
					start = +start;	// parse to int
					return input.slice(start);
				}
			return [];
		}
	});
    angular
        .module('thinkster.layout.controllers', []);
})();