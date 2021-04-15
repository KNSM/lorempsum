$(document).ready(function () {
    var ov = $('.ov');

    //fakeScroll
    var fakeScrolls = document.querySelectorAll('.selector-menu'), fakeScroll;
    for (fakeScroll = 0; fakeScroll < fakeScrolls.length; fakeScroll++) {
        fakeScrolls[fakeScroll].fakeScroll();
    }

    // mobile-modal
    function modals() {
        var linkCalc = $('.link.link-calc'),
            linkFilter = $('.link.link-filter'),
            linkSort = $('.link.link-sort'),
            iconSidebarClose = $('.sidebar__item .icon-close'),
            iconModalClose = $('.modal .icon-close');

        if ($(window).width() < 991) {
            linkCalc.click(function () {
                $('-window-active').removeClass('-active');
                $('.sidebar__item.item-calc').toggleClass('-window-active');
                ov.toggleClass('-window-active');
            });

            linkFilter.click(function () {
                $('-window-active').removeClass('-active');
                $('.sidebar__item.item-filter').toggleClass('-window-active');
                ov.toggleClass('-window-active');
            });

            linkSort.click(function () {
                $('-window-active').removeClass('-active');
                $('.modal-sort').toggleClass('-window-active');
                ov.toggleClass('-window-active');
            });

            iconModalClose.click(function () {
                $('.modal.-window-active').removeClass('-window-active');
                ov.toggleClass('-window-active');
            });
            iconSidebarClose.click(function () {
                $('.sidebar__item.-window-active').removeClass('-window-active');
                ov.toggleClass('-window-active');
            });
        }
    }

    modals();
    $(window).on('resize', function () {
        modals();
    });

    //back to top link
    function backLink() {
        var showHeight = $('.section-main').outerHeight(true) + $('.section-popular').outerHeight(true),
            backLink = $('.back-to-top');

        if ($(window).scrollTop() > showHeight) {
            backLink.addClass('-active');
        } else {
            backLink.removeClass('-active');
        }
    }

    backLink();

    $(window).on('scroll', function () {
        backLink();
    });

    $('.back-to-top').click(function () {
        $('html,body').animate({scrollTop: 0}, 1100);
    });

    //table comparison
    $(function () {
        var tableBlock = $('.table-comparison-block');

        tableBlock.each(function () {
            var tableWrapper = $(this).find('.table-comparison-wrapper'),
                tableArrow = $(this).find('.table__arrow');

            tableArrow.click(function () {
                tableWrapper.toggleClass('-opened');
            });
        });
    });

    // form-calc slider
    $(function () {
        var stepsSlider = document.getElementById('calc-slider');
        var input0 = document.getElementById('input-calc-1');
        var input1 = document.getElementById('input-calc-2');
        var inputs = [input0, input1];

        noUiSlider.create(stepsSlider, {
            start: [0, 100000],
            connect: true,
            range: {
                'min': [0],
                'max': 100000
            },
            step: 500,
            format: wNumb({
                decimals: 0,
            })
        });

        stepsSlider.noUiSlider.on('update', function (values, handle) {
            inputs[handle].value = values[handle];
        });

        // Listen to keydown events on the input field.
        inputs.forEach(function (input, handle) {

            input.addEventListener('change', function () {
                stepsSlider.noUiSlider.setHandle(handle, this.value);
            });

            input.addEventListener('keydown', function (e) {

                var values = stepsSlider.noUiSlider.get();
                var value = Number(values[handle]);

                // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
                var steps = stepsSlider.noUiSlider.steps();

                // [down, up]
                var step = steps[handle];

                var position;

                // 13 is enter,
                // 38 is key up,
                // 40 is key down.
                switch (e.which) {

                    case 13:
                        stepsSlider.noUiSlider.setHandle(handle, this.value);
                        break;

                    case 38:

                        // Get step to go increase slider value (up)
                        position = step[1];

                        // false = no step is set
                        if (position === false) {
                            position = 1;
                        }

                        // null = edge of slider
                        if (position !== null) {
                            stepsSlider.noUiSlider.setHandle(handle, value + position);
                        }

                        break;

                    case 40:

                        position = step[0];

                        if (position === false) {
                            position = 1;
                        }

                        if (position !== null) {
                            stepsSlider.noUiSlider.setHandle(handle, value - position);
                        }

                        break;
                }
            });
        });
    });

    //header menu
    $('.header__menu').click(function () {
        $('.header').toggleClass('-menu-opened -window-active');
        if ($('.sidebar__item').hasClass('-window-active') || $('.modal-sort').hasClass('-window-active')) {
            $('.sidebar__item.-window-active').removeClass('-window-active');
            $('.modal-sort.-window-active').removeClass('-window-active');
        } else {
            ov.toggleClass('-window-active');
        }
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

        if (scrollTop > 0) {
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

    //selector
    $(function () {
        var selector = $('.selector');

        selector.each(function () {

            var select = $(this).find('.select'),
                selectorMenu = $(this).find('.selector-menu'),
                selectorMenuInner = selectorMenu.find('.menu'),
                selectItems = select.find('option');

            $(this).append('<div class="selector-block"><button type="button" class="button"></button><div class="tags"><button type="button" class="tag"></button></div></div>');
            select.wrap('<div class="form-data"></div>');


            var selectorBlock = $(this).find('.selector-block'),
                selectorTag = selectorBlock.find('.tag'),
                selectorButton = selectorBlock.find('.button');

            selectItems.each(function () {

                if ($(this).attr('selected')) {
                    selectorMenuInner.append('<li data-id="' + $(this).attr('value') + '" class="selector-menu__item selected">' + $(this).html() + '</li>');

                    var selectorMenuItem = selectorMenuInner.find('.selector-menu__item.selected');

                    selectorTag.html($(this).html());
                    selectorTag.attr('data-id', selectorMenuItem.attr('data-id'));
                } else {
                    selectorMenuInner.append('<li data-id="' + $(this).attr('value') + '" class="selector-menu__item">' + $(this).html() + '</li>');
                }
            });

            var selectorMenuItem = selectorMenuInner.find('.selector-menu__item');

            selectorButton.click(function () {
                var menuLength = selectorMenuInner.find('.selector-menu__item').length;

                if (menuLength < 5) {
                    selectorMenu.css('height', 42 * menuLength + 12);
                }

                selectorMenu.toggleClass('-open');
            });

            selectorMenuItem.click(function () {
                var dataId = $(this).attr('data-id'),
                    selectorText = $(this).html();

                selectItems.removeAttr('selected');

                selectItems.each(function () {
                    if ($(this)[0].value === dataId) {
                        $(this).attr('selected', 'selected');
                    }
                });
                selectItems.find('[value]', dataId);
                selectorTag.html(selectorText);
                selectorTag.attr('data-id', dataId);
                selectorMenuItem.removeClass('selected');
                $(this).addClass('selected');
                selectorMenu.removeClass('-open');
            });
        });
    });

    //accordion
    $(function () {
        var accordion = $('.accordion');

        accordion.each(function () {
            var accordionItem = $(this).find('.accordion__item');

            accordionItem.each(function () {
                var accordionInner = $(this).find('.accordion__inner'),
                    accordionArrow = $(this).find('.accordion__arrow'),
                    currentItem = $(this);

                accordionArrow.click(function () {
                    currentItem.toggleClass('-active');
                    accordionInner.slideToggle();
                });
            });
        });
    });

    //slider slider-recommend
    $(function () {
        if ($('.slider.slider-recommend').length) {
            $('.slider.slider-recommend .slider-wrapper').slick({
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                dots: false,
                arrows: true,
                speed: 300,
                prevArrow: $('.slider-recommend .slider-button-prev'),
                nextArrow: $('.slider-recommend .slider-button-next'),
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            variableWidth: true,
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            variableWidth: true,
                            arrows: false,
                        }
                    }
                ]
            });
        }
    });

    //review clump
    $(function () {
        var reviewText = $('.review__text .text');

        reviewText.each(function (index, element) {
            if ($(this).height() > 175) {
                $(this).append('<div class="link-wrapper"><span class="dotted">...</span><a href="javascript:;" class="link link-text-primary">Читать далее</a></div>')
                $clamp(element, {clamp: 7});

                $(this).on('click', '.link', function () {
                    $clamp(element, {clamp: 100});
                    $(this).parent().addClass('-hidden');
                });
            }
        });
    });


    //catalog
    $(function () {
        var catalog = $('.catalog');

        catalog.each(function () {
            var catalogContent = $(this).find('.catalog__content'),
                catalogItem = $(this).find($('.catalog__item')),
                itemHeader = $(this).find($('.catalog__item.item-header')),
                colSummButton = itemHeader.find('.col-summ'),
                colBetButton = itemHeader.find('.col-bet'),
                colTermButton = itemHeader.find('.col-term'),
                advItem = $(this).find('.adv__item')[0],
                colArray = [];

            Array.prototype.insert = function ( index, item ) {
                this.splice( index, 0, item );
            };

            for (var i = 1; i < catalogItem.length; i++) {
                colArray.push(catalogItem[i]);
            }

            colArray.insert(4, advItem);

            function sortSummFromMax() {

                colArray.splice(4,1);

                colArray.sort(function (a, b) {
                    a = parseFloat($(a).find('.col-summ .count').text().replace(/\s/g, ''));
                    b = parseFloat($(b).find('.col-summ .count').text().replace(/\s/g, ''));

                    return a === b
                        ? 0
                        : a < b ? 1 : -1
                });

                colArray.insert(4, advItem);

                for (i = 0; i < colArray.length; i++) {
                    catalogContent.append(colArray[i]);
                }
            }

            function sortSummFromMin() {

                colArray.splice(4,1);

                colArray.sort(function (a, b) {
                    a = parseFloat($(a).find('.col-summ .count').text().replace(/\s/g, ''));
                    b = parseFloat($(b).find('.col-summ .count').text().replace(/\s/g, ''));

                    return a === b
                        ? 0
                        : a > b ? 1 : -1
                });

                colArray.insert(4, advItem);

                for (i = 0; i < colArray.length; i++) {
                    catalogContent.append(colArray[i]);
                }
            }

            function sortBetFromMin() {

                colArray.splice(4,1);

                colArray.sort(function (a, b) {
                    a = parseFloat($(a).find('.col-bet .count').text().replace(/\s/g, ''));
                    b = parseFloat($(b).find('.col-bet .count').text().replace(/\s/g, ''));

                    return a === b
                        ? 0
                        : a > b ? 1 : -1
                });

                colArray.insert(4, advItem);

                for (i = 0; i < colArray.length; i++) {
                    catalogContent.append(colArray[i]);
                }
            }

            function sortBetFromMax() {

                colArray.splice(4,1);

                colArray.sort(function (a, b) {
                    a = parseFloat($(a).find('.col-bet .count').text().replace(/\s/g, ''));
                    b = parseFloat($(b).find('.col-bet .count').text().replace(/\s/g, ''));

                    return a === b
                        ? 0
                        : a < b ? 1 : -1
                });

                colArray.insert(4, advItem);

                for (i = 0; i < colArray.length; i++) {
                    catalogContent.append(colArray[i]);
                }
            }

            function sortTermFromMax() {

                colArray.splice(4,1);

                colArray.sort(function (a, b) {
                    a = parseFloat($(a).find('.col-term .count-to').text().replace(/\s/g, '')) - parseFloat($(a).find('.col-term .count-from').text().replace(/\s/g, ''));
                    b = parseFloat($(b).find('.col-term .count-to').text().replace(/\s/g, '')) - parseFloat($(b).find('.col-term .count-from').text().replace(/\s/g, ''));

                    return a === b
                        ? 0
                        : a < b ? 1 : -1
                });

                colArray.insert(4, advItem);

                for (i = 0; i < colArray.length; i++) {
                    catalogContent.append(colArray[i]);
                }
            }

            function sortTermFromMin() {

                colArray.splice(4,1);

                colArray.sort(function (a, b) {
                    a = parseFloat($(a).find('.col-term .count-to').text().replace(/\s/g, '')) - parseFloat($(a).find('.col-term .count-from').text().replace(/\s/g, ''));
                    b = parseFloat($(b).find('.col-term .count-to').text().replace(/\s/g, '')) - parseFloat($(b).find('.col-term .count-from').text().replace(/\s/g, ''));

                    return a === b
                        ? 0
                        : a > b ? 1 : -1
                });

                colArray.insert(4, advItem);

                for (i = 0; i < colArray.length; i++) {
                    catalogContent.append(colArray[i]);
                }
            }

            colSummButton.click(function () {
                if ($(this).hasClass('from-min')) {
                    sortSummFromMax();
                    $(this).removeClass('from-min');
                    $(this).addClass('from-max');
                } else {
                    sortSummFromMin();
                    $(this).removeClass('from-max');
                    $(this).addClass('from-min');
                }
            });

            colBetButton.click(function () {
                if ($(this).hasClass('from-min')) {
                    sortBetFromMax();
                    $(this).removeClass('from-min');
                    $(this).addClass('from-max');
                } else {
                    sortBetFromMin();
                    $(this).removeClass('from-max');
                    $(this).addClass('from-min');
                }
            });

            colTermButton.click(function () {
                if ($(this).hasClass('from-min')) {
                    sortTermFromMax();
                    $(this).removeClass('from-min');
                    $(this).addClass('from-max');
                } else {
                    sortTermFromMin();
                    $(this).removeClass('from-max');
                    $(this).addClass('from-min');
                }
            });

            catalogItem.each(function () {
                //content toggler
                var catalogArrow = $(this).find('.item-arrow'),
                    colContent = $(this).find('.col-content');

                catalogArrow.click(function () {
                    $(this).parent().toggleClass('-active');
                    colContent.slideToggle();
                });
            });
        });
    });
});