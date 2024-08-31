import axios from "axios";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./adminlogin.css";
import { Nav } from "../nav/nav";
import adminImg from "../../assets/admin_icon.svg";

export function AdminLogin() {
  let navigate = useNavigate();
  const [users, setUsers] = useState({
    id: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    name: "",
  });
  console.log("Top Users", users);
  const [userError, setUserError] = useState("");

  const [cookies, setCookie, removeCookie] = useCookies("adminName");

  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },
    onSubmit: (values) => {
      var user = users.find((item) => item.email === values.Email);

      if (
        (user.email === "morrison@gmail.com",
        user.password === "83r5^_" && user.password === values.Password)
      ) {
        setCookie("adminName", user.name.firstname);
        navigate("/admindashboard");
      } else {
        setUserError("Invalid Credentials");
      }
    },
  });

  useEffect(() => {
    // axios.get("http://127.0.0.1:2200/admin").then((response) => {
    //   setUsers(response.data);
    // });
    axios.get("https://fakestoreapi.com/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <div className="adminPage">
      <Nav />
      <form
        className="admin_Form form PhoneWidthForm"
        onSubmit={formik.handleSubmit}
      >
        <div className="admin_logo">
          <img src={adminImg} alt="" />
        </div>
        <label className="form-label" htmlFor="Admin">
          Admin
        </label>
        <input
          put
          className="form-control"
          type="text"
          placeholder="please enter admin Email"
          onChange={formik.handleChange}
          name="Email"
        />

        <label className="form-label mt-4" htmlFor="Password">
          Password
        </label>
        <input
          className="form-control"
          type="password"
          onChange={formik.handleChange}
          name="Password"
        />
        <div>
          for test login details dbl click for copy <br />
          <span
            className="text-danger"
            onDoubleClick={() =>
              navigator.clipboard
                .writeText("morrison@gmail.com")
                .then(() => alert("Text copied!"))
            }
          >
            Email: morrison@gmail.com
          </span>
          <br />
          <span
            className="text-danger"
            onDoubleClick={() =>
              navigator.clipboard
                .writeText("83r5^_")
                .then(() => alert("Text copied!"))
            }
          >
            Password : 83r5^_
          </span>
        </div>
        <button className="btn btn-primary mt-4 w-100">Login</button>
        <p className="h3 text-danger">{userError}</p>
      </form>
    </div>
  );
}
