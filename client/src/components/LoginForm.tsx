import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "./LoginForm.css";

const LoginForm = () => {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [showModal, setShowModal] =
    useState(false);

  const [modalMessage, setModalMessage] =
    useState("");

  const [isSuccess, setIsSuccess] =
    useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!email || !password) {
      setModalMessage(
        "Please fill all fields"
      );

      setIsSuccess(false);

      setShowModal(true);

      return;
    }

    try {
      setLoading(true);

      const res = await api.post(
        "/login",
        {
          email,
          password,
        }
      );

      setModalMessage(
        "Login Successful"
      );

      setIsSuccess(true);

      setShowModal(true);

      setTimeout(() => {
        navigate("/students");
      }, 1500);

      console.log(res.data);
    } catch (error: any) {
      console.log(error);

      setModalMessage(
        error?.response?.data?.message ||
          "Login Failed"
      );

      setIsSuccess(false);

      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">
          Student Management System
        </h2>

        <p className="login-subtitle">
          Login to continue
        </p>

        <form
          onSubmit={handleSubmit}
          className="login-form"
        >
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="login-btn"
          >
            {loading
              ? "Logging In..."
              : "Login"}
          </button>
        </form>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>
              {isSuccess
                ? "✅ Success"
                : "❌ Error"}
            </h3>

            <p>{modalMessage}</p>

            <button
              onClick={() =>
                setShowModal(false)
              }
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;