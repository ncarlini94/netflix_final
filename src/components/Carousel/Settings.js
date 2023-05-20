export const settingsSlider = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 5.17,
    slidesToScroll: 2,
    arrows: true,
    initialSlide: 0,
    responsive: [
    {
        breakpoint: 1024,
        settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        },
    },
    {
        breakpoint: 600,
        settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        },
    },
    {
        breakpoint: 420,
        settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        },
    },
    ],
};