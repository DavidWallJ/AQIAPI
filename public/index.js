/**
 * Created by david on 5/10/17.
 */
// get location


$(document).ready(function () {
    var currentLat;
    var currentLong;


    $.ajax({
        'url': 'http://ipinfo.io/json',
        'success': function (data) {

            var res = data.loc.split(",");
            currentLat = res[0];
            currentLong = res[1];

            var measurement = "metric";

            getWeather(currentLat, currentLong, measurement, function (weatherData) {
                var temp = weatherData.main.temp;
                var roundedTemp = Math.round(weatherData.main.temp * 10) /10;
                $('#temp').text(roundedTemp);
                $('#humidity').text(weatherData.main.humidity);
                $('#desc').text(weatherData.weather[0].description);
                $('#windSpeed').text(weatherData.wind.speed);

                var windDirection = getWindDirection(weatherData.wind.deg);
                $('#windDirection').text(windDirection);

                // get icon
                var prefix = 'wi wi-';
                var code = weatherData.weather[0].id;
                var icon = weatherIcons[code].icon;
                // If we are not in the ranges mentioned above, add a day/night prefix.
                if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
                    icon = 'day-' + icon;
                }

                // Finally tack on the prefix.
                icon = prefix + icon;
                $( "i" ).addClass( icon );

            });



            getAQI(currentLat, currentLong, function (body) {

                $('#aqiName').text(body.data.city.name);
                $('#aqi').text(body.data.iaqi.pm25.v);

                // set bacground color based on aqi measurment
                changeBackgroundColors(body.data.iaqi.pm25.v);
            });
        }
    });
});



// get weather
function getWeather(lat, long, measurement, callback) {
    var weather = 'http://api.openweathermap.org/data/2.5/weather?lat='+ lat + '&lon=' + long + '&units=' + measurement + '&APPID=e3415ebd8f9d067c5f2af6196d4e5a11';
    $.ajax({
        dataType: "jsonp",
        url: weather,
        success: callback
    });
}

