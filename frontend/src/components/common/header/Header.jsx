import React from "react";
import "./header.css";

function Header(props) {
  return (
    <div className="max-width header">
      <h2 className="header_name">Shreni</h2>
      <div className="profile-wrapper">
        <img
          className="header-profile-img"
          src="https://www.visitdubai.com/-/media/images/leisure/detail-pages/plan-your-trip/4-1-practical-information-t14/plan-your-trip-practical-information-beach-club-det.jpg?&cw=256&ch=256"
        />
        <span className="header-username">Siddanth</span>
        <i className="fi fi-rr-angle-small-down absolute-center profile-options-icon"></i>
      </div>
    </div>
  );
}

export default Header;
