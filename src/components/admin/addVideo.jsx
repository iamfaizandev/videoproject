import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import "./addvideo.css";

export function AddVideo() {
  const [categories, setCategories] = useState([
    { Category_Id: 0, CategoryName: "" },
  ]);

  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      VideoId: 0,
      Title: "",
      Url: "",
      Likes: 0,
      Comments: "",
      Category_Id: 0,
    },
    onSubmit: (values) => {
      axios.post("http://127.0.0.1:2200/addvideo", values);
      alert("Video Added Successfully..");
      navigate("/admindashboard");
    },
  });

  function LoadCategories() {
    axios.get("http://127.0.0.1:2200/categories").then((response) => {
      response.data.unshift({
        Category_Id: -1,
        CategoryName: "Select Category",
      });
      setCategories(response.data);
    });
  }
  function backtoAdminPage() {
    navigate("/admindashboard");
  }
  useEffect(() => {
    LoadCategories();
  }, []);

  return (
    <div className="container-fluid  bg">
      <div className="blur">
        <h4 className="text-center ">New Video</h4>
        <form
          onSubmit={formik.handleSubmit}
          className="form"
          style={{
            width: "25vw",
            display: "block",
            margin: "auto",
            marginTop: "3%",
          }}
        >
          <label className="AddVform-label h5 mt-2">Video Id</label>
          <input
            className="form-control w-25"
            type="number"
            onChange={formik.handleChange}
            name="VideoId"
          />
          <label className="AddVform-label h5 mt-2">Title</label>
          <input
            className="form-control "
            type="text"
            onChange={formik.handleChange}
            name="Title"
          />
          <label className="AddVform-label h5 mt-2">Url</label>
          <input
            className="form-control "
            type="text"
            onChange={formik.handleChange}
            name="Url"
          />
          <label className="AddVform-label h5 mt-2">Likes</label>
          <input
            className="form-control w-25"
            type="number"
            onChange={formik.handleChange}
            name="Likes"
          />
          <label className="AddVform-label h5 mt-2">Comments</label>
          <input
            className="form-control "
            type="text"
            onChange={formik.handleChange}
            name="Comments"
          />
          <label className="AddVform-label h5 mt-2">Category</label>
          <select
            name="Category_Id"
            className="form-select"
            onChange={formik.handleChange}
          >
            {categories.map((category) => (
              <option value={category.Category_Id} key={category.Category_Id}>
                {category.CategoryName.toUpperCase()}
              </option>
            ))}
          </select>

          <button className="btn btn-primary w-100 mt-4">Add</button>
          <button
            className="btn btn-primary w-100 mt-4"
            onClick={backtoAdminPage}
          >
            Back{" "}
          </button>
        </form>
      </div>
    </div>
  );
}
