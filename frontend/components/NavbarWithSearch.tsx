/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import Navbar from "./Navbar";

const NavbarWithSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };
  return (
    <Navbar
      onCategoryClick={handleCategoryClick}
      selectedCategory={selectedCategory}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    />
  );
};

export default NavbarWithSearch;
