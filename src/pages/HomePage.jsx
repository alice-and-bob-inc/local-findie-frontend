import NavBar from "../components/NavBar";

function HomePage() {
    return (
        <div className="min-h-full min-w-full bg-home-page bg-no-repeat bg-contain bg-[center_bottom_10px]">
            <NavBar/>
            <div className="pt-16">
                <h1 className="my-12 min-w-md pt-5 text-md sm:text-lg md:text-xl lg:text-2xl text-center leading-loose font-semibold text-gray-700 [text-shadow:_0_4px_4px_rgb(255_255_255_/_0.8)]">
                    Welcome to Local Findie!
                </h1>
                <h3 className="block mx-auto min-w-xl max-w-4xl mx-50 px-10 text-xs sm:text-sm md:text-md lg:text-lg text-center leading-loose font-semibold text-gray-700 [text-shadow:_0_4px_4px_rgb(255_255_255_/_0.8)]">
                    Discover the best local businesses around you! Browse reviews, explore hidden gems, and support your local community with just a few clicks!
                </h3>
            </div>
        </div>
    );
} 

export default HomePage;