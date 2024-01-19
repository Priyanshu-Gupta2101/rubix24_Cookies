import React, { useState } from "react";
import axiosInstance from "../hooks/axiosinstance";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const navigate = useNavigate();
  const [verificationData, setVerificationData] = useState({
    email: "",
    code: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVerificationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    // Perform your email verification logic here
    try {
      const { data } = await axiosInstance.post(
        `/api/v1/auth/verify-email/${verificationData.email}/${verificationData.code}`
      );
      if (data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center images">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-2xl mb-4"
        onSubmit={handleVerify}
      >
        <h2 className="text-3xl font-semibold mb-4">Email Verification</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              value={verificationData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Verification Code
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="code"
              value={verificationData.code}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
            onClick={handleVerify}
          >
            Verify
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailVerification;
