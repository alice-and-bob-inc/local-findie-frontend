function HomePage() {
    return (
        <div className="relative min-h-full bg-home-page bg-no-repeat bg-contain bg-[center_bottom_10px]">

            <div className="absolute inset-0 bg-white opacity-0"></div>
            
            <div className="top-28 relative z-10 flex justify-around">
                <h3 className="ml-2 max-w-sm text-xl leading-loose font-semibold text-gray-700">
                    Discover the best local businesses around you!
                </h3>
                <h3 className="mt-10 pr-20 max-w-2xl text-xl leading-loose font-semibold text-gray-700">
                    Browse reviews, explore hidden gems, and support your local community with just a few clicks!
                </h3>
            </div>
        </div>
    );
} 

export default HomePage;