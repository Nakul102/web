// Establish socket connection
const socket = io('https://data.gdscnsut.com');

// Update health stats with random data received from the socket
socket.on('random_number', function (data) {
    // Update health stats
    document.getElementById('heartRate').innerText = `${data % 100} BPM`;
    document.getElementById('steps').innerText = `${data * 10}`;
    document.getElementById('calories').innerText = `${data * 3}`;

    // Update bar chart data
    barChart.data.datasets[0].data = [
        data % 1000, 
        (data * 2) % 1000, 
        (data * 3) % 1000, 
        (data * 4) % 1000, 
        (data * 5) % 1000, 
        (data * 6) % 1000, 
        (data * 7) % 1000
    ];
    barChart.update();

    // Update donut chart data
    donutChart.data.datasets[0].data = [
        data % 10, // Sleep
        (data * 2) % 10, // Exercise
        (data * 3) % 10  // Work
    ];
    donutChart.update();
});

// Bar Chart
const barCtx = document.getElementById('barChart').getContext('2d');
const barChart = new Chart(barCtx, {
    type: 'bar',
    data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
            label: 'Steps',
            data: [5000, 6000, 7000, 8000, 9000, 4000, 10000],
            backgroundColor: 'rgba(54, 162, 235, 0.6)'
        }]
    }
});

// Donut Chart
const donutCtx = document.getElementById('donutChart').getContext('2d');
const donutChart = new Chart(donutCtx, {
    type: 'doughnut',
    data: {
        labels: ['Sleep', 'Exercise', 'Work'],
        datasets: [{
            data: [8, 2, 14],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    }
});

// Logout function
function logout() {
    localStorage.removeItem('loggedIn');
    window.location.href = 'index.html';
}

// Check login status
if (!localStorage.getItem('loggedIn')) {
    window.location.href = 'index.html';
}

// Slider functionality for real-time updates
const stepSlider = document.getElementById('stepSlider');
stepSlider.addEventListener('input', function () {
    const value = stepSlider.value;
    document.getElementById('steps').innerText = `${value}`;
    barChart.data.datasets[0].data[0] = value; // Update bar chart with the slider value
    barChart.update(); // Refresh the chart
});
