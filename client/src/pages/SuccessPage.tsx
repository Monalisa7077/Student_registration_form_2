import { useNavigate } from "react-router-dom";
import "./SuccessPage.css";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">
          🎉
        </div>

        <h1>
          Registration Successful!
        </h1>

        <p>
          Student has been registered
          successfully.
        </p>

        <button
          className="success-btn"
          onClick={() =>
            navigate("/login")
          }
        >
          Go To Login
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;