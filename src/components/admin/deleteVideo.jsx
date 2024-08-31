import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

export function DeleteVideo() {
  const [videos, setVideos] = useState([
    { VideoId: 0, Title: "", Url: "", Likes: 0, Comments: "", Category_Id: 0 },
  ]);

  let navigate = useNavigate();

  let params = useParams();

  useEffect(() => {
    axios.get(`http://127.0.0.1:2200/video/${params.id}`).then((response) => {
      setVideos(response.data);
    });
  }, [params.id]);

  function handleDeleteClick() {
    axios.delete(`http://127.0.0.1:2200/deletevideo/${params.id}`);
    alert("Video Deleted");
    navigate("/admindashboard");
  }

  return (
    <div
      className="container-fluid bg-danger text-white"
      style={{ height: "100vh" }}
    >
      <h3 className="text-center text-white">Delete Video</h3>
      <div style={{ display: "block", margin: "auto", width: "25vw" }}>
        <h3>{videos[0]?.Title}</h3>
        <iframe
          title="video"
          src={videos[0]?.Url}
          width="400"
          height="300"
        ></iframe>
      </div>
      <div className="mt-3 d-flex justify-content-center">
        <button onClick={handleDeleteClick} className="btn btn-success me-2">
          Delete <span className="bi bi-trash"></span>
        </button>
        <Link to="/admindashboard" className="btn btn-warning">
          Cancel
        </Link>
      </div>
    </div>
  );
}
