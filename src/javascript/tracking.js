let isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
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

    return obj.href && !obj.href.match(/^mailto:/) && !obj.href.match(/^javascript:/) && (obj.hostname.replace(/^www\./i, '') !== document.location.hostname.replace(/^www\./i, ''));
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
