import React from "react";

const ProfileHeader = () => {
  const logoUrl = "../assets/defaultImg.jpg";

  const data = {
    name: "Shobha",
    category: "Restaurant",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione ",
  };

  return (
    <div className="mt-20 flex justify-between items-center p-5 border border-gray-300 rounded shadow-md">
      <div className="w-2/3">
        <h2 className="text-4xl font-bold mb-1">{data.name}</h2>
        <p className="text-xl text-gray-600 mb-2">{data.category}</p>
        <p className="text-2md text-gray-800">{data.description}</p>
      </div>
      <div className="w-1/3 text-right">
        <ion-icon
          name="person-circle-outline"
          class="text-12xl text-blue-500"
        ></ion-icon>
      </div>
    </div>
  );
};

export default ProfileHeader;
