import { Link } from "react-router-dom";

export function RegisterLink() {
  return (
    <div>
      <Link to="/uregister" className="btn btn-danger fw-bold mt-3">
        User Not found - Please Register
      </Link>
    </div>
  );
}
