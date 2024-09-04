import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginRequest = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    axios
      .post("http://localhost:5005/auth/login", user)
      .then((response) => {
        console.log("succesfully logged in!");
        localStorage.setItem("JWT", response.data.authToken)
        navigate("/")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <form onSubmit={signUpRequest}>
        <label>
          E-mail
          <textarea
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <hr />

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
    </>
  );
}

export default LoginPage;
