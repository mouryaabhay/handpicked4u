import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/home/home-page";
import AboutPage from "@/pages/about/about-page";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
};

export default PageRoutes;
