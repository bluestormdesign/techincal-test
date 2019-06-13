// Accordions
$('div.accordions h3.accordion').on('click', function () {
	let isOpen = $(this).hasClass('open');

	if (isOpen) {
		$(this).removeClass('open');
	} else {
		$(this).parent().find('h3.accordion').removeClass('open');
		$(this).addClass('open');
	}
});

$(function () {
	$('div.accordions h3.accordion').first().addClass('open');

	// Galleries
	$('.gallery-slider').not('.slick-initialized').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		dots: true,
		arrows: true,
		rows: 0,
		responsive: [
			{
				breakpoint: 767,
				settings: {
					arrows: false,
					slidesToShow: 1
				}
			}
		]
	});

	$('.gallery-grid, .gallery-slider').magnificPopup({
		delegate: 'a',
		type: 'image',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
		},
	});
});
