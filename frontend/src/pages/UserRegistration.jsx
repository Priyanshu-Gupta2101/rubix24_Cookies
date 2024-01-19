import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../hooks/axiosinstance";

const UserRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedImage);

      await axiosInstance.post("/api/v1/auth/profile-image", formData);
    } catch (error) {
      console.error("Error uploading profile image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axiosInstance.post("/api/v1/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
      });
      if (data.success) {
        await handleFileUpload();
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center images">
        <form
          className=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-3xl flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-semibold mb-4">User Registration</h2>
          <div className="lg:flex">
            <div className=" pr-4-r-2 mb-4 lg:mb-0">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  name="email"
                  value={formData.email}
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
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Address
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </label>
            </div>
            {/* <div className="w-1/2 pl-4 flex flex-col items-center justify-center">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload Image
                <input
                  className="border-dashed border-2 p-4 rounded-md mt-2"
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </label>
              {selectedImage && (
                <div className="mb-4">
                  <img
                    src={selectedImage}
                    alt="Uploaded"
                    className="rounded-md max-h-40 max-w-full mb-2"
                  />
                </div>
              )}
            </div> */}
          </div>
          <div className="mt-4 flex items-center justify-end">
            <button
              type="submit"
              className="bg-blue-950 text-white px-4 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserRegistration;
