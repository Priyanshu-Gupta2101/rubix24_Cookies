import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../hooks/axiosinstance";
import { useAuth } from "../context/auth";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [auth, setAuth] = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //fetch
    try {
      const { data } = await axiosInstance.post("/api/v1/auth/login", {
        email: loginData.email,
        password: loginData.password,
      });

      if (data && data.success) {
        setAuth({
          ...auth,
          user: data["user"],
          token: data["token"],
        });
        localStorage.setItem("auth", JSON.stringify(data));
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center images">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-semibold mb-4">Login</h2>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Password
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </label>
        <div className="flex items-center justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-950 text-white px-4 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
