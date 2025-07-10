document.addEventListener('DOMContentLoaded', function() {
    console.log('Popup script loaded');

    const popup = document.getElementById('popup-overlay');
    
    if (popup) {
        console.log('Popup element found');
        
        // Show popup with 3-second delay and fade-in
        setTimeout(function() {
            popup.classList.remove('popup-hidden');
            // Add a small delay to ensure display change happens first
            setTimeout(function() {
                popup.classList.add('popup-show');
            }, 10);
        }, 3000); // 3 second delay
        
        // Close popup when X is clicked
        const closeBtn = document.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                popup.classList.remove('popup-show');
                // Wait for fade-out animation to complete before hiding
                setTimeout(function() {
                    popup.classList.add('popup-hidden');
                }, 300);
            });
        }
        
        // Close popup when clicking outside
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                popup.classList.remove('popup-show');
                setTimeout(function() {
                    popup.classList.add('popup-hidden');
                }, 300);
            }
        });
        
        // Close with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                popup.classList.remove('popup-show');
                setTimeout(function() {
                    popup.classList.add('popup-hidden');
                }, 300);
            }
        });
        
    } else {
        console.log('Popup element NOT found');
    }
});