console.log('Popup script loaded');

// Show popup when page loads
window.addEventListener('load', function() {
    console.log('Page loaded, trying to show popup');
    const popup = document.getElementById('popup-overlay');
    if (popup) {
        console.log('Popup element found');
        popup.classList.remove('popup-hidden');
    } else {
        console.log('Popup element NOT found');
    }
});

// Close popup when X is clicked
document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('popup-overlay').classList.add('popup-hidden');
});