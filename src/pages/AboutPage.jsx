function AboutPage () {
    return (
        <div className="pt-16 flex flex-col items-center container mx-auto p-4">
            <div className="card box-border w-10/12 min-h-96 m-3 p-12 flex flex-col">
                <p className="w-6/12 py-8 leading-loose">At Local Findie, we're passionate about connecting you with the best local businesses. Our mission is to make it easier for you to discover and support local gems, from restaurants and shops to services and more. We believe that every local business has a story to tell, and we're here to help you find it.</p>
                <div className="w-6/12 ml-auto py-8 leading-loose">
                    <h3 className="text-xl font-semibold">Why Choose Local Findie?</h3>
                    <p>Comprehensive directory of local businesses</p>
                    <p>Honest reviews from real customers</p>
                    <p>Easy-to-use platform with powerful search features</p>
                </div>
                <p className="py-8 leading-loose">Join us in celebrating the uniqueness of our community by finding, reviewing, and sharing your favorite local spots!</p>
            </div>
        </div>
    )
}

export default AboutPage;