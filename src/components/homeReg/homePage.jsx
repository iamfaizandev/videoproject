import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { RegisterLink } from "../userRegister/userRegLink";
import { Nav } from "../nav/nav";
import "./homepage.css";

export function HomePage() {
  const [userEmail, setEmail] = useState("");
  const [users, setUsers] = useState([
    { UserId: "", UserName: "", Password: "", Email: "", Mobile: "" },
  ]);
  const [userErorr, setUserError] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:2200/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleGetStartedClick() {
    var user = users.find((item) => item.Email === userEmail);
    if (user === undefined) {
      setUserError(<RegisterLink />);
    }
  }

  return (
    <div className="container-fluid bg-shadow homePage">
      <Nav />
      <main className="d-flex justify-content-center main ">
        <div>
          <h1>Watch Videos Any where</h1>
          <p className="text-center mt-4 mb-4">
            Please register for more technology videos
          </p>
          <div className="input-group">
            <input
              onChange={handleEmailChange}
              type="email"
              className="form-control"
              placeholder="Your email addess"
            />
            <Button
              onClick={handleGetStartedClick}
              variant="contained"
              color="info"
            >
              Get Started
            </Button>
          </div>
          <p className="text-danger"> {userErorr} </p>
        </div>
      </main>
    </div>
  );
}
