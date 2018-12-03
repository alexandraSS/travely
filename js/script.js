$(document).ready(function() {

	// search form

	$(".searchIcon").click(function(){
		$(".formWrap, .input").toggleClass("active");
		$(".input").focus();
	});

	// tabs

	tabs();

	$('.priceBlock .tab').click(function() {
		var obj = $(this);
		var container = obj.parents('.priceBlock');
		var index = obj.index();
		$('.tabs .tab', container).removeClass('activeTabMenu').eq(index).addClass('activeTabMenu');
		$('.tab_content .tab_item', container).removeClass('activeTabContent').eq(index).addClass('activeTabContent');
	});

	function tabs () {
		$('.priceBlock').each(function() {
			$('.priceBlock .tab', this).eq(0).addClass('activeTabMenu');
			$('.tab_content .tab_item', this).eq(0).addClass('activeTabContent');
		});
	}

	// touch for carousel
	$(".carousel").on("touchstart", function(event){
		var xClick = event.originalEvent.touches[0].pageX;
		$(this).one("touchmove", function(event){
			var xMove = event.originalEvent.touches[0].pageX;
			if( Math.floor(xClick - xMove) > 5 ){
				$(this).carousel('next');
			}
			else if( Math.floor(xClick - xMove) < -5 ){
				$(this).carousel('prev');
			}
		});
		$(".carousel").on("touchend", function(){
			$(this).off("touchmove");
		});
	});

// scroll Up

	$('.scrollUp').hide();

	$(window).scroll(function () {
		if ($(this).scrollTop() > 400) {
			$('.scrollUp').fadeIn('slow');
		} else {
			$('.scrollUp').fadeOut('slow');
		}
	});
	$('.scrollUp').click(function () {
		$("html, body").animate({scrollTop: 0}, 1000);
		return false;
	});

	// Google map

	initMap();

});

function initMap() {
	var element = document.getElementById('map');
	var options = {
		zoom: 8,
		center: {lat: 51.084714, lng: 1.140409}
	};

	var myMap = new google.maps.Map(element, options);

	var markers = [
		{
			coordinates: {lat: 51.084714, lng: 1.140409},
			info: '<h3>We are located here</h3>'
		}
	];

	for(var i = 0; i < markers.length; i++) {
		addMarker(markers[i]);
	}

	function addMarker(properties) {
		var marker = new google.maps.Marker({
			position: properties.coordinates,
			map: myMap
		});

		if(properties.info) {
			var InfoWindow = new google.maps.InfoWindow({
				content: properties.info
			});

			marker.addListener('click', function(){
				InfoWindow.open(myMap, marker);
			})
		}
	}
}





