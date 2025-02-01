export default function setSlider() {
    $('.features__slider').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
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

    const prev = document.querySelector('.features__button--prev');
    const next = document.querySelector('.features__button--next');

    prev.addEventListener('click', () => {
        $('.features__slider').slick('slickPrev');
    });

    next.addEventListener('click', () => {
        $('.features__slider').slick('slickNext');
    });
}