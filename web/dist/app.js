webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(7);
__webpack_require__(14);
module.exports = __webpack_require__(15);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery, __webpack_provided_window_dot_$) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scripts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lazyloading__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lazyloading___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__lazyloading__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__matrix__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__matrix___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__matrix__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__overlay__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__overlay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__overlay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tracking__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tracking___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__tracking__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__alert__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__alert___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__alert__);
__webpack_provided_window_dot_$ = __webpack_provided_window_dot_jQuery = __webpack_require__(0);

__webpack_require__(1);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(4);

window.Cookies = __webpack_require__(5);












/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0), __webpack_require__(0)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ieVersion = function () {
	if (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null) {
		return parseFloat(RegExp.$1);
	}

	return false;
}();

// CSRF fix
var csrfInputName = $('meta[name="csrfTokenName"]').attr('content'),
    csrfInputValue = $('meta[name="csrfTokenValue"]').attr('content');

window.csrfTokenData = function () {
	return _defineProperty({}, csrfInputName, csrfInputValue);
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
	var $banner = $('#banner').not('.slick-initialized').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		arrows: true,
		rows: 0
	});
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var $loadContainer = $('div#ajax-container'),
    $lastChild = $('div#ajax-container .list-card-item').last(),
    section = $loadContainer.data('section'),
    offset = parseInt($loadContainer.data('limit'), 10),
    limit = parseInt($loadContainer.data('limit'), 10),
    order = $loadContainer.data('order'),
    sort = $loadContainer.data('sort'),
    year = $loadContainer.data('year'),
    month = $loadContainer.data('month'),
    loading = false,
    shouldLoad = $loadContainer.length > 0;

// isOnScreen - http://stackoverflow.com/a/23222523
$.fn.isOnScreen = function () {
    var win = $(window),
        bounds = this.offset(),
        viewport = {
        top: win.scrollTop(),
        left: win.scrollLeft()
    };

    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return !(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom);
};

$.fn.isEmpty = function () {
    return !this.children().length && !this.text().match(/\S/);
};

function getUrl() {
    var url = '/ajax/' + section + '/' + offset + '/' + limit + '/' + order + '/' + sort + '/';

    if (year && month) {
        url += '/' + year + '/' + month;
    }

    return url;
}

function load() {
    if (loading) {
        return false;
    }

    loading = true;

    $.post(getUrl(), csrfTokenData(), function (data) {
        data = $.trim(data);

        if (!$(data).isEmpty()) {
            // Add new children
            $loadContainer.append(data);

            // Reset last child
            $lastChild = $('div#ajax-container').children().last();

            // Update the offset
            offset += limit;
        } else {
            // Set to not try load anymore
            shouldLoad = false;
        }

        // Reset loading state
        loading = false;
    });
}

