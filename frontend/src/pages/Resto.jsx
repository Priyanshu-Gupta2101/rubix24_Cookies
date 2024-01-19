import React from "react";
import Navbar from "../components/Navbar";
import Products from "../components/Products";

function Resto(props) {
  return (
    <>
      <Navbar />
      <div>
        <div className="top-logo-name">
          <img
            src="https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2023/11/29230532/Featured-Inside-10-5-1600x900.jpg"
            alt="company logo"
          />
        </div>
        <h1 className="business_name">Bastian - At the Top</h1>
        <h2 className="cuisine">Seafood</h2>
        <h2 className="location">Marine Lines, Mumbai</h2>
      </div>

      <Products />
    </>
  );
}

export default Resto;
