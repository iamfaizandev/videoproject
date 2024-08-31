import { useCookies } from "react-cookie";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./userdashboard.css";

export function UserDashboard() {
  const [cookies, setCookie, removeCookie] = useCookies(["userName"]);
  const [videos, setVideos] = useState([
    { VideoId: 0, Title: "", Url: "", Comments: "", Likes: 0, Category_Id: 0 },
  ]);
  let navigate = useNavigate();

  function LoadVideos() {
    axios.get("http://127.0.0.1:2200/videos").then((response) => {
      setVideos(response.data);
    });
  }

  function LogOutClick() {
    removeCookie("userName");
    navigate("/");
  }
  useEffect(() => {
    if (cookies["userName"] === undefined) {
      navigate("/");
    } else {
      LoadVideos();
    }
  }, [cookies, navigate]);

  return (
    <div className="video_bg p-4">
      <div className="userNav d-flex justify-content-between mb-4 ">
        <h3 className="mt-4">
          Dashboard - Welcome
          <span className="text-white ms-4">{cookies["userName"]}</span>
        </h3>
        <Link onClick={LogOutClick} className="btn btn-danger mt-4">
          Log Out
        </Link>
      </div>
      <section className="d-flex flex-wrap">
        {videos.map((video) => (
          <div
            key={video.VideoId}
            className="card p-2 m-2"
            style={{ width: "400px" }}
          >
            <div className="card-header" style={{ height: "50px" }}>
              <h3>{video.Title}</h3>
            </div>
            <div className="card-body">
              <iframe
                title="Video"
                src={video.Url}
                width="100%"
                height="200"
              ></iframe>
            </div>
            <div className="card-footer">
              <span className="bi bi-hand-thumbs-up"></span> {video.Likes} Likes
              <div>
                <label className="form-label fw-bold">Comments:</label>
                <div>{video.Comments}</div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
