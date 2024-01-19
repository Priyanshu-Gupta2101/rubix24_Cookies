import React from "react";
import { useNavigate } from "react-router-dom";

const VerificationSuccess = () => {
  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-3xl font-semibold mb-4">Verification Successful</h2>
      <p className="text-gray-700 text-lg mb-8">
        Thank you for verifying your email address.
      </p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
        onClick={goToLoginPage}
      >
        Go to Home Page
      </button>
    </div>
  );
};

export default VerificationSuccess;
