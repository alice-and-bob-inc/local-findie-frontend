import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import businessService from "../services/business.services";
import NavBar from "../components/NavBar";
import { AuthContext } from "../context/auth.context";

function EditBusiness () {
  const [ error, setError ] = useState(null);
  const [ name, setName ] = useState("");
  const [ imageURL, setImageURL ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ location, setLocation ] = useState("");
  const [ category, setCategory ] = useState("");
  const [ foundedYear, setFoundedYear ] = useState("");
  const [ websiteURL, setWebsiteURL ] = useState("");
  const [ openingHours, setOpeningHours ] = useState({
    monFrom: "",
    monTill: "",
    tueFrom: "",
    tueTill: "",
    wedFrom: "",
    wedTill: "",
    thuFrom: "",
    thuTill: "",
    friFrom: "",
    friTill: "",
    satFrom: "",
    satTill: "",
    sunFrom: "",
    sunTill: "",
  });

  const { user } = useContext(AuthContext);
  const { businessId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    businessService
      .getBusiness(businessId)
      .then((response) => {
        const currentBusiness = response.data;
        // Redirect user to businessDetail page if user is not the creator of currentBusiness
        if(currentBusiness.user !== user._id){navigate(`/businesses/${currentBusiness._id}`)}

        // Prefill the values that are currently stored in the database, in the form
        if (currentBusiness) {
          currentBusiness.name && setName(currentBusiness.name);
          currentBusiness.imageURL && setImageURL(currentBusiness.imageURL);
          currentBusiness.description && setDescription(currentBusiness.description);
          currentBusiness.location && setLocation(currentBusiness.location);
          currentBusiness.category && setCategory(currentBusiness.category);
          currentBusiness.foundedYear && setFoundedYear(currentBusiness.foundedYear);
          currentBusiness.websiteURL && setWebsiteURL(currentBusiness.websiteURL);
          currentBusiness.openingHours && setOpeningHours(currentBusiness.openingHours);
        } else {
          console.log("Error trying to fetch a specific business");
        }
      })
      .catch((error) => {
        console.log("Error trying to fetch a specific business ", error);
      });
  }, [businessId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let formattedWebsiteURL = websiteURL;
    if (websiteURL && !websiteURL.startsWith("https://")) {
      formattedWebsiteURL = "https://" + websiteURL;
    }

    const requestBody = {
      name,
      imageURL,
      description,
      location,
      category,
      foundedYear,
      websiteURL: formattedWebsiteURL,
      openingHours,
      user
    };
    console.log("editbusiness: ", requestBody)

    businessService
      .updateBusiness(businessId, requestBody)
      .then((response) => {
        navigate(`/businesses/${businessId}`);
      })
      .catch((error) => setError(error));
  };

  const handleOpeningHoursChange = (day, type, value) => {
    setOpeningHours((prev) => ({
      ...prev,
      [`${day}${type}`]: value,
    }));
  };

  const renderOpeningHours = () => {
    const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

    return days.map((day) => (

      <div key={day} className="flex-col">
        <label className=" text-gray-700 text-xs sm:text-sm font-bold mb-4">
          {day.charAt(0).toUpperCase() + day.slice(1)}:
        </label>

        <label className=" text-gray-700 text-xs sm:text-sm font-bold mb-4 px-8">
          From:
          <input
            type="time"
            value={openingHours[`${day}From`]}
            onChange={(e) =>
              handleOpeningHoursChange(day, "From", e.target.value)
            }
          />
        </label>

        <label className=" text-gray-700 text-xs sm:text-sm font-bold mb-4">
          Till:
          <input
            type="time"
            value={openingHours[`${day}Till`]}
            onChange={(e) =>
              handleOpeningHoursChange(day, "Till", e.target.value)
            }
          />
        </label>
        
      </div>
    ));
  };

  const handleFileUpload = (e) => {
    const uploadData = new FormData();

    uploadData.append("imageURL", e.target.files[0]);

    businessService.uploadImage(uploadData)
      .then((response) => {
        console.log(response.data.fileURL);
        setImageURL(`${response.data.fileURL}`);
      })
      .catch((error) => {setError(error)})
  };


  return (
    <div className="pb-16">
      <NavBar/>
      <div className="card box-border mt-8 mx-auto w-11/12 sm:w-9/12 md:w-8/12 lg:w-6/12">
        <h3 className="text-xl font-semibold mb-4">Add Business</h3>

        <form className="flex-col" onSubmit={handleSubmit}>
          <label className="block text-gray-700 text-sm font-bold mb-4">
            Name
            <input
              className="mt-1 block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline"
              type="text"
              name="name"
              placeholder="Il Gelatto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label className="block text-gray-700 text-sm font-bold mb-4">
            Image URL
            <input
              className="mt-1 block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline"
              type="url"
              name="image"
              placeholder="https://example.com/path/to/placeholder-image.jpg"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
          </label>
          
          <label className="block text-gray-700 text-sm font-bold mb-4">
            Image Upload
            <input
              className="mt-1 block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline"
              type="file"
              name="image"
              onChange={(e) => handleFileUpload(e)}
            />
          </label>

          <label className="block text-gray-700 text-sm font-bold mb-4">
            Description
            <textarea
              className="mt-1 block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline"
              name="description"
              placeholder="Il Gelatto is the coolest spot for..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <label className="block text-gray-700 text-sm font-bold mb-4">
            Location
            <input
              className="mt-1 block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline"
              type="text"
              name="location"
              placeholder="Amsterdam"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </label>

          <label className="block text-gray-700 text-sm font-bold mb-4">
            Category
            <select
              className="mt-1 block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="arcade">Arcade</option>
              <option value="bakery">Bakery</option>
              <option value="bookstore">Bookstore</option>
              <option value="coffeeshop">Coffee Shop</option>
              <option value="fair">Fair</option>
              <option value="fitness center">Fitness center</option>
              <option value="garden center">Garden center</option>
              <option value="hotel">Hotel</option>
              <option value="movie theater">Movie theater</option>
              <option value="nightclub">Nightclub</option>
              <option value="restaurant">Restaurant</option>
              <option value="retail store">Retail store</option>
              <option value="supermarket">Supermarket</option>
              <option value="wellness center">Wellness center</option>
            </select>
          </label>

          <label className="block text-gray-700 text-sm font-bold mb-4">
            Founded Year
            <input
              className="mt-1 block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline"
              type="number"
              name="foundedYear"
              placeholder="2015"
              value={foundedYear}
              onChange={(e) => setFoundedYear(e.target.value)}
              min={1900}
            />
          </label>

          <label className="block text-gray-700 text-sm font-bold mb-4">
            Webiste URL
            <input 
              className="mt-1 block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline"
              type="text"
              name="websiteURL"
              placeholder="https://yourwebsite.com"
              value={websiteURL}
              onChange={(e) => setWebsiteURL(e.target.value)}
            />
          </label>

          {renderOpeningHours()}
          <div className="box-border min-w-full sm:w-11/12 md:w-10/12 lg:w-8/12 max-h-96 flex flex-col md:flex-row items-center justify-center mt-4">
            <button
              className="block bg-green-500 hover:bg-green-700 text-white font-bold px-4 py-2 mx-1 rounded focus:outline-black focus:shadow-outline"
              type="submit"
              >
              Update
            </button>
            <Link to={`/businesses/${businessId}`}>
                <button className="card bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-1 px-4 mx-1 rounded focus:shadow-outline">
                    Cancel
                </button>
            </Link>
          </div>
        </form>
        {error && <p className="block text-gray-700 text-lg font-semibold mb-4 text-center mt-6">{error}</p>}
      </div>
    </div>
  );
}

export default EditBusiness;
