import React, { useState, useRef, useEffect } from 'react';

const BrowseCategory = () => {
  const [activeTab, setActiveTab] = useState('category');
  const [activeSlide, setActiveSlide] = useState({
    category: 0,
    make: 0,
    bodyType: 0
  });
  
  // Touch swipe handling
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const carouselRef = useRef(null);
  
  // Minimum swipe distance
  const minSwipeDistance = 50;

  // Slide content data
  const slides = {
    category: [
      [
        { img: 'https://wsa3.pakwheels.com/assets/browse-more/car-ctg-automatic-a55403a87e9794f26240b3b89f81013ad5da5f46e9d180d4aa48fa6095852dce.svg', text: 'Automatic cars', url: '/used-cars/automatic/57336' },
        { img: 'https://wsa2.pakwheels.com/assets/browse-more/car-ctg-family-cars-fec3195aed4ffcd6a294d54d8bf422b60ec2431a9f94b2f3815008194e4f90f5.svg', text: 'Family Cars', url: '/used-cars/family-cars/587667' },
        { img: 'https://wsa3.pakwheels.com/assets/browse-more/car-ctg-5-seater-50fd38784cc34e3b1641489cafce16c5f214ea5b5ecea360166341426dfbc8a1.svg', text: '5 Seater', url: '/used-cars/5-seater/2442532' },
        { img: 'https://wsa2.pakwheels.com/assets/browse-more/car-ctg-small-76d1a1d82cf4ce773dddced47e638ed7e59eb3d9a8362f59b12d137dbc799d3e.svg', text: 'Small cars', url: '/used-cars/small/266374' },
        { img: 'https://wsa4.pakwheels.com/assets/browse-more/car-ctg-big-6b31c1d95b31122cafda6dae9da15e51622912e74e19a487e8f1a79e36393264.svg', text: 'Big cars', url: '/used-cars/big/266260' },
        { img: 'https://wsa4.pakwheels.com/assets/browse-more/car-ctg-old-371bf5ee8fa9a89212cda1806690bdb1d48ba4e264704841baa31967ee2d60fa.svg', text: 'Old Cars', url: '/used-cars/old/430603' }
      ],
      [
        { img: 'https://wsa2.pakwheels.com/assets/browse-more/car-ctg-imported-3466fdc5035c8c30983d01b4d25cd7cb97ca9272b5cc31e9df096d0b4a8a380f.svg', text: 'Imported cars', url: '/used-cars/imported/57428' },
        { img: 'https://wsa1.pakwheels.com/assets/browse-more/car-ctg-5-door-f18a18ad032fb467ad25c085cfd9a36950540e8a125e08ef4348860790aec1ec.svg', text: '5 Door', url: '/used-cars/5-door/266614' },
        { img: 'https://wsa2.pakwheels.com/assets/browse-more/car-ctg-4-door-50fd38784cc34e3b1641489cafce16c5f214ea5b5ecea360166341426dfbc8a1.svg', text: '4 Door', url: '/used-cars/4-door/2442529' },
        { img: 'https://wsa1.pakwheels.com/assets/browse-more/car-ctg-1000cc-cars-4f09861499c5a24f39becd8e2baa667b3cea7d8116bdf951622f938b1186aa9e.svg', text: '1000cc cars', url: '/used-cars/1000cc-cars/190769' },
        { img: 'https://wsa3.pakwheels.com/assets/browse-more/car-ctg-1300cc-cars-cdebceef95d218b5f15016955d38c99849c64cddae8c3a26c10f8340cbfa8b34.svg', text: '1300cc cars', url: '/used-cars/1300cc-cars/191144' },
        { img: 'https://wsa2.pakwheels.com/assets/browse-more/car-ctg-japanese-3d68bdb7a647d85123324abc324fdf8e8892dc10d1d7859a614680b77b30d4dd.svg', text: 'Japanese cars', url: '/used-cars/japanese/65933' }
      ],
      [
        { img: 'https://wsa2.pakwheels.com/assets/browse-more/car-ctg-660cc-cars-cd3615a010d3aa29f128a1ad109f1480c7a2f5f1f7390d89963039b2a4dbc676.svg', text: '660cc cars', url: '/used-cars/660cc-cars/190519' },
        { img: 'https://wsa1.pakwheels.com/assets/browse-more/car-ctg-low-priced-49f333574632414627b2cf8ec64cbb4f041eac20ad47485830292008818eed7c.svg', text: 'Low Priced cars', url: '/used-cars/low-priced/328875' },
        { img: 'https://wsa4.pakwheels.com/assets/browse-more/car-ctg-jeep-8637eea1c1efdabe93fdb517751bf0a725efe4c2ad84084baa302d5d8208cd82.svg', text: 'Jeep', url: '/used-cars/jeep/72893' },
        { img: 'https://wsa3.pakwheels.com/assets/browse-more/car-ctg-low-mileage-edcee3cbd5998ab53aa27841cd5031ffcded4105748a39e55233f44a84d81e66.svg', text: 'Low Mileage Cars', url: '/used-cars/low-mileage/485505' },
        { img: 'https://wsa4.pakwheels.com/assets/browse-more/car-ctg-cheap-6ca5a4f4a48390f96396c27055252ead713b6519c598129dbc2eedbfd9ff1524.svg', text: 'Cheap cars', url: '/used-cars/cheap/329024' },
        { img: 'https://wsa3.pakwheels.com/assets/browse-more/car-ctg-hybrid-351122bb727d7938d5f35ffb5dbb660ee6f6eb895b984c70d7d0cc9e74c1e93c.svg', text: 'Hybrid cars', url: '/used-cars/hybrid/57335' }
      ],
      [
        { img: 'https://wsa3.pakwheels.com/assets/browse-more/car-ctg-4-seater-84ac814853b1eb1669564e713fe84b011d30d1c04990caa190ce0082771a25d4.svg', text: '4 Seater', url: '/used-cars/4-seater/2442533' },
        { img: 'https://wsa2.pakwheels.com/assets/browse-more/car-ctg-diesel-ca6e2793c3fd974ed5deff95fb4851e776066b022724ccc27c613b4513871cc7.svg', text: 'Diesel cars', url: '/used-cars/diesel/57337' },
        { img: 'https://wsa2.pakwheels.com/assets/browse-more/car-ctg-commercial-f36f25b76226a2cfc1a3148332640e9f6df909d8bfa83f5d104a66c3a6c9b955.svg', text: 'Commercial', url: '/used-cars/commercial/2466232' },
        { img: 'https://wsa1.pakwheels.com/assets/browse-more/car-ctg-7-seater-70c54ff89525f6b556e996d9d93252d96416f8777e1ccc144f2b974d9c697c1d.svg', text: '7 Seater', url: '/used-cars/7-seater/266616' },
        { img: 'https://wsa3.pakwheels.com/assets/browse-more/car-ctg-carry-daba-1043dfe66124365397cbec4bff5c0b878dc123155dca76f05bccdc3adea8f428.svg', text: 'Carry Daba', url: '/used-cars/carry-daba/270569' },
        { img: 'https://wsa3.pakwheels.com/assets/browse-more/car-ctg-electric-7e1bd16bad3457cf7e05e47daa8e5a25acb81bb479c77f525eb2698a30db0d54.svg', text: 'Electric cars', url: '/used-cars/electric/389926' }
      ]
    ],
    cities: [
      { text: 'Karachi', url: '/used-cars/karachi/24857' },
      { text: 'Lahore', url: '/used-cars/lahore/24858' },
      { text: 'Islamabad', url: '/used-cars/islamabad/24856' },
      { text: 'Rawalpindi', url: '/used-cars/rawalpindi/24831' },
      { text: 'Peshawar', url: '/used-cars/peshawar/24821' },
      { text: 'Faisalabad', url: '/used-cars/faisalabad/24753' },
      { text: 'Multan', url: '/used-cars/multan/24810' },
      { text: 'Gujranwala', url: '/used-cars/gujranwala/24763' },
      { text: 'Sialkot', url: '/used-cars/sialkot/24841' },
      { text: 'Sargodha', url: '/used-cars/sargodha/24836' },
      { text: 'Hyderabad', url: '/used-cars/hyderabad/24771' },
      { text: 'Abbottabad', url: '/used-cars/abbottabad/727521' }
    ],
    make: [
      [
        { img: 'https://cache3.pakwheels.com/system/car_manufacturers/manufacturers/000/000/041/resized/Suzuki.png', text: 'Suzuki', url: '/used-cars/suzuki/32' },
        { img: 'https://cache4.pakwheels.com/system/car_manufacturers/manufacturers/000/000/042/resized/Tyota.png', text: 'Toyota', url: '/used-cars/toyota/33' },
        { img: 'https://cache2.pakwheels.com/system/car_manufacturers/manufacturers/000/000/014/resized/Honda.png', text: 'Honda', url: '/used-cars/honda/14' },
        { img: 'https://cache1.pakwheels.com/system/car_manufacturers/manufacturers/000/000/008/resized/daihatsu.png', text: 'Daihatsu', url: '/used-cars/daihatsu/12' },
        { img: 'https://cache1.pakwheels.com/system/car_manufacturers/manufacturers/000/000/030/resized/Nisan.png', text: 'Nissan', url: '/used-cars/nissan/26' },
        { img: 'https://cache3.pakwheels.com/system/car_manufacturers/manufacturers/000/000/016/resized/hyundai.png', text: 'Hyundai', url: '/used-cars/hyundai/15' }
      ],
      [
        { img: 'https://cache3.pakwheels.com/system/car_manufacturers/manufacturers/000/000/021/resized/2.png', text: 'KIA', url: '/used-cars/kia/19' },
        { img: 'https://cache2.pakwheels.com/system/car_manufacturers/manufacturers/000/000/029/resized/Mitsubishi.png', text: 'Mitsubishi', url: '/used-cars/mitsubishi/25' },
        { img: 'https://cache1.pakwheels.com/system/car_manufacturers/manufacturers/000/000/068/resized/4.png', text: 'Changan', url: '/used-cars/changan/47' },
        { img: 'https://cache3.pakwheels.com/system/car_manufacturers/manufacturers/000/000/121/resized/Haval.png', text: 'Haval', url: '/used-cars/haval/714237' },
        { img: 'https://cache2.pakwheels.com/system/car_manufacturers/manufacturers/000/000/027/resized/mercedes.png', text: 'Mercedes Benz', url: '/used-cars/mercedes-benz/23' },
        { img: 'httpsim://cache1.pakwheels.com/system/car_manufacturers/manufacturers/000/000/060/resized/580b57fcd9996e24bc43c498.png', text: 'MG', url: '/used-cars/mg/121559' }
      ]
    ],
    models: [
      { text: 'Corolla', url: '/used-cars/toyota-corolla/688' },
      { text: 'Civic', url: '/used-cars/honda-civic/642' },
      { text: 'Mehran', url: '/used-cars/suzuki-mehran/661' },
      { text: 'Alto', url: '/used-cars/suzuki-alto/658' },
      { text: 'Cultus', url: '/used-cars/suzuki-cultus/660' },
      { text: 'City', url: '/used-cars/honda-city/664' },
      { text: 'Wagon R', url: '/used-cars/suzuki-wagon-r/801' },
      { text: 'Vitz', url: '/used-cars/toyota-vitz/781' },
      { text: 'Swift', url: '/used-cars/suzuki-swift/778' },
      { text: 'Bolan', url: '/used-cars/suzuki-bolan/693' },
      { text: 'Raize', url: '/used-cars/toyota-raize/619367' },
      { text: 'Mira', url: '/used-cars/daihatsu-mira/788' }
    ],
    budgets: [
      { text: 'Cars under 5 Lakhs', url: '/used-cars/cars-under-5-lakhs/475870' },
      { text: 'Cars under 10 Lakhs', url: '/used-cars/cars-under-10-lakhs/262671' },
      { text: 'Cars under 20 Lakhs', url: '/used-cars/cars-under-20-lakhs/477658' },
      { text: 'Cars under 30 Lakhs', url: '/used-cars/cars-under-30-lakhs/478256' },
      { text: 'Cars under 40 Lakhs', url: '/used-cars/cars-under-40-lakhs/478430' },
      { text: 'Cars under 50 Lakhs', url: '/used-cars/cars-under-50-lakhs/2648485' }
    ],
    bodyType: [
      [
        { img: 'https://wsa3.pakwheels.com/assets/browse-more/car-bt-hatchback-ec43a5e066bc7458a63c2e12b5517c2999bf12b5674d965b279bb7ca6d06937b.svg', text: 'Hatchback', url: '/used-cars/hatchback/107774' },
        { img: 'https://wsa2.pakwheels.com/assets/browse-more/car-bt-sedan-61da95e38e3fcb936b95d32e99375be13044dfff9727ad669a09a0a094be7514.svg', text: 'Sedan', url: '/used-cars/sedan/107775' },
        { img: 'https://wsa4.pakwheels.com/assets/browse-more/car-bt-suv-8e3e4a9cedfad456441087283a16bfab5e303746782ed6193dd92a24b1637856.svg', text: 'SUV', url: '/used-cars/suv/107776' },
        { img: 'https://wsa3.pakwheels.com/assets/browse-more/car-bt-crossover-31f36e7f32099f56af888a6b1a7a539d563c40c2cec0b9e5d4965e0461fd7e64.svg', text: 'Crossover', url: '/used-cars/crossover/107782' },
        { img: 'https://wsa4.pakwheels.com/assets/browse-more/car-bt-mini-van-a52760d8f30b5bb6c5f1f407a0bf8fbf7e977f32768b7d56a4f75baa3d385d6b.svg', text: 'Mini Van', url: '/used-cars/mini-van/107785' },
        { img: 'https://wsa4.pakwheels.com/assets/browse-more/car-bt-van-7889fe07e987359929c59b607f5148f73294ecaacc428b12e73a12bbffc6c210.svg', text: 'Van', url: '/used-cars/van/162471' }
      ],
      [
        { img: 'https://wsa1.pakwheels.com/assets/browse-more/car-bt-compact-sedan-f73c0a351c9b87edd48706f8365fc2d2167b9fa12a6de228f8e8bf55e627f0d0.svg', text: 'Compact sedan', url: '/used-cars/compact-sedan/441106' },
        { img: 'https://wsa3.pakwheels.com/assets/browse-more/car-bt-micro-van-00bbd00b6c09c15042119fd5c1e79b9aaf881b136d8ce3c6805580307fcb5217.svg', text: 'Micro Van', url: '/used-cars/micro-van/107781' },
        { img: 'httpsww.pakwheels.com/assets/browse-more/car-bt-mpv-4a70e4d5eafe24251749e5f22cabccd309e85e4ee0ab647167706e701ff256dd.svg', text: 'MPV', url: '/used-cars/mpv/145760' },
        { img: 'https://wsa2.pakwheels.com/assets/browse-more/car-bt-compact-suv-eb7289d94c3fae4c6a3666f46b50b7629694c379c258d44588a20589624bd80b.svg', text: 'Compact SUV', url: '/used-cars/compact-suv/647299' },
        { img: 'https://wsa2.pakwheels.com/assets/browse-more/car-bt-double-cabin-7557b55ff47b4637921c0afa59c077bf503332513fd4f654a111da1e2a26a017.svg', text: 'Double Cabin', url: '/used-cars/double-cabin/266839' },
        { img: 'https://wsa2.pakwheels.com/assets/browse-more/car-bt-pick-up-f36f25b76226a2cfc1a3148332640e9f6df909d8bfa83f5d104a66c3a6c9b955.svg', text: 'Pick Up', url: '/used-cars/pick-up/266837' }
      ]
    ]
  };

  // Handle tab change
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  // Safe slide navigation with bounds checking
  const nextSlide = (type) => {
    setActiveSlide(prev => {
      const totalSlides = slides[type]?.length || 0;
      if (totalSlides <= 1) return prev;
      
      const nextIndex = (prev[type] + 1) % totalSlides;
      return { ...prev, [type]: nextIndex };
    });
  };

  const prevSlide = (type) => {
    setActiveSlide(prev => {
      const totalSlides = slides[type]?.length || 0;
      if (totalSlides <= 1) return prev;
      
      const prevIndex = (prev[type] - 1 + totalSlides) % totalSlides;
      return { ...prev, [type]: prevIndex };
    });
  };

  const goToSlide = (type, index) => {
    const totalSlides = slides[type]?.length || 0;
    if (index < 0 || index >= totalSlides) return;
    
    setActiveSlide(prev => ({ 
      ...prev, 
      [type]: index 
    }));
  };

  // Touch event handlers
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    const currentTabType = activeTab;
    
    if (isLeftSwipe && slides[currentTabType]) nextSlide(currentTabType);
    if (isRightSwipe && slides[currentTabType]) prevSlide(currentTabType);

    setTouchStart(null);
    setTouchEnd(null);
  };


  // Handle link clicks
  const handleLinkClick = (e, text) => {
    console.log('Navigating to:', text);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-5">
      <h2 className="text-2xl font-bold mb-5">Browse Used Cars</h2>
      
      {/* Tabs */}
      <div className="relative mb-5">
        <ul className="flex flex-wrap border-b border-gray-300 mb-5 -mx-2">
          {['category', 'city', 'make', 'model', 'budget', 'bodyType'].map(tab => (
            <li key={tab} className="px-2">
              <button
                onClick={() => handleTabChange(tab)}
                className={`block px-4 py-2.5 font-bold border-2 border-transparent rounded-t-xl transition-all duration-200 hover:scale-105 ${
                  activeTab === tab
                    ? 'text-purple-700 border-purple-300 border-b-transparent bg-white'
                    : 'text-gray-700 hover:bg-purple-50 hover:text-purple-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        {/* Tab Content */}
        <div className="relative mt-5">
          {/* Category Tab */}
          {activeTab === 'category' && (
            <div 
              ref={carouselRef}
              className="relative overflow-hidden touch-pan-y"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div className="relative pb-6">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${activeSlide.category * 100}%)` }}
                >
                  {slides.category.map((slideItems, index) => (
                    <ul
                      key={`category-slide-${index}`}
                      className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full flex-shrink-0"
                    >
                      {slideItems.map((item, idx) => (
                        <li key={`category-item-${index}-${idx}`} className="text-center">
                          <a
                            href={item.url}
                            className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-200 transition-all hover:-translate-y-0.5 h-full flex flex-col items-center justify-center"
                            onClick={(e) => handleLinkClick(e, item.text)}
                          >
                            <img
                              alt={item.text}
                              src={item.img.trim()}
                              className="block mx-auto mb-2 max-h-12 w-auto"
                              loading="lazy"
                            />
                            <span className="text-xs font-medium text-gray-700 mt-1">{item.text}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>

                {/* Indicators */}
                {slides.category.length > 1 && (
                  <ol className="absolute bottom-0 left-0 right-0 flex justify-center z-10 space-x-2">
                    {slides.category.map((_, index) => (
                      <li key={`category-indicator-${index}`}>
                        <button
                          onClick={() => goToSlide('category', index)}
                          className={`w-2.5 h-2.5 rounded-lg transition-all duration-300 ${
                            activeSlide.category === index ? 'bg-gradient-to-r from-purple-600 to-purple-700 scale-125' : 'bg-gray-300'
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                        >
                          <span className="sr-only">Slide {index + 1}</span>
                        </button>
                      </li>
                    ))}
                  </ol>
                )}

                {/* Controls - NEW ARROW UI */}
                {slides.category.length > 1 && (
                  <>
                    <button
                      onClick={() => prevSlide('category')}
                      className="absolute top-1/2 -translate-y-1/2 left-2 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-2xl flex items-center justify-center opacity-95 hover:opacity-100 hover:scale-110 active:scale-95 transition-all duration-200 z-20"
                      aria-label="Previous slide"
                    >
                      <span className="text-2xl font-bold">‹</span>
                    </button>
                    <button
                      onClick={() => nextSlide('category')}
                      className="absolute top-1/2 -translate-y-1/2 right-2 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-2xl flex items-center justify-center opacity-95 hover:opacity-100 hover:scale-110 active:scale-95 transition-all duration-200 z-20"
                      aria-label="Next slide"
                    >
                      <span className="text-2xl font-bold">›</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* City Tab - NEW TAB UI */}
          {activeTab === 'city' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {slides.cities.map((city, index) => (
                <div key={`city-${index}`} className="text-center">
                  <a
                    href={city.url}
                    className="block p-3 py-8 bg-gray-50 hover:bg-white rounded-lg border border-gray-200 hover:border-purple-200 transition-all hover:-translate-y-0.5 h-full flex items-center justify-center group"
                    onClick={(e) => handleLinkClick(e, city.text)}
                  >
                    <span className="text-sm font-bold text-gray-800 group-hover:text-purple-700 transition-colors">{city.text}</span>
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Make Tab */}
          {activeTab === 'make' && (
            <div 
              ref={carouselRef}
              className="relative overflow-hidden touch-pan-y"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div className="relative pb-6">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${activeSlide.make * 100}%)` }}
                >
                  {slides.make.map((slideItems, index) => (
                    <ul
                      key={`make-slide-${index}`}
                      className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full flex-shrink-0"
                    >
                      {slideItems.map((item, idx) => (
                        <li key={`make-item-${index}-${idx}`} className="text-center">
                          <a
                            href={item.url}
                            className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-200 transition-all hover:-translate-y-0.5 h-full flex flex-col items-center justify-center"
                            onClick={(e) => handleLinkClick(e, item.text)}
                          >
                            <img
                              alt={item.text}
                              src={item.img.trim()}
                              className="block mx-auto mb-2 max-h-14 w-auto"
                              loading="lazy"
                            />
                            <span className="text-xs font-medium text-gray-700 mt-1">{item.text}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>

                {/* Indicators */}
                {slides.make.length > 1 && (
                  <ol className="absolute bottom-0 left-0 right-0 flex justify-center z-10 space-x-2">
                    {slides.make.map((_, index) => (
                      <li key={`make-indicator-${index}`}>
                        <button
                          onClick={() => goToSlide('make', index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            activeSlide.make === index ? 'bg-gradient-to-r from-purple-600 to-purple-700' : 'bg-gray-300'
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                        >
                          <span className="sr-only">Slide {index + 1}</span>
                        </button>
                      </li>
                    ))}
                  </ol>
                )}

                {/* Controls - NEW ARROW UI */}
                {slides.make.length > 1 && (
                  <>
                    <button
                      onClick={() => prevSlide('make')}
                      className="absolute top-1/2 -translate-y-1/2 left-2 w-10 h-10 rounded-full bg-white text-purple-700 shadow-lg flex items-center justify-center opacity-90 hover:opacity-100 transition-all z-20"
                      aria-label="Previous slide"
                    >
                      <span className="text-2xl font-bold">‹</span>
                    </button>
                    <button
                      onClick={() => nextSlide('make')}
                      className="absolute top-1/2 -translate-y-1/2 right-2 w-10 h-10 rounded-full bg-white text-purple-700 shadow-lg flex items-center justify-center opacity-90 hover:opacity-100 transition-all z-20"
                      aria-label="Next slide"
                    >
                      <span className="text-2xl font-bold">›</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Model Tab - NEW TAB UI */}
          {activeTab === 'model' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {slides.models.map((model, index) => (
                <div key={`model-${index}`} className="text-center">
                  <a
                    href={model.url}
                    className="block p-3 py-8 bg-gray-50 hover:bg-white rounded-lg border border-gray-200 hover:border-purple-200 transition-all hover:-translate-y-0.5 h-full flex items-center justify-center group"
                    onClick={(e) => handleLinkClick(e, model.text)}
                  >
                    <span className="text-sm font-semibold text-gray-800 group-hover:text-purple-700 transition-colors">{model.text}</span>
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Budget Tab - NEW TAB UI */}
          {activeTab === 'budget' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {slides.budgets.map((budget, index) => (
                <div key={`budget-${index}`} className="text-center">
                  <a
                    href={budget.url}
                    className="block p-3 py-8 bg-gray-50 hover:bg-white rounded-lg border border-gray-200 hover:border-purple-200 transition-all hover:-translate-y-0.5 h-full flex items-center justify-center group"
                    onClick={(e) => handleLinkClick(e, budget.text)}
                  >
                    <span className="text-sm font-semibold text-gray-800 group-hover:text-purple-700 transition-colors text-center">{budget.text}</span>
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Body Type Tab */}
          {activeTab === 'bodyType' && (
            <div 
              ref={carouselRef}
              className="relative overflow-hidden touch-pan-y"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div className="relative pb-6">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${activeSlide.bodyType * 100}%)` }}
                >
                  {slides.bodyType.map((slideItems, index) => (
                    <ul
                      key={`bodytype-slide-${index}`}
                      className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full flex-shrink-0"
                    >
                      {slideItems.map((item, idx) => (
                        <li key={`bodytype-item-${index}-${idx}`} className="text-center">
                          <a
                            href={item.url}
                            className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-200 transition-all hover:-translate-y-0.5 h-full flex flex-col items-center justify-center"
                            onClick={(e) => handleLinkClick(e, item.text)}
                          >
                            <img
                              alt={item.text}
                              src={item.img.trim()}
                              className="block mx-auto mb-2 max-h-12 w-auto"
                              loading="lazy"
                            />
                            <span className="text-xs font-medium text-gray-700 mt-1">{item.text}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>

                {/* Indicators */}
                {slides.bodyType.length > 1 && (
                  <ol className="absolute bottom-0 left-0 right-0 flex justify-center z-10 space-x-2">
                    {slides.bodyType.map((_, index) => (
                      <li key={`bodytype-indicator-${index}`}>
                        <button
                          onClick={() => goToSlide('bodyType', index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            activeSlide.bodyType === index ? 'bg-gradient-to-r from-purple-600 to-purple-700' : 'bg-gray-300'
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                        >
                          <span className="sr-only">Slide {index + 1}</span>
                        </button>
                      </li>
                    ))}
                  </ol>
                )}

                {/* Controls - NEW ARROW UI */}
                {slides.bodyType.length > 1 && (
                  <>
                    <button
                      onClick={() => prevSlide('bodyType')}
                      className="absolute top-1/2 -translate-y-1/2 left-2 w-10 h-10 rounded-full bg-white text-purple-700 shadow-lg flex items-center justify-center opacity-90 hover:opacity-100 transition-all z-20"
                      aria-label="Previous slide"
                    >
                      <span className="text-2xl font-bold">‹</span>
                    </button>
                    <button
                      onClick={() => nextSlide('bodyType')}
                      className="absolute top-1/2 -translate-y-1/2 right-2 w-10 h-10 rounded-full bg-white text-purple-700 shadow-lg flex items-center justify-center opacity-90 hover:opacity-100 transition-all z-20"
                      aria-label="Next slide"
                    >
                      <span className="text-2xl font-bold">›</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseCategory;
