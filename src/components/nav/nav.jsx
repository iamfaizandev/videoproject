import { Link } from "react-router-dom";
import { Signout } from "../userSignout/signout";
import { useCookies } from "react-cookie";
import { RiAdminFill } from "react-icons/ri";
export function Nav() {
  const [cookies] = useCookies("userName");
  return (
    <header className="   ">
      <div className="header_menu d-flex justify-content-around p-2">
        <div className="logo mt-4">
          <span className="h3">
            <Link className="text-white  text-decoration-none" to="/">
              VideoFlix
            </Link>
          </span>
        </div>
        <div className="right mt-4 d-flex ">
          {/* <div className="mt  me-4">
            <select name="" id="" className="form-select nav-select">
              <option value="English" className="form-option me-4   ">
                English
              </option>
              <option value="हिन्दी">हिन्दी</option>
            </select>
          </div> */}
          <div className="ms-4">
            {cookies["userName"] === undefined ? (
              <Link className="btn btn-success me-2" to="/userlogin">
                Login
              </Link>
            ) : (
              <Signout />
            )}
            <Link to="/adminlogin" className="btn btn-outline-light ms-4">
              <span>
                Admin
                <RiAdminFill />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
