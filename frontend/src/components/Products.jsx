import React, { useEffect } from "react";

function Products(props) {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });

    const domain = document.querySelectorAll(".domain");
    domain.forEach((element) => observer.observe(element));
  }, []);

  return (
    <div>
      <h2 className="domains">Our Top 3 picks</h2>
      <div className="domains">
        <div className="domain">
          <img src="https://wholeyseafood.com/wp-content/uploads/2022/04/seafood-pomodoro-photo-5.png" />
          <h3>Caramel Custard</h3>
        </div>
        <div className="domain">
          <img src="https://www.shakaharry.com/cdn/shop/products/keema.png?v=1665404391" />
          <h3>Keema Pav</h3>
        </div>
        <div className="domain">
          <img src="https://scontent.fbom16-1.fna.fbcdn.net/v/t39.30808-6/337890784_243863054664498_9121170110229658921_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=7z3yUJJl0ooAX-EWLLc&_nc_ht=scontent.fbom16-1.fna&oh=00_AfAD9KJDXMHj8DJg4aWywqWXuo0H6by6aqq-gYE4trMKEw&oe=65AC6D54" />
          <h3>Pallonji's</h3>
        </div>
      </div>
    </div>
  );
}

export default Products;
