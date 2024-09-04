import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();


    const signUpRequest = (e) => {
        e.preventDefault();

        const newUser = {
            name, email, password
        }
        
        axios.post("http://localhost:5005/auth/signup", newUser)
            .then((response) => {
                console.log("succesfully signed up!")
                navigate("/login");
            })
            .catch((error) => {
                console.log(error)
            })
            
    }


  return (
    <>
      <form onSubmit={signUpRequest}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <hr />

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

        <button type="submit" >Sign Up</button>
      </form>
    </>
  );
}

export default SignupPage;
