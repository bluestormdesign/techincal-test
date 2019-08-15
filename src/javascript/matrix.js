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

    // Image popups
    $('.gallery-pinterest, .gallery-grid, .gallery-slider').magnificPopup({
        delegate: 'a',
        type: 'image',
        removalDelay: 500, //delay removal by X to allow out-animation
        gallery: {
            enabled: true,
            navigateByImgClick: true,
        },
        callbacks: {
            beforeOpen: function () {
                // just a hack that adds mfp-anim class to markup
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        },
        closeOnContentClick: true,
        midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
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

    gridify.init();

    // Callouts slider
    $('.callouts-slider').not('.slick-initialized').slick({
        slidesToShow: 3,
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

});

