import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/"); // Adjust the path as needed
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-3xl font-semibold mb-4">404 - Page Not Found</h2>
      <p className="text-gray-700 text-lg mb-8">
        Oops! The page you are looking for might be unavailable or does not
        exist.
      </p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
        onClick={goToHomePage}
      >
        Go to Home Page
      </button>
    </div>
  );
};

export default PageNotFound;
