export const settingsSlider = {
    dots: false,
    infinite: true,
    speed: 240,
    slidesToShow: 5.17,
    slidesToScroll: 2,
    arrows: true,
    initialSlide: 2,
    responsive: [
    {
        breakpoint: 1400,
        settings: {
        slidesToShow: 4.17,
        slidesToScroll: 2,
        },
    },
    {
        breakpoint: 900,
        settings: {
        slidesToShow: 3.17,
        slidesToScroll: 1,
        },
    },
    {
        breakpoint: 520,
        settings: {
        slidesToShow: 2.17,
        slidesToScroll: 1,
        },
    },
    ],
};