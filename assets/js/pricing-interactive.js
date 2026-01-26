/**
 * Pricing Interactive - Card Selection & Dynamic Summary
 * Lifehackerzy.pl
 */

(function($) {
	'use strict';

	// Course data mapping
	const courseData = {
		hp: {
			name: 'Hakowanie Produktywności',
			price: '1 497',
			marketValue: '4 000',
			url: 'https://app.easycart.pl/checkout/siadlak/hakowanieproduktywnosci'
		},
		sg: {
			name: 'Silna Głowa',
			price: '897',
			marketValue: '4 000',
			url: 'https://app.easycart.pl/checkout/siadlak/silnaglowa'
		},
		uz: {
			name: 'Uważne Życie',
			price: '777',
			marketValue: '2 000',
			url: '#' // Placeholder - update when available
		}
	};

	// Format number with space as thousand separator
	function formatPrice(price) {
		return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
	}

	// Initialize pricing interactive functionality
	function initPricingInteractive() {
		const $cards = $('.price-card-selectable');
		const $summaryPanel = $('#pricing-summary');
		const $summaryButton = $('#summary-cta-button');
		const $summaryPrice = $('#summary-final-price');
		const $summaryValue = $('#summary-course-value');

		// Handle card click
		$cards.on('click', function(e) {
			// Prevent default if clicking on a link inside card
			if (!$(e.target).is('a') && !$(e.target).closest('a').length) {
				e.preventDefault();

				const $card = $(this);
				const courseId = $card.data('course');
				const radioInput = $card.find('input[type="radio"]');

				// Remove selected class from all cards
				$cards.removeClass('selected');

				// Add selected class to clicked card
				$card.addClass('selected');

				// Check the radio button
				radioInput.prop('checked', true);

				// Update summary panel
				updateSummaryPanel(courseId);

				// Show summary panel with animation
				if ($summaryPanel.is(':hidden')) {
					$summaryPanel.slideDown(400);
				}
			}
		});

		// Handle radio button label click
		$('.price-card-radio label').on('click', function(e) {
			e.stopPropagation();
			$(this).closest('.price-card-selectable').trigger('click');
		});

		// Update summary panel with course data
		function updateSummaryPanel(courseId) {
			const course = courseData[courseId];

			if (!course) {
				console.error('Course data not found for:', courseId);
				return;
			}

			// Update values with formatted numbers
			$summaryValue.text(formatPrice(course.marketValue) + ' PLN');
			$summaryPrice.text(formatPrice(course.price) + ' PLN');

			// Update CTA button URL
			$summaryButton.attr('href', course.url);
		}
	}

	// Initialize on document ready
	$(document).ready(function() {
		initPricingInteractive();
	});

})(jQuery);
