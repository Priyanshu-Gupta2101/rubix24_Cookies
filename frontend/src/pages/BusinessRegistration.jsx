import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import axiosInstance from "../hooks/axiosinstance";

const BusinessRegistration = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: {
      type: "Point",
      coordinates: [0, 0],
    },
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
    phone: "",
    website: "",
    description: "",
    openingHours: "",
    images: [],
    categories: [],
    tags: [],
    services: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImage = async (event) => {
    const files = event.target.files;
    console.log(files);

    if (files.length === 1) {
      const base64 = await convertBase64(files[0]);
      formData.images.push(base64);
      return;
    }

    for (let i = 0; i < files.length; i++) {
      let base64 = await convertBase64(files[i]);
      formData.images.push(base64);
    }

    console.log(formData.images);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData.images);
      if (auth.user) {
        const { data } = await axiosInstance.post(
          "/api/v1/business/create",
          {
            name: formData.name,
            category: formData.category,
            location: formData.location,
            address: formData.address,
            phone: formData.phone,
            images: formData.images,
            website: formData.website,
            description: formData.description,
            openingHours: formData.openingHours,
            categories: formData.categories,
            tags: formData.tags,
            services: formData.services,
          },
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        if (data.success) {
          console.log("Business created successfully:", data.savedBusiness);
          navigate("/dashboard");
        } else {
          console.error("Error creating business:", data.error);
        }
      }
    } catch (error) {
      console.error("Error creating business:", error.message);
    }
  };

  // Custom map event handler to update latitude and longitude
  const SetLocationMarker = () => {
    const map = useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setFormData((prevData) => ({
          ...prevData,
          location: {
            type: "Point",
            coordinates: [lng, lat],
          },
        }));
      },
    });

    return <Marker position={formData.location.coordinates} />;
  };

  return (
    <div className="p-10 min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-3xl font-semibold mb-4">Business Registration</h2>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-3xl mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Business Name
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Street
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            City
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            State
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="address.state"
              value={formData.address.state}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Zip
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="address.zip"
              value={formData.address.zip}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Country
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="address.country"
              value={formData.address.country}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Phone
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Website
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Opening Hours
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="openingHours"
              value={formData.openingHours}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Images
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="file"
              name="images"
              multiple
              onChange={handleImage}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Categories
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="categories"
              value={formData.categories}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  categories: e.target.value.split(","),
                }))
              }
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tags
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="tags"
              value={formData.tags}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  tags: e.target.value.split(","),
                }))
              }
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Services
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="services"
              value={formData.services}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  services: e.target.value.split(","),
                }))
              }
            />
          </label>
        </div>
      </form>
      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default BusinessRegistration;
