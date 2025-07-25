import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Services } from "./components/services";
import { PredictionForm } from "./components/PredictionForm";
import { Testimonials } from "./components/testimonials";
import { Feedback } from "./components/Feedback"
import { Contact } from "./components/contact";


import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      <Navigation />
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      <PredictionForm data={landingPageData.PredictionForm} />
      <Testimonials data={landingPageData.Testimonials} />
      <Feedback data={landingPageData.Feedback} />
      <Contact data={landingPageData.Contact} />
    </div>
  );
};

export default App;
