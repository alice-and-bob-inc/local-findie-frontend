import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditBusiness () {

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [foundedYear, setFoundedYear] = useState("");
  const [openingHours, setOpeningHours] = useState("");

  const { businessId } = useParams();
  const navigate = useNavigate();


  useEffect( () => {
    axios.get(`http://localhost:5005/api/businesses/${businessId}`)
      .then((response) =>{
          const currentBusiness = response.data;

          {/* ......................................................................
            When some info is not provided, the state is set to undefined. Fix that!
            ........................................................................*/}

          if(currentBusiness) {
            setName(currentBusiness.name);
            // setImage(currentBusiness.image);
            // setDescription(currentBusiness.description);
            setLocation(currentBusiness.location);
            setCategory(currentBusiness.category);
            // setFoundedYear(currentBusiness.foundedYear);
            // setOpeningHours(currentBusiness.openingHours)
          }
          else {
            console.log("Error trying to fetch a specific business")
          }
      })
      .catch((error) => {
          console.log("Error trying to fetch a specific business ", error);
      })
  }, [businessId]);
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBusiness = { name, image, description, location, category, foundedYear, openingHours };

    axios.put(`http://localhost:5005/api/businesses/${businessId}`, newBusiness)
        .then((response) => {
            navigate(`/businesses)/${businessId}`);
        })
        .catch((error) => console.log(error));
  };


  return (
    <>
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
            placeholder="https://example.com/path/to/placeholder-image.jpg"
            value={image}
            onChange={(e) => setImage(e.target.value)}
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

        <label>
          Opening Hours
          <input
            type="text"
            name="openingHours"
            placeholder="Monday to Saturday - From 09:00 to 21:00"
            value={openingHours}
            onChange={(e) => setOpeningHours(e.target.value)}
          />
        </label>
        <hr />

        <button type="submit">Update</button>
      </form>
    </>
  );
}

export default EditBusiness;
