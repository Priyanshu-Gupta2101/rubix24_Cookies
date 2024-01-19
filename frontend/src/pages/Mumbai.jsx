import React, { useState, useEffect } from "react";
import TabOptions from "../components/common/tabOptions/TabOptions";
import Footer from "../components/common/Footer/Footer";
import Top_Picks from "../components/Top_Picks/Top_Picks";
import Food from "../components/Food/Food";
import Memorabilia from "../components/Memorabilia/Memorabilia";
import Navbar from "../components/Navbar";
function Mumbai(props) {
  const [activeSection, setActiveSection] = useState("Top-Picks!");
  return (
    <div>
      {/*<Header />*/}
      <div className="mb-20">
        <Navbar />
      </div>
      <div className="rest_bg">
        {/*<MovingText />*/}

        <TabOptions
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        {showSection(activeSection)}
        <Footer />
      </div>
    </div>
  );
}
const showSection = (section) => {
  switch (section) {
    case "Top-Picks!":
      return <Top_Picks />;
    case "Memorabilia":
      return <Memorabilia />;
    case "Food":
      return <Food />;
    default:
      return <div>Section X</div>;
  }
};
export default Mumbai;