$(function () {
    $(window).on('scroll', function () {
        if (shouldLoad && !loading && $lastChild.length > 0 && $lastChild.isOnScreen()) {
            load();
        }
    });
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {// Accordions
$('div.accordions h3.accordion').on('click', function () {
	var isOpen = $(this).hasClass('open');

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
		responsive: [{
			breakpoint: 767,
			settings: {
				arrows: false,
				slidesToShow: 1
			}
		}]
	});

	$('.gallery-grid, .gallery-slider').magnificPopup({
		delegate: 'a',
		type: 'image',
		gallery: {
			enabled: true,
			navigateByImgClick: true
		}
	});

	$('.gallery-slider-top').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.gallery-slider-bottom'
	});
	$('.gallery-slider-bottom').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor: '.gallery-slider-top',
		dots: true,
		centerMode: true,
		focusOnSelect: true
	});
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {// Open/close overlay
var $body = $(document.body),
    $overlayBar = $('div#overlay-bar'),
    $overlayMenu = $('div#overlay-menu'),
    $mobileBar = $('nav#overlay-bar'),
    lastScrollTop = 0;

$('.open-overlay').on('click', function (e) {
	e.preventDefault();
	$body.addClass('overlay-open');

	$body.keyup(function (event) {
		if (event.keyCode == 27) {
			$('.close-overlay').trigger('click');
		}
	});

	$overlayMenu.fadeIn();
});

$('.close-overlay').on('click', function (e) {
	e.preventDefault();

	$body.off('keyup');
	$body.removeClass('overlay-open');
	$overlayMenu.fadeOut();
});

// Expand/contract inside overlay
$('div#overlay-menu nav > ul > li > a span').on('click', function (e) {
	e.preventDefault();

	// Toggle sub menu visibility.
	$(this).parents('li').first().children('ul').toggle();

	// Toggle icon for dropdown.
	$(this).find('[data-fa-processed]').toggleClass('fa-minus').toggleClass('fa-plus');
});

$(window).on('scroll', function (e) {
	var st = $(this).scrollTop();

	if (st < 50) {
		$overlayBar.removeClass('offscreen');
	} else if (st > lastScrollTop) {
		$overlayBar.addClass('offscreen');
	} else {
		$overlayBar.removeClass('offscreen');
	}

	lastScrollTop = st;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {
var isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    phoneRegex = /((0|\+44\s?\(0\)|\+44)\s?\d+\s?\d+\s?\d+)/; // https://regex101.com/r/Xd6lZX

window.replacePhoneNumbersWithLinks = function () {
	$('body *').contents().filter(function () {
		return this.nodeType === Node.TEXT_NODE;
	}).each(function () {
		$(this).replaceWith(this.textContent.replace(phoneRegex, '<a href="tel:$&">$&</a>'));
	});
};

window.recordEvent = function (category, action, label) {
	if (typeof window['ga'] === 'undefined') {
		console.error('Attempting to track event with GA not installed, please check before go-live!');
		console.error('Event:', category + ', ' + action + ', ' + label);

		return;
	}

	ga('send', 'event', category, action, label);
};

// Link tracking
$.expr[':'].external = function (obj) {
	if (obj.tagName.toLowerCase() !== 'a') {
		return false;
	}

	return obj.href && !obj.href.match(/^mailto:/) && !obj.href.match(/^javascript:/) && obj.hostname.replace(/^www\./i, '') !== document.location.hostname.replace(/^www\./i, '');
};

$.expr[':'].email = function (obj) {
	if (obj.tagName.toLowerCase() !== 'a') {
		return false;
	}

	return obj.href && obj.href.match(/^mailto:/);
};

$.expr[':'].tel = function (obj) {
	if (obj.tagName.toLowerCase() !== 'a') {
		return false;
	}

	return obj.href && obj.href.match(/^tel:/);
};

$('a:external').on('click', function () {
	recordEvent('External Link', 'Click', this.hostname.replace(/http(s)?:\/\//i));
});

$('a:email').on('click', function () {
	recordEvent('Mailto', 'Click', $(this).attr('href').substring(7));
});

$('a:tel').on('click', function () {
	recordEvent('Phone Number', 'Click', $(this).attr('href').substring(4));
});

$(function () {
	$('a:external, a:email').attr({
		target: '_blank',
		rel: 'external'
	});

	// Convert phone numbers
	if (isMobileDevice) {
		replacePhoneNumbersWithLinks();
	}
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var $alert = $('div#site-alert'),
    $alertClose = $alert.find('#site-alert-close');

$alertClose.on('click', function (e) {
	e.preventDefault();
	Cookies.set('alert', $alert.data('expiry'));
	$alert.slideUp();
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 14 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 15 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
],[6]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvamF2YXNjcmlwdC9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2phdmFzY3JpcHQvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvamF2YXNjcmlwdC9sYXp5bG9hZGluZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvamF2YXNjcmlwdC9tYXRyaXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2phdmFzY3JpcHQvb3ZlcmxheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvamF2YXNjcmlwdC90cmFja2luZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvamF2YXNjcmlwdC9hbGVydC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGUvYXBwLnNjc3M/NDQwNiIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGUvZm9udGF3ZXNvbWUuc2Nzcz9hYzgzIl0sIm5hbWVzIjpbIndpbmRvdyIsInJlcXVpcmUiLCJDb29raWVzIiwiaWVWZXJzaW9uIiwiUmVnRXhwIiwiZXhlYyIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsInBhcnNlRmxvYXQiLCIkMSIsImNzcmZJbnB1dE5hbWUiLCIkIiwiYXR0ciIsImNzcmZJbnB1dFZhbHVlIiwiY3NyZlRva2VuRGF0YSIsInZhbCIsInNob3ciLCJsZW5ndGgiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwiZmlyc3QiLCJvZmZzZXQiLCJ0b3AiLCIkYmFubmVyIiwibm90Iiwic2xpY2siLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsImRvdHMiLCJhcnJvd3MiLCJyb3dzIiwiJGxvYWRDb250YWluZXIiLCIkbGFzdENoaWxkIiwibGFzdCIsInNlY3Rpb24iLCJkYXRhIiwicGFyc2VJbnQiLCJsaW1pdCIsIm9yZGVyIiwic29ydCIsInllYXIiLCJtb250aCIsImxvYWRpbmciLCJzaG91bGRMb2FkIiwiZm4iLCJpc09uU2NyZWVuIiwid2luIiwiYm91bmRzIiwidmlld3BvcnQiLCJsZWZ0Iiwic2Nyb2xsTGVmdCIsInJpZ2h0Iiwid2lkdGgiLCJib3R0b20iLCJoZWlnaHQiLCJvdXRlcldpZHRoIiwib3V0ZXJIZWlnaHQiLCJpc0VtcHR5IiwiY2hpbGRyZW4iLCJ0ZXh0IiwibWF0Y2giLCJnZXRVcmwiLCJ1cmwiLCJsb2FkIiwicG9zdCIsInRyaW0iLCJhcHBlbmQiLCJvbiIsImlzT3BlbiIsImhhc0NsYXNzIiwicmVtb3ZlQ2xhc3MiLCJwYXJlbnQiLCJmaW5kIiwiYWRkQ2xhc3MiLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIiwibWFnbmlmaWNQb3B1cCIsImRlbGVnYXRlIiwidHlwZSIsImdhbGxlcnkiLCJlbmFibGVkIiwibmF2aWdhdGVCeUltZ0NsaWNrIiwiZmFkZSIsImFzTmF2Rm9yIiwiY2VudGVyTW9kZSIsImZvY3VzT25TZWxlY3QiLCIkYm9keSIsImRvY3VtZW50IiwiYm9keSIsIiRvdmVybGF5QmFyIiwiJG92ZXJsYXlNZW51IiwiJG1vYmlsZUJhciIsImxhc3RTY3JvbGxUb3AiLCJlIiwicHJldmVudERlZmF1bHQiLCJrZXl1cCIsImV2ZW50Iiwia2V5Q29kZSIsInRyaWdnZXIiLCJmYWRlSW4iLCJvZmYiLCJmYWRlT3V0IiwicGFyZW50cyIsInRvZ2dsZSIsInRvZ2dsZUNsYXNzIiwic3QiLCJpc01vYmlsZURldmljZSIsInRlc3QiLCJwaG9uZVJlZ2V4IiwicmVwbGFjZVBob25lTnVtYmVyc1dpdGhMaW5rcyIsImNvbnRlbnRzIiwiZmlsdGVyIiwibm9kZVR5cGUiLCJOb2RlIiwiVEVYVF9OT0RFIiwiZWFjaCIsInJlcGxhY2VXaXRoIiwidGV4dENvbnRlbnQiLCJyZXBsYWNlIiwicmVjb3JkRXZlbnQiLCJjYXRlZ29yeSIsImFjdGlvbiIsImxhYmVsIiwiY29uc29sZSIsImVycm9yIiwiZ2EiLCJleHByIiwiZXh0ZXJuYWwiLCJvYmoiLCJ0YWdOYW1lIiwidG9Mb3dlckNhc2UiLCJocmVmIiwiaG9zdG5hbWUiLCJsb2NhdGlvbiIsImVtYWlsIiwidGVsIiwic3Vic3RyaW5n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RSxZQUFZMUUsRUFBWixDQUFlLE9BQWYsRUFBd0IsVUFBVTJCLENBQVYsRUFBYTtBQUNwQ0EsR0FBRUMsY0FBRjtBQUNBN0YsU0FBUTRJLEdBQVIsQ0FBWSxPQUFaLEVBQXFCRixPQUFPekcsSUFBUCxDQUFZLFFBQVosQ0FBckI7QUFDQXlHLFFBQU9HLE9BQVA7QUFDQSxDQUpELEU7Ozs7Ozs7QUNIQSx5Qzs7Ozs7O0FDQUEseUMiLCJmaWxlIjoiL2Rpc3QvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsid2luZG93LiQgPSB3aW5kb3cualF1ZXJ5ID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5cbnJlcXVpcmUoJ2Jvb3RzdHJhcC1zYXNzJyk7XG5cbnJlcXVpcmUoJ3NsaWNrLWNhcm91c2VsJyk7XG5cbnJlcXVpcmUoJ2pxdWVyeS1tYXRjaC1oZWlnaHQnKTtcblxucmVxdWlyZSgnbWFnbmlmaWMtcG9wdXAnKTtcblxud2luZG93LkNvb2tpZXMgPSByZXF1aXJlKCdqcy1jb29raWUnKTtcblxuaW1wb3J0IFNjcmlwdHMgZnJvbSAnLi9zY3JpcHRzJztcblxuaW1wb3J0IExhenlMb2FkaW5nIGZyb20gJy4vbGF6eWxvYWRpbmcnO1xuXG5pbXBvcnQgTWF0cml4IGZyb20gJy4vbWF0cml4JztcblxuaW1wb3J0IE92ZXJsYXkgZnJvbSAnLi9vdmVybGF5JztcblxuaW1wb3J0IFRyYWNraW5nIGZyb20gJy4vdHJhY2tpbmcnO1xuXG5pbXBvcnQgQWxlcnQgZnJvbSAnLi9hbGVydCc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvamF2YXNjcmlwdC9hcHAuanMiLCJjb25zdCBpZVZlcnNpb24gPSAoZnVuY3Rpb24gKCkge1xuXHRpZiAobmV3IFJlZ0V4cChcIk1TSUUgKFswLTldezEsfVtcXC4wLTldezAsfSlcIikuZXhlYyhuYXZpZ2F0b3IudXNlckFnZW50KSAhPSBudWxsKSB7XG5cdFx0cmV0dXJuIHBhcnNlRmxvYXQoUmVnRXhwLiQxKTtcblx0fVxuXHRcblx0cmV0dXJuIGZhbHNlO1xufSkoKTtcblxuLy8gQ1NSRiBmaXhcbmNvbnN0IGNzcmZJbnB1dE5hbWUgPSAkKCdtZXRhW25hbWU9XCJjc3JmVG9rZW5OYW1lXCJdJykuYXR0cignY29udGVudCcpLFxuXHRjc3JmSW5wdXRWYWx1ZSA9ICQoJ21ldGFbbmFtZT1cImNzcmZUb2tlblZhbHVlXCJdJykuYXR0cignY29udGVudCcpO1xuXG53aW5kb3cuY3NyZlRva2VuRGF0YSA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHtcblx0XHRbY3NyZklucHV0TmFtZV06IGNzcmZJbnB1dFZhbHVlXG5cdH07XG59XG5cbiQoZnVuY3Rpb24gKCkge1xuXHQkKCdpbnB1dFtuYW1lPVwiJyArIGNzcmZJbnB1dE5hbWUgKyAnXCJdJykudmFsKGNzcmZJbnB1dFZhbHVlKTtcblxuXHQvLyBJRSBOb3RpY2Vcblx0aWYgKGllVmVyc2lvbiAhPT0gZmFsc2UgJiYgaWVWZXJzaW9uIDw9IDEwKSB7XG5cdFx0JCgnZGl2I2llbm90aWNlJykuc2hvdygpO1xuXHR9XG5cblx0Ly8gU2Nyb2xsIHRvIGZpcnN0IGZvcm0gZXJyb3Igb24gcGFnZSBsb2FkXG5cdGlmICgkKCd1bC5lcnJvcnMnKS5sZW5ndGgpIHtcblx0XHQkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG5cdFx0XHRzY3JvbGxUb3A6ICQoJ3VsLmVycm9ycycpLmZpcnN0KCkub2Zmc2V0KCkudG9wICsgJ3B4J1xuXHRcdH0sICdmYXN0Jyk7XG5cdH1cblxuXHQvLyBIb21lcGFnZVxuXHRsZXQgJGJhbm5lciA9ICQoJyNiYW5uZXInKS5ub3QoJy5zbGljay1pbml0aWFsaXplZCcpLnNsaWNrKHtcblx0XHRzbGlkZXNUb1Nob3c6IDEsXG5cdFx0c2xpZGVzVG9TY3JvbGw6IDEsXG5cdFx0ZG90czogdHJ1ZSxcblx0XHRhcnJvd3M6IHRydWUsXG5cdFx0cm93czogMFxuXHR9KTtcblxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvamF2YXNjcmlwdC9zY3JpcHRzLmpzIiwibGV0ICRsb2FkQ29udGFpbmVyID0gJCgnZGl2I2FqYXgtY29udGFpbmVyJyksXG4gICAgJGxhc3RDaGlsZCA9ICQoJ2RpdiNhamF4LWNvbnRhaW5lciAubGlzdC1jYXJkLWl0ZW0nKS5sYXN0KCksXG4gICAgc2VjdGlvbiA9ICRsb2FkQ29udGFpbmVyLmRhdGEoJ3NlY3Rpb24nKSxcbiAgICBvZmZzZXQgPSBwYXJzZUludCgkbG9hZENvbnRhaW5lci5kYXRhKCdsaW1pdCcpLCAxMCksXG4gICAgbGltaXQgPSBwYXJzZUludCgkbG9hZENvbnRhaW5lci5kYXRhKCdsaW1pdCcpLCAxMCksXG4gICAgb3JkZXIgPSAkbG9hZENvbnRhaW5lci5kYXRhKCdvcmRlcicpLFxuICAgIHNvcnQgPSAkbG9hZENvbnRhaW5lci5kYXRhKCdzb3J0JyksXG4gICAgeWVhciA9ICRsb2FkQ29udGFpbmVyLmRhdGEoJ3llYXInKSxcbiAgICBtb250aCA9ICRsb2FkQ29udGFpbmVyLmRhdGEoJ21vbnRoJyksXG4gICAgbG9hZGluZyA9IGZhbHNlLFxuICAgIHNob3VsZExvYWQgPSAkbG9hZENvbnRhaW5lci5sZW5ndGggPiAwO1xuXG4vLyBpc09uU2NyZWVuIC0gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjMyMjI1MjNcbiQuZm4uaXNPblNjcmVlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgd2luID0gJCh3aW5kb3cpLFxuICAgICAgICBib3VuZHMgPSB0aGlzLm9mZnNldCgpLFxuICAgICAgICB2aWV3cG9ydCA9IHtcbiAgICAgICAgICAgIHRvcDogd2luLnNjcm9sbFRvcCgpLFxuICAgICAgICAgICAgbGVmdDogd2luLnNjcm9sbExlZnQoKVxuICAgICAgICB9O1xuXG4gICAgdmlld3BvcnQucmlnaHQgPSB2aWV3cG9ydC5sZWZ0ICsgd2luLndpZHRoKCk7XG4gICAgdmlld3BvcnQuYm90dG9tID0gdmlld3BvcnQudG9wICsgd2luLmhlaWdodCgpO1xuXG4gICAgYm91bmRzLnJpZ2h0ID0gYm91bmRzLmxlZnQgKyB0aGlzLm91dGVyV2lkdGgoKTtcbiAgICBib3VuZHMuYm90dG9tID0gYm91bmRzLnRvcCArIHRoaXMub3V0ZXJIZWlnaHQoKTtcblxuICAgIHJldHVybiAoISh2aWV3cG9ydC5yaWdodCA8IGJvdW5kcy5sZWZ0IHx8IHZpZXdwb3J0LmxlZnQgPiBib3VuZHMucmlnaHQgfHwgdmlld3BvcnQuYm90dG9tIDwgYm91bmRzLnRvcCB8fCB2aWV3cG9ydC50b3AgPiBib3VuZHMuYm90dG9tKSk7XG59XG5cbiQuZm4uaXNFbXB0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gIXRoaXMuY2hpbGRyZW4oKS5sZW5ndGggJiYgIXRoaXMudGV4dCgpLm1hdGNoKC9cXFMvKTtcbn1cblxuZnVuY3Rpb24gZ2V0VXJsKCkge1xuICAgIGxldCB1cmwgPSAnL2FqYXgvJyArIHNlY3Rpb24gKyAnLycgKyBvZmZzZXQgKyAnLycgKyBsaW1pdCArICcvJyArIG9yZGVyICsgJy8nICsgc29ydCArICcvJztcblxuICAgIGlmICh5ZWFyICYmIG1vbnRoKSB7XG4gICAgICAgIHVybCArPSAnLycgKyB5ZWFyICsgJy8nICsgbW9udGg7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVybDtcbn1cblxuZnVuY3Rpb24gbG9hZCgpIHtcbiAgICBpZiAobG9hZGluZykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbG9hZGluZyA9IHRydWU7XG5cbiAgICAkLnBvc3QoZ2V0VXJsKCksIGNzcmZUb2tlbkRhdGEoKSwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgZGF0YSA9ICQudHJpbShkYXRhKTtcblxuICAgICAgICBpZiAoISQoZGF0YSkuaXNFbXB0eSgpKSB7XG4gICAgICAgICAgICAvLyBBZGQgbmV3IGNoaWxkcmVuXG4gICAgICAgICAgICAkbG9hZENvbnRhaW5lci5hcHBlbmQoZGF0YSk7XG5cbiAgICAgICAgICAgIC8vIFJlc2V0IGxhc3QgY2hpbGRcbiAgICAgICAgICAgICRsYXN0Q2hpbGQgPSAkKCdkaXYjYWpheC1jb250YWluZXInKS5jaGlsZHJlbigpLmxhc3QoKTtcblxuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBvZmZzZXRcbiAgICAgICAgICAgIG9mZnNldCArPSBsaW1pdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFNldCB0byBub3QgdHJ5IGxvYWQgYW55bW9yZVxuICAgICAgICAgICAgc2hvdWxkTG9hZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVzZXQgbG9hZGluZyBzdGF0ZVxuICAgICAgICBsb2FkaW5nID0gZmFsc2U7XG4gICAgfSk7XG59XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoc2hvdWxkTG9hZCAmJiAhbG9hZGluZyAmJiAkbGFzdENoaWxkLmxlbmd0aCA+IDAgJiYgJGxhc3RDaGlsZC5pc09uU2NyZWVuKCkpIHtcbiAgICAgICAgICAgIGxvYWQoKTtcbiAgICAgICAgfVxuICAgIH0pXG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qYXZhc2NyaXB0L2xhenlsb2FkaW5nLmpzIiwiLy8gQWNjb3JkaW9uc1xuJCgnZGl2LmFjY29yZGlvbnMgaDMuYWNjb3JkaW9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRsZXQgaXNPcGVuID0gJCh0aGlzKS5oYXNDbGFzcygnb3BlbicpO1xuXG5cdGlmIChpc09wZW4pIHtcblx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG5cdH0gZWxzZSB7XG5cdFx0JCh0aGlzKS5wYXJlbnQoKS5maW5kKCdoMy5hY2NvcmRpb24nKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuXHRcdCQodGhpcykuYWRkQ2xhc3MoJ29wZW4nKTtcblx0fVxufSk7XG5cbiQoZnVuY3Rpb24gKCkge1xuXHQkKCdkaXYuYWNjb3JkaW9ucyBoMy5hY2NvcmRpb24nKS5maXJzdCgpLmFkZENsYXNzKCdvcGVuJyk7XG5cblx0Ly8gR2FsbGVyaWVzXG5cdCQoJy5nYWxsZXJ5LXNsaWRlcicpLm5vdCgnLnNsaWNrLWluaXRpYWxpemVkJykuc2xpY2soe1xuXHRcdHNsaWRlc1RvU2hvdzogNCxcblx0XHRzbGlkZXNUb1Njcm9sbDogMSxcblx0XHRkb3RzOiB0cnVlLFxuXHRcdGFycm93czogdHJ1ZSxcblx0XHRyb3dzOiAwLFxuXHRcdHJlc3BvbnNpdmU6IFtcblx0XHRcdHtcblx0XHRcdFx0YnJlYWtwb2ludDogNzY3LFxuXHRcdFx0XHRzZXR0aW5nczoge1xuXHRcdFx0XHRcdGFycm93czogZmFsc2UsXG5cdFx0XHRcdFx0c2xpZGVzVG9TaG93OiAxXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRdXG5cdH0pO1xuXG5cdCQoJy5nYWxsZXJ5LWdyaWQsIC5nYWxsZXJ5LXNsaWRlcicpLm1hZ25pZmljUG9wdXAoe1xuXHRcdGRlbGVnYXRlOiAnYScsXG5cdFx0dHlwZTogJ2ltYWdlJyxcblx0XHRnYWxsZXJ5OiB7XG5cdFx0XHRlbmFibGVkOiB0cnVlLFxuXHRcdFx0bmF2aWdhdGVCeUltZ0NsaWNrOiB0cnVlLFxuXHRcdH0sXG5cdH0pO1xuXG5cdCQoJy5nYWxsZXJ5LXNsaWRlci10b3AnKS5zbGljayh7XG5cdFx0c2xpZGVzVG9TaG93OiAxLFxuXHRcdHNsaWRlc1RvU2Nyb2xsOiAxLFxuXHRcdGFycm93czogZmFsc2UsXG5cdFx0ZmFkZTogdHJ1ZSxcblx0XHRhc05hdkZvcjogJy5nYWxsZXJ5LXNsaWRlci1ib3R0b20nXG5cdH0pO1xuXHQkKCcuZ2FsbGVyeS1zbGlkZXItYm90dG9tJykuc2xpY2soe1xuXHRcdHNsaWRlc1RvU2hvdzogMyxcblx0XHRzbGlkZXNUb1Njcm9sbDogMSxcblx0XHRhc05hdkZvcjogJy5nYWxsZXJ5LXNsaWRlci10b3AnLFxuXHRcdGRvdHM6IHRydWUsXG5cdFx0Y2VudGVyTW9kZTogdHJ1ZSxcblx0XHRmb2N1c09uU2VsZWN0OiB0cnVlXG5cdH0pO1xuXG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qYXZhc2NyaXB0L21hdHJpeC5qcyIsIi8vIE9wZW4vY2xvc2Ugb3ZlcmxheVxubGV0ICRib2R5ID0gJChkb2N1bWVudC5ib2R5KSxcblx0JG92ZXJsYXlCYXIgPSAkKCdkaXYjb3ZlcmxheS1iYXInKSxcblx0JG92ZXJsYXlNZW51ID0gJCgnZGl2I292ZXJsYXktbWVudScpLFxuXHQkbW9iaWxlQmFyID0gJCgnbmF2I292ZXJsYXktYmFyJyksXG5cdGxhc3RTY3JvbGxUb3AgPSAwO1xuXG4kKCcub3Blbi1vdmVybGF5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHQkYm9keS5hZGRDbGFzcygnb3ZlcmxheS1vcGVuJyk7XG5cblx0JGJvZHkua2V5dXAoZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0aWYgKGV2ZW50LmtleUNvZGUgPT0gMjcpIHtcblx0XHRcdCQoJy5jbG9zZS1vdmVybGF5JykudHJpZ2dlcignY2xpY2snKVxuXHRcdH1cblx0fSk7XG5cblx0JG92ZXJsYXlNZW51LmZhZGVJbigpO1xufSk7XG5cbiQoJy5jbG9zZS1vdmVybGF5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdCRib2R5Lm9mZigna2V5dXAnKVxuXHQkYm9keS5yZW1vdmVDbGFzcygnb3ZlcmxheS1vcGVuJyk7XG5cdCRvdmVybGF5TWVudS5mYWRlT3V0KCk7XG59KTtcblxuLy8gRXhwYW5kL2NvbnRyYWN0IGluc2lkZSBvdmVybGF5XG4kKCdkaXYjb3ZlcmxheS1tZW51IG5hdiA+IHVsID4gbGkgPiBhIHNwYW4nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0Ly8gVG9nZ2xlIHN1YiBtZW51IHZpc2liaWxpdHkuXG5cdCQodGhpcykucGFyZW50cygnbGknKVxuXHRcdC5maXJzdCgpXG5cdFx0LmNoaWxkcmVuKCd1bCcpXG5cdFx0LnRvZ2dsZSgpO1xuXG5cdC8vIFRvZ2dsZSBpY29uIGZvciBkcm9wZG93bi5cbiAgICAkKHRoaXMpLmZpbmQoJ1tkYXRhLWZhLXByb2Nlc3NlZF0nKVxuXHRcdC50b2dnbGVDbGFzcygnZmEtbWludXMnKVxuICAgICAgICAudG9nZ2xlQ2xhc3MoJ2ZhLXBsdXMnKTtcbn0pO1xuXG4kKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uIChlKSB7XG5cdGxldCBzdCA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XG5cblx0aWYgKHN0IDwgNTApIHtcblx0XHQkb3ZlcmxheUJhci5yZW1vdmVDbGFzcygnb2Zmc2NyZWVuJyk7XG5cdH0gZWxzZSBpZiAoc3QgPiBsYXN0U2Nyb2xsVG9wKSB7XG5cdFx0JG92ZXJsYXlCYXIuYWRkQ2xhc3MoJ29mZnNjcmVlbicpO1xuXHR9IGVsc2Uge1xuXHRcdCRvdmVybGF5QmFyLnJlbW92ZUNsYXNzKCdvZmZzY3JlZW4nKTtcblx0fVxuXG5cdGxhc3RTY3JvbGxUb3AgPSBzdDtcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2phdmFzY3JpcHQvb3ZlcmxheS5qcyIsIlxubGV0IGlzTW9iaWxlRGV2aWNlID0gL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpLFxuXHRwaG9uZVJlZ2V4ID0gLygoMHxcXCs0NFxccz9cXCgwXFwpfFxcKzQ0KVxccz9cXGQrXFxzP1xcZCtcXHM/XFxkKykvOyAvLyBodHRwczovL3JlZ2V4MTAxLmNvbS9yL1hkNmxaWFxuXG53aW5kb3cucmVwbGFjZVBob25lTnVtYmVyc1dpdGhMaW5rcyA9IGZ1bmN0aW9uICgpIHtcblx0JCgnYm9keSAqJykuY29udGVudHMoKS5maWx0ZXIoZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERTsgfSkuZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0JCh0aGlzKS5yZXBsYWNlV2l0aCh0aGlzLnRleHRDb250ZW50LnJlcGxhY2UocGhvbmVSZWdleCwgJzxhIGhyZWY9XCJ0ZWw6JCZcIj4kJjwvYT4nKSk7XG5cdH0pO1xufVxuXG53aW5kb3cucmVjb3JkRXZlbnQgPSBmdW5jdGlvbiAoY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwpIHtcblx0aWYgKHR5cGVvZiB3aW5kb3dbJ2dhJ10gPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0Y29uc29sZS5lcnJvcignQXR0ZW1wdGluZyB0byB0cmFjayBldmVudCB3aXRoIEdBIG5vdCBpbnN0YWxsZWQsIHBsZWFzZSBjaGVjayBiZWZvcmUgZ28tbGl2ZSEnKTtcblx0XHRjb25zb2xlLmVycm9yKCdFdmVudDonLCBjYXRlZ29yeSArICcsICcgKyBhY3Rpb24gKyAnLCAnICsgbGFiZWwpO1xuXG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Z2EoJ3NlbmQnLCAnZXZlbnQnLCBjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCk7XG59XG5cbi8vIExpbmsgdHJhY2tpbmdcbiQuZXhwclsnOiddLmV4dGVybmFsID0gZnVuY3Rpb24gKG9iaikge1xuXHRpZiAob2JqLnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ2EnKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0cmV0dXJuIG9iai5ocmVmICYmICFvYmouaHJlZi5tYXRjaCgvXm1haWx0bzovKSAmJiAhb2JqLmhyZWYubWF0Y2goL15qYXZhc2NyaXB0Oi8pICYmIChvYmouaG9zdG5hbWUucmVwbGFjZSgvXnd3d1xcLi9pLCAnJykgIT09IGRvY3VtZW50LmxvY2F0aW9uLmhvc3RuYW1lLnJlcGxhY2UoL153d3dcXC4vaSwgJycpKTtcbn07XG5cbiQuZXhwclsnOiddLmVtYWlsID0gZnVuY3Rpb24gKG9iaikge1xuXHRpZiAob2JqLnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ2EnKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0cmV0dXJuIG9iai5ocmVmICYmIG9iai5ocmVmLm1hdGNoKC9ebWFpbHRvOi8pO1xufTtcblxuJC5leHByWyc6J10udGVsID0gZnVuY3Rpb24gKG9iaikge1xuXHRpZiAob2JqLnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ2EnKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0cmV0dXJuIG9iai5ocmVmICYmIG9iai5ocmVmLm1hdGNoKC9edGVsOi8pO1xufTtcblxuJCgnYTpleHRlcm5hbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0cmVjb3JkRXZlbnQoJ0V4dGVybmFsIExpbmsnLCAnQ2xpY2snLCB0aGlzLmhvc3RuYW1lLnJlcGxhY2UoL2h0dHAocyk/OlxcL1xcLy9pKSk7XG59KTtcblxuJCgnYTplbWFpbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0cmVjb3JkRXZlbnQoJ01haWx0bycsICdDbGljaycsICQodGhpcykuYXR0cignaHJlZicpLnN1YnN0cmluZyg3KSk7XG59KTtcblxuJCgnYTp0ZWwnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdHJlY29yZEV2ZW50KCdQaG9uZSBOdW1iZXInLCAnQ2xpY2snLCAkKHRoaXMpLmF0dHIoJ2hyZWYnKS5zdWJzdHJpbmcoNCkpO1xufSk7XG5cbiQoZnVuY3Rpb24gKCkge1xuXHQkKCdhOmV4dGVybmFsLCBhOmVtYWlsJykuYXR0cih7XG5cdFx0dGFyZ2V0OiAnX2JsYW5rJyxcblx0XHRyZWw6ICdleHRlcm5hbCdcblx0fSk7XG5cblx0Ly8gQ29udmVydCBwaG9uZSBudW1iZXJzXG5cdGlmIChpc01vYmlsZURldmljZSkge1xuXHRcdHJlcGxhY2VQaG9uZU51bWJlcnNXaXRoTGlua3MoKTtcblx0fVxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvamF2YXNjcmlwdC90cmFja2luZy5qcyIsImxldCAkYWxlcnQgPSAkKCdkaXYjc2l0ZS1hbGVydCcpLFxuXHQkYWxlcnRDbG9zZSA9ICRhbGVydC5maW5kKCcjc2l0ZS1hbGVydC1jbG9zZScpO1xuXG4kYWxlcnRDbG9zZS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdENvb2tpZXMuc2V0KCdhbGVydCcsICRhbGVydC5kYXRhKCdleHBpcnknKSk7XG5cdCRhbGVydC5zbGlkZVVwKCk7XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qYXZhc2NyaXB0L2FsZXJ0LmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdHlsZS9hcHAuc2Nzc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdHlsZS9mb250YXdlc29tZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9