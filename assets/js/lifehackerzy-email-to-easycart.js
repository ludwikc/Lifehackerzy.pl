// Email handler integrated into Lifehackerzy Universal Tracking System
// See: assets/js/lifehackerzy-tracking.js for the new implementation

$(document).ready(function() {
    // This handler is now disabled - functionality moved to tracking system
    // The new system includes proper event tracking before redirect
    
    /* Original functionality preserved for reference:
    $('#submitButton').on('click', function() {
        var email = encodeURIComponent($('#emailInput').val());
        var baseUrl = 'https://app.easycart.pl/checkout/siadlak/lifehackerzy';
        var url = baseUrl + '?email=' + email;
        window.location.href = url;
    });
    */
});
