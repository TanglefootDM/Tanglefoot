document.addEventListener('DOMContentLoaded', function() {
    console.log('Popup script loaded');

    const popup = document.getElementById('popup-overlay');
    
    if (popup) {
        console.log('Popup element found');
        
        // Check if popup was recently closed
        function shouldShowPopup() {
            const lastClosed = localStorage.getItem('popupLastClosed');
            if (!lastClosed) return true;
            
            const now = new Date().getTime();
            const timeSinceClose = now - parseInt(lastClosed);
            const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
            
            return timeSinceClose >= fiveMinutes;
        }
        
        // Save the time when popup is closed
        function saveCloseTime() {
            const now = new Date().getTime();
            localStorage.setItem('popupLastClosed', now.toString());
        }
        
        // Function to disable scrolling
        function disableScroll() {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.height = '100%';
        }
        
        // Function to enable scrolling
        function enableScroll() {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';
        }
        
        // Function to close popup
        function closePopup() {
            popup.classList.remove('popup-show');
            enableScroll(); // Re-enable scrolling when popup closes
            saveCloseTime(); // Save the time when popup was closed
            setTimeout(function() {
                popup.classList.add('popup-hidden');
                popup.style.display = 'none'; // Completely hide from layout
                popup.style.pointerEvents = 'none'; // Disable all pointer events
            }, 300);
        }
        
        // Only show popup if enough time has passed
        if (shouldShowPopup()) {
            // Show popup with 3-second delay and fade-in
            setTimeout(function() {
                popup.style.display = 'flex'; // Make sure it's visible in layout
                popup.style.pointerEvents = 'auto'; // Enable pointer events
                popup.classList.remove('popup-hidden');
                disableScroll(); // Disable scrolling when popup opens
                // Add a small delay to ensure display change happens first
                setTimeout(function() {
                    popup.classList.add('popup-show');
                }, 10);
            }, 3000); // 3 second delay
        } else {
            // If popup shouldn't show, make sure it's completely hidden
            popup.style.display = 'none';
            popup.style.pointerEvents = 'none';
        }
        
        // Close popup when X is clicked
        const closeBtn = document.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                closePopup();
            });
        }
        
        // Close popup when clicking outside the popup content
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                closePopup();
            }
        });
        
        // Close with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closePopup();
            }
        });
        
    } else {
        console.log('Popup element NOT found');
    }
});