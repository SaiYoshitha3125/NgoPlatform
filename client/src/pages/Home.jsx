import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setServerError("");
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.role) newErrors.role = "Role is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Email must contain @";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/login`,
        formData
      );

      const role = res.data.user.role;
      const normalizedRole =
        role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

      localStorage.setItem("auth-token", res.data.token);
      localStorage.setItem("user-role", normalizedRole);

      switch (normalizedRole) {
        case "Member":
          navigate("/member-dashboard");
          break;
        case "Volunteer":
          navigate("/volunteer-dashboard");
          break;
        case "Donor":
          navigate("/donor-dashboard");
          break;
        case "Beneficiary":
          navigate("/beneficiary-dashboard");
          break;
        case "Admin":
          navigate("/admin-dashboard");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      setServerError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        {serverError && <div className="error-message">{serverError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          {/* Role */}
          <div className="form-group">
            <label>I am a...</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="">Select Role</option>
              <option value="Member">Member</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Donor">Donor</option>
              <option value="Admin">Admin</option>
            </select>
            {errors.role && <span className="field-error">{errors.role}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className="field-error">{errors.email}</span>
            )}
          </div>

          {/* Password with Eye Icon */}
          <div className="form-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />

              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            {errors.password && (
              <span className="field-error">{errors.password}</span>
            )}
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
        </form>

        <p className="auth-redirect">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>

      <style>{`
                .auth-container {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                    background-color: #f9fafb;
                }
                .auth-card {
                    background: #fff;
                    padding: 2rem;
                    border-radius: 10px;
                    width: 100%;
                    max-width: 420px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.08);
                }
                h2 {
                    text-align: center;
                    margin-bottom: 1.5rem;
                }
                .form-group {
                    margin-bottom: 1rem;
                }
                label {
                    font-weight: 500;
                    margin-bottom: 0.4rem;
                    display: block;
                }
                input, select {
                    width: 100%;
                    padding: 0.7rem 2.5rem 0.7rem 0.7rem;
                    border-radius: 6px;
                    border: 1px solid #ddd;
                    font-size: 1rem;
                }
                .password-wrapper {
                    position: relative;
                }
                .eye-icon {
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    cursor: pointer;
                    color: #6b7280;
                }
                .eye-icon:hover {
                    color: #111827;
                }
                .btn-block {
                    width: 100%;
                    margin-top: 1rem;
                }
                .field-error {
                    color: #dc2626;
                    font-size: 0.85rem;
                    margin-top: 0.3rem;
                    display: block;
                }
                .error-message {
                    background: #fee2e2;
                    color: #991b1b;
                    padding: 0.75rem;
                    border-radius: 6px;
                    margin-bottom: 1rem;
                    text-align: center;
                }
                .auth-redirect {
                    text-align: center;
                    margin-top: 1.2rem;
                    font-size: 0.9rem;
                }
            `}</style>
    </div>
  );
};

export default Login;