import { useCookies } from "react-cookie";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./admindashboard.css";
export function AdminDashBoard() {
  const [cookies, setCookie, removeCookie] = useCookies(["adminName"]);
  const [videos, setVideos] = useState([
    { VideoId: 0, Title: "", Url: "", Comments: "", Likes: 0, Category_Id: 0 },
  ]);
  let navigate = useNavigate();

  function LoadVideos() {
    axios.get("http://127.0.0.1:2200/videos").then((response) => {
      setVideos(response.data);
    });
  }
  function adminLogOutClick() {
    removeCookie("adminName");
    navigate("/");
  }

  useEffect(() => {
    if (cookies["adminName"] === undefined) {
      navigate("/adminlogin");
    } else {
      LoadVideos();
    }
  }, [cookies, navigate]);

  return (
    <div className="container-fluid bg">
      <h3> {cookies["adminName"]} - Dashboard</h3>
      <div className="mb-4 d-flex justify-content-between">
        <Link to="/addvideo" className="btn btn-primary">
          New Video
        </Link>
        <Link onClick={adminLogOutClick} className="btn btn-outline-warning">
          Log Out
        </Link>
      </div>
      <table className="table table-hover bg-dark">
        <thead>
          <tr>
            <th>Title</th>
            <th>Preview</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.VideoId}>
              <td width="200">{video.Title}</td>
              <td>
                <iframe
                  title="video"
                  src={video.Url}
                  width="300"
                  height="100"
                ></iframe>
              </td>
              <td>
                <Link
                  to={`/editvideo/${video.VideoId}`}
                  className="btn btn-warning bi bi-pen-fill me-2"
                ></Link>
                <Link
                  to={`/deletevideo/${video.VideoId}`}
                  className="btn btn-danger bi bi-trash-fill"
                ></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
