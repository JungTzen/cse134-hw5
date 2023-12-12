document.addEventListener('DOMContentLoaded', function () {
    const ratingWidget = document.querySelector('rating-widget');
    const form = ratingWidget.querySelector('form');
    const ratingSys = document.querySelector('.rating_sys');
    const inputStar = ratingSys.querySelectorAll('input[type="radio"]');
    const maxRating = ratingWidget.getAttribute('max');

    //RATING WEB COMPONENT

    //Hide submit button when JS is activated
    document.getElementById('submit_button').style.display = 'none';

    function starRating(ratingValue) {
        const ratingPercentage = (ratingValue / maxRating) * 100;
        let message = '';

        if (ratingPercentage >= 80) {
            message = `Thank you for the ${ratingValue} star rating!`;
        } 
        else {
            message = `Thanks for your feedback of ${ratingValue} stars. We will try to do better!`;
        }
        ratingWidget.innerHTML = `<p class="rating_message">${message}</p>`;

        const formData = new FormData(form);
        formData.append('sentBy', 'JS');

        //Sends response to console
        fetch('https://httpbin.org/post', {
            method: 'POST',
            body: formData,
            headers: {
                'X-Sent-By': 'JavaScript'
            }
        })
        .then(response => response.json())
        .then(data => {
            encoded = JSON.stringify(data, null, 2);
            console.log(encoded);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    inputStar.forEach(star => {
        star.addEventListener('change', () => {
            starRating(star.value);
        });
    });
    

    //WEATHER WEB COMPONENT

    // IDs for icons
    const iconMap = {
        "Cloudy": "cloudy",
        "Mostly Sunny": "sunny",
        "Fog": "fog",
        "Night Clear": "night-clear",
        "Partly Cloudy": "partly-cloudy",
        "Rain": "rain",
        "Thunderstorm": "thunderstorm",
        "Patchy Fog": "fog",
        "Partly Cloudy then Patchy Fog": "cloudy",
        "Patchy Fog then Mostly Sunny": "sunny",
        "Patchy Fog then Partly Cloudy": "fog",
    };

    // Function to fetch grid location and then the forecast
    function fetchForecast() {
        document.getElementById('weather_no_JS').style.display = 'none';
        const weather_url = `https://api.weather.gov/gridpoints/SGX/55,22/forecast`;
    
        fetch(weather_url)
        .then(response => {
            return response.json();
        })
        .then(forecastData => {
            console.log(forecastData.properties)
            const periods = forecastData.properties.periods;
            const today = new Date().toLocaleString("en-US",{timeZone: "America/Los_Angeles"})
            console.log(today)

            const current_date = new Date(today);
            const string_curr_date = current_date.getFullYear() + '-' + ('0' + (current_date.getMonth() + 1)).slice(-2) + '-' + ('0' + current_date.getDate()).slice(-2);
            //today = today.toISOString().split('T')[0];

            let forecast = '<p class="weather_text_header"><strong>Current Forecast</strong></p>';
            let nextDayForecast = false;

            // Build the Weather Widget
            for (let i = 0; i < Math.min(2, periods.length); i++) {
                const period = periods[i];
                console.log(period)

                if(!nextDayForecast && period.startTime.split('T')[0] !== string_curr_date){
                    forecast += '<p class="weather_text_header"><strong>Upcoming Forecast</strong></p>';
                    nextDayForecast = true;
                    console.log("Date: ", period.startTime.split('T')[0])
                }

                let iconId = iconMap[period.shortForecast] || "default";
        
                if(period.isDaytime){
                    iconId = iconMap[period.shortForecast] || "sunny";
                }
                else{
                    iconId = iconMap[period.shortForecast] || "night-clear";
                }

                forecast += `
                    <p class="weather_text">
                        <strong>${period.name}:</strong><br>
                        <svg class="icons"><use xlink:href="#${iconId}"></use></svg><br> 
                        ${period.shortForecast} ${period.temperature}°${period.temperatureUnit}<br><br>
                        Humidity: ${period.relativeHumidity.value}%<br> 
                        <svg class="small_icons"><use xlink:href="#windy"></use></svg>${period.windSpeed} ${period.windDirection}
                    </p>
                    <hr>
                `;
            };

            document.getElementById('weather_updates').innerHTML = forecast;
            document.getElementById('weather_updates').style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching forecast:', error);
            document.getElementById('weather_updates').innerHTML = 'Error fetching forecast.';
            document.getElementById('weather_updates').style.display = 'block';
        });
    }
    
    window.onload = () => fetchForecast();    
});