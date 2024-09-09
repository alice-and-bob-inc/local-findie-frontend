import { Link } from "react-router-dom";

function NotFoundPage () {
    return (
        <div className="pt-16 flex flex-col items-center container mx-auto p-4">
            <div className="card box-border w-10/12 min-h-96 m-3 p-12 flex flex-col">
                <h2  className="text-xl font-semibold leading-loose">Oops! Page Not Found</h2>

                <p className="leading-loose">It looks like you've wandered off the beaten path. The page you're looking for doesn't exist. But don't worry! You can still find your way back to discover amazing local businesses.</p>
                <Link to={"/"} className="self-center mt-20">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-1 rounded focus:shadow-outline">
                        Back to Home
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default NotFoundPage;