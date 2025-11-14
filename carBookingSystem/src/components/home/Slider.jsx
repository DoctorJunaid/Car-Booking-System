import React, { useState, useEffect } from "react";
import CarCard from "../CarCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllCars } from "../../utils/carData";

const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div
            className={`${className} absolute top-1/2 transform -translate-y-1/2 z-10 cursor-pointer 
                  hidden sm:flex items-center justify-center w-14 h-14 rounded-full 
                  bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-2xl hover:scale-110 transition-all duration-300`}
            onClick={onClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-6 h-6 text-white"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
            </svg>
        </div>
    );
};

const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div
            className={`${className} absolute top-1/2 transform -translate-y-1/2 z-10 cursor-pointer 
                  hidden sm:flex items-center justify-center w-14 h-14 rounded-full 
                  bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-2xl hover:scale-110 transition-all duration-300`}
            onClick={onClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-6 h-6 text-white"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                />
            </svg>
        </div>
    );
};

const SliderComponent = () => {
    const [hasMounted, setHasMounted] = useState(false);
    const [slidesToShow, setSlidesToShow] = useState(1);
    const [carDetails, setCarDetails] = useState([]); 

    useEffect(() => {
        setHasMounted(true);

        // Fetch real car data - get featured cars (mix of new and certified)
        const allCars = getAllCars();
        const featuredCars = allCars
            .filter(car => car.condition === 'new' || car.condition === 'certified')
            .slice(0, 8) // Get first 8 cars
            .map(car => ({
                id: car.id,
                title: car.title,
                specsSubtitle: `${car.engine} • ${car.transmission} • ${car.fuelType}`,
                mileage: car.mileage ? `${car.mileage.toLocaleString()} km` : '0 km',
                fuelType: car.fuelType,
                transmission: car.transmission,
                price: car.price,
                imageUrl: car.imageUrl,
            }));
        
        setCarDetails(featuredCars);
      
        const updateSlidesToShow = () => {
            if (window.innerWidth >= 1024) {
                setSlidesToShow(3);
            } else if (window.innerWidth >= 640) {
                setSlidesToShow(2);
            } else {
                setSlidesToShow(1);
            }
        };

        updateSlidesToShow();
        window.addEventListener('resize', updateSlidesToShow);

        return () => window.removeEventListener('resize', updateSlidesToShow);
    }, []);

    if (!hasMounted || carDetails.length === 0) {
        return (
            <section className="py-12 bg-white relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="text-center py-8">
                        <div className="w-16 h-16 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading featured cars...</p>
                    </div>
                </div>
            </section>
        );
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
        appendDots: (dots) => (
            <div style={{ position: "relative", bottom: "-25px" }}>
                <ul style={{ margin: "0px", padding: "0" }}> {dots} </ul>
            </div>
        ),
        customPaging: (i) => (
            <div className="w-3 h-3 bg-purple-300 rounded-full transition-all duration-300 slick-dot hover:bg-purple-500" />
        ),
    };

    return (
        <section className="py-20 bg-gradient-to-b from-white to-purple-50/30 relative px-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                        Featured <span className="bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">Cars</span>
                    </h2>
                    <p className="text-gray-600 text-xl font-medium">
                        Discover our handpicked selection of premium vehicles
                    </p>
                </div>
                <Slider {...settings} key={slidesToShow}>
                    {carDetails.map((car) => (
                        <div key={car.id} className="p-3">
                            <CarCard {...car} />
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default SliderComponent;
