const ieVersion = (function () {
	if (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null) {
		return parseFloat(RegExp.$1);
	}
	
	return false;
})();

// CSRF fix
const csrfInputName = $('meta[name="csrfTokenName"]').attr('content'),
	csrfInputValue = $('meta[name="csrfTokenValue"]').attr('content');

window.csrfTokenData = function () {
	return {
		[csrfInputName]: csrfInputValue
	};
}

$(function () {
	$('input[name="' + csrfInputName + '"]').val(csrfInputValue);

	// IE Notice
	if (ieVersion !== false && ieVersion <= 10) {
		$('div#ienotice').show();
	}

	// Scroll to first form error on page load
	if ($('ul.errors').length) {
		$('html, body').animate({
			scrollTop: $('ul.errors').first().offset().top + 'px'
		}, 'fast');
	}

	// Homepage
	let $banner = $('#banner').not('.slick-initialized').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		arrows: true,
		rows: 0
	});

	// Accessibility panel

	var className = "high-contrast-body";
	if (Cookies.get("contrast") === undefined) {
		$('body').removeClass(className);
	} else {
		$('body').addClass(className);
	}

	$('.high-contrast').click(function() {
		$('body').addClass('high-contrast-body');
		Cookies.set('contrast', 'high-contrast');
	});

	$('.normal').click(function() {
		$('body').removeClass('high-contrast-body');
		Cookies.remove('contrast');
	});

});
