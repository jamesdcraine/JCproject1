$( document ).ready(function() {
	console.log('ready')

	var location = {
		long:0,
		lat:0,
	}

	var food_key = ZOMATO_KEY;
	var weather_Key = WEATHER_KEY;
	var imgURL = [];
	var locations =[];
	var names = [];
	var phonenumbers =[];
	
	if (!navigator.geolocation) {
		status.textContent = 'Geolocation is not supported by your browser';
	} else {
		navigator.geolocation.getCurrentPosition(success, error);
	}

	function success(position) {
		location.lat  = position.coords.latitude;
		location.long = position.coords.longitude;
		console.log(location)
		buildQueryURLs(false)
	}

	function error() {
		console.log(error)
	}

	function getGeoCode(){
		var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?'
		var queryParams = {'appid': weather_Key } ;
		queryParams.q = $("#search-term").val().trim();

		$.ajax({
			url: queryURL + $.param(queryParams),
			method: "GET"
		}).then(function(response){
			console.log(response)
			location.lat = response.city.coord.lat
			location.long = response.city.coord.lat
			getLocation()
		})
	}

	function getLocation(){
		var queryURL = 'https://developers.zomato.com/api/v2.1/geocode?'
		var queryParams = {};
	
		queryParams.lat = location.lat
		queryParams.lon = location.long
		console.log(queryParams)

		$.ajax({
			headers: {
			'user-key':food_key,
			},
			url: queryURL + $.param(queryParams),
			method: "GET"
		}).then(function(response){
			console.log(response.nearby_restaurants[0].restaurant.id)


			
			response.nearby_restaurants.forEach(function(ele){

					getMenu(ele.restaurant.id)
				
			})
		})
	}

	
	
	function getMenu(res_id){
		var queryURL = 'https://developers.zomato.com/api/v2.1/restaurant?'
		var queryParams = {'res_id': res_id} ;
		
		$.ajax({
			headers: {
			'user-key':food_key,
			},
			url: queryURL + $.param(queryParams),
			method: "GET"
		}).then(function(response){
			console.log(response)
			console.log(JSON.stringify(response.photos[0].photo.url))
			
			
			var photo =(response.photos[0].photo.url);
			var location=response.location.address;
			imgURL.push(photo);
			console.log(imgURL);
			

			var location=response.location.address;
			console.log(location);
			locations.push(location);
			console.log(locations);

			var name= response.name;
			names.push(name);
			console.log(names);
			
			var phone = response.phone_numbers;
			phonenumbers.push(phone);
			console.log(phonenumbers);
			
			
		 placeimg();
		})
	}




	function buildQueryURLs() {
		getLocation();		

	}

	function placeimg(){


	$(".image0").attr("src",imgURL[0]);
	$(".image1").attr("src",imgURL[1]);
	$(".image2").attr("src",imgURL[2]);
	$(".image3").attr("src",imgURL[3]);
	$(".image4").attr("src",imgURL[4]);
	$(".image5").attr("src",imgURL[5]);
	$(".image6").attr("src",imgURL[6]);
	$(".image7").attr("src",imgURL[7]);
	$(".image8").attr("src",imgURL[8]);
	$(".image9").attr("src",imgURL[9]);

	$(".name0").text(names[0]);
	$(".phone0").text(phonenumbers[0]);
	$(".address0").text(locations[0]);

	$(".name1").text(names[1]);
	$(".phone1").text(phonenumbers[1]);
	$(".address1").text(locations[1]);

	$(".name2").text(names[2]);
	$(".phone2").text(phonenumbers[2]);
	$(".address2").text(locations[2]);

	$(".name3").text(names[3]);
	$(".phone3").text(phonenumbers[3]);
	$(".address3").text(locations[3]);

	$(".name4").text(names[4]);
	$(".phone4").text(phonenumbers[4]);
	$(".address4").text(locations[4]);

	$(".name5").text(names[5]);
	$(".phone5").text(phonenumbers[5]);
	$(".address5").text(locations[5]);

	$(".name6").text(names[6]);
	$(".phone6").text(phonenumbers[6]);
	$(".address6").text(locations[6]);

	$(".name7").text(names[7]);
	$(".phone7").text(phonenumbers[7]);
	$(".address7").text(locations[7]);

	$(".name8").text(names[8]);
	$(".phone8").text(phonenumbers[8]);
	$(".address8").text(locations[8]);

	$(".name9").text(names[9]);
	$(".phone9").text(phonenumbers[9]);
	$(".address9").text(locations[9]);




	}

});




	// }	
// }

	$("#submitbtn").on("click", function(event) {
		console.log('click')
		event.preventDefault();	
		

		

		window.location.href='../GTBC---PROJECT-1/results1.html';
		
		buildQueryURLs();
	 placeimg();




 });