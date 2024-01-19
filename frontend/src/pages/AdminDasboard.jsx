import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const BusinessCard = ({ business, onVerifyClick }) => {
  const navigate = useNavigate();
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mx-4 my-4">
      <img
        className="w-full h-48 object-cover"
        src={business.images[0]}
        alt={business.name}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{business.name}</div>
        <p className="text-gray-700 text-base">{business.description}</p>
      </div>
      <div className="px-6 py-4">
        <button
          onClick={() => navigate(`/verify-success`)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Verify
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate(`/business/${business._id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const businessList = [
    {
      _id: "1",
      name: "Business 1",
      description: "Description for Business 1",
      images: ["image1.jpg"],
    },
    {
      _id: "2",
      name: "Business 2",
      description: "Description for Business 2",
      images: ["image2.jpg"],
    },
    // Add more business data as needed
  ];

  const handleVerifyClick = (businessId) => {
    console.log(`Verifying business with ID: ${businessId}`);
  };

  return (
    <div className="container mx-auto mt-5 flex flex-col items-center justify-center">
      <Navbar />
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="flex flex-wrap">
        {businessList.map((business, index) => (
          <BusinessCard
            key={index}
            business={business}
            onVerifyClick={handleVerifyClick}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
