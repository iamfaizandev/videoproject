import { Link } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./userlogin.css";
import { Nav } from "../nav/nav";

export function UserLogin() {
  let navigate = useNavigate();
  const [users, setUsers] = useState([
    { id: "", username: "", password: "", email: "", phone: "", name: "" },
  ]);
  console.log("Users:", users);
  const [userError, setUserError] = useState("");

  const [cookies, setCookie, removeCookie] = useCookies("userName");

  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },
    onSubmit: (values) => {
      var user = users.find((item) => item.email === values.Email);
      if (user.password === values.Password) {
        setCookie("userName", user.name.firstname);
        navigate("/userdashboard");
      } else {
        setUserError("Invalid Credentials");
      }
    },
  });

  useEffect(() => {
    axios.get("https://fakestoreapi.com/users").then((response) => {
      console.log(response.data);
      setUsers(response.data);
    });
  }, []);

  return (
    <div className="login_Page">
      <Nav />
      <form
        className="login_Form form  PhoneWidthForm "
        onSubmit={formik.handleSubmit}
      >
        <h3 className="text-center">User Login</h3>
        <label className="form-label" htmlFor="Email Id">
          Email Id
        </label>
        <input
          className="form-control mb-4"
          type="text"
          name="Email"
          placeholder="example@gmail.com"
          onChange={formik.handleChange}
        />
        <label className="form-label" htmlFor="Password">
          Password
        </label>
        <input
          className="form-control "
          type="password"
          name="Password"
          onChange={formik.handleChange}
        />
        <div>
          dbl click for copy
          <br />
          Email:
          <span
            className="text-danger"
            onDoubleClick={() =>
              navigator.clipboard
                .writeText("john@gmail.com")
                .then(() => alert("Text copied!"))
            }
          >
            {" "}
            john@gmail.com
          </span>
          <br />
          Password:
          <span
            className="text-danger"
            onDoubleClick={() =>
              navigator.clipboard
                .writeText("m38rmF$")
                .then(() => alert("Text copied!"))
            }
          >
            {" "}
            m38rmF$
          </span>
        </div>

        <button className="btn btn-warning w-50 m-2 mt-4">Login</button>
        <Link to="/uregister" className="btn btn-success mt-3">
          New User ?
        </Link>
        <p className="h4 text-white">{userError}</p>
      </form>
    </div>
  );
}
