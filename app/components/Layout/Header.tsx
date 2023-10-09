'use client';
import React from "react";

const Header = () => {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <header
      className="bg-green-500 text-black p-4 cursor-pointer"
      onClick={refreshPage}
    >
      Cookie Stand Admin
    </header>
  );
};

export default Header;
