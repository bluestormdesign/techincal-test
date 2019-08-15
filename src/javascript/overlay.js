// Open/close overlay
let $body = $(document.body),
    $overlayBar = $('div#overlay-bar'),
    $overlayMenu = $('div#overlay-menu'),
    $mobileBar = $('nav#overlay-bar'),
    lastScrollTop = 0;

$('.open-overlay').on('click', function (e) {
    e.preventDefault();
    $body.addClass('overlay-open');

    $body.keyup(function (event) {
        if (event.keyCode == 27) {
            $('.close-overlay').trigger('click')
        }
    });

    $overlayMenu.fadeIn();
});

$('.close-overlay').on('click', function (e) {
    e.preventDefault();

    $body.off('keyup')
    $body.removeClass('overlay-open');
    $overlayMenu.fadeOut();
});

// Expand/contract inside overlay
$('div#overlay-menu nav > ul > li > a span').on('click', function (e) {
    e.preventDefault();

    // Toggle sub menu visibility.
    $(this).parents('li')
        .first()
        .children('ul')
        .toggle();

    // Toggle icon for dropdown.
    $(this).find('[data-fa-processed]')
        .toggleClass('fa-minus')
        .toggleClass('fa-plus');
});

$(window).on('scroll', function (e) {
    let st = $(this).scrollTop();

    if (st < 50) {
        $overlayBar.removeClass('offscreen');
    } else if (st > lastScrollTop) {
        $overlayBar.addClass('offscreen');
    } else {
        $overlayBar.removeClass('offscreen');
    }

    lastScrollTop = st;
});
