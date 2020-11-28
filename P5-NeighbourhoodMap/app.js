	//markers array
	let markers= [];
	//map instance
	let map = {};
	//marker information window
	let largeInfowindow  = '';
	//current city
	let city = 'Lucknow';

	//location data
	let locations = [
		{
	    	'location': {lat: 26.870363, lng: 80.914411},
	    	'zoom': 3,
	    	'title': 'Bara Imambara'
		},
		{
	    	'location': {lat: 26.861986, lng: 80.928135},
		 	'zoom': 3,
	    	'title': 'The Residency'
		}, 
		{
		    'location': {lat: 26.831, lng: 80.954},
		    'zoom': 3,
		    'title': 'Dilkusha Kothi'
		},
		{
		    'location': {lat:  26.871217, lng: 80.912201},
		    'zoom': 3,
		    'title': 'Rumi Darwaza'
		},
		{
		    'location': {lat: 26.856447, lng: 80.945655},
		    'zoom': 3,
		    'title': 'Hazratganj'
		}
	];

	/*@desc - model*/
	//@ToDo - observables are not needed here
	//@ToDo - model can have better names to indicate what they are storing
	//ToDo - This is your constructor function. A constructor is a function that is used to create 
 	// an object. The previous reviewer was referring to this constructor function and observed how
 	// you could create a this.marker property here that would hold the marker object related to the particular
 	// location. ( lines 192 -214 can be moved here)
	let model = function(data) {
	  this.location = ko.observable(data.location);
	  this.zoom = ko.observable(data.zoom);
	  this.title = ko.observable(data.title);
	};

	/*@desc - view model*/
	let viewModel = function() {
		//text string for filter search
		this.locationString = ko.observable();	
		
		// list for populating the listbox
		this.locationList = ko.observableArray([]);

		// list for populating the listbox
		this.factList = ko.observableArray([]);

		/*desc - method to populate the listbox with location titles*/
		this.populateListBox = () => {
			//exclude special characters
			if(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(this.locationString())) {
				this.locationString('');
			}
			//regular expression pattern
			let pattern = new RegExp(this.locationString(), 'i');
			locations.forEach((item) => {
				if(pattern.test(item.title)) {
					this.locationList.push(new model(item));
				}
			});
		};
		
		/*@desc - update listbox wrt to user input in the search container*/
		this.updateListBox = () => {
			//refresh location list-box
			this.locationList.removeAll();
			//populated based on input string
			this.populateListBox();
			//check for empty location string and display the current map
			if (this.locationList().length  < 1) {
				return true
			} 
			//hide all markers
			hideAllMarkers();
			//update map
			this.updateMap();
			return true;
		};

		/* @desc - update map */
		this.updateMap = () => {
			let bounds = new google.maps.LatLngBounds();
			if (this.locationList) {
				//show marker on the map which are present in the listbox
				this.locationList().forEach((item) => {
					showMarker(item.title(), bounds);
				});
			}
			map.fitBounds(bounds);
		};

		/*@desc - callback on click of location from drop down filter */
		this.onClick = (locationObj) => {
			let bounds = new google.maps.LatLngBounds();
			showMarker(locationObj.title(), bounds, 1);
			map.fitBounds(bounds);
		};

		/* @desc: callback from Reset functionlity */
		this.resetFilterDropDrown = () => {
			//set location-string and info-window to blank
			this.locationString("");
			if(largeInfowindow) {
				largeInfowindow.close();
			}
			//update listbox
			this.updateListBox();
		};

		/* @desc: The function get the wiki data for the query string */
		this.getCityData = () => {

			//wiki endpoint
			let wikiUrl ='https://en.wikipedia.org/w/api.php?action=opensearch&search='+ city +'&format=json';

			this.apiTimeout = setTimeout(() => { 
				$('#about-modal').modal('hide');
			    alert('ERROR: Failed to load data');  
			}, 1000);

		    //Ajax Call to Wikepedia
		    //@ToDO - observables are not needed here.Use the new .done() and .fail()
		    //@ToDo - consider using Fetch API also
		    $.ajax({
		        url: wikiUrl,
		        method: 'GET',
		        dataType: 'jsonp',
		    	success: (result) => {
			        for (var i=0 ; i<result[2].length ; i++){
			            this.factList.push(result[2][i]);
			        }
			        clearTimeout(this.apiTimeout);
		        }
		    });
		};

		//To populate the list-box initially
		this.populateListBox();
	};

	ko.applyBindings(new viewModel());

	//google map functionality
	let mapStyles = [
	{
	   featureType: 'road',
	   elementType: 'labels.text.fill',
	   stylers: [{color: '#9ca5b3'}]
	 },
	 {
	    featureType: 'road.highway',
	    elementType: 'geometry',
	    stylers: [{color: '#746855'}]
	 }
	];
	//map settings
	let mapSettings = {
		'zoom': 13,
	 	'centre': {lat: 26.856447, lng: 80.945655},
		'mapStyles': mapStyles
	};

	/*@desc - callback from google map JS API*/
	function initMap() {
		//Map instance
		map = new google.maps.Map(document.getElementById('map'), {
			zoom: mapSettings.zoom,
			center: mapSettings.centre,
			styles: mapSettings.mapStyles
		});
		let bounds = new google.maps.LatLngBounds();
		//info window 
	    largeInfowindow = new google.maps.InfoWindow();
		//style the markers a bit. This will be our listing marker icon.
	  	let defaultIcon = makeMarkerIcon('0091ff');
		//create a "highlighted location" marker color for when the user mouses over the marker.
		let highlightedIcon = makeMarkerIcon('FFFF24');

		//@ToDo - You are looping through every location here. This is the second time in the code you do this. 
		// You also do this in line 66 as well when you instantiate the Location objects. This is inefficient to loop through every location twice. 
		// This can be a big performance hit especially if there are more locations! The suggestion to move the logic
		// for creating new marker objects within the Location constructor function (line 41) would eliminate the need for
		// this second for loop and make your code much more efficient :)
	  	locations.forEach( (mapItem, index) => {
		    //Marker instance
		    //@ToDo markers can be instantiated in the constructor in the data model so that
		    let marker = new google.maps.Marker({
		      position: mapItem.location,
		      map: map,
		      id: index,
		      title: mapItem.title,
		      animation: google.maps.Animation.Drop,
		      icon: defaultIcon
	      	});

		    //add info window to the marker
		    marker.addListener('click', () => {
		      populateInfoWindow(marker);
		    });

		    bounds.extend(marker.position);

		    //marker icon behaviour on mouse events
	        marker.addListener('mouseover', () => {
	 	 		marker.setIcon(highlightedIcon);
	   		 });
		    marker.addListener('mouseout', () => {
		      marker.setIcon(defaultIcon);
		    });

		    //push the marker to our array of markers.
	    	markers.push(marker);

	    });
	    
		// Extend the boundaries of the map for each marker
		map.fitBounds(bounds);
	}

	/* Erro callback for google APIs */
	function onError() {
		alert('Google Maps failed to load.Please verify your google API url and key and try again.');
	}

	/* @desc  This function populates the infowindow when the marker is clicked. We'll only allow
	one infowindow which will open at the marker that is clicked, and populate based
	on that markers position */
	function populateInfoWindow(marker) {
	  // Check to make sure the infowindow is not already opened on this marker.
	  if (largeInfowindow.marker != marker) {
		largeInfowindow.marker = marker;
		
		this.apiTimeout = setTimeout(() => { 
		    alert('ERROR: Failed to load data');  
		}, 1000);

	    //Ajax Call to Wikepedia
	    $.ajax({
	        url: 'https://en.wikipedia.org/w/api.php?action=opensearch&search='+ String(marker.title) +'&format=json',
	        method: 'GET',
	        dataType: 'jsonp',
	    	success: (result) => {
	    		let wikiInfo = "";
	    		for(let i=0; i<result[2].length; i++) {
		        	 wikiInfo = wikiInfo + ' ' + result[2][i];
		        	//limit the info size
		        	if (i > 5) {
		        		break;
		        	}
	    		}
		        largeInfowindow.setContent('<div>' + marker.title + '</div> <div>' + marker.position + '</div> <div>' + wikiInfo + '</div>');
			    
			    // Make sure the marker property is cleared if the infowindow is closed.
			    largeInfowindow.addListener('closeclick',function(){
			  		largeInfowindow.setMarker = null;
			    });

			    // Open the infowindow on the correct marker.
			    largeInfowindow.open(map, marker);

		        clearTimeout(this.apiTimeout);
	        }
	    });
	  }
	}

	/* @desc  This function takes in a COLOR, and then creates a new marker
				icon of that color. The icon will be 21 px wide by 34 high, have an origin
				of 0, 0 and be anchored at 10, 34) */
	function makeMarkerIcon(markerColor) {
	  var markerImage = new google.maps.MarkerImage(
		'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
		'|40|_|%E2%80%A2',
		new google.maps.Size(21, 34),
		new google.maps.Point(0, 0),
		new google.maps.Point(10, 34),
		new google.maps.Size(21,34));
	  	return markerImage;
	}

	/* @desc This function will loop through the markers array and display the marker
	according to the input title passed */
	function showMarker(titleString, bounds, clickMarker) {

		//making clickMarker parameter to act as a default paramter for the method
		clickMarker = clickMarker || 0;

		// Extend the boundaries of the map for each marker and display the marker
		for (var i = 0; i < markers.length; i++) {
	  		if (markers[i].title === titleString) {
	  			//@ToDo try set visible true|false
		  		markers[i].setMap(map);
		  		bounds.extend(markers[i].position);
		  		if (clickMarker) {
		  			//open info window
		  			//define info window 
		  			populateInfoWindow(markers[i]);

		  			//highlight the icon
		  			// Create a "highlighted location" marker color for when the user mouses over the marker.
					let highlightedIcon = makeMarkerIcon('FFFF24');
		  			markers[i].setIcon(highlightedIcon);

		  			//change back to default map marker
					let defaultIcon = makeMarkerIcon('0091ff');
					let markerInstance = markers[i];
		  			setTimeout(() => {
			            markerInstance.setIcon(defaultIcon);
			        }, 1000);
		  		}
			}
		}
	}

	/* @desc This function will loop through the listings and hide all markers
	 the input title passed */
	function hideAllMarkers() {
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
		}
	}
