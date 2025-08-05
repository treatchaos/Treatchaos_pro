(function ($) {
    "use strict";

    // Spinner with enhanced timing
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs with enhanced configuration
    new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 100,
        mobile: true,
        live: true
    }).init();


    // Enhanced Sticky Navbar with smooth transition
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm').css({
                'backdrop-filter': 'blur(10px)',
                'background': 'rgba(255, 255, 255, 0.95)'
            });
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm').css({
                'backdrop-filter': 'none',
                'background': 'transparent'
            });
        }
    });


    // Enhanced smooth scrolling with easing
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            var target = $(this.hash);
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 1200, 'easeInOutCubic');
                
                if ($(this).parents('.navbar-nav').length) {
                    $('.navbar-nav .active').removeClass('active');
                    $(this).closest('a').addClass('active');
                }
            }
        }
    });
    
    
    // Enhanced back to top button with smooth animation
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow').css('display', 'flex');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Enhanced feature card hover effects
    $('.feature-item').hover(
        function() {
            $(this).find('.rounded-circle').addClass('animate-pulse');
        },
        function() {
            $(this).find('.rounded-circle').removeClass('animate-pulse');
        }
    );

    // Parallax effect for hero section
    $(window).scroll(function() {
        var scrolled = $(this).scrollTop();
        var parallax = $('.hero-header');
        var speed = scrolled * 0.5;
        parallax.css('transform', 'translateY(' + speed + 'px)');
    });

    // Enhanced intersection observer for animations
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeInUp');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        document.querySelectorAll('.stats-item, .feature-item, .glass-effect').forEach(el => {
            observer.observe(el);
        });
    }

    // Contact button enhancements
    $('.contact-button').on('mouseenter', function() {
        $(this).find('svg').css('transform', 'scale(1.2) rotate(5deg)');
    }).on('mouseleave', function() {
        $(this).find('svg').css('transform', 'scale(1) rotate(0deg)');
    });

    // Gradient animation restart on scroll
    $(window).scroll(function() {
        $('.text-primary-gradient, .text-secondary-gradient').each(function() {
            if ($(this).offset().top < $(window).scrollTop() + $(window).height()) {
                $(this).css('animation', 'none');
                setTimeout(() => {
                    $(this).css('animation', 'gradientShift 3s ease infinite');
                }, 10);
            }
        });
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Screenshot carousel
    $(".screenshot-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        dots: true,
        items: 1
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);

