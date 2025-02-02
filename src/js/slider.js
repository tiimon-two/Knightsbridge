export default function setSlider() {
    $('.footer__slider').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });

    const prev = document.querySelector('.footer__button--prev');
    const next = document.querySelector('.footer__button--next');

    prev.addEventListener('click', () => {
        $('.footer__slider').slick('slickPrev');
    });

    next.addEventListener('click', () => {
        $('.footer__slider').slick('slickNext');
    });
}