'use strict';

angular.module('fireflyApp')
  .controller('ShorturlEventCtrl', function ($scope, $http, $routeParams) {
  })
  .controller('ShorturlAnalyticsCtrl', function ($scope, $http, $routeParams) {
    $scope.referrers = {
    	type: 'PieChart',
    	options: {
    		pieHole: 0.4
    	},
    	data: {
    		"cols": [
		        {id: "t", label: "Referrer", type: "string"},
		        {id: "s", label: "Hits", type: "number"}
    		],
			"rows": []
    	}
    };

    $scope.browsers = {
    	type: 'BarChart',
    	options: {
    		animation: {
    			duration: 300
    		},
    		legend: {
    			numberFormat: '#'
    		}
    	},
    	data: {
    		"cols": [
		        {id: "t", label: "Browser", type: "string"},
		        {id: "s", label: "Hits", type: "number"}
    		],
			"rows": []
    	}
    };

    $scope.countries = {
    	type: 'GeoChart',
    	options: {
    		domain: "IN",
    	},
    	data: {
    		"cols": [
		        {id: "t", label: "Country", type: "string"},
		        {id: "s", label: "Hits", type: "number"}
    		],
			"rows": []
    	}
    };

    $scope.platforms = {
    	type: 'BarChart',
    	data: {
    		"cols": [
		        {id: "t", label: "Platform", type: "string"},
		        {id: "s", label: "Hits", type: "number"}
    		],
			"rows": []
    	}
    };

    $http.get("/api/shorturl/"+$routeParams['hash']).success(function(data) {
    	$scope.shorturl = data;

    	for(var i = 0; i < $scope.shorturl.referrers.length; i++) {
    		var ref = $scope.shorturl.referrers[i];
    		$scope.referrers.data.rows.push({
				c: [
            		{v: ref.name },
            		{v: ref.hits },
        		]
    		});
    	}

    	for(var i = 0; i < $scope.shorturl.browsers.length; i++) {
    		var browser = $scope.shorturl.browsers[i];
    		$scope.browsers.data.rows.push({
				c: [
            		{v: browser.name },
            		{v: browser.hits },
        		]
    		});
    	}

    	for(var i = 0; i < $scope.shorturl.countries.length; i++) {
    		var country = $scope.shorturl.countries[i];
    		$scope.countries.data.rows.push({
				c: [
            		{v: country.name },
            		{v: country.hits },
        		]
    		});
    	}

    	for(var i = 0; i < $scope.shorturl.platforms.length; i++) {
    		var platform = $scope.shorturl.platforms[i];
    		$scope.platforms.data.rows.push({
				c: [
            		{v: platform.name },
            		{v: platform.hits },
        		]
    		});
    	}
    });


  });
