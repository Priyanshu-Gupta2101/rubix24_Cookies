import React, { useState } from "react";
import axiosInstance from "../hooks/axiosinstance";
import ProfileHeader from "../components/ProfileHeader";
import Navbar from "../components/Navbar";

const Tab = ({ label, isActive, onClick }) => (
  <div
    className={`cursor-pointer px-4 py-2 border-b-2 font-medium text-pink-600 transition duration-300 ease-in-out ${
      isActive ? "border-pink-600 opacity-100" : "opacity-70"
    }`}
    onClick={() => onClick(label)}
  >
    {label}
  </div>
);

const TabContent = ({ content }) => <div className="p-4">{content}</div>;

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  const [selectedFile, setSelectedFile] = useState(null);

  const FileUpload = () => {
    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];

      if (selectedFile) {
        setSelectedFile(selectedFile);
        console.log("file uploaded");
      } else {
        setSelectedFile(null);
      }
    };
  };

  const tabData = [
    {
      label: "Overview",
      content: (
        <div className="text-lg text-black-500">
          <p className="mb-2">
            <span className="font-bold">Location:</span> Your Location
          </p>
          <p className="mb-2">
            <span className="font-bold">Address:</span> Your Address
          </p>
          <p className="mb-2">
            <span className="font-bold">Hours:</span> Your Business Hours
          </p>
          <p>
            <span className="font-bold">Phone:</span> Your Phone Number
          </p>
        </div>
      ),
    },
    {
      label: "Products",
      content: (
        <ul className="list-disc list-inside">
          <li className="text-green-500">Item 1</li>
          <li className="text-green-500">Item 2</li>
          <li className="text-green-500">Item 3</li>
        </ul>
      ),
    },
    {
      label: "Documents",
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="border-2 border-dashed rounded-lg p-3">
            <h1 className="mb-1 font-bold">Document 1</h1>
            <label
              htmlFor="pdfInput"
              className="block text-sm font-medium text-gray-700"
            >
              Choose a PDF file:
            </label>
            <input
              type="file"
              id="pdfInput"
              accept=".pdf"
              onChange={FileUpload}
              className="mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="border-2 border-dashed rounded-lg p-3">
            <h1 className="mb-1 font-bold">Document 2</h1>
            <label
              htmlFor="pdfInput"
              className="block text-sm font-medium text-gray-700"
            >
              Choose a PDF file:
            </label>
            <input
              type="file"
              id="pdfInput"
              accept=".pdf"
              onChange={FileUpload}
              className="mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="border-2 border-dashed rounded-lg p-3">
            <h1 className="mb-1 font-bold">Document 3</h1>
            <label
              htmlFor="pdfInput"
              className="block text-sm font-medium text-gray-700"
            >
              Choose a PDF file:
            </label>
            <input
              type="file"
              id="pdfInput"
              accept=".pdf"
              onChange={FileUpload}
              className="mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>

          {console.log(selectedFile)}

          {selectedFile && (
            <div className="mt-2 flex items-center">
              <ion-icon name="checkmark-circle"></ion-icon>
              <p className="text-green-600">
                File selected: {selectedFile.name}
              </p>
            </div>
          )}
        </div>
      ),
    },
    {
      label: "Photos",
      content: <div>No photos available</div>,
    },
  ];

  return (
    <div>
      <Navbar />
      <ProfileHeader />
      <div className="flex bg-amber-100">
        {tabData.map((tab) => (
          <Tab
            key={tab.label}
            label={tab.label}
            isActive={activeTab === tab.label}
            onClick={setActiveTab}
          />
        ))}
      </div>
      <TabContent
        content={tabData.find((tab) => tab.label === activeTab)?.content}
      />
    </div>
  );
};

export default Dashboard;
