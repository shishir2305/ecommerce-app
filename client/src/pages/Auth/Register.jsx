import { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./authStyles.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", formData);
      if (res && res.data.success) {
        setTimeout(() => {
          toast.success(res.data && res.data.message);
        }, 1000);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("Error in Register Page", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Layout>
      <div className="register">
        <h1>Register Page</h1>
        <form className="registerForm">
          <div className="left">
            <div className="mb-3">
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                onChange={onFormChange}
                value={formData.name}
              />
            </div>
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
          </div>

          <div className="right">
            <div className="mb-3">
              <label className="form-label" htmlFor="address">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                onChange={onFormChange}
                value={formData.address}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="number">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                onChange={onFormChange}
                value={formData.phone}
              />
            </div>
          </div>
        </form>
        <button onClick={onFormSubmit} className="btn btn-primary">
          Submit
        </button>
      </div>
    </Layout>
  );
}

export default Register;
