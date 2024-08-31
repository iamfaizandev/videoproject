import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./editvideo.css";
export function EditVideo() {
  const [categories, setCategories] = useState([
    { Category_Id: 0, CategoryName: "" },
  ]);
  const [videos, setVideos] = useState([
    { VideoId: 0, Title: "", Url: "", Likes: 0, Comments: "", Category_Id: 0 },
  ]);

  let navigate = useNavigate();

  let params = useParams();

  const formik = useFormik({
    initialValues: {
      VideoId: videos[0].VideoId,
      Title: videos[0].Title,
      Url: videos[0].Url,
      Likes: videos[0].Likes,
      Comments: videos[0].Comments,
      Category_Id: videos[0].Category_Id,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      axios.put(`http://127.0.0.1:2200/editvideo/${params.id}`, values);
      alert("Video Updated..");
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

  useEffect(() => {
    LoadCategories();
    axios.get(`http://127.0.0.1:2200/video/${params.id}`).then((response) => {
      setVideos(response.data);
    });
  }, [params.id]);

  return (
    <div className="container-fluid editVideo">
      <div className="text h3 text-center mt-4 text-danger mb-4">
        Video Edit
      </div>
      <form onSubmit={formik.handleSubmit} className="mt-4 form editForm">
        <label className="Vform-label">Video Id</label>
        <input
          className="form-control w-25"
          type="number"
          value={formik.values.VideoId}
          onChange={formik.handleChange}
          name="VideoId"
        />

        <label className="Vform-label">Title</label>

        <input
          className="form-control "
          type="text"
          value={formik.values.Title}
          onChange={formik.handleChange}
          name="Title"
        />

        <label className="Vform-label">Url</label>

        <input
          type="text"
          className="form-control "
          value={formik.values.Url}
          onChange={formik.handleChange}
          name="Url"
        />

        <label className="Vform-label">Likes</label>

        <input
          type="number"
          className="form-control w-25"
          value={formik.values.Likes}
          onChange={formik.handleChange}
          name="Likes"
        />

        <label className="Vform-label">Comments</label>

        <input
          type="text"
          className="form-control "
          value={formik.values.Comments}
          onChange={formik.handleChange}
          name="Comments"
        />

        <label className="Vform-label">Category</label>

        <select
          className="form-select"
          name="Category_Id"
          value={formik.values.Category_Id}
          onChange={formik.handleChange}
        >
          {categories.map((category) => (
            <option
              className="form-option"
              value={category.Category_Id}
              key={category.Category_Id}
            >
              {category.CategoryName.toUpperCase()}
            </option>
          ))}
        </select>

        <button className="btn btn-success mt-4 ms-4 w-25">Save</button>
        <Link to="/admindashboard" className="btn btn-danger ms-3 mt-4 w-50">
          Cancel
        </Link>
      </form>
    </div>
  );
}
