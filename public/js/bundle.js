(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

$(document).ready(function () {
    $("a.fancybox").fancybox();

    //form validate
    $(".field").focus(function () {
        $(this).removeClass("error");
    });

    $(".ajaxSubmit").click(function (e) {
        e.preventDefault();
        var $this = $(this),
            formid = $this.parents("form").attr("id"),
            $data = { "ajax": formid },
            $modalSuccess = $('.modal-success'),
            $message = $('.information');

        $("#" + formid + " .field").each(function (i) {
            var o = $(this),
                val = o.val();

            if (o.hasClass("valid")) {
                if (o.hasClass("vtext") && val == "") {
                    o.addClass("error");
                } else if (o.hasClass("vphone")) {
                    //if (!val.match(/^[0-9.-]/)) {o.addClass("error");}
                    if (!val.match(/^((\+38)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)) {
                        o.addClass("error");
                    } else {
                        o.removeClass("error");
                    }
                } else if (o.hasClass("vemail")) {
                    if (!val.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9][a-zA-Z0-9.-]*[\.]{1}[a-zA-Z]{2,4}$/)) {
                        o.addClass("error");
                    } else {
                        o.removeClass("error");
                    }
                }
            }
            $data[o.attr("id")] = val;
        });

        if ($(".error").length == 0) {
            $.post('send/', $data, function (data) {
                if (data.status == 'success') {
                    $(".field").val("").removeClass("error");
                    $modalSuccess.css('display', 'block');
                    setTimeout(function () {
                        $message.css('opacity', '1');
                    });
                }
            }, 'json');
        }
        $('#js-success_close').on('click', function () {
            $message.css('opacity', '0');
            setTimeout(function () {
                $modalSuccess.css('display', 'none');
            });
            /*$('.feedback-form__input-block').css('display', 'flex');*/
            $(".field").val("");
        });
        return false;
    });

    //click links
    function clickLink(div) {
        $('html, body').animate({ scrollTop: $(div).position().top }, 'slow');
    }

    $('.link-to').on('click', function (event) {
        event.preventDefault();
        var self = $(this);
        if (self.hasClass('to-about')) {
            clickLink($('.about-us'));
        } else if (self.hasClass('to-solution')) {
            clickLink($('.solution'));
        } else if (self.hasClass('to-solution-individuality')) {
            clickLink($('.solution-individuality'));
        } else if (self.hasClass('to-benefits')) {
            clickLink($('.benefits'));
        } else if (self.hasClass('to-last-projects')) {
            clickLink($('.last-projects'));
        } else if (self.hasClass('to-partners')) {
            clickLink($('.our-partners'));
        } else if (self.hasClass('to-contacts')) {
            clickLink($('.find-us'));
        }
    });

    $('.js-feedback-btn').on('click', function (event) {
        event.preventDefault();
        clickLink($('.form-block'));
    });

    var map;
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 46.4274059, lng: 30.7305966 },
            zoom: 16,
            scrollwheel: false
        });

        var newMarker = new google.maps.Marker({
            position: { lat: 46.4274059, lng: 30.7305966 },
            map: map
        });
    }

    var showBtn = $('#js-show-map');
    var $map = $('.map');

    showBtn.on('click', function (ev) {
        ev.preventDefault();
        if ($map.height() == 0) {
            $map.css('height', '375px');
        } else {
            $map.css('height', '0');
        }

        setTimeout(function () {
            initMap();
        }, 100);
    });

    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
        slidesToShow: 9,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: '.slider-for',
        centerMode: true,
        focusOnSelect: true,
        responsive: [{
            breakpoint: 1280,
            settings: {
                slidesToShow: 6
            }
        }, {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4
            }
        }, {
            breakpoint: 800,
            settings: {
                slidesToShow: 3
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1
            }
        }]
    });

    $('.single-item').slick({
        autoplay: true,
        autoplaySpeed: 5000,
        infinite: true,
        dots: true,
        fade: true,
        pauseOnHover: false,
        adaptiveHeight: false
    });

    $('.fade').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });

    $('.responsive').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });

    $('.our-partners__tabs-tab').on('click', function () {
        var $this = $(this);
        var $blockPartners = document.getElementsByClassName('our-partners__items');
        $('.our-partners__tabs-tab').removeClass('active');
        if (!$this.hasClass('active')) {
            $this.addClass('active');
        }

        [].forEach.call($blockPartners, function (el) {
            el.classList.remove('visible');
            if ($this.attr('id') == el.getAttribute('id-tab')) {
                el.classList.add('visible');
            }
        });
    });

    $('#js-mobile-menu').on('click', function (e) {
        e.preventDefault();
        if (!$('.header-navigation-mobile').hasClass('open')) {
            $('.header-navigation-mobile').addClass('open');
        } else {
            $('.header-navigation-mobile').removeClass('open');
        }

        $(this).parent().find('li').on('click', function () {
            $('.header-navigation-mobile').removeClass('open');
        });
    });

    $('#js-see-album').on('click', function () {
        $('.modal-album').addClass('open-modal');
    });
    $('#js_close').on('click', function () {
        $('.modal-album').removeClass('open-modal');
    });
});

},{}]},{},[1]);
