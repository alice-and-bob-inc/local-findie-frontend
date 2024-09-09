import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.services";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const loginRequest = (e) => {
    e.preventDefault();

    const requestBody = {
      email,
      password,
    };

    authService.login(requestBody)
      .then((response) => {
        console.log("succesfully logged in!");
        console.log("JWT Token", response.data.authToken);

        // Store the token in localstorage in the auth.context file
        storeToken(response.data.authToken);

        // Authenticate the user in auth.context file
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data.message)
      });
  };

  return (
    <div className="pt-32">
      <form className="flex-col card box-border mx-auto max-w-sm" onSubmit={loginRequest}>
        <label className="block text-gray-700 text-sm font-bold mb-4">
          E-mail
          <textarea
            className="mt-1 block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="block text-gray-700 text-sm font-bold mb-4">
          Password
          <input
            className="mt-1 block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline"
            type="text"
            name="pasword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        
        <button type="submit" className="card block bg-blue-500 hover:bg-blue-700 text-white font-bold m-auto py-2 px-4 mt-3 rounded focus:outline-black focus:shadow-outline min-w-40">Login</button>
      </form>

      {errorMessage && <p>{errorMessage}</p>}

      <div className="flex-col card box-border mx-auto max-w-sm mt-20">

        <p className="block text-gray-700 text-lg font-semibold mb-4">Don't have an account yet?</p>
        <Link className="card block bg-blue-500 hover:bg-blue-700 text-white text-center font-bold mx-auto py-2 px-4 mt-3 rounded focus:outline-black focus:shadow-outline max-w-40" to="/signup">Sign Up</Link>
      
      </div>

    </div>
  );
}

export default LoginPage;
