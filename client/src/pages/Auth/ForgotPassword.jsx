import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./authStyles.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    securityAnswer: "",
    newPassword: "",
  });

  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", formData);
      if (res && res.data.success) {
        setTimeout(() => {
          toast.success(res.data && res.data.message);
        }, 1000);
        navigate("/login");
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
        <h1>Forgot Password</h1>
        <form className="loginForm mb-4">
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
              What is your pet's name ?
            </label>
            <input
              type="password"
              className="form-control"
              id="securityAnswer"
              onChange={onFormChange}
              value={formData.securityAnswer}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              onChange={onFormChange}
              value={formData.password}
            />
          </div>
        </form>
        <button onClick={onFormSubmit} className="btn btn-primary">
          RESET PASSWORD
        </button>
      </div>
    </Layout>
  );
}

export default ForgotPassword;
