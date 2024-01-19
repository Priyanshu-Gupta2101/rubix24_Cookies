import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [auth, setAuth] = useAuth();

  let links = [
    { name: "Home", link: "/" },
    // { name: "Service", link: "/" },
    // { name: "About", link: "/" },
    { name: "FAQs", link: "/" },
    { name: "Contact", link: "/" },
  ];
  let navigate = useNavigate();

  const action = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  let [open, setOpen] = useState(false);

  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-50">
      <div className="md:flex md:items-center justify-between py-4 bg-pink-600 bg-opacity-100 md:px-10 px-7">
        <div
          onClick={() => navigate("/mumbai")}
          className="font-bold text-2xl cursor-pointer flex items-center text-amber-400"
        >
          <span></span>
          Shreni
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-4 cursor-pointer md:hidden"
        >
          <ion-icon name={open ? "close" : "menu"}></ion-icon>
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-7 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-15 opacity-100 shadow-md" : "top-[-470px]"
          } md-opacity-100 `}
        >
          {links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
              <a
                href="{link.link}"
                className="text-zinc-50 hover:text-amber-400 duration-500"
              >
                {link.name}
              </a>
            </li>
          ))}
          {auth?.user ? (
            <li className="md:ml-8 text-xl md:my-0 my-7">
              <a
                href="/"
                onClick={action}
                className="text-zinc-50 hover:text-amber-400 duration-500"
              >
                Logout
              </a>
            </li>
          ) : (
            <>
              <li className="md:ml-8 text-xl md:my-0 my-7">
                <a
                  href="/login"
                  className="text-zinc-50 hover:text-amber-400 duration-500"
                >
                  Sign in
                </a>
              </li>
              <li className="md:ml-8 text-xl md:my-0 my-7">
                <span className="h-6 w-px bg-zinc-200" aria-hidden="true" />
                <a
                  href="/signup"
                  className="text-zinc-50 hover:text-amber-400 duration-500"
                >
                  Create account
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
