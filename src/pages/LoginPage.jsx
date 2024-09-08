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
    <>
      <form className="m-20" onSubmit={loginRequest}>
        <label>
          E-mail
          <textarea
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Password
          <input
            type="text"
            name="pasword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}

      <p>Don't have an account yet?</p>
      <Link to="/signup">Sign up</Link>

    </>
  );
}

export default LoginPage;
