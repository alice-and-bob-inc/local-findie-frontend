import { useState } from "react";
import { useNavigate } from "react-router-dom";
import businessService from "../services/business.services";

function CreateBusiness() {
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [foundedYear, setFoundedYear] = useState("");
  const [openingHours, setOpeningHours] = useState({
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

  const navigate = useNavigate();

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
      .createBusiness(requestBody)
      .then((response) => {
        navigate("/businesses");
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
        <label>{day.charAt(0).toUpperCase() + day.slice(1)}:</label>
        <label className="p-2">
          From:
          <input
            type="time"
            value={openingHours[`${day}From`]}
            onChange={(e) =>
              handleOpeningHoursChange(day, "From", e.target.value)
            }
          />
        </label>
        <label className="p-2">
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
    <div className="min-h-full pt-20 pb-12">
      <div className="card mx-auto max-w-lg">
        <h3 className="mb-5 text-lg">Add Business</h3>

        <form className="flex-col space-y-4" onSubmit={handleSubmit}>
          <label className="flex-col">
            Name
            <input
              className="block"
              type="text"
              name="name"
              placeholder="Il Gelatto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label className="flex-col">
            Image URL
            <input
              className="block"
              type="url"
              name="image"
              placeholder="https://example.com/path/to/image.jpg"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
          </label>

          <label className="flex-col">
            Description
            <textarea
              className="block"
              name="description"
              placeholder="Il Gelatto is the coolest spot for..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <label className="flex-col">
            Location
            <input
              className="block"
              type="text"
              name="location"
              placeholder="Amsterdam"
              min={1}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </label>

          <label className="flex-col">
            Category
            <select
              className="block"
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

          <label className="flex-col">
            Founded Year
            <input
              className="block"
              type="number"
              name="foundedYear"
              placeholder="2015"
              value={foundedYear}
              onChange={(e) => setFoundedYear(e.target.value)}
              min={1900}
            />
          </label>

          {renderOpeningHours()}

          <button className="flex mt-5 text-lg" type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBusiness;
