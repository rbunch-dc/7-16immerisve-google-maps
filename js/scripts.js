var googleMapsApp = angular.module("googleMapsApp", []);
googleMapsApp.controller('googleMapsController', function($scope, $http){

	var myLatlng = {lat: 40.0000, lng: -98.0000};
	var map = new google.maps.Map(document.getElementById('map'), {
  		zoom: 4,
  		center: myLatlng
	});

	var markers = [];

	function createMarker(city){
		var icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569';
		if(city.yearRank == 1){
			icon = 'img/1.png';
		}else if(city.yearRank == 39){
			icon = 'img/atl.png';
		}
		var cityLatlng = {lat: city.lat, lng: city.lon};
		var marker = new google.maps.Marker(
	  		{
	    		position: cityLatlng,
	    		map: map,
	    		title: city.city,
	    		icon: icon
	  		}
		);

		var infoWindow = new google.maps.InfoWindow({
          content: city.city
        });

		google.maps.event.addListener(marker, 'click', function(){
			infoWindow.open(map, marker);
		});
		markers.push(marker);

	}

	$scope.triggerClick = function(index){
		google.maps.event.trigger(markers[index],"click");
	}
	
	$scope.cities = cities;
	for(var i = 0; i<$scope.cities.length; i++){
		createMarker($scope.cities[i]);
	}

	$scope.updateMarkers = function(){
		for(var i=0; i < markers.length; i++){
			markers[i].setMap(null);
		}

		for(var i = 0; i< $scope.filteredCities.length; i++){
			createMarker($scope.filteredCities[i]);
		}
	}

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
		directionsDisplay.setMap(map);
        directionsService.route({
          origin: 'Atlanta, GA',
          destination: 'New York, NY',
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });		

});