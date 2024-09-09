import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import businessService from "../services/business.services";

function EditBusiness () {
  const [ name, setName ] = useState("");
  const [ imageURL, setImageURL ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ location, setLocation ] = useState("");
  const [ category, setCategory ] = useState("");
  const [ foundedYear, setFoundedYear ] = useState("");
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

  const { businessId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    businessService
      .getBusiness(businessId)
      .then((response) => {
        const currentBusiness = response.data;

        if (currentBusiness) {
          currentBusiness.name && setName(currentBusiness.name);
          currentBusiness.imageURL && setImageURL(currentBusiness.image);
          currentBusiness.description && setDescription(currentBusiness.description);
          currentBusiness.location && setLocation(currentBusiness.location);
          currentBusiness.category && setCategory(currentBusiness.category);
          currentBusiness.foundedYear && setFoundedYear(currentBusiness.foundedYear);
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

    const requestBody = {
      name,
      imageURL,
      description,
      location,
      category,
      foundedYear,
      openingHours,
    };

    businessService
      .updateBusiness(businessId, requestBody)
      .then((response) => {
        navigate(`/businesses/${businessId}`);
      })
      .catch((error) => console.log(error));
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
        <label className=" text-gray-700 text-sm font-bold mb-4">
          {day.charAt(0).toUpperCase() + day.slice(1)}:
        </label>

        <label className=" text-gray-700 text-sm font-bold mb-4 px-8">
          From:
          <input
            type="time"
            value={openingHours[`${day}From`]}
            onChange={(e) =>
              handleOpeningHoursChange(day, "From", e.target.value)
            }
          />
        </label>

        <label className=" text-gray-700 text-sm font-bold mb-4">
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

  return (
    <div className="pt-20 pb-16">
      <div className="card box-border mx-auto max-w-xl">
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
              <option value="restaurant">Restaurant</option>
              <option value="bookstore">Bookstore</option>
              <option value="coffeeshop">Coffee Shop</option>
              <option value="arcade">Arcade</option>
              <option value="fair">Fair</option>
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

          {renderOpeningHours()}

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded focus:outline-black focus:shadow-outline min-w-40"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditBusiness;
