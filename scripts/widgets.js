document.addEventListener('DOMContentLoaded', function () {
    const ratingWidget = document.querySelector('rating-widget');
    const form = ratingWidget.querySelector('form');
    const ratingSys = document.querySelector('.rating_sys');
    const inputStar = ratingSys.querySelectorAll('input[type="radio"]');
    const maxRating = ratingWidget.getAttribute('max') || 5;
    const latitude = '32.8801';
    const longitude = '-117.234';

    //RATING WEB COMPONENT
    document.getElementById('submit_button').style.display = 'none';

    function handleStarSelection(ratingValue) {
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

        fetch('https://httpbin.org/post', {
            method: 'POST',
            body: formData,
            headers: {
                'X-Sent-By': 'JavaScript'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response:', data);
            textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    inputStar.forEach(star => {
        star.addEventListener('change', () => {
            handleStarSelection(star.value);
        });
    });
    

    //WEATHER WEB COMPONENT
    const iconMap = {
        "Cloudy": "cloudy",
        "Mostly Sunny": "sunny",
        "Fog": "fog",
        "Night Clear": "night-clear",
        "Partly Cloudy": "partly-cloudy",
        "Rain": "rain",
        "Thunderstorm": "thunderstorm",
        "Patchy Fog": "fog"
    };

    // Function to fetch grid location and then the forecast
    function fetchForecast(latitude, longitude) {
        document.getElementById('weather_no_JS').style.display = 'none';
        const weather_url = `https://api.weather.gov/gridpoints/SGX/55,22/forecast`;
    
        fetch(weather_url)
        .then(response => {
            return response.json();
        })
        .then(forecastData => {
            const periods = forecastData.properties.periods;
            const today = new Date().toISOString().split('T')[0];
            let forecastHTML = '<p class="weather_text_header"><strong>Today\'s Forecast</strong></p>';
            
            // Today's Forecast
            const todaysPeriods = periods.filter(period => period.startTime.split('T')[0] === today);

            // Build the HTML
            todaysPeriods.forEach(period => {
                let iconId = iconMap[period.shortForecast] || "default";

                console.log(period)
        
                forecastHTML += `
                    <p class="weather_text">
                        <strong>${period.name}:</strong><br>
                        <svg class="icons"><use xlink:href="#${iconId}"></use></svg><br> 
                        ${period.shortForecast}<br>
                        ${period.temperature}°${period.temperatureUnit}<br> 
                        <svg class="small_icons"><use xlink:href="#windy"></use></svg>${period.windSpeed} ${period.windDirection}
                    </p>
                    <hr>
                `;
            });

            document.getElementById('weather_updates').innerHTML = forecastHTML;
            document.getElementById('weather_updates').style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching forecast:', error);
            document.getElementById('weather_updates').innerHTML = 'Error fetching forecast.';
            document.getElementById('weather_updates').style.display = 'block';
        });
    }
    
    window.onload = () => fetchForecast(latitude, longitude);    
});

