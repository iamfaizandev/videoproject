import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./useregister.css";
import { Nav } from "../nav/nav";

export function UserRegister() {
  const [users, setUsers] = useState([
    { UserId: "", UserName: "", Password: "", Email: "", Mobile: "" },
  ]);
  const [userError, setUserError] = useState("");
  const [errorClass, setErrorClass] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:2200/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      UserId: "",
      UserName: "",
      Password: "",
      Email: "",
      Mobile: "",
    },
    onSubmit: (user) => {
      axios.post("http://127.0.0.1:2200/adduser", user);
      alert("Registered Successfully..");
      navigate("/userlogin");
    },
  });

  function VerifyUser(e) {
    for (var user of users) {
      if (user.UserId === e.target.value) {
        setUserError("User Id Taken - Try Another");
        setErrorClass("text-danger");
        break;
      } else {
        setUserError("User Id Available");
        setErrorClass("text-success");
      }
    }
  }

  return (
    <div className="registerPage">
      <Nav />
      <form
        className="register_Form form PhoneWidthForm"
        onSubmit={formik.handleSubmit}
      >
        <h4 className="text-light text-center">Register User</h4>
        <label htmlFor="UserId" className="form-label">
          User Id
        </label>
        <input
          className="form-control"
          type="text"
          onKeyUp={VerifyUser}
          onChange={formik.handleChange}
          name="UserId"
        />
        <div className={errorClass}>{userError}</div>
        <label className="form-label" htmlFor="UserName">
          User Name
        </label>
        <input
          type="text"
          className="form-control"
          onChange={formik.handleChange}
          name="UserName"
        />

        <label className="form-label" htmlFor="Password">
          Password
        </label>

        <input
          className="form-control"
          type="password"
          onChange={formik.handleChange}
          name="Password"
        />

        <label className="form-label" htmlFor="Email">
          Email
        </label>

        <input
          type="email"
          className="form-control"
          onChange={formik.handleChange}
          name="Email"
        />

        <label className="form-label" htmlFor="Mobile">
          Mobile
        </label>

        <input
          type="text"
          onChange={formik.handleChange}
          className="form-control"
          name="Mobile"
        />

        <button className="btn btn-primary w-50 m-4">Register</button>
        <Link to="/" className="btn btn-danger ms-2">
          Cancel
        </Link>
      </form>
    </div>
  );
}
