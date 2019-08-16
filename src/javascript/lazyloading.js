let $loadContainer = $('div#ajax-container'),
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
    let win = $(window),
        bounds = this.offset(),
        viewport = {
            top: win.scrollTop(),
            left: win.scrollLeft()
        };

    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};

$.fn.isEmpty = function () {
    return !this.children().length && !this.text().match(/\S/);
};

function getUrl() {
    let url = '/ajax/' + section + '/' + offset + '/' + limit + '/' + order + '/' + sort + '/';

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
    })
});
