import { useState } from "react";

function AboutPage () {
    const [ showFaces, setShowFaces ] = useState(false);

    return (
        <div className="pt-16 flex flex-col items-center container mx-auto p-4 text-center">
            <div className="card box-border w-10/12 min-h-96 m-3 p-12 flex flex-col">

                <p className="py-8 leading-loose">At Local Findie, we're passionate about connecting you with the best local businesses. Our mission is to make it easier for you to discover and support local gems, from restaurants and shops to services and more. We believe that every local business has a story to tell, and we're here to help you find it.</p>
                <div className="w-6/12 mx-auto py-8 leading-loose">
                    <h3 className="text-xl font-semibold mb-2">Why Choose Local Findie?</h3>
                    <p> - Comprehensive directory of local businesses</p>
                    <p> - Honest reviews from real customers</p>
                    <p> - Easy-to-use platform with powerful search features</p>
                </div>
                <p className="py-8 leading-loose">Join us in celebrating the uniqueness of our community by finding, reviewing, and sharing your favorite local spots!</p>

                {showFaces
                ? (
                    <div>
                        <div className="flex justify-center mb-10">
                            <div className="mx-2 card w-5/12 flex flex-col items-center rounded">
                                <img 
                                    src="../../public/nico.jpeg" 
                                    alt="Nico" 
                                    className="w-6/12 rounded-lg"
                                />
                                <p className="text-lg font-bold">Nico</p>
                                <a 
                                    href="https://de.linkedin.com/in/nicolas-anzoategui-638568203" 
                                    target="_blank"
                                    className="font-bold text-blue-600"
                                >
                                    LinkedIn
                                </a>
                            </div>

                            <div className="mx-2 card w-5/12 flex flex-col items-center rounded">
                                <img 
                                    src="../../public/casper.jpeg" 
                                    alt="Casper" 
                                    className="w-6/12 rounded-lg"
                                />
                                <p className="text-lg font-bold">Casper</p>
                                <a 
                                    href="https://nl.linkedin.com/in/casper-van-rossum-b214a31b0" 
                                    target="_blank"
                                    className="font-bold text-blue-600"
                                >
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                        <button 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-auto w-3/12 py-2 px-4 mx-1 rounded focus:shadow-outline"
                            onClick={() => {setShowFaces(false)}}
                        >
                            Hide parents
                        </button>
                    </div>
                )

                : (
                    <div>
                        <button 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-auto w-3/12 py-2 px-4 mx-1 rounded focus:shadow-outline"
                            onClick={() => {setShowFaces(true)}}
                        >
                            Show parents
                        </button>
                    </div>
                )}


            </div>
        </div>
    )
}

export default AboutPage;