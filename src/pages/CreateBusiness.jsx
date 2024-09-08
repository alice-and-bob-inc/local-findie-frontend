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

    const requestBody = { name, imageURL, description, location, category, foundedYear, openingHours };

    businessService.createBusiness(requestBody)
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
      <div key={day}>
        <label>{day.charAt(0).toUpperCase() + day.slice(1)}:</label>
        <label>From:
          <input
            type="time"
            value={openingHours[`${day}From`]}
            onChange={(e) => handleOpeningHoursChange(day, "From", e.target.value)}
          />
        </label>
        <label>Till:
          <input
            type="time"
            value={openingHours[`${day}Till`]}
            onChange={(e) => handleOpeningHoursChange(day, "Till", e.target.value)}
          />
        </label>
        <hr />
      </div>
    ));
  };


  return (
    <div className="pt-20 ml-5">
      <h3>Add Business</h3>

      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            placeholder="Il Gelatto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <hr />

        <label>
          Image URL
          <input
            type="url"
            name="image"
            placeholder="https://example.com/path/to/image.jpg"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </label>
        <hr />

        <label>
          Description
          <textarea
            name="description"
            placeholder="Il Gelatto is the coolest spot for..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <hr />

        <label>
          Location
          <input
            type="text"
            name="location"
            placeholder="Amsterdam"
            min={1}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </label>
        <hr />

        <label>
          Category
          <select
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
        <hr />

        <label>
          Founded Year
          <input
            type="number"
            name="foundedYear"
            placeholder="2015"
            value={foundedYear}
            onChange={(e) => setFoundedYear(e.target.value)}
            min={1900}
          />
        </label>
        <hr />

        {renderOpeningHours()}

        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateBusiness;