function getWindDirection(num) {
    val = Math.round(num/22.5 +.5);
    arr=["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]
    return arr[val % 16];
}





// change measurement system
setTimeout(function() {
    var temp = $('#temp').text();

    $('#tempC').click(function() {
        $('#temp').text(temp);
    });

    $('#tempF').click(function() {
        var rounded = Math.round( (temp * (9/5) + 32) * 10 ) / 10;
        $('#temp').text(rounded);
    });



}, 1000);




// change background colors
var changeBackgroundColors = function(aqi) {

    if (aqi <= 50){
        $('body').css({ "background-color": "#009966"}); //green
        $('.btn').css({ "background-color": "#009966"}); //green
    } else if (aqi <= 100) {
        $('body').css({ "background-color": "#ffde33"}); //yellow
        $('.btn').css({ "background-color": "#ffde33"}); //yellow
    } else if (aqi <= 150) {
        $('body').css({ "background-color": "#ff9933"}); //orange
        $('.btn').css({ "background-color": "#ff9933"}); //orange
    } else if (aqi <= 200) {
        $('body').css({ "background-color": "#cc0033"}); //red
        $('.btn').css({ "background-color": "#cc0033"}); //red
    } else if (aqi <= 300) {
        $('body').css({ "background-color": "#660099"}); //indigo
        $('.btn').css({ "background-color": "#660099"}); //indigo
    } else if (aqi > 300) {
        $('body').css({ "background-color": "#7e0023"}); //maroon
        $('.btn').css({ "background-color": "#7e0023"}); //maroon
    } else {
        $('body').css({ "background-color": "#add8e6"}); //lightblue
        $('.btn').css({ "background-color": "#add8e6"}); //lightblue
    }

};


// change toggle css by add/remove class
$('#tempC').click(function() {
    $("#tempC").addClass("active");
    $("#tempF").removeClass("active");
});

$('#tempF').click(function() {
    $('#tempF').addClass('active');
    $('#tempC').removeClass('active');

});



// AQI


function getAQI(lat, long, callback) {
    var AQI = "https://api.waqi.info/feed/geo:" + lat + ";" + long + "/?token=4dbb59849ccb7abaa698c6d5f5995abe3c6c5509";
    console.log(AQI);
    $.ajax({
        dataType: "jsonp",
        url: AQI,
        success: callback
    });
}








// icons
// had issues getting the cdn to work properly

var weatherIcons = {
    "200": {
        "label": "thunderstorm with light rain",
        "icon": "storm-showers"
    },

    "201": {
        "label": "thunderstorm with rain",
        "icon": "storm-showers"
    },

    "202": {
        "label": "thunderstorm with heavy rain",
        "icon": "storm-showers"
    },

    "210": {
        "label": "light thunderstorm",
        "icon": "storm-showers"
    },

    "211": {
        "label": "thunderstorm",
        "icon": "thunderstorm"
    },

    "212": {
        "label": "heavy thunderstorm",
        "icon": "thunderstorm"
    },

    "221": {
        "label": "ragged thunderstorm",
        "icon": "thunderstorm"
    },

    "230": {
        "label": "thunderstorm with light drizzle",
        "icon": "storm-showers"
    },

    "231": {
        "label": "thunderstorm with drizzle",
        "icon": "storm-showers"
    },

    "232": {
        "label": "thunderstorm with heavy drizzle",
        "icon": "storm-showers"
    },

    "300": {
        "label": "light intensity drizzle",
        "icon": "sprinkle"
    },

    "301": {
        "label": "drizzle",
        "icon": "sprinkle"
    },

    "302": {
        "label": "heavy intensity drizzle",
        "icon": "sprinkle"
    },

    "310": {
        "label": "light intensity drizzle rain",
        "icon": "sprinkle"
    },

    "311": {
        "label": "drizzle rain",
        "icon": "sprinkle"
    },

    "312": {
        "label": "heavy intensity drizzle rain",
        "icon": "sprinkle"
    },

    "313": {
        "label": "shower rain and drizzle",
        "icon": "sprinkle"
    },

    "314": {
        "label": "heavy shower rain and drizzle",
        "icon": "sprinkle"
    },

    "321": {
        "label": "shower drizzle",
        "icon": "sprinkle"
    },

    "500": {
        "label": "light rain",
        "icon": "rain"
    },

    "501": {
        "label": "moderate rain",
        "icon": "rain"
    },

    "502": {
        "label": "heavy intensity rain",
        "icon": "rain"
    },

    "503": {
        "label": "very heavy rain",
        "icon": "rain"
    },

    "504": {
        "label": "extreme rain",
        "icon": "rain"
    },

    "511": {
        "label": "freezing rain",
        "icon": "rain-mix"
    },

    "520": {
        "label": "light intensity shower rain",
        "icon": "showers"
    },

    "521": {
        "label": "shower rain",
        "icon": "showers"
    },

    "522": {
        "label": "heavy intensity shower rain",
        "icon": "showers"
    },

    "531": {
        "label": "ragged shower rain",
        "icon": "showers"
    },

    "600": {
        "label": "light snow",
        "icon": "snow"
    },

    "601": {
        "label": "snow",
        "icon": "snow"
    },

    "602": {
        "label": "heavy snow",
        "icon": "snow"
    },

    "611": {
        "label": "sleet",
        "icon": "sleet"
    },

    "612": {
        "label": "shower sleet",
        "icon": "sleet"
    },

    "615": {
        "label": "light rain and snow",
        "icon": "rain-mix"
    },

    "616": {
        "label": "rain and snow",
        "icon": "rain-mix"
    },

    "620": {
        "label": "light shower snow",
        "icon": "rain-mix"
    },

    "621": {
        "label": "shower snow",
        "icon": "rain-mix"
    },

    "622": {
        "label": "heavy shower snow",
        "icon": "rain-mix"
    },

    "701": {
        "label": "mist",
        "icon": "sprinkle"
    },

    "711": {
        "label": "smoke",
        "icon": "smoke"
    },

    "721": {
        "label": "haze",
        "icon": "day-haze"
    },

    "731": {
        "label": "sand, dust whirls",
        "icon": "cloudy-gusts"
    },

    "741": {
        "label": "fog",
        "icon": "fog"
    },

    "751": {
        "label": "sand",
        "icon": "cloudy-gusts"
    },

    "761": {
        "label": "dust",
        "icon": "dust"
    },

    "762": {
        "label": "volcanic ash",
        "icon": "smog"
    },

    "771": {
        "label": "squalls",
        "icon": "day-windy"
    },

    "781": {
        "label": "tornado",
        "icon": "tornado"
    },

    "800": {
        "label": "clear sky",
        "icon": "sunny"
    },

    "801": {
        "label": "few clouds",
        "icon": "cloudy"
    },

    "802": {
        "label": "scattered clouds",
        "icon": "cloudy"
    },

    "803": {
        "label": "broken clouds",
        "icon": "cloudy"
    },

    "804": {
        "label": "overcast clouds",
        "icon": "cloudy"
    },


    "900": {
        "label": "tornado",
        "icon": "tornado"
    },

    "901": {
        "label": "tropical storm",
        "icon": "hurricane"
    },

    "902": {
        "label": "hurricane",
        "icon": "hurricane"
    },

    "903": {
        "label": "cold",
        "icon": "snowflake-cold"
    },

    "904": {
        "label": "hot",
        "icon": "hot"
    },

    "905": {
        "label": "windy",
        "icon": "windy"
    },

    "906": {
        "label": "hail",
        "icon": "hail"
    },

    "951": {
        "label": "calm",
        "icon": "sunny"
    },

    "952": {
        "label": "light breeze",
        "icon": "cloudy-gusts"
    },

    "953": {
        "label": "gentle breeze",
        "icon": "cloudy-gusts"
    },

    "954": {
        "label": "moderate breeze",
        "icon": "cloudy-gusts"
    },

    "955": {
        "label": "fresh breeze",
        "icon": "cloudy-gusts"
    },

    "956": {
        "label": "strong breeze",
        "icon": "cloudy-gusts"
    },

    "957": {
        "label": "high wind, near gale",
        "icon": "cloudy-gusts"
    },

    "958": {
        "label": "gale",
        "icon": "cloudy-gusts"
    },

    "959": {
        "label": "severe gale",
        "icon": "cloudy-gusts"
    },

    "960": {
        "label": "storm",
        "icon": "thunderstorm"
    },

    "961": {
        "label": "violent storm",
        "icon": "thunderstorm"
    },

    "962": {
        "label": "hurricane",
        "icon": "cloudy-gusts"
    }
};



// make long city names smaller font-size


