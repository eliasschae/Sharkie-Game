/** 
 * Event listener for when the DOM is fully loaded.
 * Handles the display and closing of the imprint overlay. 
 */
document.addEventListener('DOMContentLoaded', function() {
    const imprintButton = document.getElementById('imprint-button');
    const imprintOverlay = document.getElementById('imprint-overlay');
    const closeImprintButton = document.getElementById('close-imprint-button');

    imprintButton.addEventListener('click', function() {
        imprintOverlay.classList.remove('hidden');
        imprintOverlay.style.display = 'flex';
    });

    closeImprintButton.addEventListener('click', function() {
        imprintOverlay.classList.add('hidden');
        imprintOverlay.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === imprintOverlay) {
            imprintOverlay.classList.add('hidden');
            imprintOverlay.style.display = 'none';
        }
    });
});