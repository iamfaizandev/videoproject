import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function Signout() {
  const [cookie, setCookie, removeCookie] = useCookies("userName");
  let navigate = useNavigate();
  function handleSignout() {
    removeCookie("userName");
    navigate("/userlogin");
  }
  return (
    <button onClick={handleSignout} className="btn btn-light me-2">
      Signout
    </button>
  );
}
