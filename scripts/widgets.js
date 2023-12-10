document.addEventListener('DOMContentLoaded', function () {
    const ratingWidget = document.querySelector('rating-widget');
    const form = ratingWidget.querySelector('form');
    const ratingSys = document.querySelector('.rating_sys');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

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
            // Open a new window or tab with the response data
            const newWindow = window.open('', '_blank');
            if (newWindow) {
                // Create a preformatted text element to show the response
                const pre = newWindow.document.createElement('pre');
                pre.textContent = JSON.stringify(data, null, 2);
                newWindow.document.body.appendChild(pre);
            } else {
                // If the window couldn't be opened, log the data to the console instead
                console.log('Success:', data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
    
    function highlightStars(index) {
        stars.forEach((star, idx) => {
            star.style.color = idx <= index ? '--star-selected-color' : '--star-unselected-color';
        });
    }

    // Function to remove the highlight from all stars
    function removeHighlight() {
        stars.forEach((star) => {
            star.style.color = '--star-unselected-color';
        });
    }

    // Add mouseover event listeners to each label
    stars.forEach((star, index) => {
        star.addEventListener('mouseenter', () => {
            highlightStars(index);
        });

        star.addEventListener('mouseleave', removeHighlight);
    });
});


