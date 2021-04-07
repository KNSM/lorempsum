$(document).ready(function () {
    var ov = $('.ov');

    //header menu
    $('.header__menu').click(function () {
        $('.header').toggleClass('-menu-opened -window-active');
        ov.toggleClass('-window-active');
    });

    //header-nav-mobile
    $('.header__nav .list__item.has-sublist .icon-arrow-down').click(function () {
        $(this).parent().find('.sublist-block').slideToggle();
        $(this).parent().toggleClass('-active');
    });


    //header-scroll
    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop(),
            header = $('.header');

        if (scrollTop >  0) {
            header.addClass('header-fixed');
        } else {
            header.removeClass('header-fixed');
        }
    });

    //ov
    ov.click(function () {
        $('.-menu-opened').removeClass('-menu-opened');
        $('.-window-active').removeClass('-window-active');
        $(this).removeClass('-window-active');
    });
});