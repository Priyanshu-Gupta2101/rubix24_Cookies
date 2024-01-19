import React from "react";
import "./tabOptions.css";

const tabs = [
  {
    id: 1,
    name: "Top-Picks!",
    inactive_img:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Five-pointed_star.svg/800px-Five-pointed_star.svg.png",
    active_img:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Star%2A.svg/300px-Star%2A.svg.png?20070316213819",
    backdrop: "FCEE0E",
  },
  {
    id: 2,
    name: "Memorabilia",
    inactive_img: "https://cdn-icons-png.flaticon.com/512/2849/2849657.png",
    active_img: "https://cdn-icons-png.flaticon.com/512/2849/2849751.png",
    backdrop: "FCEE0E",
  },
  {
    id: 3,
    name: "Food",
    inactive_img:
      "https://b.zmtcdn.com/data/o2_assets/78d25215ff4c1299578ed36eefd5f39d1616149985.png?output-format=webp",
    active_img:
      "https://b.zmtcdn.com/data/o2_assets/30fa0a844f3ba82073e5f78c65c18b371616149662.png",
    backdrop: "FCEE0E",
  },
  // {
  //   id: 4,
  //   name: "Discover",
  //   inactive_img: "https://cdn-icons-png.flaticon.com/512/1794/1794580.png",
  //   active_img: "https://cdn-icons-png.flaticon.com/512/1794/1794580.png",
  //   backdrop: "FCEE0E",
  // },
];

function TabOptions({ activeSection, setActiveSection }) {
  return (
    <div className="tab-options">
      <div className="max-width options-wrapper">
        {tabs.map((tab) => {
          return (
            <div
              onClick={() => setActiveSection(tab.name)}
              className={`tab-item absolute-center cur-po ${
                activeSection === tab.name && "active-tab"
              }`}
            >
              <div
                className="tab-image-container absolute-center"
                style={{
                  backgroundColor: `${
                    activeSection === tab.name ? tab.backdrop : ""
                  }`,
                }}
              >
                <img
                  className="tab-image"
                  alt={"tab.name"}
                  // src={"../../../images/img.png"}
                  src={
                    activeSection === tab.name
                      ? tab.active_img
                      : tab.inactive_img
                  }
                />
              </div>
              <div className="tab-name">{tab.name}</div>
            </div>
          );
        })}
        <a
          className="btn btn-discover btn-primary absolute-center"
          href="http://localhost:3333"
        >
          <img
            className="tab-image"
            src="https://cdn-icons-png.flaticon.com/512/1794/1794580.png"
          />
          Discover
        </a>
      </div>
    </div>
  );
}

export default TabOptions;
