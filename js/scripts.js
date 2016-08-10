var googleMapsApp = angular.module("googleMapsApp", []);
googleMapsApp.controller('googleMapsController', function($scope, $http){

	var myLatlng = {lat: 40.0000, lng: -98.0000};
	var map = new google.maps.Map(document.getElementById('map'), {
  		zoom: 4,
  		center: myLatlng
	});

	function createMarker(city){
		console.log(city);
		var cityLatlng = {lat: city.lat, lng: city.lon};
		var marker = new google.maps.Marker(
	  		{
	    		position: cityLatlng,
	    		map: map,
	    		title: 'US Swimmers are faster than Aussies'
	  		}
		);
	}
	
	$scope.cities = cities;
	for(var i = 0; i<$scope.cities.length; i++){
		createMarker($scope.cities[i]);
	}


});