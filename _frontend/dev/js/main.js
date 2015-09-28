/*******************************************************************************

    Title :  Surfari Main JS
    Date  :  April 2015

********************************************************************************/

;(function ( window, document, undefined ) {

    var path = {
        css: myPrefix + 'assets/css/',
        js : myPrefix + 'assets/js/vendor/'
    };

    var assets = {
        _async          : 'https://cdnjs.cloudflare.com/ajax/libs/async/1.4.2/async.min.js',
        _jquery_cdn     : 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js',
        _jquery_local   : path.js + 'jquery.min.js',
        _fastclick      : path.js + 'fastclick.min.js',
        _lazyLoad       : path.js + 'jquery.lazyload.min.js',
        _throttle       : path.js + 'jquery.throttledresize.min.js',
        _debounce       : path.js + 'jquery.debouncedresize.min.js',
        _waitForImages  : path.js + 'jquery.waitforimages.min.js',
        // layouting js
        // _dropdown       : path.js + 'jquery.dropdown.min.js', // could conflict with fastclick - optional styling
        _circslider     : path.js + 'jquery.tinycircleslider.min.js',
        _slider         : path.js + 'slick.min.js',
    };

    var Site = {

        init: function () {
            Site.asyncProcess();

            window.Site = Site;
        },

        fastClick: function () {
            Modernizr.load({
                load    : assets._fastclick,
                complete: function () {
                    FastClick.attach(document.body);
                }
            });
        },

        enableActiveStateMobile: function () {
            if ( document.addEventListener ) {
                document.addEventListener('touchstart', function () {}, true);
            }
        },

        WPViewportFix: function () {
            if ( navigator.userAgent.match(/IEMobile\/10\.0/) ) {
                var style   = document.createElement("style"),
                    fix     = document.createTextNode("@-ms-viewport{width:auto!important}");

                style.appendChild(fix);
                document.getElementsByTagName('head')[0].appendChild(style);
            }
        },

        // ================== ADDITION ==================

        waitForImages: function() {
            Modernizr.load({
                load: assets._waitForImages,
                complete: function() {
                    console.log('waitforimagesLoaded');
                }
            });
        },

        lazyLoad: function() {
            var $lazy = $('.lazy');

            if(!$lazy.length) return;

            Modernizr.load({
                load: assets._lazyLoad,
                complete: function() {
                    $lazy.lazyload({
                        effect: 'fadeIn',
                        threshold : 200,
                        failure_limit : 10,
                        load: afterLoad
                    });
                }
            });

            function afterLoad(elem, elem_left, settings) {
                $lazy.eq(elem).addClass('loaded');
            }
        },

        ui: function() {
            // ========================== LAYOUT INIT ========================== 
            // for every layouting that need reinit, could be placed here

            this.menuInit = function () {
                $('.nav-icon').on('click', function() {
                    $('.wrapper').toggleClass('slide');
                    $('.header-main__top-bar').toggleClass('open');
                    $('.main-navigation').toggleClass('menu-open');
                    var menu = $('.menu-search__container');
                    if (menu.hasClass('open-down')) {
                        $('.menu-search__form-row').hide();
                        menu.toggleClass('open-down');
                    }
                    $('.overlay').toggleClass('dim');
                });
                $('.nav-lang').on('click', function() {
                    $('.nav-lang__item-container').slideToggle();
                })
                $('.panel-group').on('click', function(e) {
                    e.preventDefault();
                    $(this).toggleClass('submenu-open');
                    $(this).next().slideToggle();
                });
                $('#search-menu').on('click', function(e) {
                    e.preventDefault();
                    $('.menu-search__container').toggleClass('open-down');
                    $('.menu-search__form-row').slideToggle();
                });
                $('.main-cart h2 span').on('click', function(e) {
                    if(!$(this).hasClass('selected')) {
                        $(this).siblings().toggleClass('selected');
                        $(this).toggleClass('selected');
                        var get = $('.'+($(this).data('show')));
                        get.siblings().hide();
                        get.fadeToggle();
                    }
                });
                $('#login-register-btn').on('click', function(e) {
                    e.preventDefault();
                    $('.overlay').toggleClass('dim');
                    $('.login-register__container').fadeToggle();
                });
                $('.login-register__close-btn').on('click', function(e) {
                    e.preventDefault();
                    $('.overlay').toggleClass('dim');
                    $('.login-register__container').fadeToggle();
                });
            },

            this.midMenuInit = function () {
                var displayer = $('.mid-menu-breadcrumb--displayer');
                if(displayer) {
                    displayer.on('click', function() {
                        displayer.toggleClass('mid-menu-open');
                        displayer.siblings().slideToggle();
                    });        
                }
            },

            this.imageViewerInit = function () {
                $('.profnprod-viewer__thumb img').on('click', function() {
                    var src = $(this).attr('src');
                    $('.profnprod-viewer__frame img').attr('src', src);
                })
            },

            this.circleSliderInit = function () {
                Modernizr.load({
                    load    : assets._circslider,
                    complete: function () {
                        $("#circleslider2").tinycircleslider({
                            interval : true
                        ,   dotsSnap : true
                        });
                    }
                });
            },

            this.storeManageImageViewerInit = function () {
                $("#banner").change(function(){
                    Site.readURL(this, $("#banner-target"));
                });
                $("#profpic").change(function(){
                    Site.readURL(this, $("#profpic-target"));
                });
            }

            this.orderTableInit = function () {
                $('.order-expandable').click(function() {
                    var target = '#'+$(this).data('target');
                    $('.list-wrap').height('auto');
                    $(target).toggle();
                });
            }
        },

        slider: function() {
            var _this = this;
            var $slider = $('.slider');

            if(!$slider.length) return;

            Modernizr.load({
                load: assets._slider,
                complete: function() {
                    slider();
                }
            });

            function slider() {
                slider = $('.slider');
                slider.slick(slider.data('slick'));
            }
        },

        resize: function() {
            // reinitiation
            var _this = this;
            Modernizr.load({
                load: [assets._throttle, assets._debounce],
                complete: function() {
                    var ui = new _this.ui();

                    ui.menuInit();
                    ui.midMenuInit();
                    ui.imageViewerInit();
                    ui.circleSliderInit();
                    ui.storeManageImageViewerInit();
                    ui.orderTableInit();
                    // Site.organicTabs("#surfari-tabs");
                }
            })
        },

        asyncProcess: function() {
            async.parallel([
                function fastClick(cb) {
                    Site.fastClick();
                    cb();
                },

                function enableActiveStateMobile(cb) {
                    Site.enableActiveStateMobile();
                    cb();
                },

                function WPViewportFix(cb) {
                    Site.WPViewportFix();
                    cb();
                },
                function waitForImages(cb) {
                    Site.waitForImages();
                    cb();
                },

                function lazyLoad(cb) {
                    Site.lazyLoad();
                    cb();
                },

                function resize(cb) {
                    Site.resize();
                    cb();
                },

                function slider(cb) {
                    Site.slider();
                    cb();
                },
                // function googleMaps(cb) {
                //     Site.googleMaps();
                //     cb();
                // },
            ], function(err, result) {
                if(err) console.error(err);

                return result;
            });
        },

        readURL: function (input, target) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                
                reader.onload = function (e) {
                    target.attr('src', e.target.result);
                }
                reader.readAsDataURL(input.files[0]);
            }
        },

        // organicTabs : function(el, options) {
        //     var base = this;
        //     base.$el = $(el);
        //     base.$nav = base.$el.find(".nav");
        //     defaultOptions = {
        //         "speed": 300
        //     };
        //     base.init = function() {
        //         base.options = $.extend({}, defaultOptions, options);
        //         // Accessible hiding fix
        //         $(".hide").css({
        //             "position": "relative",
        //             "top": 0,
        //             "left": 0,
        //             "display": "none"
        //         }); 
        //         base.$nav.delegate("li > a", "click", function() {
        //             // Figure out current list via CSS class
        //             var curList = base.$el.find("a.current").attr("href").substring(1),
        //             // List moving to
        //             $newList = $(this),
        //             // Figure out ID of new list
        //             listID = $newList.attr("href").substring(1),
        //             // Set outer wrapper height to (static) height of current inner list
        //             $allListWrap = base.$el.find(".list-wrap"),
        //             curListHeight = $allListWrap.height();
        //             $allListWrap.height(curListHeight);
                                            
        //             if ((listID != curList) && ( base.$el.find(":animated").length == 0)) {
        //                 // Fade out current list
        //                 base.$el.find("#"+curList).fadeOut(base.options.speed, function() {
        //                     // Fade in new list on callback
        //                     base.$el.find("#"+listID).fadeIn(base.options.speed);
        //                     // Adjust outer wrapper to fit new list snuggly
        //                     var newHeight = base.$el.find("#"+listID).height();
        //                     $allListWrap.animate({
        //                         height: newHeight
        //                     });

        //                     // Remove highlighting - Add to just-clicked tab
        //                     base.$el.find(".nav li a").removeClass("current");
        //                     $newList.addClass("current");
                                
        //                 });
        //             }   
        //             // Don't behave like a regular link
        //             // Stop propegation and bubbling
        //             return false;
        //         });
        //     };
        //     base.init();
        // },

    };

    var checkJquery = function () {
        Modernizr.load([
            {
                test    : window.jQuery,
                nope    : assets._jquery_local,
                complete: Site.init
            }
        ]);
    };

    Modernizr.load({
        load    : [assets._async, assets._jquery_cdn],
        complete: checkJquery
    });

    // =================== Global and general function ===================
    // to be used outside the first layout initiation

})( window, document );