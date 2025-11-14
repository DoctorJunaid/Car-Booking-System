import { Link } from "react-router-dom";
import { Gauge, Fuel, Cog, Bookmark, GitCompare } from "lucide-react";
import { motion } from "framer-motion";
import { useCompare } from "../context/CompareContext";
import { useState } from "react";
import OptimizedImage from "./OptimizedImage";

const CarCard = ({
    id,
    imageUrl,
    title,
    specsSubtitle,
    mileage,
    fuelType,
    transmission,
    price,
    detailsUrl,
    carData,
}) => {
    const { addToCompare, isInCompare, removeFromCompare } = useCompare();
    const [showMessage, setShowMessage] = useState(false);
    const inCompare = isInCompare(id);

    const handleCompare = (e) => {
        e.preventDefault();
        if (inCompare) {
            removeFromCompare(id);
        } else {
            const result = addToCompare(carData || {
                id,
                image: imageUrl,
                make: title.split(' ')[0],
                model: title.split(' ').slice(1).join(' '),
                year: specsSubtitle?.split(' ')[0] || '2024',
                price,
                mileage: mileage?.replace(/[^\d]/g, ''),
                fuelType,
                transmission,
            });
            if (!result.success) {
                setShowMessage(result.message);
                setTimeout(() => setShowMessage(false), 2000);
            }
        }
    };
    const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PKR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden w-full hover:shadow-2xl hover:border-purple-200 border-2 border-purple-100/50 group text-xs sm:text-sm"
        >
            <div className="relative w-full h-48 sm:h-52 overflow-hidden">
                <img
                    src={imageUrl}
                    alt={title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Urgency Badges */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-2 z-10">
                    {carData?.views > 50 && (
                        <span className="bg-gradient-to-r from-rose-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
                            🔥 Hot Deal
                        </span>
                    )}
                    {carData?.priceReduced && (
                        <span className="bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
                            💰 Price Drop
                        </span>
                    )}
                </div>
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex gap-2 z-10">
                    <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        className={`bg-white/95 backdrop-blur-sm rounded-lg p-2.5 sm:p-2.5 transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation shadow-lg ${
                            inCompare ? 'text-purple-600 bg-purple-50' : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                        }`}
                        title={inCompare ? "Remove from compare" : "Add to compare"}
                        onClick={handleCompare}
                    >
                        <GitCompare size={20} />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white/95 backdrop-blur-sm rounded-lg p-2.5 sm:p-2.5 text-gray-700 hover:text-cyan-600 hover:bg-cyan-50 transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation shadow-lg"
                        title="Bookmark this car"
                        onClick={() => console.log(`Bookmark: ${title}`)}
                    >
                        <Bookmark size={20} />
                    </motion.button>
                </div>
                {showMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-14 right-2 bg-gradient-to-r from-rose-500 to-red-600 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-xl"
                    >
                        {showMessage}
                    </motion.div>
                )}
            </div>

            {/* Content */}
            <div className="p-3 sm:p-3.5">
                <div className="flex items-start justify-between gap-2 mb-0.5">
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate flex-1" title={title}>
                        {title}
                    </h3>
                    {carData?.views && (
                        <span className="text-[10px] text-gray-500 whitespace-nowrap">
                            👁 {carData.views}
                        </span>
                    )}
                </div>
                <p className="text-[11px] sm:text-xs text-gray-600 truncate mb-2" title={specsSubtitle}>
                    {specsSubtitle}
                </p>

                <div className="flex justify-between items-center text-xs text-gray-700 border-y-2 border-purple-100 py-2 mb-3">
                    <div className="flex items-center gap-1" title="Mileage">
                        <Gauge size={15} className="text-purple-600" />
                        <span className="text-[11px] sm:text-xs font-medium">{mileage}</span>
                    </div>
                    <div className="flex items-center gap-1" title="Fuel Type">
                        <Fuel size={15} className="text-cyan-600" />
                        <span className="text-[11px] sm:text-xs font-medium">{fuelType}</span>
                    </div>
                    <div className="flex items-center gap-1" title="Transmission">
                        <Cog size={15} className="text-purple-600" />
                        <span className="text-[11px] sm:text-xs font-medium">{transmission}</span>
                    </div>
                </div>

                <div className="flex justify-between items-center gap-2">
                    <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-purple-700 to-cyan-600 bg-clip-text text-transparent">
                        {formattedPrice}
                    </span>
                    <Link
                        to={detailsUrl || `/car/${id}`}
                        className="text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-all duration-200 px-4 py-2.5 rounded-lg hover:shadow-lg touch-manipulation min-h-[40px] flex items-center"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default CarCard;
