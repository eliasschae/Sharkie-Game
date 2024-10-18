/** 
 * Function to check the orientation of the window.
 * Displays an overlay when the device is in portrait mode and hides it in landscape mode.
 */
function checkOrientation() {
    if (window.innerHeight > window.innerWidth) {
        document.getElementById('orientation-overlay').style.display = 'flex';
    } else {
        document.getElementById('orientation-overlay').style.display = 'none';
    }
}

// Event listener to check orientation when the page loads
window.addEventListener('load', checkOrientation);

// Event listener to check orientation when the window is resized
window.addEventListener('resize', checkOrientation);

// Event listener to check orientation when the device's orientation changes
window.addEventListener('orientationchange', checkOrientation);