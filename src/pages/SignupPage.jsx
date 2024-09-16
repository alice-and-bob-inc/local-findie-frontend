import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import authService from "../services/auth.services";
import NavBar from "../components/NavBar";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  
  const navigate = useNavigate();

  const signUpRequest = (e) => {
      e.preventDefault();

      const requestBody = {
          name, email, password
      }
      
      authService.signup(requestBody)
          .then((response) => {
              console.log("succesfully signed up!")
              navigate("/login");
          })
          .catch((error) => {
              console.log(error)
              setErrorMessage(error.response.data.message)
          })
          
  }

  return (
    <div>
      <NavBar/>
      <form className="flex-col card box-border mt-8 mx-auto max-w-sm w-10/12 sm:w-7/12 md:w-5/12 lg:w-4/12" onSubmit={signUpRequest}>
        <label className="block text-gray-700 text-sm font-bold mb-4">
          Name
          <input
            className="mt-1 block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label className="block text-gray-700 text-sm font-bold mb-4">
          E-mail
          <textarea
            className="mt-1 block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline"
            name="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="block text-gray-700 text-sm font-bold mb-4">
          Password
          <input
            className="mt-1 block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline"
            type="password"
            name="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit" className="card block mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded focus:outline-black focus:shadow-outline min-w-40">Sign Up</button>
        {errorMessage && <p className="block text-gray-700 text-md font-semibold mb-4 text-center mt-6">{errorMessage}</p>}
      </form>

    </div>
  );
}

export default SignupPage;
