import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserRegister } from "./components/userRegister/userRegister";
import { UserLogin } from "./components/userLogin/userLogin";
import { UserDashboard } from "./components/userDashboard/userDashboard";
import { AdminLogin } from "./components/admin/adminLogin";
import { AdminDashBoard } from "./components/admin/adminDashboard";
import { AddVideo } from "./components/admin/addVideo";
import { EditVideo } from "./components/admin/editVideo";
import { DeleteVideo } from "./components/admin/deleteVideo";
import { HomePage } from "./components/homeReg/homePage";
// import { Nav } from "./components/nav/nav";

function App() {
  return (
    <div className="text-light">
      <BrowserRouter>
        <section>
          <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="uregister" element={<UserRegister />} />
            <Route path="/" element={<UserLogin />} />
            <Route path="userdashboard" element={<UserDashboard />} />
            <Route path="adminlogin" element={<AdminLogin />} />
            <Route path="admindashboard" element={<AdminDashBoard />} />
            <Route path="addvideo" element={<AddVideo />} />
            <Route path="editvideo/:id" element={<EditVideo />} />
            <Route path="deletevideo/:id" element={<DeleteVideo />} />
          </Routes>
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
