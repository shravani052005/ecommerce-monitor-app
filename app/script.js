// Dynamic data generation and animations
document.addEventListener('DOMContentLoaded', function() {
    // Display pod information
    document.getElementById('hostname').textContent = window.location.hostname;
    document.getElementById('pod-name').textContent = `Pod: ${window.location.hostname}`;

    // Generate dynamic sales chart
    generateSalesChart();
    
    // Start live data updates
    startLiveUpdates();
    
    // Add some interactive animations
    addHoverEffects();
});

function generateSalesChart() {
    const chart = document.getElementById('sales-chart');
    const hours = ['12AM', '3AM', '6AM', '9AM', '12PM', '3PM', '6PM', '9PM'];
    
    hours.forEach((hour, index) => {
        const barHeight = Math.floor(Math.random() * 80) + 20; // Random height between 20-100%
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${barHeight}%`;
        
        const label = document.createElement('div');
        label.className = 'bar-label';
        label.textContent = hour;
        
        bar.appendChild(label);
        chart.appendChild(bar);
        
        // Animate bars on load
        setTimeout(() => {
            bar.style.height = `${barHeight}%`;
        }, index * 100);
    });
}

function startLiveUpdates() {
    // Simulate live data updates
    setInterval(() => {
        updateMetric('total-sales', '$' + (Math.random() * 5000 + 10000).toFixed(0));
        updateMetric('active-users', Math.floor(Math.random() * 500 + 1000));
        updateMetric('total-orders', Math.floor(Math.random() * 50 + 50));
        updateMetric('response-time', (Math.random() * 50 + 120).toFixed(0) + 'ms');
    }, 5000);
}

function updateMetric(metricId, newValue) {
    const element = document.getElementById(metricId);
    element.style.transform = 'scale(1.1)';
    setTimeout(() => {
        element.textContent = newValue;
        element.style.transform = 'scale(1)';
    }, 150);
}

function addHoverEffects() {
    // Add pulse animation to metric cards on hover
    const cards = document.querySelectorAll('.metric-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = 'none';
        });
    });
}

// Simulate real-time activity updates
setInterval(() => {
    const activities = [
        'New customer registration',
        'Product added to cart',
        'Order shipped',
        'Payment processed',
        'Product review submitted',
        'Inventory updated',
        'Price change applied',
        'Customer support ticket created'
    ];
    
    const times = ['1 min ago', '3 min ago', '7 min ago', '15 min ago'];
    
    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    const randomTime = times[Math.floor(Math.random() * times.length)];
    
    // This would typically update via WebSocket in a real application
}, 10000);