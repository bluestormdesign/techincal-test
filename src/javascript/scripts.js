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
};

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

	$('.high-contrast').click(function(e) {
		e.preventDefault();
		$('body').addClass('high-contrast-body');
		Cookies.set('contrast', 'high-contrast');
	});

	$('.normal').click(function(e) {
		e.preventDefault();
		$('body').removeClass('high-contrast-body');
		Cookies.remove('contrast');
	});

	function changeFontSize(option, tag, value) {
		var element = $(tag);
		if (element) {
			var fontSize = element.css('font-size').slice(0, -2);
			if (option === 'increase') {
				var updatedFontSize = parseInt(fontSize) + value + 'px';
			} else if (option === 'decrease') {
				var updatedFontSize = parseInt(fontSize) - value + 'px';
			}
			element.css('font-size', updatedFontSize);
		}
	}

	function changeFontSizes(option, tags, size) {
		for (var i = 0; i < tags.length; i++) {
			changeFontSize(option, tags[i], size)
		}
	}

	function loadFontSize() {
		if(Cookies.get("text-size") === 'small') {
			changeFontSizes('decrease', ['body', 'h1', 'p', 'a.small', 'a.medium', 'a.large', '#overlay-menu li a', '#info li a', '#contact-details p', '#breadcrumb li'], 5);
		} else if(Cookies.get("text-size") === 'large') {
			changeFontSizes('increase', ['body', 'h1', 'p', 'a.small', 'a.medium', 'a.large', '#overlay-menu li a', '#info li a', '#contact-details p', '#breadcrumb li'], 5);
		}
	}
	loadFontSize();

	$('a.large').click( function(e) {
		e.preventDefault();
		if(Cookies.get("text-size") === 'large') {
			return;
		}
		changeFontSizes('increase', ['body', 'h1', 'p', 'a.small', 'a.medium', 'a.large', '#overlay-menu li a', '#info li a', '#contact-details p', '#breadcrumb li'], Cookies.get("text-size") === 'small' ? 10 : 5);

		if(Cookies.get("text-size") === undefined){
			Cookies.set('text-size', 'large');
		} else if(Cookies.get("text-size") === 'small') {
			Cookies.remove('text-size');
			Cookies.set('text-size', 'large');
		}
	});

	$('a.small').click( function(e) {
		e.preventDefault();
		if(Cookies.get("text-size") === 'small') {
			return;
		}
		changeFontSizes('decrease', ['body', 'h1', 'p', 'a.small', 'a.medium', 'a.large', '#overlay-menu li a', '#info li a', '#contact-details p', '#breadcrumb li'], Cookies.get("text-size") === 'large' ? 10 : 5);

		if(Cookies.get("text-size") === undefined){
			Cookies.set('text-size', 'small');
		} else if(Cookies.get("text-size") === 'large') {
			Cookies.remove('text-size');
			Cookies.set('text-size', 'small');
		}
	});

	$('a.medium').click( function(e) {
		e.preventDefault();
		Cookies.remove('text-size');
		location.reload();
	});

});
