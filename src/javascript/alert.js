let $alert = $('div#site-alert'),
    $alertClose = $alert.find('#site-alert-close');

$alertClose.on('click', function (e) {
    e.preventDefault();
    Cookies.set('alert', $alert.data('expiry'));
    $alert.slideUp();
});
