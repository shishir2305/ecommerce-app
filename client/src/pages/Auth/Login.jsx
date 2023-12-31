import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "./authStyles.css";
import { useAuth } from "../../context/auth";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [auth, setAuth] = useAuth();

  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", formData);
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        setTimeout(() => {
          toast.success(res.data && res.data.message);
        }, 1000);
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("Error in Login Page", error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <Layout>
      <div className="register">
        <h1>Login Page</h1>
        <form className="loginForm">
          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              onChange={onFormChange}
              value={formData.email}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={onFormChange}
              value={formData.password}
            />
          </div>
        </form>
        <div className="d-flex gap-2">
          <button onClick={onFormSubmit} className="btn btn-primary">
            LOGIN
          </button>
          <button
            onClick={() => navigate("/forgot-password")}
            className="btn btn-danger"
          >
            FORGOT PASSWORD
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
